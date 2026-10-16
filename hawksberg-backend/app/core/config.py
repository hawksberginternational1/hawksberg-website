from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    BREVO_API_KEY: str | None = None
    BREVO_WHATSAPP_SENDER_NUMBER: str | None = None
    BREVO_WHATSAPP_RESPONSIBLE_NUMBER: str | None = None
    BREVO_WHATSAPP_TEMPLATE_ID: int | None = None

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()