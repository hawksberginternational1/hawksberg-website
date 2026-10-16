from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    UniqueConstraint,
)
from sqlalchemy.sql import func

from app.core.database import Base


class TrainingVideoProgress(Base):
    __tablename__ = "training_video_progress"
    __table_args__ = (
        UniqueConstraint(
            "email",
            "video_id",
            "training_name",
            name="uq_training_video_progress_email_video_training",
        ),
    )

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), nullable=False, index=True)
    video_id = Column(Integer, ForeignKey("training_videos.id"), nullable=False)
    training_name = Column(String(50), nullable=False, index=True)
    watched_seconds = Column(Float, nullable=False, default=0)
    video_duration = Column(Float, nullable=False)
    last_position = Column(Float, nullable=False, default=0)
    completed = Column(Boolean, nullable=False, default=False)
    started_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    completed_at = Column(DateTime(timezone=True), nullable=True)
    updated_at = Column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        onupdate=func.now(),
    )