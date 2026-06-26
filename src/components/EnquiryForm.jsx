import { useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  // "https://profound-commitment-production-2aae.up.railway.app";
  // "http://127.0.0.1:8000";
  "https://hawksberg-backend-production.up.railway.app";

export default function EnquiryForm({
  compact = false,
  sourcePage = "contact",
}) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  // const submit = (e) => {
  //   e.preventDefault();

  //   const form = e.target;

  //   const payload = {
  //     name: form.name.value,
  //     email: form.email.value,
  //     phone: form.phone.value,
  //     subject: form.subject.value || null,
  //     message: form.message.value,
  //     source_page: sourcePage,
  //   };

  //   setSending(true);

  //   fetch(`${API_URL}/api/enquiries/`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(payload),
  //   })
  //     .catch((err) => {
  //       console.error(err);
  //     });

  //   form.reset();
  //   setSending(false);
  //   setSent(true);

  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 2000);
  // };

  const submit = async (e) => {
  e.preventDefault();

  const form = e.target;

  const payload = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    subject: form.subject.value || null,
    message: form.message.value,
    source_page: sourcePage,
  };

  try {
    setSending(true);

    console.log("Submitting payload:", payload);

    const response = await fetch(`${API_URL}/api/enquiries/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("Status:", response.status);

    const text = await response.text();
    console.log("Response:", text);

    if (!response.ok) {
      throw new Error(text);
    }

    form.reset();
    setSent(true);

    setTimeout(() => {
      window.location.reload();
    }, 2000);

  } catch (err) {
    console.error("Submit Error:", err);
  } finally {
    setSending(false);
  }
};

  return (
    <form
      onSubmit={submit}
      className={`relative overflow-hidden rounded-2xl border border-gold/30 bg-brand p-8 shadow-elegant ${
        compact ? "" : "md:p-10"
      }`}
    >
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="relative">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">
          Get in touch
        </p>

        <h3 className="mt-2 font-display text-3xl text-brand-foreground md:text-4xl">
          Are you ready to apply?
        </h3>

        <p className="mt-2 text-sm text-brand-foreground/70">
          Fill in the enquiry form below and our specialist will call you back.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Field name="name" label="Your Name" required />
          <Field name="email" label="Email Address" type="email" required />
          <Field name="phone" label="Mobile Number" type="tel" required />
          <Field name="subject" label="Subject" />
        </div>

        <div className="mt-4">
          <label className="block text-xs uppercase tracking-widest text-brand-foreground/60">
            Enquiry Details
          </label>

          <textarea
            name="message"
            rows={4}
            required
            className="mt-2 w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-brand-foreground placeholder:text-brand-foreground/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
            placeholder="Tell us about your requirement..."
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={sending}
            className="btn-primary"
          >
            {sending ? "Sending..." : "Enquire Now →"}
          </button>

          {sent && (
            <span className="reveal text-sm text-gold font-semibold">
              ✓ Submitted successfully!
            </span>
          )}
        </div>
      </div>
    </form>
  );
}

function Field({ name, label, type = "text", required }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-brand-foreground/60">
        {label}
      </label>

      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-brand-foreground placeholder:text-brand-foreground/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
        placeholder={label}
      />
    </div>
  );
}