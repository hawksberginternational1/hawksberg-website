from sqlalchemy import inspect, text

from app.core.database import engine
from app.models.free_training_registration import FreeTrainingRegistration


def migrate():
    if engine.dialect.name != "postgresql":
        raise RuntimeError(
            "ISO 9001:2026 registration migration requires PostgreSQL"
        )

    with engine.begin() as connection:
        inspector = inspect(connection)
        table_names = set(inspector.get_table_names())

        if "iso_9001_2026_registrations" not in table_names:
            FreeTrainingRegistration.__table__.create(
                bind=connection,
                checkfirst=True,
            )

        inspector = inspect(connection)
        columns = {
            column["name"]
            for column in inspector.get_columns("iso_9001_2026_registrations")
        }
        required = {
            "id",
            "full_name",
            "email",
            "mobile_number",
            "company_name",
            "status",
            "created_at",
        }
        missing = required - columns
        if missing:
            raise RuntimeError(
                "ISO 9001:2026 registration table is missing columns: "
                + ", ".join(sorted(missing))
            )

    print("iso_9001_2026_registrations migration completed.")


if __name__ == "__main__":
    migrate()
