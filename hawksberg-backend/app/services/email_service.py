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


def send_enquiry_email(name, email, phone, subject, message):

    headers = {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
    }

    body = f"""
    <h2>New Hawksberg Enquiry</h2>

    <table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;">
        <tr>
            <td><b>Name</b></td>
            <td>{name}</td>
        </tr>

        <tr>
            <td><b>Email</b></td>
            <td>{email}</td>
        </tr>

        <tr>
            <td><b>Phone</b></td>
            <td>{phone}</td>
        </tr>

        <tr>
            <td><b>Subject</b></td>
            <td>{subject}</td>
        </tr>

        <tr>
            <td><b>Message</b></td>
            <td>{message}</td>
        </tr>
    </table>
    """

    payload = {
        "sender": {
            "name": FROM_NAME,
            "email": FROM_EMAIL
        },

        "to": [
            {
                "email": ADMIN_EMAIL
            }
        ],

        "subject": "New Hawksberg Enquiry",

        "htmlContent": body
    }

    try:

        response = requests.post(
            BREVO_URL,
            headers=headers,
            json=payload,
            timeout=30,
        )

        print("=" * 60)
        print("BREVO STATUS :", response.status_code)
        print("BREVO RESPONSE :", response.text)
        print("=" * 60)

        response.raise_for_status()

        return True

    except Exception as e:
        logging.exception(e)
        return False