import os
import smtplib
import logging
from email.mime.text import MIMEText
from dotenv import load_dotenv

load_dotenv()


def send_enquiry_email(name, email, phone, subject, message):
    SMTP_HOST = os.getenv("SMTP_HOST")
    SMTP_PORT = os.getenv("SMTP_PORT")
    SMTP_EMAIL = os.getenv("SMTP_EMAIL")
    SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")

    logging.info(f"SMTP_HOST: {SMTP_HOST}")
    logging.info(f"SMTP_PORT: {SMTP_PORT}")
    logging.info(f"SMTP_EMAIL: {SMTP_EMAIL}")

    if not all([SMTP_HOST, SMTP_PORT, SMTP_EMAIL, SMTP_PASSWORD]):
        logging.error("SMTP env vars missing")
        return False

    body = f"""
New Enquiry Received

Name: {name}
Email: {email}
Phone: {phone}
Subject: {subject}
Message: {message}
"""

    msg = MIMEText(body)
    msg["Subject"] = "New Hawksberg Enquiry"
    msg["From"] = SMTP_EMAIL
    msg["To"] = SMTP_EMAIL

    try:
        server = smtplib.SMTP(SMTP_HOST, int(SMTP_PORT))
        server.ehlo()
        server.starttls()
        server.ehlo()

        server.login(SMTP_EMAIL, SMTP_PASSWORD)

        server.sendmail(
            SMTP_EMAIL,
            SMTP_EMAIL,
            msg.as_string()
        )

        server.quit()

        logging.info("EMAIL SENT SUCCESSFULLY")
        return True

    except Exception as e:
        logging.exception(f"EMAIL FAILED: {str(e)}")
        return False