from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class ISO14001QuizStartRequest(BaseModel):
    email: EmailStr
    training_name: str = "iso14001"
    retest_request_id: int | None = Field(default=None, gt=0)


class ISO14001QuizQuestionResponse(BaseModel):
    question_id: int
    question: str
    options: dict[str, str]


class ISO14001QuizStartResponse(BaseModel):
    quiz_id: int
    quiz_title: str
    quiz_set: int
    video_id: int
    time_limit_seconds: int
    attempt_id: int
    started_at: datetime
    expires_at: datetime
    server_now: datetime
    questions: list[ISO14001QuizQuestionResponse] = Field(
        default_factory=list
    )


class ISO14001RetestRequestCreate(BaseModel):
    email: EmailStr
    training_name: str = "iso14001"
    original_attempt_id: int = Field(gt=0)


class ISO14001RetestRequestStatus(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    original_attempt_id: int
    original_score: int
    status: Literal["pending", "accepted", "rejected"]
    requested_at: datetime
    reviewed_at: datetime | None = None
    started: bool = False


class ISO14001QuizAnswer(BaseModel):
    question_id: int = Field(gt=0)
    answer: Literal["A", "B", "C", "D"]


class ISO14001QuizSubmitRequest(BaseModel):
    email: EmailStr
    training_name: str = "iso14001"
    answers: list[ISO14001QuizAnswer]


class ISO14001QuizResult(BaseModel):
    attempt_id: int
    video_id: int
    quiz_set: int
    status: Literal["PASS", "FAIL", "TIMED_OUT"]
    score: int
    total_questions: int
    percentage: int
    passing_score: int
    submitted_at: datetime