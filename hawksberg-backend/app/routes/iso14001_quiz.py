from datetime import datetime, timedelta, timezone

import hashlib
import logging
import os
import secrets

from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import Response
from sqlalchemy import func
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.middleware.auth import verify_token

from app.models.iso14001_access import ISO14001Access
from app.models.training_user import TrainingUser
from app.models.iso14001_quiz import (
    ISO14001Quiz,
    ISO14001QuizAttempt,
    ISO14001QuizQuestion,
    ISO14001RetestRequest,
)

from app.services.email_service import (
    send_iso14001_quiz_pass_email,
    send_iso14001_retest_request_email,
)

from app.models.training_video_progress import TrainingVideoProgress

from app.schemas.iso14001_quiz import (
    ISO14001QuizResult,
    ISO14001QuizStartRequest,
    ISO14001QuizStartResponse,
    ISO14001QuizSubmitRequest,
    ISO14001RetestRequestCreate,
    ISO14001RetestRequestStatus,
)


logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/api/training/iso14001",
    tags=["ISO 14001 Quiz"],
)

QUESTION_IDS = set(range(1, 11))
RETEST_QUESTION_IDS = set(range(11, 21))

PASSING_SCORE = 7

ISO14001_ADMIN_EMAIL = "aadhinij632@gmail.com"


def _active_email(email: str, db: Session) -> str:
    normalized_email = email.strip().casefold()

    allowed = db.query(ISO14001Access.id).filter(
        func.lower(ISO14001Access.email) == normalized_email,
        ISO14001Access.is_active.is_(True),
    ).first()

    if allowed is None:
        raise HTTPException(
            status_code=403,
            detail="ISO 14001 access is not active",
        )

    return normalized_email


def _require_iso14001_identity(email: str, claims: dict) -> str:
    normalized_email = email.strip().casefold()

    if (
        claims.get("training_name") != "iso14001"
        or claims.get("role") != "training_user"
        or str(claims.get("sub", "")).strip().casefold()
        != normalized_email
    ):
        raise HTTPException(
            status_code=403,
            detail="ISO 14001 identity mismatch",
        )

    return normalized_email


def _completed_video(
    video_id: int,
    email: str,
    training_name: str,
    db: Session,
):
    if training_name.strip().lower() != "iso14001":
        raise HTTPException(
            status_code=403,
            detail="Quiz access is not available for this training",
        )

    progress = db.query(TrainingVideoProgress).filter_by(
        email=email,
        video_id=video_id,
        training_name="iso14001",
        completed=True,
    ).first()

    if progress is None:
        raise HTTPException(
            status_code=403,
            detail="Complete the video before opening its quiz",
        )


def _token_hash(token: str) -> str:
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def _retest_action(
    db: Session,
    token: str,
    lock: bool = False,
):
    token_hash = _token_hash(token)

    query = db.query(ISO14001RetestRequest).filter(
        ISO14001RetestRequest.training_name == "iso14001",
        ISO14001RetestRequest.status == "pending",
        (
            (ISO14001RetestRequest.accept_token_hash == token_hash)
            | (ISO14001RetestRequest.reject_token_hash == token_hash)
        ),
    )

    if lock:
        query = query.with_for_update()

    retest_request = query.first()

    if retest_request is None:
        raise HTTPException(
            status_code=404,
            detail="Retest action link is invalid or already used",
        )

    action = (
        "accepted"
        if retest_request.accept_token_hash == token_hash
        else "rejected"
    )

    return retest_request, action


@router.post(
    "/videos/{video_id}/quiz/start",
    response_model=ISO14001QuizStartResponse,
)
def start_iso14001_quiz(
    video_id: int,
    payload: ISO14001QuizStartRequest,
    claims: dict = Depends(verify_token),
    db: Session = Depends(get_db),
):
    email = _require_iso14001_identity(
        str(payload.email),
        claims,
    )

    _active_email(email, db)

    _completed_video(
        video_id,
        email,
        payload.training_name,
        db,
    )

    if payload.training_name != "iso14001":
        raise HTTPException(
            status_code=403,
            detail="Quiz access is not available for this training",
        )

    quiz_set = 1
    retest_request = None

    if payload.retest_request_id is not None:
        retest_request = (
            db.query(ISO14001RetestRequest)
            .filter_by(
                id=payload.retest_request_id,
                candidate_email=email,
                training_name="iso14001",
                status="accepted",
            )
            .with_for_update()
            .first()
        )

        if retest_request is None:
            raise HTTPException(
                status_code=403,
                detail="An approved ISO 14001 retest is required",
            )

        original_attempt = db.query(
            ISO14001QuizAttempt
        ).filter_by(
            id=retest_request.original_attempt_id,
            email=email,
            training_name="iso14001",
            status="FAIL",
        ).first()

        if (
            original_attempt is None
            or original_attempt.score
            != retest_request.original_score
            or original_attempt.video_id != video_id
        ):
            raise HTTPException(
                status_code=403,
                detail="Retest approval is not valid for this attempt",
            )

        # Keep this protection.
        # It prevents the same approved retest from
        # creating a second Set 2 attempt.
        if db.query(ISO14001QuizAttempt.id).filter_by(
            retest_request_id=retest_request.id
        ).first():
            raise HTTPException(
                status_code=409,
                detail="This approved retest has already been started",
            )

        quiz_set = 2

    quiz = db.query(ISO14001Quiz).filter(
        ISO14001Quiz.video_id == video_id,
        ISO14001Quiz.training_name == "iso14001",
        ISO14001Quiz.set_number == quiz_set,
        ISO14001Quiz.is_active.is_(True),
    ).first()

    if quiz is None:
        raise HTTPException(
            status_code=404,
            detail=(
                f"No active quiz set {quiz_set} "
                "is configured for this video"
            ),
        )

    questions = db.query(
        ISO14001QuizQuestion
    ).filter_by(
        quiz_id=quiz.id
    ).order_by(
        ISO14001QuizQuestion.question_id
    ).all()

    question_ids = {
        question.question_id
        for question in questions
    }

    expected_question_ids = (
        QUESTION_IDS
        if quiz_set == 1
        else RETEST_QUESTION_IDS
    )

    if question_ids != expected_question_ids:
        raise HTTPException(
            status_code=503,
            detail="Quiz questions are not configured",
        )

    public_questions = []

    if quiz_set == 2:
        for question in questions:
            if not all(
                (
                    question.question_text,
                    question.option_a,
                    question.option_b,
                    question.option_c,
                    question.option_d,
                )
            ):
                raise HTTPException(
                    status_code=503,
                    detail="Retest question content is not configured",
                )

            public_questions.append(
                {
                    "question_id": question.question_id,
                    "question": question.question_text,
                    "options": {
                        "A": question.option_a,
                        "B": question.option_b,
                        "C": question.option_c,
                        "D": question.option_d,
                    },
                }
            )

    now = datetime.now(timezone.utc)

    attempt = ISO14001QuizAttempt(
        quiz_id=quiz.id,
        retest_request_id=(
            retest_request.id
            if retest_request
            else None
        ),
        video_id=video_id,
        email=email,
        training_name="iso14001",
        started_at=now,
        expires_at=now + timedelta(minutes=10),
        total_questions=len(QUESTION_IDS),
        status="IN_PROGRESS",
    )

    try:
        db.add(attempt)
        db.commit()
        db.refresh(attempt)

    except SQLAlchemyError:
        db.rollback()

        logger.exception(
            "Unable to start ISO 14001 quiz attempt"
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to start quiz",
        ) from None

    return ISO14001QuizStartResponse(
        quiz_id=quiz.id,
        quiz_title=quiz.title,
        quiz_set=quiz_set,
        video_id=video_id,
        time_limit_seconds=600,
        attempt_id=attempt.id,
        started_at=attempt.started_at,
        expires_at=attempt.expires_at,
        server_now=now,
        questions=public_questions,
    )


@router.post(
    "/quiz-attempts/{attempt_id}/submit",
    response_model=ISO14001QuizResult,
)
def submit_iso14001_quiz(
    attempt_id: int,
    payload: ISO14001QuizSubmitRequest,
    claims: dict = Depends(verify_token),
    db: Session = Depends(get_db),
):
    email = _require_iso14001_identity(
        str(payload.email),
        claims,
    )

    _active_email(email, db)

    if payload.training_name.strip().lower() != "iso14001":
        raise HTTPException(
            status_code=403,
            detail="Quiz access is not available for this training",
        )

    attempt = db.query(
        ISO14001QuizAttempt
    ).filter_by(
        id=attempt_id,
        email=email,
        training_name="iso14001",
    ).with_for_update().first()

    if attempt is None:
        raise HTTPException(
            status_code=404,
            detail="Quiz attempt not found",
        )

    if attempt.status != "IN_PROGRESS":
        raise HTTPException(
            status_code=409,
            detail="Quiz attempt has already been finalized",
        )

    quiz = db.query(ISO14001Quiz).filter_by(
        id=attempt.quiz_id,
        training_name="iso14001",
    ).first()

    if quiz is None:
        raise HTTPException(
            status_code=403,
            detail="Quiz attempt is not valid for ISO 14001",
        )

    if quiz.set_number == 2:
        approved_request = db.query(
            ISO14001RetestRequest
        ).filter_by(
            id=attempt.retest_request_id,
            candidate_email=email,
            training_name="iso14001",
            status="accepted",
        ).first()

        if approved_request is None:
            raise HTTPException(
                status_code=403,
                detail="An approved ISO 14001 retest is required",
            )

    _completed_video(
        attempt.video_id,
        email,
        payload.training_name,
        db,
    )

    now = datetime.now(timezone.utc)

    questions = db.query(
        ISO14001QuizQuestion
    ).filter_by(
        quiz_id=attempt.quiz_id
    ).all()

    correct_answers = {
        question.question_id: question.correct_answer
        for question in questions
    }

    expected_question_ids = (
        QUESTION_IDS
        if quiz.set_number == 1
        else RETEST_QUESTION_IDS
    )

    if set(correct_answers) != expected_question_ids:
        raise HTTPException(
            status_code=503,
            detail="Quiz answer key is not configured",
        )

    expires_at = attempt.expires_at

    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(
            tzinfo=timezone.utc
        )

    if now > expires_at:
        attempt.status = "TIMED_OUT"
        attempt.score = 0
        attempt.total_questions = len(QUESTION_IDS)
        attempt.submitted_at = now

        db.commit()

        return ISO14001QuizResult(
            attempt_id=attempt.id,
            video_id=attempt.video_id,
            quiz_set=quiz.set_number,
            status="TIMED_OUT",
            score=0,
            total_questions=len(QUESTION_IDS),
            percentage=0,
            passing_score=PASSING_SCORE,
            submitted_at=now,
        )

    answer_map = {
        answer.question_id: answer.answer
        for answer in payload.answers
    }

    if len(answer_map) != len(payload.answers):
        raise HTTPException(
            status_code=422,
            detail="Duplicate question answers are not allowed",
        )

    if set(answer_map) != expected_question_ids:
        raise HTTPException(
            status_code=422,
            detail="All 10 quiz questions must be answered",
        )

    score = sum(
        1
        for question_id, correct_answer
        in correct_answers.items()
        if answer_map[question_id] == correct_answer
    )

    result_status = (
        "PASS"
        if score >= PASSING_SCORE
        else "FAIL"
    )

    attempt.score = score
    attempt.total_questions = len(QUESTION_IDS)
    attempt.submitted_at = now
    attempt.status = result_status

    try:
        db.commit()

    except SQLAlchemyError:
        db.rollback()

        logger.exception(
            "Unable to store ISO 14001 quiz result"
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to store quiz result",
        ) from None

    if result_status == "PASS":
        candidate = db.query(
            TrainingUser
        ).filter_by(
            email=email,
            training_name="iso14001",
            login_code="IS1001O",
            role="user",
        ).order_by(
            TrainingUser.id.desc()
        ).first()

        if candidate is None:
            logger.error(
                "ISO 14001 pass email skipped: "
                "authenticated candidate record not found for %s",
                email,
            )

        else:
            try:
                email_sent = send_iso14001_quiz_pass_email(
                    candidate_name=candidate.name,
                    candidate_email=email,
                    training_code=candidate.login_code,
                    score=score,
                    total_questions=len(QUESTION_IDS),
                    percentage=round(
                        score * 100 / len(QUESTION_IDS)
                    ),
                )

                if not email_sent:
                    logger.error(
                        "ISO 14001 pass email could not be sent for %s",
                        email,
                    )

            except Exception:
                logger.exception(
                    "ISO 14001 pass email failed for %s",
                    email,
                )

    return ISO14001QuizResult(
        attempt_id=attempt.id,
        video_id=attempt.video_id,
        quiz_set=quiz.set_number,
        status=result_status,
        score=score,
        total_questions=len(QUESTION_IDS),
        percentage=round(
            score * 100 / len(QUESTION_IDS)
        ),
        passing_score=PASSING_SCORE,
        submitted_at=now,
    )


@router.post(
    "/retests",
    response_model=ISO14001RetestRequestStatus,
)
def create_iso14001_retest_request(
    payload: ISO14001RetestRequestCreate,
    request: Request,
    claims: dict = Depends(verify_token),
    db: Session = Depends(get_db),
):
    email = _require_iso14001_identity(
        str(payload.email),
        claims,
    )

    _active_email(email, db)

    if payload.training_name != "iso14001":
        raise HTTPException(
            status_code=403,
            detail="Retest requests are available only for ISO 14001",
        )

    attempt = db.query(
        ISO14001QuizAttempt
    ).filter_by(
        id=payload.original_attempt_id,
        email=email,
        training_name="iso14001",
        status="FAIL",
    ).with_for_update().first()

    if (
        attempt is None
        or attempt.score is None
        or attempt.score >= PASSING_SCORE
    ):
        raise HTTPException(
            status_code=403,
            detail="Only a failed ISO 14001 attempt can request a retest",
        )

    quiz = db.query(ISO14001Quiz).filter_by(
        id=attempt.quiz_id,
        training_name="iso14001",
    ).first()

    if quiz is None or quiz.set_number not in (1, 2):
        raise HTTPException(
            status_code=403,
            detail="Retest request is not valid for ISO 14001",
        )

    existing = db.query(
        ISO14001RetestRequest
    ).filter(
        ISO14001RetestRequest.original_attempt_id
        == attempt.id,
        ISO14001RetestRequest.training_name
        == "iso14001",
        ISO14001RetestRequest.status.in_(
            ("pending", "accepted")
        ),
    ).order_by(
        ISO14001RetestRequest.id.desc()
    ).first()

    if existing is not None:
        return existing

    candidate = db.query(
        TrainingUser
    ).filter_by(
        email=email,
        training_name="iso14001",
        login_code="IS1001O",
        role="user",
    ).order_by(
        TrainingUser.id.desc()
    ).first()

    if candidate is None:
        raise HTTPException(
            status_code=404,
            detail="ISO 14001 candidate record not found",
        )

    accept_token = secrets.token_urlsafe(32)
    reject_token = secrets.token_urlsafe(32)

    now = datetime.now(timezone.utc)

    retest_request = ISO14001RetestRequest(
        candidate_name=candidate.name,
        candidate_email=email,
        training_name="iso14001",
        original_attempt_id=attempt.id,
        original_score=attempt.score,
        status="pending",
        requested_at=now,
        accept_token_hash=_token_hash(
            accept_token
        ),
        reject_token_hash=_token_hash(
            reject_token
        ),
    )

    db.add(retest_request)

    try:
        db.flush()

        # base_url = os.getenv(
        #     "PUBLIC_BACKEND_URL",
        #     "",
        # ).strip()

        # if base_url.startswith(
        #     "PUBLIC_BACKEND_URL="
        # ):
        #     base_url = base_url.split(
        #         "=",
        #         1,
        #     )[1].strip()

        # base_url = base_url.rstrip("/")

        # if not base_url:
        #     db.rollback()

        #     raise HTTPException(
        #         status_code=500,
        #         detail="PUBLIC_BACKEND_URL is not configured",
        #     )
        base_url = os.getenv(
            "PUBLIC_BACKEND_URL",
            "https://hawksberg-backend-production.up.railway.app",
            ).strip()

        if base_url.startswith("PUBLIC_BACKEND_URL="):
            base_url = base_url.split("=", 1)[1].strip()

            base_url = base_url.rstrip("/")

        action_path = (
            "/api/training/iso14001/retests/actions/"
        )

        sent = send_iso14001_retest_request_email(
            candidate_name=candidate.name,
            candidate_email=email,
            score=attempt.score,
            requested_at=now,
            accept_url=(
                f"{base_url}{action_path}{accept_token}"
            ),
            reject_url=(
                f"{base_url}{action_path}{reject_token}"
            ),
            recipient=ISO14001_ADMIN_EMAIL,
        )

        if not sent:
            db.rollback()

            raise HTTPException(
                status_code=502,
                detail="Unable to send the ISO 14001 retest request email",
            )

        db.commit()
        db.refresh(retest_request)

    except HTTPException:
        raise

    except SQLAlchemyError:
        db.rollback()

        logger.exception(
            "Unable to create ISO 14001 retest request"
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to create retest request",
        ) from None

    return retest_request


@router.get(
    "/retests/status",
    response_model=ISO14001RetestRequestStatus | None,
)
def get_iso14001_retest_status(
    email: str,
    claims: dict = Depends(verify_token),
    db: Session = Depends(get_db),
):
    normalized_email = _require_iso14001_identity(
        email,
        claims,
    )

    _active_email(
        normalized_email,
        db,
    )

    retest_request = db.query(
        ISO14001RetestRequest
    ).filter_by(
        candidate_email=normalized_email,
        training_name="iso14001",
    ).order_by(
        ISO14001RetestRequest.requested_at.desc(),
        ISO14001RetestRequest.id.desc(),
    ).first()

    if retest_request is None:
        return None

    started = (
        db.query(ISO14001QuizAttempt.id)
        .filter_by(
            retest_request_id=retest_request.id,
        )
        .first()
        is not None
    )

    response = ISO14001RetestRequestStatus.model_validate(
        retest_request
    )

    response.started = started

    return response


def _apply_iso14001_retest_action(
    token: str,
    db: Session,
):
    """Immediately apply the Accept/Reject action from the admin email link."""

    retest_request, action = _retest_action(
        db,
        token,
        lock=True,
    )

    retest_request.status = action
    retest_request.reviewed_at = datetime.now(
        timezone.utc
    )
    retest_request.reviewed_by = ISO14001_ADMIN_EMAIL

    try:
        db.commit()

    except SQLAlchemyError:
        db.rollback()

        logger.exception(
            "Unable to review ISO 14001 retest request"
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to review retest request",
        ) from None

    return Response(
        status_code=204,
        headers={
            "Cache-Control": "no-store, no-cache, must-revalidate",
            "Pragma": "no-cache",
            "Referrer-Policy": "no-referrer",
        },
    )


@router.get("/retests/actions/{token}")
def handle_iso14001_retest_action(
    token: str,
    db: Session = Depends(get_db),
):
    """Admin email GET link: accept or reject immediately."""

    return _apply_iso14001_retest_action(
        token,
        db,
    )


@router.post("/retests/actions/{token}")
def handle_iso14001_retest_action_post(
    token: str,
    db: Session = Depends(get_db),
):
    """POST alias for mail/security clients that follow the action as POST."""

    return _apply_iso14001_retest_action(
        token,
        db,
    )