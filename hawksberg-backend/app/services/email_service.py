import os
import logging
import requests
from dotenv import load_dotenv

load_dotenv()

BREVO_API_KEY = os.getenv("BREVO_API_KEY")

BREVO_URL = "https://api.brevo.com/v3/smtp/email"

# SENDER_EMAIL = "Jagayathri722@gmail.com"
# SENDER_NAME = "Hawksberg International"

# ADMIN_EMAIL = "Jagayathri722@gmail.com"

SENDER_EMAIL = os.getenv("FROM_EMAIL")
SENDER_NAME = "Hawksberg International"

ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")


def send_brevo_email(to_email, subject, body):

    headers = {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
    }

    payload = {
        "sender": {
            "name": SENDER_NAME,
            "email": SENDER_EMAIL
        },
        "to": [
            {
                "email": to_email
            }
        ],
        "subject": subject,
        "htmlContent": f"<pre>{body}</pre>"
    }

    try:

        response = requests.post(
            BREVO_URL,
            headers=headers,
            json=payload,
            timeout=30,
        )

        print("=" * 60)
        print("BREVO STATUS =", response.status_code)
        print("BREVO RESPONSE =", response.text)
        print("=" * 60)

        response.raise_for_status()

        return True

    except Exception as e:
        logging.exception(e)
        return False


def send_enquiry_email(name, email, phone, subject, message):

    body = f"""
New Enquiry Received

Name : {name}

Email : {email}

Phone : {phone}

Subject : {subject}

Message :

{message}
"""

    return send_brevo_email(
        ADMIN_EMAIL,
        "New Hawksberg Enquiry",
        body,
    )


def send_otp_email(email, otp):

    body = f"""
Your Hawksberg Verification Code

OTP : {otp}

This OTP is valid for 10 minutes.
"""

    return send_brevo_email(
        email,
        "Hawksberg OTP Verification",
        body,
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
    experience,
):

    body = f"""
New Consultant Appointment

Schedule Type : {schedule_type}

Consultant Login ID : {consultant_login_id}

Company Name : {company_name}

Mobile Number : {mobile_number}

Customer Email : {customer_email}

Sector : {sector}

Standard : {standard}

Consultant : {consultant_name}

Experience : {experience}
"""

    return send_brevo_email(
        ADMIN_EMAIL,
        "New Consultant Appointment",
        body,
    )