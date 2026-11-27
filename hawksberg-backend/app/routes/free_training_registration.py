from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import logging

from app.core.database import get_db
from app.models.free_training_registration import FreeTrainingRegistration
from app.schemas.free_training_registration import (
    FreeTrainingRegistrationCreate,
    FreeTrainingRegistrationResponse,
)
from app.services.email_service import send_iso_9001_2026_registration_email

router = APIRouter(prefix="/api/free-training", tags=["Free Training"])


@router.post("/register", response_model=FreeTrainingRegistrationResponse)
def register_free_training(
    payload: FreeTrainingRegistrationCreate,
    db: Session = Depends(get_db),
):
    registration = FreeTrainingRegistration(
        full_name=payload.full_name.strip(),
        email=str(payload.email).strip(),
        mobile_number=payload.mobile_number.strip(),
        company_name=payload.company_name.strip(),
    )
    db.add(registration)
    try:
        db.commit()
        db.refresh(registration)
    except Exception:
        db.rollback()
        logging.exception("Unable to save ISO 9001:2026 free training registration")
        raise

    email_sent = send_iso_9001_2026_registration_email(
        full_name=registration.full_name,
        email=registration.email,
        mobile_number=registration.mobile_number,
        company_name=registration.company_name,
        created_at=registration.created_at,
    )
    if not email_sent:
        logging.error(
            "ISO 9001:2026 registration %s was saved but admin email notification failed",
            registration.id,
        )
        return {
            **{
                "id": registration.id,
                "full_name": registration.full_name,
                "email": registration.email,
                "mobile_number": registration.mobile_number,
                "company_name": registration.company_name,
                "status": registration.status,
                "created_at": registration.created_at,
            },
            "email_sent": False,
            "message": "Registration saved, but the notification email could not be sent.",
        }

    return registration
