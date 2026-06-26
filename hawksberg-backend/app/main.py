from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from app.core.database import Base, engine
# from app.routes import enquiry, service, training, info_page, auth
from app.routes import (
    enquiry,
    service,
    training,
    info_page,
    auth,
    consultant
)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Hawksberg API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://frontend-production-2ad6f.up.railway.app",
        "http://localhost:5173",
        "http://localhost:8080"
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
app.include_router(consultant.router)

@app.get("/")
def root():
    return {"message": "Hawksberg FastAPI Backend Running"}