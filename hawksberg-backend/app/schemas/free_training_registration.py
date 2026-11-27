from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class FreeTrainingRegistrationCreate(BaseModel):
    full_name: str = Field(min_length=1, pattern=r".*\S.*")
    email: EmailStr
    mobile_number: str = Field(
        min_length=8,
        pattern=r"^\+?[0-9][0-9\s().-]{7,18}$",
    )
    company_name: str = Field(min_length=1, pattern=r".*\S.*")


class FreeTrainingRegistrationResponse(BaseModel):
    id: int
    full_name: str
    email: str
    mobile_number: str
    company_name: str
    status: str
    created_at: datetime
    email_sent: bool = True
    message: str = "Your free training seat has been reserved successfully!"

    class Config:
        from_attributes = True
