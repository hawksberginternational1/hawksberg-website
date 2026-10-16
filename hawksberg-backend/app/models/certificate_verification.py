from datetime import datetime, timezone

from sqlalchemy import Column, Date, DateTime, Integer, String

from app.core.database import Base


class Certificate(Base):
    __tablename__ = "certificates"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    company = Column(String, nullable=True)
    department = Column(String, nullable=True)
    score = Column(Integer, nullable=True)
    max_score = Column(Integer, nullable=True)
    certificate_number = Column(
        String,
        nullable=False,
        unique=True,
        index=True,
    )
    date = Column(Date, nullable=False)
    training = Column(String, nullable=False)


class CertificateVerificationLog(Base):
    __tablename__ = "certificate_verification_logs"

    id = Column(Integer, primary_key=True, index=True)
    certificate_number = Column(String, nullable=False)
    certificate_holder_name = Column(String, nullable=False)
    verifier_name = Column(String, nullable=False)
    verifier_organization = Column(String, nullable=True)
    verifier_email = Column(String, nullable=True)
    verifier_phone = Column(String, nullable=True)
    verification_status = Column(String, nullable=False)
    verified_at = Column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )