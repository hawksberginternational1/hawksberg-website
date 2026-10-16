import logging

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.certificate_verification import (
    Certificate,
    CertificateVerificationLog,
)
from app.schemas.certificate_verification import (
    CertificateDetails,
    CertificateVerificationRequest,
    CertificateVerificationResponse,
)

router = APIRouter(
    prefix="/api/certificate",
    tags=["Certificate Verification"],
)

logger = logging.getLogger(__name__)


@router.post("/verify", response_model=CertificateVerificationResponse)
def verify_certificate(
    payload: CertificateVerificationRequest,
    db: Session = Depends(get_db),
) -> CertificateVerificationResponse:
    try:
        certificate = (
            db.query(Certificate)
            .filter(
                func.lower(func.trim(Certificate.certificate_number))
                == payload.certificate_number.casefold(),
                Certificate.date == payload.certificate_date,
            )
            .first()
        )

        details = None

        if certificate is not None:
            details = CertificateDetails(
                name=certificate.name,
                certificate_number=certificate.certificate_number,
                training=certificate.training,
            )

        # Store verification attempt in audit/log table
        db.add(
            CertificateVerificationLog(
                certificate_number=payload.certificate_number,
                certificate_holder_name=(
                    certificate.name
                    if certificate is not None
                    else "N/A"
                ),
                verifier_name="N/A",
                verification_status=(
                    "VERIFIED" if certificate is not None else "NOT_VERIFIED"
                ),
            )
        )

        db.commit()

    except SQLAlchemyError:
        db.rollback()

        logger.exception(
            "Certificate verification database operation failed"
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to complete certificate verification at this time",
        ) from None

    if details is None:
        return CertificateVerificationResponse(
            verified=False,
            message="Certificate not found / Invalid certificate details",
        )

    return CertificateVerificationResponse(
        verified=True,
        message="Certificate verified successfully",
        certificate=details,
    )