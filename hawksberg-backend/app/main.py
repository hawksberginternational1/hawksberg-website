from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from app.core.database import Base, engine
# from app.routes import enquiry, service, training, info_page, auth
# from app.routes import (
#     enquiry,
#     service,
#     training,
#     info_page,
#     auth,
#     consultant
# )
from app.routes import training_auth

from app.routes import (
    enquiry,
    service,
    training,
    info_page,
    auth,
    training_auth,
    certificate_verification,
)

Base.metadata.create_all(bind=engine)

from app.models.training import Training
from app.models.training_user import TrainingUser
from app.models.training_video import TrainingVideo
from app.models.certificate_verification import Certificate, CertificateVerificationLog

app = FastAPI(title="Hawksberg API")

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "https://frontend-production-2ad6f.up.railway.app",
#         "http://localhost:5173",
#         "http://localhost:8080"
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://www.hawksberginternational.com",
        "https://hawksberginternational.com",
        "https://frontend-production-2ad6f.up.railway.app",
        "http://localhost:5173",
        "http://localhost:8080",
        "http://localhost:3000",
"http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(enquiry.router)
app.include_router(service.router)
app.include_router(training.router)
app.include_router(info_page.router)
app.include_router(auth.router)
app.include_router(training_auth.router)
app.include_router(certificate_verification.router)
# app.include_router(consultant.router)

@app.get("/")
def root():
    return {"message": "Hawksberg FastAPI Backend Running"}