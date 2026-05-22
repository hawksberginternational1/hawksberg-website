from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import enquiry, service, training, info_page, auth
from database import Base, engine
from app.models.enquiry import Enquiry

app = FastAPI(title="Hawksberg API")

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(enquiry.router)
app.include_router(service.router)
app.include_router(training.router)
app.include_router(info_page.router)
app.include_router(auth.router)

@app.get("/")
def root():
    return {"message": "Hawksberg FastAPI Backend Running"}