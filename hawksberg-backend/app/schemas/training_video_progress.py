from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field, model_validator


class TrainingVideoProgressSave(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    email: EmailStr
    video_id: int = Field(gt=0)
    training_name: str = Field(min_length=1, max_length=50)
    watched_seconds: float = Field(ge=0, le=86400)
    video_duration: float = Field(gt=0, le=86400)
    last_position: float = Field(ge=0)
    completed: bool = False

    @model_validator(mode="after")
    def validate_last_position(self):
        if self.last_position > self.video_duration:
            raise ValueError("last_position must not exceed video_duration")
        return self


class TrainingVideoProgressResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    email: EmailStr
    video_id: int
    training_name: str
    watched_seconds: float
    video_duration: float
    last_position: float
    completed: bool
    started_at: datetime
    completed_at: datetime | None
    updated_at: datetime