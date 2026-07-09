import os
import smtplib
import logging
# import resend
from email.mime.text import MIMEText
from dotenv import load_dotenv

load_dotenv()
# resend.api_key = os.getenv("RESEND_API_KEY")


# def send_enquiry_email(name, email, phone, subject, message):
#     SMTP_HOST = os.getenv("SMTP_HOST")
#     SMTP_PORT = os.getenv("SMTP_PORT")
#     SMTP_EMAIL = os.getenv("SMTP_EMAIL")
#     SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")

#     logging.info(f"SMTP_HOST: {SMTP_HOST}")
#     logging.info(f"SMTP_PORT: {SMTP_PORT}")
#     logging.info(f"SMTP_EMAIL: {SMTP_EMAIL}")

#     if not all([SMTP_HOST, SMTP_PORT, SMTP_EMAIL, SMTP_PASSWORD]):
#         logging.error("SMTP env vars missing")
#         return False

#     body = f"""
# New Enquiry Received

# Name: {name}
# Email: {email}
# Phone: {phone}
# Subject: {subject}
# Message: {message}
# """

#     msg = MIMEText(body)
#     msg["Subject"] = "New Hawksberg Enquiry"
#     msg["From"] = SMTP_EMAIL
#     msg["To"] = SMTP_EMAIL

#     try:
#         server = smtplib.SMTP(SMTP_HOST, int(SMTP_PORT))
#         server.ehlo()
#         server.starttls()
#         server.ehlo()

#         server.login(SMTP_EMAIL, SMTP_PASSWORD)

#         server.sendmail(
#             SMTP_EMAIL,
#             SMTP_EMAIL,
#             msg.as_string()
#         )

#         server.quit()

#         logging.info("EMAIL SENT SUCCESSFULLY")
#         return True

def send_enquiry_email(name, email, phone, subject, message):
    SMTP_HOST = os.getenv("SMTP_HOST")
    SMTP_PORT = os.getenv("SMTP_PORT")
    SMTP_EMAIL = os.getenv("SMTP_EMAIL")
    SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")

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
    msg["To"] = "Jagayathri722@gmail.com"

    try:
        logging.info(f"Connecting to {SMTP_HOST}:{SMTP_PORT}")

        server = smtplib.SMTP(SMTP_HOST, int(SMTP_PORT), timeout=15)
        server.ehlo()

        server.starttls()
        server.ehlo()

        server.login(SMTP_EMAIL, SMTP_PASSWORD)

        server.sendmail(
            SMTP_EMAIL,
            "Jagayathri722@gmail.com",
            msg.as_string()
        )

        server.quit()

        logging.info("EMAIL SENT SUCCESSFULLY")
        return True

    except Exception as e:
        print("SMTP ERROR =", repr(e))
        logging.exception(f"EMAIL FAILED: {str(e)}")
        return False
    
def send_otp_email(email, otp):
    SMTP_HOST = os.getenv("SMTP_HOST")
    SMTP_PORT = os.getenv("SMTP_PORT")
    SMTP_EMAIL = os.getenv("SMTP_EMAIL")
    SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")

    if not all([SMTP_HOST, SMTP_PORT, SMTP_EMAIL, SMTP_PASSWORD]):
        logging.error("SMTP env vars missing")
        return False

    body = f"""
Your Hawksberg Verification Code

OTP: {otp}

This OTP is valid for 10 minutes.
"""

    msg = MIMEText(body)
    msg["Subject"] = "Hawksberg OTP Verification"
    msg["From"] = SMTP_EMAIL
    msg["To"] = email

    # try:
    #     # server = smtplib.SMTP(SMTP_HOST, int(SMTP_PORT))
    #     server = smtplib.SMTP(SMTP_HOST, int(SMTP_PORT), timeout=15)
    #     server.ehlo()
    #     server.starttls()
    #     server.ehlo()

    #     server.login(SMTP_EMAIL, SMTP_PASSWORD)

    #     server.sendmail(
    #         SMTP_EMAIL,
    #         email,
    #         msg.as_string()
    #     )

    #     server.quit()

    #     logging.info("OTP EMAIL SENT SUCCESSFULLY")
    #     return True

    try:
        logging.info("STEP 1 - Creating SMTP connection")
        server = smtplib.SMTP(SMTP_HOST, int(SMTP_PORT), timeout=15)

        logging.info("STEP 2 - EHLO")
        server.ehlo()

        logging.info("STEP 3 - STARTTLS")
        server.starttls()

        logging.info("STEP 4 - EHLO Again")
        server.ehlo()

        logging.info("STEP 5 - LOGIN")
        server.login(SMTP_EMAIL, SMTP_PASSWORD)

        logging.info("STEP 6 - SENDMAIL")
        server.sendmail(
            SMTP_EMAIL,
            # SMTP_EMAIL,
            email,
            msg.as_string()
       )

        logging.info("STEP 7 - QUIT")
        server.quit()

        logging.info("EMAIL SENT SUCCESSFULLY")
        return True

    except Exception as e:
        logging.exception(f"EMAIL FAILED: {e}")
        return False

    # except Exception as e:
    #     logging.exception(f"OTP EMAIL FAILED: {str(e)}")
    #     return False
    
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
    SMTP_HOST = os.getenv("SMTP_HOST")
    SMTP_PORT = os.getenv("SMTP_PORT")
    SMTP_EMAIL = os.getenv("SMTP_EMAIL")
    SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")

    body = f"""
New Consultant Appointment Request

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

    msg = MIMEText(body)
    msg["Subject"] = "New Consultant Appointment"
    msg["From"] = SMTP_EMAIL
    msg["To"] = "Jagayathri722@gmail.com"

    try:
        server = smtplib.SMTP(SMTP_HOST, int(SMTP_PORT), timeout=15)
        server.ehlo()
        server.starttls()
        server.ehlo()

        server.login(SMTP_EMAIL, SMTP_PASSWORD)

        server.sendmail(
            SMTP_EMAIL,
            "Jagayathri722@gmail.com",
            msg.as_string()
        )

        server.quit()
        return True

    except Exception as e:
        logging.exception(f"APPOINTMENT EMAIL FAILED: {str(e)}")
        return False