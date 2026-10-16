from sqlalchemy import inspect, text

from app.core.database import engine


ANSWER_KEY = {
    1: "B",
    2: "C",
    3: "A",
    4: "D",
    5: "B",
    6: "A",
    7: "C",
    8: "D",
    9: "B",
    10: "A",
}


def migrate():
    if engine.dialect.name != "postgresql":
        raise RuntimeError("This ISO 14001 quiz migration requires PostgreSQL")

    with engine.begin() as connection:
        inspector = inspect(connection)
        tables = set(inspector.get_table_names())
        required = {
            "iso14001_quizzes",
            "iso14001_quiz_questions",
            "iso14001_quiz_attempts",
        }
        if not required.issubset(tables):
            raise RuntimeError("ISO 14001 quiz tables are missing; create them before migrating")

        question_table = "iso14001_quiz_questions"
        columns = {column["name"] for column in inspector.get_columns(question_table)}
        if "question_id" not in columns:
            connection.execute(text(
                "ALTER TABLE iso14001_quiz_questions ADD COLUMN question_id INTEGER"
            ))
            connection.execute(text(
                "UPDATE iso14001_quiz_questions SET question_id = id WHERE question_id IS NULL"
            ))

        existing_rows = connection.execute(text(
            "SELECT quiz_id, question_id, correct_answer "
            "FROM iso14001_quiz_questions ORDER BY quiz_id, question_id"
        )).mappings().all()
        existing_by_quiz = {}
        for row in existing_rows:
            question_id = row["question_id"]
            if question_id not in ANSWER_KEY:
                raise RuntimeError(f"Existing ISO 14001 question id {question_id} is outside 1..10")
            expected_answer = ANSWER_KEY[question_id]
            if row["correct_answer"] != expected_answer:
                raise RuntimeError(
                    f"Existing answer mapping differs for quiz {row['quiz_id']} "
                    f"question {question_id}; migration stopped without replacing it"
                )
            existing_by_quiz.setdefault(row["quiz_id"], set()).add(question_id)

        unique_constraints = inspector.get_unique_constraints(question_table)
        if not any(
            set(constraint.get("column_names") or []) == {"quiz_id", "question_id"}
            for constraint in unique_constraints
        ):
            connection.execute(text(
                "ALTER TABLE iso14001_quiz_questions "
                "ADD CONSTRAINT uq_iso14001_quiz_question UNIQUE (quiz_id, question_id)"
            ))

        for column in ("question", "option_a", "option_b", "option_c", "option_d"):
            if column in columns:
                connection.execute(text(
                    f"ALTER TABLE iso14001_quiz_questions DROP COLUMN {column}"
                ))
        connection.execute(text(
            "ALTER TABLE iso14001_quiz_questions ALTER COLUMN question_id SET NOT NULL"
        ))

        checks = {
            constraint.get("name")
            for constraint in inspector.get_check_constraints(question_table)
        }
        if "ck_iso14001_question_id_range" not in checks:
            connection.execute(text(
                "ALTER TABLE iso14001_quiz_questions "
                "ADD CONSTRAINT ck_iso14001_question_id_range "
                "CHECK (question_id BETWEEN 1 AND 10)"
            ))

        quiz_ids = connection.execute(text(
            "SELECT id FROM iso14001_quizzes WHERE training_name = 'iso14001'"
        )).scalars().all()
        if not quiz_ids:
            raise RuntimeError("No ISO 14001 quiz configuration exists; answer mappings were not seeded")

        for quiz_id in quiz_ids:
            existing_ids = existing_by_quiz.get(quiz_id, set())
            for question_id, correct_answer in ANSWER_KEY.items():
                if question_id not in existing_ids:
                    connection.execute(text(
                        "INSERT INTO iso14001_quiz_questions "
                        "(quiz_id, question_id, correct_answer) VALUES "
                        "(:quiz_id, :question_id, :correct_answer)"
                    ), {
                        "quiz_id": quiz_id,
                        "question_id": question_id,
                        "correct_answer": correct_answer,
                    })

        attempt_checks = {
            constraint.get("name")
            for constraint in inspector.get_check_constraints("iso14001_quiz_attempts")
        }
        if "ck_iso14001_quiz_attempt_status" in attempt_checks:
            connection.execute(text(
                "ALTER TABLE iso14001_quiz_attempts "
                "DROP CONSTRAINT ck_iso14001_quiz_attempt_status"
            ))
        connection.execute(text(
            "ALTER TABLE iso14001_quiz_attempts "
            "ADD CONSTRAINT ck_iso14001_quiz_attempt_status "
            "CHECK (status IN ('IN_PROGRESS', 'SUBMITTED', 'TIMED_OUT', 'PASS', 'FAIL'))"
        ))


if __name__ == "__main__":
    migrate()
    print("ISO 14001 quiz answer-key migration completed")