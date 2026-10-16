from sqlalchemy import (
    Boolean,
    CheckConstraint,
    Column,
    DateTime,
    ForeignKey,
    Index,
    Integer,
    String,
    Text,
    UniqueConstraint,
)
from sqlalchemy.sql import func, text

from app.core.database import Base


class ISO14001Quiz(Base):
    __tablename__ = "iso14001_quizzes"
    __table_args__ = (
        CheckConstraint("time_limit_seconds > 0", name="ck_iso14001_quiz_time_limit_positive"),
        CheckConstraint("set_number IN (1, 2)", name="ck_iso14001_quiz_set_number"),
    )

    id = Column(Integer, primary_key=True, index=True)
    video_id = Column(Integer, ForeignKey("training_videos.id"), nullable=False, index=True)
    training_name = Column(String(50), nullable=False, default="iso14001", index=True)
    set_number = Column(Integer, nullable=False, default=1)
    title = Column(String(250), nullable=False)
    time_limit_seconds = Column(Integer, nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())


class ISO14001QuizQuestion(Base):
    __tablename__ = "iso14001_quiz_questions"
    __table_args__ = (
        UniqueConstraint("quiz_id", "question_id", name="uq_iso14001_quiz_question"),
        CheckConstraint("correct_answer IN ('A', 'B', 'C', 'D')", name="ck_iso14001_question_answer_option"),
        CheckConstraint("question_id BETWEEN 1 AND 20", name="ck_iso14001_question_id_range"),
    )

    id = Column(Integer, primary_key=True, index=True)
    quiz_id = Column(Integer, ForeignKey("iso14001_quizzes.id"), nullable=False, index=True)
    question_id = Column(Integer, nullable=False)
    question_text = Column(Text, nullable=True)
    option_a = Column(Text, nullable=True)
    option_b = Column(Text, nullable=True)
    option_c = Column(Text, nullable=True)
    option_d = Column(Text, nullable=True)
    correct_answer = Column(String(1), nullable=False)


class ISO14001QuizAttempt(Base):
    __tablename__ = "iso14001_quiz_attempts"
    __table_args__ = (
        CheckConstraint(
            "status IN ('IN_PROGRESS', 'SUBMITTED', 'TIMED_OUT', 'PASS', 'FAIL')",
            name="ck_iso14001_quiz_attempt_status",
        ),
        UniqueConstraint("retest_request_id", name="uq_iso14001_attempt_retest_request"),
    )

    id = Column(Integer, primary_key=True, index=True)
    quiz_id = Column(Integer, ForeignKey("iso14001_quizzes.id"), nullable=False, index=True)
    retest_request_id = Column(Integer, nullable=True, index=True)
    video_id = Column(Integer, ForeignKey("training_videos.id"), nullable=False, index=True)
    email = Column(String(255), nullable=False, index=True)
    training_name = Column(String(50), nullable=False, default="iso14001")
    started_at = Column(DateTime(timezone=True), nullable=False)
    expires_at = Column(DateTime(timezone=True), nullable=False)
    submitted_at = Column(DateTime(timezone=True), nullable=True)
    score = Column(Integer, nullable=True)
    total_questions = Column(Integer, nullable=True)
    status = Column(String(20), nullable=False, default="IN_PROGRESS")
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())


class ISO14001RetestRequest(Base):
    __tablename__ = "iso14001_retest_requests"
    __table_args__ = (
        CheckConstraint("training_name = 'iso14001'", name="ck_iso14001_retest_training_name"),
        CheckConstraint("status IN ('pending', 'accepted', 'rejected')", name="ck_iso14001_retest_status"),
        Index(
            "uq_iso14001_retest_active_attempt",
            "original_attempt_id",
            unique=True,
            postgresql_where=text("status IN ('pending', 'accepted')"),
            sqlite_where=text("status IN ('pending', 'accepted')"),
        ),
    )

    id = Column(Integer, primary_key=True, index=True)
    candidate_name = Column(String(150), nullable=False)
    candidate_email = Column(String(255), nullable=False, index=True)
    training_name = Column(String(50), nullable=False, default="iso14001")
    original_attempt_id = Column(
        Integer,
        ForeignKey("iso14001_quiz_attempts.id"),
        nullable=False,
        index=True,
    )
    original_score = Column(Integer, nullable=False)
    status = Column(String(20), nullable=False, default="pending", index=True)
    requested_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    reviewed_at = Column(DateTime(timezone=True), nullable=True)
    reviewed_by = Column(String(255), nullable=True)
    accept_token_hash = Column(String(64), nullable=False, unique=True)
    reject_token_hash = Column(String(64), nullable=False, unique=True)