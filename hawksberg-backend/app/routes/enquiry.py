# from fastapi import APIRouter, Depends
# from sqlalchemy.orm import Session
# import logging

# from app.core.database import get_db
# from app.models.enquiry import Enquiry
# from app.schemas.enquiry import EnquiryCreate, EnquiryResponse
# from app.services.email_service import send_enquiry_email

# router = APIRouter(prefix="/api/enquiries", tags=["Enquiries"])


# @router.post("/", response_model=EnquiryResponse)
# def create_enquiry(payload: EnquiryCreate, db: Session = Depends(get_db)):
#     enquiry = Enquiry(**payload.model_dump())

#     db.add(enquiry)
#     db.commit()
#     db.refresh(enquiry)

#     try:
#         success = send_enquiry_email(
#             payload.name,
#             payload.email,
#             payload.phone,
#             payload.subject,
#             payload.message,
#         )
#         if not success:
#             logging.warning("Enquiry saved but email not sent")
#     except Exception:
#         logging.exception("Unexpected error while sending enquiry email")

#     return enquiry


# @router.get("/")
# def get_enquiries(db: Session = Depends(get_db)):
#     return db.query(Enquiry).all()

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import logging

from app.core.database import get_db
from app.models.enquiry import Enquiry
from app.schemas.enquiry import EnquiryCreate, EnquiryResponse
from app.services.email_service import send_enquiry_email

router = APIRouter(prefix="/api/enquiries", tags=["Enquiries"])


@router.post("/", response_model=EnquiryResponse)
def create_enquiry(payload: EnquiryCreate, db: Session = Depends(get_db)):
    logging.info("Creating enquiry...")
    enquiry = Enquiry(**payload.model_dump())

    db.add(enquiry)
    db.commit()
    db.refresh(enquiry)

    logging.info("Enquiry saved to database")

    try:
        success = send_enquiry_email(
            payload.name,
            payload.email,
            payload.phone,
            payload.subject,
            payload.message,
        )
        if not success:
            logging.warning("Enquiry saved but email not sent")
    except Exception:
        logging.exception("Unexpected error while sending enquiry email")

    logging.info("Enquiry email sent")

    return enquiry


@router.get("/")
def get_enquiries(db: Session = Depends(get_db)):
    logging.info("Retrieving enquiries...")
    enquiries = db.query(Enquiry).all()
    logging.info("Enquiries retrieved")

    return enquiries