from sqlalchemy import inspect, text

from app.core.database import engine
from app.models.iso14001_quiz import ISO14001RetestRequest


SET2_QUESTIONS = [
    (11, "How should an organization use the needs and expectations of interested parties?", "Treat every request as a legal obligation", "Determine which needs and expectations are relevant and which become compliance obligations", "Consider them only during management review", "Delegate the decision to the certification body", "B"),
    (12, "What should be considered when determining the scope of an environmental management system?", "Only the organization's registered office", "Only activities with current environmental permits", "The organization's boundaries, activities, products, services, and ability to control or influence", "Only processes that have already caused an incident", "C"),
    (13, "Which leadership responsibility supports an effective environmental management system?", "Integrating EMS requirements into the organization's business processes", "Assigning all environmental responsibility to the external auditor", "Keeping environmental objectives separate from operational planning", "Approving environmental actions only after a nonconformity", "A"),
    (14, "Why does ISO 14001 require the organization to determine risks and opportunities related to its environmental aspects and obligations?", "To eliminate the need to monitor environmental performance", "To replace the organization's compliance evaluation", "To guarantee that no emergency can occur", "To provide assurance that the EMS can achieve its intended outcomes and prevent undesired effects", "D"),
    (15, "What evidence is required regarding competence for work that can affect environmental performance or compliance obligations?", "A signed policy from every employee", "Appropriate documented information as evidence of competence", "An external certificate for every job role", "A record only when an audit finds a problem", "B"),
    (16, "What should an EMS communication process determine?", "What will be communicated, when, with whom, and how", "Only the name of the person who writes the environmental policy", "Only how environmental information is sent to regulators", "Only how often the certification body visits", "A"),
    (17, "Which is an appropriate control when creating and updating EMS documented information?", "Allow unrestricted editing of every approved record", "Keep one uncontrolled copy and discard older versions", "Ensure suitable identification, format, review, and approval", "Store all information only with the external auditor", "C"),
    (18, "What should an organization establish for monitoring and measurement of environmental performance?", "A single annual inspection regardless of its objectives", "Measures chosen only after results are known", "A requirement to monitor every supplier activity directly", "Methods and criteria that provide valid, comparable results", "D"),
    (19, "Which item is an input to management review of the EMS?", "A guarantee of future certification", "Changes in external and internal issues relevant to the EMS", "An auditor's authority to set company objectives", "A requirement to repeat every training course", "B"),
    (20, "What is the intended focus of continual improvement of the environmental management system?", "Enhancing environmental performance and the system's suitability, adequacy, and effectiveness", "Increasing documentation regardless of usefulness", "Reducing the scope of the EMS after every audit", "Replacing objectives with one-time corrective actions", "A"),
]


def migrate():
    if engine.dialect.name != "postgresql":
        raise RuntimeError("This ISO 14001 retest migration requires PostgreSQL")

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

        quiz_columns = {column["name"] for column in inspector.get_columns("iso14001_quizzes")}
        if "set_number" not in quiz_columns:
            connection.execute(text(
                "ALTER TABLE iso14001_quizzes "
                "ADD COLUMN set_number INTEGER NOT NULL DEFAULT 1"
            ))
        quiz_checks = {
            constraint.get("name")
            for constraint in inspector.get_check_constraints("iso14001_quizzes")
        }
        if "ck_iso14001_quiz_set_number" not in quiz_checks:
            connection.execute(text(
                "ALTER TABLE iso14001_quizzes ADD CONSTRAINT ck_iso14001_quiz_set_number "
                "CHECK (set_number IN (1, 2))"
            ))

        question_columns = {
            column["name"] for column in inspector.get_columns("iso14001_quiz_questions")
        }
        for column in ("question_text", "option_a", "option_b", "option_c", "option_d"):
            if column not in question_columns:
                connection.execute(text(
                    f"ALTER TABLE iso14001_quiz_questions ADD COLUMN {column} TEXT"
                ))
        question_checks = {
            constraint.get("name")
            for constraint in inspector.get_check_constraints("iso14001_quiz_questions")
        }
        if "ck_iso14001_question_id_range" in question_checks:
            connection.execute(text(
                "ALTER TABLE iso14001_quiz_questions "
                "DROP CONSTRAINT ck_iso14001_question_id_range"
            ))
        connection.execute(text(
            "ALTER TABLE iso14001_quiz_questions "
            "ADD CONSTRAINT ck_iso14001_question_id_range CHECK (question_id BETWEEN 1 AND 20)"
        ))

        attempt_columns = {
            column["name"] for column in inspector.get_columns("iso14001_quiz_attempts")
        }
        if "retest_request_id" not in attempt_columns:
            connection.execute(text(
                "ALTER TABLE iso14001_quiz_attempts ADD COLUMN retest_request_id INTEGER"
            ))
        attempt_uniques = {
            constraint.get("name")
            for constraint in inspector.get_unique_constraints("iso14001_quiz_attempts")
        }
        if "uq_iso14001_attempt_retest_request" not in attempt_uniques:
            connection.execute(text(
                "ALTER TABLE iso14001_quiz_attempts "
                "ADD CONSTRAINT uq_iso14001_attempt_retest_request UNIQUE (retest_request_id)"
            ))

    ISO14001RetestRequest.__table__.create(bind=engine, checkfirst=True)
    with engine.begin() as connection:
        connection.execute(text(
            "CREATE UNIQUE INDEX IF NOT EXISTS uq_iso14001_retest_active_attempt "
            "ON iso14001_retest_requests (original_attempt_id) "
            "WHERE status IN ('pending', 'accepted')"
        ))

    with engine.begin() as connection:
        quiz = connection.execute(text(
            "SELECT id, video_id, time_limit_seconds FROM iso14001_quizzes "
            "WHERE training_name = 'iso14001' AND set_number = 1 "
            "ORDER BY is_active DESC, id ASC LIMIT 1"
        )).mappings().first()
        if quiz is None:
            raise RuntimeError("No ISO 14001 Set 1 quiz exists; Set 2 was not seeded")

        set2_quiz = connection.execute(text(
            "SELECT id FROM iso14001_quizzes "
            "WHERE video_id = :video_id AND training_name = 'iso14001' AND set_number = 2 "
            "ORDER BY id LIMIT 1"
        ), {"video_id": quiz["video_id"]}).scalar_one_or_none()
        if set2_quiz is None:
            set2_quiz = connection.execute(text(
                "INSERT INTO iso14001_quizzes "
                "(video_id, training_name, set_number, title, time_limit_seconds, is_active) "
                "VALUES (:video_id, 'iso14001', 2, 'ISO 14001 Retest - Set 2', "
                ":time_limit_seconds, TRUE) RETURNING id"
            ), {
                "video_id": quiz["video_id"],
                "time_limit_seconds": quiz["time_limit_seconds"],
            }).scalar_one()

        for question_id, question, option_a, option_b, option_c, option_d, correct_answer in SET2_QUESTIONS:
            connection.execute(text(
                "INSERT INTO iso14001_quiz_questions "
                "(quiz_id, question_id, question_text, option_a, option_b, option_c, option_d, correct_answer) "
                "VALUES (:quiz_id, :question_id, :question_text, :option_a, :option_b, :option_c, "
                ":option_d, :correct_answer) ON CONFLICT (quiz_id, question_id) DO NOTHING"
            ), {
                "quiz_id": set2_quiz,
                "question_id": question_id,
                "question_text": question,
                "option_a": option_a,
                "option_b": option_b,
                "option_c": option_c,
                "option_d": option_d,
                "correct_answer": correct_answer,
            })

        seeded = connection.execute(text(
            "SELECT question_id, question_text, option_a, option_b, option_c, option_d, correct_answer "
            "FROM iso14001_quiz_questions WHERE quiz_id = :quiz_id ORDER BY question_id"
        ), {"quiz_id": set2_quiz}).mappings().all()
        expected = {row[0]: row[1:] for row in SET2_QUESTIONS}
        actual = {
            row["question_id"]: (
                row["question_text"], row["option_a"], row["option_b"], row["option_c"],
                row["option_d"], row["correct_answer"],
            )
            for row in seeded
        }
        if actual != expected:
            raise RuntimeError("ISO 14001 Set 2 question data differs from the expected 10-question seed")

    print("ISO 14001 retest migration and Set 2 seed completed (10 questions, IDs 11-20).")


if __name__ == "__main__":
    migrate()