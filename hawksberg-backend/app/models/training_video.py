from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import DateTime
from sqlalchemy.sql import func

from app.core.database import Base


class TrainingVideo(Base):
    __tablename__ = "training_videos"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(250), nullable=False)

    description = Column(Text, nullable=False)

    duration = Column(String(50), nullable=False)

    instructor = Column(
        String(150),
        nullable=False,
        default="Hawksberg International"
    )

    youtube_url = Column(Text, nullable=False)

    video_url = Column(Text, nullable=True)

    training_name = Column(
    String(50),
    nullable=False
)

    created_by = Column(
        String(150),
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )