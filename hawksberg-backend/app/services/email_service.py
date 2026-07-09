import os
import smtplib
import ssl
import logging
from email.mime.text import MIMEText
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

try:
    SMTP_PORT = int(os.getenv("SMTP_PORT", "465"))
except ValueError:
    logging.error("Invalid SMTP_PORT environment variable; must be an integer.")
    SMTP_PORT = 465

SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_EMAIL = os.getenv("SMTP_EMAIL")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")


def send_email(to_email, subject, body):
    if not SMTP_HOST or not SMTP_PORT or not SMTP_EMAIL or not SMTP_PASSWORD:
        logging.error("SMTP environment variables missing: SMTP_HOST, SMTP_PORT, SMTP_EMAIL, or SMTP_PASSWORD.")
        return False

    msg = MIMEText(body, "plain", "utf-8")
    msg["Subject"] = subject
    msg["From"] = SMTP_EMAIL
    msg["To"] = to_email

    try:
        masked_email = (
            SMTP_EMAIL[:3] + "*" if len(SMTP_EMAIL) > 3 else "*"
        )

        logging.info("========== SMTP CONFIG ==========")
        logging.info("HOST : %s", SMTP_HOST)
        logging.info("PORT : %s", SMTP_PORT)
        logging.info("EMAIL: %s", masked_email)
        logging.info("=================================")

        if SMTP_PORT == 465:
            context = ssl.create_default_context()
            with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=context, timeout=30) as server:
                server.login(SMTP_EMAIL, SMTP_PASSWORD)
                server.sendmail(SMTP_EMAIL, [to_email], msg.as_string())
        else:
            context = ssl.create_default_context()
            with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=30) as server:
                server.ehlo()
                server.starttls(context=context)
                server.ehlo()
                server.login(SMTP_EMAIL, SMTP_PASSWORD)
                server.sendmail(SMTP_EMAIL, [to_email], msg.as_string())

        logging.info("EMAIL SENT SUCCESSFULLY")
        return True

    except Exception:
        logging.exception("EMAIL FAILED")
        return False


def send_enquiry_email(name, email, phone, subject, message):
    body = f"""New Enquiry Received

Name: {name}
Email: {email}
Phone: {phone}
Subject: {subject}

Message:
{message}
"""

    return send_email(
        "Jagayathri722@gmail.com",
        "New Hawksberg Enquiry",
        body
    )


def send_otp_email(email, otp):
    body = f"""Your Hawksberg Verification Code

OTP: {otp}

This OTP is valid for 10 minutes.
"""

    return send_email(
        email,
        "Hawksberg OTP Verification",
        body
    )


def send_appointment_email(
    schedule_type,
    company_name,
    mobile_number,
    customer_email,
    consultant_login_id,
    sector,
    standard,
    consultant_name,
    experience
):
    body = f"""New Consultant Appointment

Schedule Type: {schedule_type}

Consultant Login ID: {consultant_login_id}

Company Name: {company_name}

Mobile Number: {mobile_number}

Customer Email: {customer_email}

Sector: {sector}

Standard: {standard}

Consultant: {consultant_name}

Experience: {experience}
"""

    return send_email(
        "Jagayathri722@gmail.com",
        "New Consultant Appointment",
        body
    )