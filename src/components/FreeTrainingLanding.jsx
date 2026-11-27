"use client";

import Image from "next/image";
import Layout from "@/components/Layout";
import banner from "@/assets/isotraining/ISO 9001_2026 Free Training Banner.webp";
import { useRef, useState } from "react";

const API_URL = (() => {
  const configured = process.env.NEXT_PUBLIC_API_URL;
  if (!configured) return "https://hawksberg-backend-production.up.railway.app/api";
  return configured.replace(/\/$/, "").endsWith("/api")
    ? configured.replace(/\/$/, "")
    : `${configured.replace(/\/$/, "")}/api`;
})();

const takeaways = [
  "What is changing in ISO 9001:2026, in simple terms",
  "How to check your current system for gaps",
  "What to update in your documents, processes, and risk approach",
  "What auditors are likely to ask about",
  "How to build a realistic transition plan for your company",
];

const audiences = [
  "Quality managers and management representatives",
  "Internal auditors and QA teams",
  "Owners and operations heads of ISO 9001:2015 certified companies",
  "Startups and growing businesses planning their first certification",
  "Consultants and professionals who support ISO implementation",
];

const faqs = [
  ["Is the training really free?", "Yes. There is no fee and no hidden charge."],
  [
    "I’m not certified yet. Can I still join?",
    "Of course. It’s a good way to understand ISO 9001 before you start your certification journey.",
  ],
  [
    "Do I need to be in India to attend?",
    "No. The session is fully online, so you can join from anywhere. It runs at 10:00 AM UK time.",
  ],
  [
    "How do I get the joining link?",
    "We email it to you after you register. Please check your spam folder if you don’t see it.",
  ],
];

export default function FreeTrainingLanding() {
  const formRef = useRef(null);
  const processingRef = useRef(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [serverError, setServerError] = useState("");

  const submitRegistration = async (event) => {
    event.preventDefault();
    setSuccess("");
    setServerError("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      full_name: String(formData.get("full_name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      mobile_number: String(formData.get("mobile_number") || "").trim(),
      company_name: String(formData.get("company_name") || "").trim(),
    };
    const nextErrors = {};
    if (!payload.full_name) nextErrors.full_name = "Full Name is required.";
    if (!payload.email) nextErrors.email = "Email Address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email))
      nextErrors.email = "Enter a valid email address.";
    if (!payload.mobile_number) nextErrors.mobile_number = "Mobile Number is required.";
    else if (!/^\+?[0-9][0-9\s().-]{7,18}$/.test(payload.mobile_number))
      nextErrors.mobile_number = "Enter a valid mobile number.";
    if (!payload.company_name) nextErrors.company_name = "Company Name is required.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length || processingRef.current) return;
    processingRef.current = true;
    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/free-training/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.detail || "Registration failed. Please try again.");
      form.reset();
      setSuccess(
        data.message ||
        "Your free training seat has been reserved successfully!"
      );
    } catch (error) {
      setServerError(error.message || "Registration failed. Please try again.");
    } finally {
      processingRef.current = false;
      setSubmitting(false);
    }
  };

  return (
    <Layout hideFooter>
      <main className="min-h-screen bg-[#f8f7fb] text-[#22152c]">
        {/* <section className="overflow-x-hidden px-3 py-6 sm:px-6 sm:py-12"> */}
        <section className="overflow-x-hidden px-3 pt-12 pb-8 sm:px-8 sm:py-14">
          <div className="mx-auto max-w-6xl text-center">
            {/* <div className="relative -ml-[6px] mx-auto w-[calc(100%+12px)] max-w-[72rem] overflow-hidden rounded-2xl sm:ml-0 sm:w-full"> */}
            <div className="relative mx-auto -ml-[18px] w-[calc(100%+40px)] max-w-[72rem] overflow-hidden rounded-2xl sm:ml-0 sm:w-full">
              <Image
                src={banner}
                alt="Free Online ISO 9001:2026 Training"
                sizes="(max-width: 768px) 100vw, 1152px"
                className="h-auto w-full rounded-2xl object-contain"
                priority
              />
              {/* <button
                type="button"
                aria-label="Reserve My Free Seat"
                onClick={() =>
                  formRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
                className="absolute left-[5.6%] top-[70.2%] h-[12.8%] w-[33.2%] touch-manipulation cursor-pointer rounded-[999px] border-0 bg-transparent p-0 sm:left-[5.9%] sm:top-[70.8%] sm:h-[12.5%] sm:w-[34.3%]"
              /> */}
             <a
  href="#registration-form"
  aria-label="Reserve My Free Seat"
  className="
    absolute z-20 block
    left-[6%] top-[66%]
    h-[18%] w-[43%]
    cursor-pointer touch-manipulation
    sm:left-[5.9%] sm:top-[70.8%]
    sm:h-[12.5%] sm:w-[34.3%]
  "
/>
            </div>
            {/* <h1 className="mt-8 text-3xl font-black leading-tight sm:text-5xl"> */}
            <h1 className="mt-6 px-1 text-[clamp(1.55rem,6.5vw,1.75rem)] font-bold leading-[1.12] tracking-[-0.02em] sm:mt-8 sm:text-4xl sm:tracking-normal">
              Free Online ISO 9001:2026 Training
            </h1>
            <p className="mx-auto mt-4 max-w-3xl px-1 text-[0.9375rem] leading-6 text-[#51465a] sm:text-xl sm:leading-relaxed">
              One day. Zero cost. Learn what the new version means for your company and how to get ready, in plain language.
            </p>
            <p className="mt-4 px-2 text-[0.8125rem] font-bold leading-5 text-[#3d1b70] sm:mt-5 sm:text-base sm:leading-6">
              Saturday, 28 November 2026 | 10:00 AM UK time | Online
            </p>
            {/* <button
              type="button"
              onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="mx-auto mt-5 flex w-full max-w-xs items-center justify-center rounded-lg bg-[#25052f] px-5 py-3.5 text-[0.875rem] font-black tracking-[-0.01em] text-white shadow-lg sm:w-auto sm:px-7 sm:py-4 sm:text-base sm:tracking-normal"
            >
              Reserve My Free Seat →
            </button> */}
            <a
  href="#registration-form"
  className="mx-auto mt-5 flex w-full max-w-xs items-center justify-center rounded-lg bg-[#25052f] px-5 py-3.5 text-[0.875rem] font-black tracking-[-0.01em] text-white shadow-lg sm:w-auto sm:px-7 sm:py-4 sm:text-base sm:tracking-normal"
>
  Reserve My Free Seat →
</a>
            <p className="mx-auto mt-4 max-w-md text-xs leading-5 font-medium text-[#6a5d72] sm:text-sm">
              Limited seats. Joining link sent to your email after you register.
            </p>
          </div>
        </section>

        <section className="bg-white px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-[clamp(1.45rem,6vw,1.65rem)] font-black leading-[1.15] tracking-[-0.02em] sm:text-4xl sm:leading-tight sm:tracking-normal">ISO 9001 is changing. Is your company ready?</h2>
            <div className="mt-5 space-y-4 text-[0.9375rem] leading-6 text-[#51465a] sm:mt-6 sm:space-y-5 sm:text-lg sm:leading-7">
              <p>
                Customers, tenders, and buyers ask for your ISO 9001 certificate. When the standard is revised, certified companies are expected to move to the new version within a set period. Starting early means fewer surprises at audit time and a calmer, better-planned transition.
              </p>
              <p>
                This free session gives you a clear starting point, whether you’re already certified or planning your first certification.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            <ContentList heading="What you’ll take away from the day" items={takeaways} />
            <ContentList heading="Who should join" items={audiences} />
          </div>
        </section>

        <section className="bg-[#25052f] px-4 py-12 text-white sm:px-6 sm:py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-[1.55rem] font-black leading-[1.15] tracking-[-0.02em] sm:text-4xl sm:leading-tight sm:tracking-normal">Event details</h2>
            <dl className="mt-7 overflow-hidden rounded-2xl border border-white/15">
              {[
                ["Date", "Saturday, 28 November 2026"],
                ["Time", "10:00 AM UK time (GMT)"],
                ["Format", "Live, online"],
                ["Fee", "Free"],
                ["Joining link", "Emailed after registration"],
                ["Your time zone", "India 3:30 PM | UAE 2:00 PM | Singapore 6:00 PM"],
              ].map(([detail, information]) => (
                <div key={detail} className="grid border-b border-white/15 px-5 py-4 last:border-b-0 sm:grid-cols-[180px_1fr]">
                  <dt className="font-bold text-[#ffd84d]">{detail}</dt>
                  <dd className="mt-1 sm:mt-0">{information}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section ref={formRef} id="registration-form" className="scroll-mt-28 px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-3xl rounded-3xl bg-white p-6 shadow-[0_18px_50px_rgba(37,5,47,0.12)] sm:p-10">
            <h2 className="text-center text-[1.35rem] font-black leading-[1.2] tracking-[-0.02em] text-[#25052f] sm:text-4xl sm:leading-tight sm:tracking-normal">Reserve Your Free Training Seat</h2>
            <form onSubmit={submitRegistration} noValidate className="mt-8 grid gap-5 sm:grid-cols-2">
              <RegistrationField label="Full Name" name="full_name" type="text" error={errors.full_name} />
              <RegistrationField label="Email Address" name="email" type="email" error={errors.email} />
              <RegistrationField label="Mobile Number" name="mobile_number" type="tel" error={errors.mobile_number} />
              <RegistrationField label="Company Name" name="company_name" type="text" error={errors.company_name} />
              <div className="sm:col-span-2">
                {success && <p role="status" className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">✓ {success}</p>}
                {serverError && <p role="alert" className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{serverError}</p>}
                <button type="submit" disabled={submitting} className="w-full rounded-lg bg-[#25052f] px-6 py-4 text-base font-black text-white disabled:cursor-not-allowed disabled:opacity-60">
                  {submitting ? "Registering..." : "Register Now"}
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-[1.55rem] font-black leading-[1.15] tracking-[-0.02em] sm:text-4xl sm:leading-tight sm:tracking-normal">Frequently Asked Questions</h2>
            <div className="mt-7 space-y-3">
              {faqs.map(([question, answer]) => (
                <details key={question} className="group rounded-xl border border-[#d8cfe1] bg-white px-5 py-4">
                  <summary className="cursor-pointer list-none font-bold text-[#25052f] marker:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {question}
                      <span aria-hidden="true" className="text-xl transition-transform group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <p className="mt-3 leading-7 text-[#51465a]">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

function ContentList({ heading, items }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_12px_35px_rgba(37,5,47,0.08)] sm:p-8">
      <h2 className="text-[1.35rem] font-black leading-[1.2] tracking-[-0.02em] sm:text-3xl sm:leading-tight sm:tracking-normal">{heading}</h2>
      <ul className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-7 text-[#51465a]">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#ef3340]" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function RegistrationField({ label, name, type, error }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-bold text-[#25052f]">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className="mt-2 w-full rounded-lg border border-[#d8cfe1] px-4 py-3 text-sm text-[#25052f] outline-none transition focus:border-[#5d22a1] focus:ring-2 focus:ring-[#5d22a1]/20"
      />
      {error && <p id={`${name}-error`} className="mt-1.5 text-sm font-medium text-red-600">{error}</p>}
    </div>
  );
}
