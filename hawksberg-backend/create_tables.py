from app.core.database import Base, engine

from app.models.admin import Admin
from app.models.enquiry import Enquiry
from app.models.service import Service
from app.models.training import Training
from app.models.training_video import TrainingVideo
from app.models.info_page import InfoPage
from app.models.certificate_verification import Certificate, CertificateVerificationLog
from app.models.iso14001_access import ISO14001Access
from app.models.training_video_progress import TrainingVideoProgress
from app.models.iso14001_quiz import (
	ISO14001Quiz,
	ISO14001QuizQuestion,
	ISO14001QuizAttempt,
	ISO14001RetestRequest,
)

print("Creating database tables...")

Base.metadata.create_all(bind=engine)

print("Tables created successfully.")