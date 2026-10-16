"use client";

import { useState } from "react";

import {
  ShieldCheck,
  Search,
  LockKeyhole,
  BadgeCheck,
} from "lucide-react";

import Header from "@/components/Header";

export default function CertificateVerificationPage() {
  const [form, setForm] = useState({
    certificate_number: "",
    certificate_date: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm((current) => ({ ...current, [e.target.name]: e.target.value }));
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setResult(null);

    const certificateNumber = form.certificate_number?.trim();
    const certificateDate = form.certificate_date;

    if (!certificateNumber || !certificateDate) {
      setResult({
        error: "Please enter the certificate number and certificate date.",
      });
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      setResult({
        error: "Certificate verification is temporarily unavailable.",
      });
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(
        `${apiUrl.replace(/\/$/, "")}/certificate/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            certificate_number: certificateNumber,
            certificate_date: certificateDate,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const detail = Array.isArray(data?.detail)
          ? data.detail
              .map((item) => item?.msg || "Invalid field")
              .join(", ")
          : data?.detail || "Unable to verify this certificate.";

        throw new Error(detail);
      }

      setResult(data);
    } catch (error) {
      console.error("Certificate verification error:", error);

      setResult({
        error:
          error?.message ||
          "Unable to complete certificate verification.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      {/* <main className="min-h-screen bg-[#f7f8fa]"> */}
      <main className="min-h-screen bg-[#f7f8fa] pt-[100px]">

        {/* =====================================================
            HERO
        ====================================================== */}
        <section className="border-b border-[#e6e9ee] bg-white">
          <div className="mx-auto max-w-6xl px-5 py-7 text-center sm:px-6 lg:px-8 lg:py-9">

            {/* Small Badge */}
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#d9e2ee] bg-[#f8fafc] px-4 py-1.5">
              <ShieldCheck
                size={16}
                className="text-[#c78b24]"
              />

              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#52657d]">
                Certificate Authentication
              </span>
            </div>

            {/* Heading */}
            <h1 className="mt-3 font-display text-2xl font-bold tracking-tight text-[#071a33] sm:text-3xl lg:text-[38px]">
              Certificate Verification
            </h1>

            {/* Gold divider */}
            <div className="mx-auto mt-3 h-[3px] w-14 rounded-full bg-[#d49a2a]" />

            {/* Description */}
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#64748b] sm:text-base">
              Verify the authenticity and validity of a certificate issued
              through Hawksberg International.
            </p>

          </div>
        </section>


        {/* =====================================================
            VERIFICATION AREA
        ====================================================== */}
        <section className="px-5 py-6 sm:px-6 lg:px-8 lg:py-7">

          <div className="mx-auto max-w-[850px]">

            {/* =================================================
                MAIN CARD
            ================================================== */}
            <div className="overflow-hidden rounded-2xl border border-[#e1e6ed] bg-white shadow-[0_15px_40px_rgba(7,26,51,0.07)]">

              {/* Card Header */}
              <div className="border-b border-[#e9edf2] bg-[#071a33] px-6 py-5 sm:px-8">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#d49a2a]">
                    <Search
                      size={20}
                      strokeWidth={2.3}
                      className="text-[#071a33]"
                    />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-white">
                      Verify Your Certificate
                    </h2>

                    <p className="mt-0.5 text-xs text-white/65">
                      Enter the certificate number and date as shown on your certificate.
                    </p>
                  </div>

                </div>

              </div>


              {/* Form */}
              <div className="px-6 py-6 sm:px-8 sm:py-7">

                <form onSubmit={handleVerify}>

                  {/* CERTIFICATE NUMBER */}
                  <div>

                    <label
                      htmlFor="certificate-number"
                      className="mb-2 block text-sm font-semibold text-[#172b46]"
                    >
                      Certificate Number
                    </label>

                    <input
                      id="certificate-number"
                      name="certificate_number"
                      type="text"
                      value={form.certificate_number}
                      onChange={handleChange}
                      placeholder="Enter certificate number"
                      className="
                        h-11
                        w-full
                        rounded-lg
                        border
                        border-[#d7dee8]
                        bg-white
                        px-4
                        text-sm
                        font-medium
                        tracking-wide
                        text-[#172b46]
                        outline-none
                        transition
                        placeholder:font-normal
                        placeholder:tracking-normal
                        placeholder:text-[#9aa8b8]
                        hover:border-[#b8c4d2]
                        focus:border-[#c78b24]
                        focus:ring-4
                        focus:ring-[#d49a2a]/10
                      "
                      required
                    />

                  </div>


                  <div className="mt-4">

                    <label
                      htmlFor="certificate-date"
                      className="mb-2 block text-sm font-semibold text-[#172b46]"
                    >
                      Certificate Date
                    </label>

                    <input
                      id="certificate-date"
                      name="certificate_date"
                      type="date"
                      value={form.certificate_date}
                      onChange={handleChange}
                      required
                      className="h-11 w-full rounded-lg border border-[#d7dee8] bg-white px-4 text-sm text-[#172b46] outline-none transition hover:border-[#b8c4d2] focus:border-[#c78b24] focus:ring-4 focus:ring-[#d49a2a]/10"
                    />

                  </div>


                  {/* ===========================================
                      VERIFY BUTTON
                  ============================================ */}
                  <div className="mt-5 flex justify-center">

                    <button
                      type="submit"
                      disabled={submitting}
                      className="
                        inline-flex
                        h-11
                        min-w-[220px]
                        items-center
                        justify-center
                        gap-2
                        rounded-lg
                        bg-[#d49a2a]
                        px-7
                        text-sm
                        font-bold
                        text-[#071a33]
                        shadow-[0_7px_18px_rgba(212,154,42,0.20)]
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:bg-[#c78b24]
                        hover:shadow-[0_10px_22px_rgba(212,154,42,0.25)]
                        active:translate-y-0
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    >
                      <BadgeCheck size={19} />

                      {submitting ? "Verifying..." : "Verify Certificate"}
                    </button>

                  </div>

                </form>


                {/* {result && (
                  <div
                    aria-live="polite"
                    className={`mt-6 rounded-lg border p-4 ${
                      result.error || !result.verified
                        ? "border-rose-200 bg-rose-50 text-rose-800"
                        : "border-emerald-200 bg-emerald-50 text-emerald-900"
                    }`}
                  >
                    <h3 className="font-semibold">
                      {result.error ? "Verification unavailable" : result.message}
                    </h3>

                    {result.error && (
                      <p className="mt-1 text-sm">
                        {result.error}
                      </p>
                    )}


                    {result.verified && result.certificate && (
  <div className="mt-4">
    <div className="grid gap-4 sm:grid-cols-3">
      <div>
        <p className="text-sm font-semibold">Name</p>
        <p className="mt-1 text-sm break-words">
          {result.certificate.name || "Not provided"}
        </p>
      </div>

      <div>
        <p className="text-sm font-semibold">Certificate Number</p>
        <p className="mt-1 text-sm break-words">
          {result.certificate.certificate_number || "Not provided"}
        </p>
      </div>

      <div>
        <p className="text-sm font-semibold">Training</p>
        <p className="mt-1 text-sm break-words">
          {result.certificate.training || "Not provided"}
        </p>
      </div>
    </div>

    <p className="mt-5 font-semibold text-emerald-700">
      ✓ Verified — Hawksberg International
    </p>
  </div>
)}

                    {!result.error && !result.verified && (
                      <p className="mt-1 text-sm">
                        Check the certificate number and certificate date, then try again.
                      </p>
                    )}
                  </div>
                )} */}

                {result && (
  <div
    aria-live="polite"
    className={`mt-6 rounded-lg border p-4 ${
      result.verified
        ? "border-emerald-200 bg-emerald-50 text-emerald-900"
        : "border-rose-200 bg-rose-50 text-rose-800"
    }`}
  >
    {result.verified && result.certificate ? (
      <>
        <h3 className="font-semibold">
          {result.message}
        </h3>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-sm font-semibold">Name</p>
            <p className="mt-1 text-sm break-words">
              {result.certificate.name || "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold">
              Certificate Number
            </p>
            <p className="mt-1 text-sm break-words">
              {result.certificate.certificate_number || "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold">Training</p>
            <p className="mt-1 text-sm break-words">
              {result.certificate.training || "Not provided"}
            </p>
          </div>
        </div>

        <p className="mt-5 font-semibold text-emerald-700">
          ✓ Verified — Hawksberg International
        </p>
      </>
    ) : (
      <>
        <h3 className="font-semibold">
          No data available
        </h3>

        <p className="mt-1 text-sm">
          Your certificate is not verified.
        </p>
      </>
    )}
  </div>
)}

              </div>
            </div>


            {/* =================================================
                SECURITY NOTE
            ================================================== */}
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#e1e6ed] bg-white px-5 py-3">

              <LockKeyhole
                size={17}
                className="mt-0.5 shrink-0 text-[#c78b24]"
              />

              <p className="text-xs leading-5 text-[#718096]">
                Certificate verification is intended to help confirm the
                authenticity and status of certificate information.
              </p>

            </div>

          </div>

        </section>

      </main>
    </>
  );
}