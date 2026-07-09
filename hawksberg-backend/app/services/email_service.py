import os
import logging
import requests
from dotenv import load_dotenv

load_dotenv()

BREVO_API_KEY = os.getenv("BREVO_API_KEY")
FROM_EMAIL = os.getenv("FROM_EMAIL")
FROM_NAME = os.getenv("FROM_NAME", "Hawksberg International")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")

BREVO_URL = "https://api.brevo.com/v3/smtp/email"


def send_brevo_email(to_email, subject, body):

    headers = {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
    }

    payload = {
        "sender": {
            "name": FROM_NAME,
            "email": FROM_EMAIL,
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
NEW HAWKSBERG ENQUIRY

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
    )