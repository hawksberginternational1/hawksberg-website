from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db

from app.models.training_user import TrainingUser
from app.models.training_video import TrainingVideo

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

    role = "admin" if data.code == ADMIN_CODE else "user"

    training_name = (
        "all"
        if role == "admin"
        else TRAINING_CODES[data.code]
    )

    user = TrainingUser(
        name=data.name,
        email=data.userId,
        login_code=data.code,
        role=role,
        training_name=training_name,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {
        "message": "Login Success",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "training_name": user.training_name,
        },
    }


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