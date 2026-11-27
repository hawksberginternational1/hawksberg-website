from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String

from app.core.database import Base


class FreeTrainingRegistration(Base):
    __tablename__ = "iso_9001_2026_registrations"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    mobile_number = Column(String, nullable=False)
    company_name = Column(String, nullable=False)
    status = Column(String, nullable=False, default="new")
    created_at = Column(DateTime, default=datetime.utcnow)
