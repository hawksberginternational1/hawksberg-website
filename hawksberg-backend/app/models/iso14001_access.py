from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Integer, String

from app.core.database import Base


class ISO14001Access(Base):
    __tablename__ = "iso14001_access"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(
        String(255),
        unique=True,
        nullable=False,
        index=True,
    )

    is_active = Column(
        Boolean,
        nullable=False,
        default=True,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )