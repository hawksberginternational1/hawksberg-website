from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import enquiry, service, training, info_page, auth

app = FastAPI(title="Hawksberg API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://hawksberg-website-production.up.railway.app",
        "http://localhost:5173",
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


@app.get("/")
def root():
    return {"message": "Hawksberg FastAPI Backend Running"}