from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import create_access_token
from app.middleware.auth import verify_token

from app.models.training_user import TrainingUser
from app.models.training_video import TrainingVideo
from app.models.iso14001_access import ISO14001Access
from app.models.training_video_progress import TrainingVideoProgress
from app.schemas.training_video_progress import (
    TrainingVideoProgressResponse,
    TrainingVideoProgressSave,
)

from app.schemas.training_auth import (
    TrainingLoginRequest,
    TrainingVideoCreate,
    TrainingVideoUpdate,
)

router = APIRouter(
    prefix="/api/training",
    tags=["Training"],
)

TRAINING_CODES = {
    "H5647L": "iso9001",
    "IS1001O": "iso14001",
    "O0027SI": "iso27001",
    "RI1001": "riskidentification",
    "RE1002": "riskevaluation",
    "RA1003": "riskassessment",
    "RT1004": "risktreatment",
    "SOA1005": "soa",
}

ADMIN_CODE = "ADM9081"
MAX_VIDEO_DURATION_SECONDS = 86400
ISO14001_DEMO_VIDEO_ID = 5
MAX_PROGRESS_DELTA_SECONDS = 20
MAX_PROGRESS_PLAYBACK_RATE = 2.25
INITIAL_PROGRESS_TOLERANCE_SECONDS = 2


def _get_iso14001_video(video_id: int, db: Session) -> TrainingVideo:
    video = db.query(TrainingVideo).filter(
        TrainingVideo.id == video_id,
        func.lower(func.trim(TrainingVideo.training_name)) == "iso14001",
    ).first()
    if video is None:
        raise HTTPException(status_code=404, detail="ISO 14001 video not found")

    mp4_source = (video.video_url or "").split("?", 1)[0].lower()
    if not mp4_source.endswith(".mp4") and not (video.youtube_url or "").strip():
        raise HTTPException(status_code=400, detail="Training video source is unavailable")
    return video


def _active_iso14001_access(email: str, db: Session) -> bool:
    return db.query(ISO14001Access.id).filter(
        func.lower(ISO14001Access.email) == email,
        ISO14001Access.is_active.is_(True),
    ).first() is not None


def _require_iso14001_identity(email: str, claims: dict) -> str:
    normalized_email = email.strip().casefold()
    if (
        claims.get("training_name") != "iso14001"
        or claims.get("role") != "training_user"
        or str(claims.get("sub", "")).strip().casefold() != normalized_email
    ):
        raise HTTPException(status_code=403, detail="ISO 14001 identity mismatch")
    return normalized_email


def _get_iso14001_video_progress(
    email: str,
    video_id: int,
    training_name: str,
    db: Session,
):
    normalized_email = email.strip().casefold()
    normalized_training = training_name.strip().lower()
    if normalized_training != "iso14001":
        raise HTTPException(status_code=403, detail="Progress is not available for this training")
    if not _active_iso14001_access(normalized_email, db):
        raise HTTPException(status_code=403, detail="ISO 14001 access is not active")
    _get_iso14001_video(video_id, db)
    return db.query(TrainingVideoProgress).filter_by(
        email=normalized_email,
        video_id=video_id,
        training_name=normalized_training,
    ).first()


@router.get(
    "/video-progress/{video_id}",
    response_model=TrainingVideoProgressResponse | None,
)
def get_training_video_progress(
    video_id: int,
    email: str,
    training_name: str,
    claims: dict = Depends(verify_token),
    db: Session = Depends(get_db),
):
    normalized_email = _require_iso14001_identity(email, claims)
    return _get_iso14001_video_progress(normalized_email, video_id, training_name, db)


@router.post(
    "/video-progress",
    response_model=TrainingVideoProgressResponse,
)
def save_training_video_progress(
    payload: TrainingVideoProgressSave,
    claims: dict = Depends(verify_token),
    db: Session = Depends(get_db),
):
    normalized_email = _require_iso14001_identity(str(payload.email), claims)
    normalized_training = payload.training_name.strip().lower()
    if normalized_training != "iso14001":
        raise HTTPException(status_code=403, detail="Progress is not available for this training")
    if payload.video_duration <= 0 or payload.video_duration > MAX_VIDEO_DURATION_SECONDS:
        raise HTTPException(status_code=422, detail="Invalid video duration")
    if payload.last_position > payload.video_duration:
        raise HTTPException(status_code=422, detail="last_position must not exceed video_duration")
    if payload.watched_seconds > payload.video_duration:
        raise HTTPException(status_code=422, detail="watched_seconds must not exceed video_duration")

    if not _active_iso14001_access(normalized_email, db):
        raise HTTPException(status_code=403, detail="ISO 14001 access is not active")

    video = _get_iso14001_video(payload.video_id, db)
    now = datetime.now(timezone.utc)
    try:
        progress = db.query(TrainingVideoProgress).filter_by(
            email=normalized_email,
            video_id=payload.video_id,
            training_name=normalized_training,
        ).with_for_update().first()

        if progress is None:
            if payload.completed:
                raise HTTPException(
                    status_code=422,
                    detail="Video must have saved watch progress before completion",
                )
            if payload.watched_seconds > INITIAL_PROGRESS_TOLERANCE_SECONDS:
                raise HTTPException(status_code=422, detail="Initial watch progress exceeds the save interval")
            progress = TrainingVideoProgress(
                email=normalized_email,
                video_id=video.id,
                training_name=normalized_training,
                watched_seconds=payload.watched_seconds,
                video_duration=payload.video_duration,
                last_position=payload.last_position,
                completed=False,
                started_at=now,
                updated_at=now,
            )
            db.add(progress)
        else:
            if abs(progress.video_duration - payload.video_duration) > 2:
                if payload.video_id != ISO14001_DEMO_VIDEO_ID:
                    raise HTTPException(status_code=422, detail="Video duration does not match the stored duration")
                # Demo video's real YouTube length differs from the stored 20-minute metadata.
                progress.video_duration = payload.video_duration
                progress.watched_seconds = min(progress.watched_seconds, payload.video_duration)
                progress.last_position = min(progress.last_position, payload.video_duration)
            watch_delta = max(0, payload.watched_seconds - progress.watched_seconds)
            previous_update = progress.updated_at
            if previous_update.tzinfo is None:
                previous_update = previous_update.replace(tzinfo=timezone.utc)
            elapsed_since_save = max(0, (now - previous_update).total_seconds())
            max_allowed_delta = min(
                MAX_PROGRESS_DELTA_SECONDS,
                max(2, elapsed_since_save * MAX_PROGRESS_PLAYBACK_RATE + 1),
            )
            if watch_delta > max_allowed_delta:
                raise HTTPException(status_code=422, detail="Watch progress advanced too quickly")
            started_at = progress.started_at
            if started_at.tzinfo is None:
                started_at = started_at.replace(tzinfo=timezone.utc)
            elapsed_since_start = max(0, (now - started_at).total_seconds())
            maximum_cumulative_watch = (
                elapsed_since_start * MAX_PROGRESS_PLAYBACK_RATE
                + INITIAL_PROGRESS_TOLERANCE_SECONDS
            )
            if payload.watched_seconds > maximum_cumulative_watch:
                raise HTTPException(
                    status_code=422,
                    detail="Cumulative watch progress exceeds server elapsed time",
                )
            progress.watched_seconds = max(progress.watched_seconds, payload.watched_seconds)
            progress.video_duration = payload.video_duration
            progress.last_position = payload.last_position
            progress.completed = progress.completed or payload.completed
            progress.updated_at = now

        if payload.completed:
            if (
                payload.last_position < payload.video_duration - 2
                or payload.watched_seconds < payload.video_duration - 2
            ):
                raise HTTPException(status_code=422, detail="Video completion does not match watched progress")
            started_at = progress.started_at
            if started_at.tzinfo is None:
                started_at = started_at.replace(tzinfo=timezone.utc)
            elapsed_since_start = max(0, (now - started_at).total_seconds())
            minimum_elapsed = max(
                0,
                (payload.video_duration - 2) / MAX_PROGRESS_PLAYBACK_RATE - 1,
            )
            if elapsed_since_start < minimum_elapsed:
                raise HTTPException(
                    status_code=422,
                    detail="Video completion was reported before enough playback time elapsed",
                )
            progress.completed = True
            progress.completed_at = progress.completed_at or now

        db.commit()
        db.refresh(progress)
        return progress
    except HTTPException:
        db.rollback()
        raise
    except IntegrityError:
        db.rollback()
        progress = db.query(TrainingVideoProgress).filter_by(
            email=normalized_email,
            video_id=payload.video_id,
            training_name=normalized_training,
        ).with_for_update().first()
        if progress is None:
            raise HTTPException(status_code=409, detail="Unable to save video progress") from None
        progress.watched_seconds = max(progress.watched_seconds, payload.watched_seconds)
        progress.last_position = payload.last_position
        progress.completed = progress.completed or payload.completed
        progress.completed_at = progress.completed_at or (now if payload.completed else None)
        progress.updated_at = now
        db.commit()
        db.refresh(progress)
        return progress
    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(status_code=500, detail="Unable to save video progress") from None


# =====================================================
# LOGIN
# =====================================================

@router.post("/login")
def login(
    data: TrainingLoginRequest,
    db: Session = Depends(get_db),
):

    print("Received Login:", data)

    if (
        data.code not in TRAINING_CODES
        and data.code != ADMIN_CODE
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid Training Code",
        )

    training_email = str(data.userId)
    if data.code == "IS1001O":
        training_email = training_email.strip().casefold()
        if not _active_iso14001_access(training_email, db):
            raise HTTPException(
                status_code=403,
                detail="ISO 14001 access is not active",
            )

    role = "admin" if data.code == ADMIN_CODE else "user"

    training_name = (
        "all"
        if role == "admin"
        else TRAINING_CODES[data.code]
    )

    user = TrainingUser(
        name=data.name,
        email=training_email,
        login_code=data.code,
        role=role,
        training_name=training_name,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    response = {
        "message": "Login Success",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "training_name": user.training_name,
        },
    }
    if data.code == "IS1001O":
        response["access_token"] = create_access_token({
            "sub": training_email,
            "role": "training_user",
            "training_name": "iso14001",
        })
    else:
        response["access_token"] = create_access_token({
            "sub": training_email.strip().casefold(),
            "role": "admin" if role == "admin" else "training_user",
            "training_name": training_name,
        })
    response["token_type"] = "bearer"
    return response


# =====================================================
# GET ALL VIDEOS
# =====================================================

@router.get("/videos")
def get_videos(db: Session = Depends(get_db)):
    return db.query(TrainingVideo).all()


# =====================================================
# GET VIDEOS BY TRAINING
# =====================================================

@router.get("/videos/training/{training_name}")
def get_training_videos(
    training_name: str,
    db: Session = Depends(get_db),
):
    return (
        db.query(TrainingVideo)
        .filter(
            TrainingVideo.training_name == training_name
        )
        .all()
    )


# =====================================================
# CREATE VIDEO
# =====================================================

@router.post("/videos")
def create_video(
    data: TrainingVideoCreate,
    db: Session = Depends(get_db),
):

    video = TrainingVideo(
        title=data.title,
        description=data.description,
        duration=data.duration,
        instructor=data.instructor,
        youtube_url=data.youtube_url,
        training_name=data.training_name,
        created_by=data.created_by,
    )

    db.add(video)
    db.commit()
    db.refresh(video)

    return video


# =====================================================
# UPDATE VIDEO
# =====================================================

@router.put("/videos/{id}")
def update_video(
    id: int,
    data: TrainingVideoUpdate,
    db: Session = Depends(get_db),
):

    video = (
        db.query(TrainingVideo)
        .filter(TrainingVideo.id == id)
        .first()
    )

    if not video:
        raise HTTPException(
            status_code=404,
            detail="Video not found",
        )

    video.title = data.title
    video.description = data.description
    video.duration = data.duration
    video.instructor = data.instructor
    video.youtube_url = data.youtube_url
    video.training_name = data.training_name

    db.commit()
    db.refresh(video)

    return video


# =====================================================
# DELETE VIDEO
# =====================================================

@router.delete("/videos/{id}")
def delete_video(
    id: int,
    db: Session = Depends(get_db),
):

    video = (
        db.query(TrainingVideo)
        .filter(TrainingVideo.id == id)
        .first()
    )

    if not video:
        raise HTTPException(
            status_code=404,
            detail="Video not found",
        )

    db.delete(video)
    db.commit()

    return {
        "message": "Video deleted successfully"
    }