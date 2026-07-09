import os
import logging
import requests
from dotenv import load_dotenv

load_dotenv()

BREVO_API_KEY = os.getenv("BREVO_API_KEY")

BREVO_URL = "https://api.brevo.com/v3/smtp/email"

SENDER_EMAIL = os.getenv("FROM_EMAIL")
SENDER_NAME = "Hawksberg International"

ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")


def send_brevo_email(
    to_email,
    subject,
    body,
    reply_to_email=None,
    reply_to_name=None,
):
    headers = {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
    }

    payload = {
        "sender": {
            "name": SENDER_NAME,
            "email": SENDER_EMAIL,
        },
        "to": [
            {
                "email": to_email,
            }
        ],
        "subject": subject,
        "htmlContent": f"<pre>{body}</pre>",
    }

    # Reply-To (optional)
    if reply_to_email:
        payload["replyTo"] = {
            "email": reply_to_email,
            "name": reply_to_name or "",
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


# -------------------------------
# ENQUIRY EMAIL
# -------------------------------
def send_enquiry_email(name, email, phone, subject, message):

    body = f"""
New Hawksberg Enquiry

Name : {name}

Email : {email}

Phone : {phone}

Subject : {subject}

Message :

{message}
"""

    return send_brevo_email(
        to_email=ADMIN_EMAIL,
        subject="New Hawksberg Enquiry",
        body=body,
        reply_to_email=email,
        reply_to_name=name,
    )


# -------------------------------
# OTP EMAIL
# -------------------------------
def send_otp_email(email, otp):

    body = f"""
Your Hawksberg Verification Code

OTP : {otp}

This OTP is valid for 10 minutes.
"""

    return send_brevo_email(
        to_email=email,
        subject="Hawksberg OTP Verification",
        body=body,
    )


# -------------------------------
# CONSULTANT APPOINTMENT EMAIL
# -------------------------------
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
        to_email=ADMIN_EMAIL,
        subject="New Consultant Appointment",
        body=body,
        reply_to_email=customer_email,
        reply_to_name=company_name,
    )