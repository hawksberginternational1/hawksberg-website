from datetime import date

from pydantic import BaseModel, ConfigDict, Field


class CertificateVerificationRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    certificate_number: str = Field(min_length=1)
    certificate_date: date


class CertificateDetails(BaseModel):
    name: str
    certificate_number: str
    training: str


class CertificateVerificationResponse(BaseModel):
    verified: bool
    message: str
    certificate: CertificateDetails | None = None