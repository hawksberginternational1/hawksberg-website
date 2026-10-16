import os
import logging
from html import escape

import requests
from dotenv import load_dotenv

load_dotenv()

# ---------------------------------------------------------------------------
# Brevo configuration
# ---------------------------------------------------------------------------

BREVO_API_KEY = os.getenv("BREVO_API_KEY")
QUIZ_BREVO_API_KEY = os.getenv("QUIZ_BREVO_API_KEY") or BREVO_API_KEY

FROM_EMAIL = os.getenv("FROM_EMAIL")
FROM_NAME = os.getenv("FROM_NAME", "Hawksberg International")

ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
ADMIN_EMAIL_2 = os.getenv("ADMIN_EMAIL_2")

BREVO_URL = "https://api.brevo.com/v3/smtp/email"


# ---------------------------------------------------------------------------
# Enquiry email
# ---------------------------------------------------------------------------

def send_enquiry_email(name, email, phone, subject, message):
    if not BREVO_API_KEY:
        logging.error("Brevo API key is not configured")
        return False

    if not FROM_EMAIL:
        logging.error("FROM_EMAIL is not configured")
        return False

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
            <td>{escape(str(name))}</td>
        </tr>

        <tr>
            <td><b>Email</b></td>
            <td>{escape(str(email))}</td>
        </tr>

        <tr>
            <td><b>Phone</b></td>
            <td>{escape(str(phone))}</td>
        </tr>

        <tr>
            <td><b>Subject</b></td>
            <td>{escape(str(subject))}</td>
        </tr>

        <tr>
            <td><b>Message</b></td>
            <td>{escape(str(message))}</td>
        </tr>

    </table>
    """

    recipients = [
        email.strip()
        for email in (ADMIN_EMAIL, ADMIN_EMAIL_2)
        if email and email.strip()
    ]

    # Preserve the existing fallback recipients if admin variables
    # are not configured.
    if not recipients:
        recipients = [
            "jagayathri722@gmail.com",
            "hawksberginternational@gmail.com",
        ]

    payload = {
        "sender": {
            "name": FROM_NAME,
            "email": FROM_EMAIL,
        },
        "to": [
            {"email": recipient}
            for recipient in recipients
        ],
        "subject": "New Hawksberg Enquiry",
        "htmlContent": body,
    }

    try:
        response = requests.post(
            BREVO_URL,
            headers=headers,
            json=payload,
            timeout=30,
        )

        logging.info("BREVO enquiry status: %s", response.status_code)
        logging.info("BREVO enquiry response: %s", response.text)

        response.raise_for_status()
        return True

    except requests.RequestException:
        logging.exception("Unable to send Hawksberg enquiry email")
        return False

    except Exception:
        logging.exception("Unexpected error while sending enquiry email")
        return False


# ---------------------------------------------------------------------------
# ISO 14001 quiz pass email
# ---------------------------------------------------------------------------

def send_iso14001_quiz_pass_email(
    candidate_name,
    candidate_email,
    training_code,
    score,
    total_questions,
    percentage,
):
    recipients = ["jagayathri722@gmail.com"]

    if not QUIZ_BREVO_API_KEY:
        logging.error("ISO 14001 quiz email is not configured: Brevo API key is missing")
        return False

    if not FROM_EMAIL:
        logging.error("ISO 14001 quiz email is not configured: FROM_EMAIL is missing")
        return False

    if not recipients:
        logging.error("ISO 14001 quiz email has no recipients")
        return False

    details = {
        "Candidate Name": candidate_name,
        "Candidate Email": candidate_email,
        "Training": "ISO 14001",
        "Training Code": training_code,
        "Score": f"{score} / {total_questions}",
        "Total Questions": total_questions,
        "Percentage": f"{percentage}%",
        "Result": "PASS",
    }

    rows = "".join(
        f"<tr>"
        f"<td><b>{escape(str(label))}</b></td>"
        f"<td>{escape(str(value))}</td>"
        f"</tr>"
        for label, value in details.items()
    )

    payload = {
        "sender": {
            "name": FROM_NAME,
            "email": FROM_EMAIL,
        },
        "to": [
            {"email": email}
            for email in recipients
        ],
        "subject": "ISO 14001 Training Quiz Result",
        "htmlContent": (
            "<h2>ISO 14001 Training Quiz Result</h2>"
            "<table cellpadding='8' cellspacing='0' border='1' "
            "style='border-collapse:collapse'>"
            f"{rows}"
            "</table>"
        ),
    }

    headers = {
        "accept": "application/json",
        "api-key": QUIZ_BREVO_API_KEY,
        "content-type": "application/json",
    }

    try:
        response = requests.post(
            BREVO_URL,
            headers=headers,
            json=payload,
            timeout=30,
        )

        logging.info("ISO 14001 pass email status: %s", response.status_code)
        logging.info("ISO 14001 pass email response: %s", response.text)

        response.raise_for_status()
        return True

    except requests.RequestException:
        logging.exception("Unable to send ISO 14001 pass email")
        return False

    except Exception:
        logging.exception("Unexpected error while sending ISO 14001 pass email")
        return False


# ---------------------------------------------------------------------------
# ISO 14001 retest request email
# ---------------------------------------------------------------------------

def send_iso14001_retest_request_email(
    candidate_name,
    candidate_email,
    score,
    requested_at,
    accept_url,
    reject_url,
    recipient,
):
    """
    Send the ISO 14001 retest request email to the admin.

    Accept/Reject links execute the backend action immediately.
    There is intentionally no confirmation-page step in this email.
    """

    # Prefer the quiz-specific key, but fall back to the existing
    # BREVO_API_KEY so the retest email does not fail only because
    # QUIZ_BREVO_API_KEY is absent.
    api_key = QUIZ_BREVO_API_KEY or BREVO_API_KEY

    if not api_key:
        logging.error(
            "ISO 14001 retest email is not configured: "
            "BREVO_API_KEY / QUIZ_BREVO_API_KEY is missing"
        )
        return False

    if not FROM_EMAIL:
        logging.error(
            "ISO 14001 retest email is not configured: "
            "FROM_EMAIL is missing"
        )
        return False

    email_recipient = (
        (recipient or "").strip()
        or (ADMIN_EMAIL or "").strip()
    )

    # Preserve a safe fallback for the current project configuration.
    if not email_recipient:
        email_recipient = "jagayathri722@gmail.com"

    details = {
        "Name": candidate_name,
        "Email": candidate_email,
        "Training": "ISO 14001",
        "Training Code": "iso14001",
        "Score": f"{score}/10",
        "Result": "FAIL",
        "Request Date/Time": requested_at.isoformat(),
    }

    rows = "".join(
        f"<tr>"
        f"<td><b>{escape(str(label))}</b></td>"
        f"<td>{escape(str(value))}</td>"
        f"</tr>"
        for label, value in details.items()
    )

    safe_accept_url = escape(str(accept_url), quote=True)
    safe_reject_url = escape(str(reject_url), quote=True)

    payload = {
        "sender": {
            "name": FROM_NAME,
            "email": FROM_EMAIL,
        },
        "to": [
            {
                "email": email_recipient,
            }
        ],
        "subject": "ISO 14001 Retest Request",
        "htmlContent": (
            "<h2>ISO 14001 RETEST REQUEST</h2>"

            "<h3>Candidate</h3>"

            "<table cellpadding='8' cellspacing='0' border='1' "
            "style='border-collapse:collapse'>"
            f"{rows}"
            "</table>"

            "<h3>Actions</h3>"

            f"<p>"
            f"<a href='{safe_accept_url}' "
            "style='display:inline-block;"
            "padding:12px 18px;"
            "background:#16803c;"
            "color:#fff;"
            "text-decoration:none;"
            "font-weight:bold;"
            "border-radius:6px'>"
            "Accept Retest"
            "</a>"
            "</p>"

            f"<p>"
            f"<a href='{safe_reject_url}' "
            "style='display:inline-block;"
            "padding:12px 18px;"
            "background:#b42318;"
            "color:#fff;"
            "text-decoration:none;"
            "font-weight:bold;"
            "border-radius:6px'>"
            "Reject Retest"
            "</a>"
            "</p>"

            "<p>"
            "Clicking Accept or Reject immediately updates the retest "
            "request. No additional confirmation is required."
            "</p>"
        ),
    }

    headers = {
        "accept": "application/json",
        "api-key": api_key,
        "content-type": "application/json",
    }

    try:
        logging.info(
            "Sending ISO 14001 retest request email to %s",
            email_recipient,
        )

        response = requests.post(
            BREVO_URL,
            headers=headers,
            json=payload,
            timeout=30,
        )

        logging.info(
            "ISO 14001 retest email Brevo status: %s",
            response.status_code,
        )

        logging.info(
            "ISO 14001 retest email Brevo response: %s",
            response.text,
        )

        response.raise_for_status()

        logging.info(
            "ISO 14001 retest request email sent successfully"
        )

        return True

    except requests.RequestException:
        logging.exception(
            "Brevo API request failed while sending "
            "ISO 14001 retest request email"
        )
        return False

    except Exception:
        logging.exception(
            "Unexpected error while sending "
            "ISO 14001 retest request email"
        )
        return False
