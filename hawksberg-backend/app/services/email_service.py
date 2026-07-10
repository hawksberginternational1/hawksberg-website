# import os
# import logging
# import requests
# from dotenv import load_dotenv

# load_dotenv()

# BREVO_API_KEY = os.getenv("BREVO_API_KEY")
# FROM_EMAIL = os.getenv("FROM_EMAIL")
# FROM_NAME = os.getenv("FROM_NAME", "Hawksberg International")

# BREVO_URL = "https://api.brevo.com/v3/smtp/email"


# def send_enquiry_email(name, email, phone, subject, message):

#     headers = {
#         "accept": "application/json",
#         "api-key": BREVO_API_KEY,
#         "content-type": "application/json",
#     }

#     body = f"""
#     <h2>New Hawksberg Enquiry</h2>

#     <table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;font-family:Arial;">
#         <tr>
#             <td><b>Name</b></td>
#             <td>{name}</td>
#         </tr>

#         <tr>
#             <td><b>Email</b></td>
#             <td>{email}</td>
#         </tr>

#         <tr>
#             <td><b>Phone</b></td>
#             <td>{phone}</td>
#         </tr>

#         <tr>
#             <td><b>Subject</b></td>
#             <td>{subject}</td>
#         </tr>

#         <tr>
#             <td><b>Message</b></td>
#             <td>{message}</td>
#         </tr>

#     </table>
#     """

#     payload = {
#         "sender": {
#             "name": FROM_NAME,
#             "email": FROM_EMAIL
#         },

#         "to": [
#             {
#                 "email": "jagayathri722@gmail.com"
#             },
#             {
#                 "email": "hawksberginternational@gmail.com"
#             }
#         ],

#         "subject": "New Hawksberg Enquiry",

#         "htmlContent": body
#     }

#     try:

#         response = requests.post(
#             BREVO_URL,
#             headers=headers,
#             json=payload,
#             timeout=30,
#         )

#         print("=" * 60)
#         print("BREVO STATUS :", response.status_code)
#         print("BREVO RESPONSE :", response.text)
#         print("=" * 60)

#         response.raise_for_status()

#         return True

#     except Exception as e:
#         logging.exception(e)
#         return False

import os
import logging
import requests
from dotenv import load_dotenv

load_dotenv()

BREVO_API_KEY = os.getenv("BREVO_API_KEY")

FROM_EMAIL = os.getenv("FROM_EMAIL")
FROM_NAME = os.getenv("FROM_NAME", "Hawksberg International")

ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
ADMIN_EMAIL_2 = os.getenv("ADMIN_EMAIL_2")

BREVO_URL = "https://api.brevo.com/v3/smtp/email"


def send_enquiry_email(name, email, phone, subject, message):

    headers = {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
    }

    body = f"""
    <h2>New Hawksberg Enquiry</h2>

    <table cellpadding="8" cellspacing="0" border="1"
    style="border-collapse:collapse;">

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
                # "email": ADMIN_EMAIL
                "email": "jagayathri722@gmail.com"
            },
            {
                # "email": ADMIN_EMAIL_2
                "email": "hawksberginternational@gmail.com"
            }
        ],

        "subject": "New Hawksberg Enquiry",

        "htmlContent": body
    }
    
    print("=" * 60)
    print("FROM_EMAIL =", FROM_EMAIL)
    print("ADMIN_EMAIL =", ADMIN_EMAIL)
    print("ADMIN_EMAIL_2 =", ADMIN_EMAIL_2)
    print("PAYLOAD =", payload)
    print("=" * 60)

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