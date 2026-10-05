"use client";

import { useState } from "react";
import Link from "next/link";

import EnquiryForm from "./EnquiryForm";
import TisaxSections from "./TisaxSections";

export default function ServicePage({ service }) {
  const [openFaq, setOpenFaq] = useState(null);

  const isDpdp = service.slug === "dpdp";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name:
      service.heroTitle ||
      `${service.code} — ${service.title}`,
    description: service.short,
    provider: {
      "@type": "Organization",
      name: "Hawksberg International",
      url: "https://www.hawksberginternational.com",
    },
    url: `https://www.hawksberginternational.com/services/${service.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />

      {/* =========================================================
          HERO
          ========================================================= */}

      <section className="relative overflow-hidden bg-cover bg-center py-20 text-brand-foreground">
        <img
          src={service.heroImage?.src || service.heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        {[
          "iso-27001",
          "tisax",
          "iso-14001",
          "iso-9001",
          "iso-45001",
          "iatf-16949",
          "iso-50001",
          "dpdp",
        ].includes(service.slug) && (
          <div className="absolute inset-0 bg-black/75" />
        )}

        <div className="absolute inset-0 grid-pattern opacity-10" />

        <div className="container-x relative z-10">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            {service.heroLabel || "ISO Consulting Services"}
          </p>

          <h1 className="mt-3 text-5xl md:text-6xl">
            {isDpdp ? (
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  letterSpacing: "-1px",
                }}
              >
                {service.heroTitle}
              </span>
            ) : (
              <>
                <span
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    letterSpacing: "-1px",
                  }}
                >
                  {service.code}
                </span>{" "}
                <span
                  className="text-gold"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 400,
                  }}
                >
                  — {service.title}
                </span>
              </>
            )}
          </h1>

          <div className="mt-4 gold-divider" />

          <p className="mt-6 max-w-2xl text-brand-foreground/80">
            {service.short}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Get Free Evaluation →
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          MAIN CONTENT
          ========================================================= */}

      <section className="container-x grid gap-12 py-20 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-10">

          {/* =====================================================
              DPDP ONLY
              ===================================================== */}

          {isDpdp ? (
            <>
              {/* -------------------------------------------------
                  DPDP ACT COMPLIANCE
                  ------------------------------------------------- */}

              <div>
                <h2 className="font-display text-3xl">
                  {service.overviewTitle}
                </h2>

                <div className="mt-3 gold-divider" />

                {service.description?.map((paragraph, index) => (
                  <p
                    key={index}
                    className="mt-5 text-[16px] leading-9 text-muted-foreground text-justify"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* -------------------------------------------------
                  WHAT IS A DPDP COMPLIANCE AUDIT?
                  ------------------------------------------------- */}

              <div>
                <h2 className="font-display text-3xl">
                  {service.auditTitle}
                </h2>

                <div className="mt-3 gold-divider" />

                <p className="mt-5 text-[16px] leading-9 text-muted-foreground text-justify">
                  {service.auditDescription}
                </p>
              </div>

              {/* -------------------------------------------------
                  COMMON COMPLIANCE GAPS
                  ------------------------------------------------- */}

              <div>
                <h2 className="font-display text-3xl">
                  {service.complianceGapsTitle}
                </h2>

                <div className="mt-3 gold-divider" />

                <ul className="mt-6 grid gap-3">
                  {service.complianceGaps?.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
                    >
                      <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-gold" />

                      <span className="text-sm leading-7 text-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* -------------------------------------------------
                  OUR DPDP CONSULTING SERVICES
                  ------------------------------------------------- */}

              <div>
                <h2 className="font-display text-3xl">
                  {service.consultingServicesTitle}
                </h2>

                <div className="mt-3 gold-divider" />

                <div className="mt-6 grid gap-3">
                  {service.consultingServices?.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-lg border border-border bg-card p-5"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full gradient-gold text-xs font-bold text-ink">
                          ✓
                        </span>

                        <div>
                          <h3 className="font-semibold text-foreground">
                            {item.title}:
                          </h3>

                          {item.description && (
                            <p className="mt-1 text-sm leading-7 text-muted-foreground">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* -------------------------------------------------
                  OUR DPDP AUDIT APPROACH
                  ------------------------------------------------- */}

              <div>
                <h2 className="font-display text-3xl">
                  {service.auditApproachTitle}
                </h2>

                <div className="mt-3 gold-divider" />

                <ol className="mt-6 grid gap-4">
                  {service.auditApproach?.map((item, index) => (
                    <li
                      key={item.title}
                      className="flex gap-4 rounded-lg border border-border bg-card p-5"
                    >
                      <span className="font-display text-3xl text-gold">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div>
                        <h3 className="font-semibold text-foreground">
                          {item.title}:
                        </h3>

                        <p className="mt-1 text-sm leading-7 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* -------------------------------------------------
                  WHY CHOOSE HAWKSBERG
                  ------------------------------------------------- */}

              <div>
                <h2 className="font-display text-3xl">
                  {service.whyChooseTitle}
                </h2>

                <div className="mt-3 gold-divider" />

                <ul className="mt-6 grid gap-3">
                  {service.whyChoosePoints?.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
                    >
                      <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-gold" />

                      <span className="text-sm leading-7 text-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Related links */}
                {service.relatedLinks?.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {service.relatedLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-sm font-medium text-gold underline underline-offset-4 hover:opacity-80"
                      >
                        {link.label} →
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* -------------------------------------------------
                  FAQ
                  ------------------------------------------------- */}

              <div>
                <h2 className="font-display text-3xl">
                  {service.faqTitle}
                </h2>

                <div className="mt-3 gold-divider" />

                <div className="mt-8 space-y-4">
                  {service.faqs?.map((faq, faqIndex) => {
                    const isOpen = openFaq === faqIndex;

                    return (
                      <div
                        key={faq.title}
                        className="overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setOpenFaq(
                              isOpen ? null : faqIndex
                            )
                          }
                          className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                          aria-expanded={isOpen}
                        >
                          <span
                            className={`font-display text-base md:text-lg leading-7 ${
                              isOpen
                                ? "text-gold"
                                : "text-foreground"
                            }`}
                          >
                            {faq.title}
                          </span>

                          <span className="flex h-7 w-7 flex-none items-center justify-center text-2xl font-light text-foreground">
                            {isOpen ? "×" : "+"}
                          </span>
                        </button>

                        {isOpen && (
                          <div className="px-6 pb-6">
                            <div className="mb-5 h-px w-full bg-border" />

                            <p className="text-sm md:text-[15px] leading-7 text-muted-foreground">
                              {faq.content}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* =================================================
                  EXISTING NON-DPDP SERVICE CONTENT
                  ================================================= */}

              <div>
                <h2 className="font-display text-3xl">
                  {service.overviewTitle ||
                    `About ${service.code} Consulting`}
                </h2>

                <div className="mt-3 gold-divider" />

                {(service.description &&
                service.description.length > 0
                  ? service.description
                  : [
                      `Hawksberg International offers complete ${service.code} consulting — from gap analysis through certification.`,
                    ]
                ).map((p, i) => (
                  <p
                    key={i}
                    className="mt-5 text-[16px] leading-9 text-muted-foreground text-justify"
                  >
                    {p}
                  </p>
                ))}
              </div>

              {/* =================================================
                  ISO 27001 ONLY - ADDITIONAL CONTENT + FAQ
                  ================================================= */}

              {service.slug === "iso-27001" &&
                service.contentSections?.map(
                  (section, index) => (
                    <div
                      key={`${section.title}-${index}`}
                      className="mt-12"
                    >
                      {!section.faqs?.length && (
                        <>
                          <h2 className="font-display text-3xl">
                            {section.title}
                          </h2>

                          <div className="mt-3 gold-divider" />

                          {section.content && (
                            <p className="mt-5 text-[16px] leading-8 text-muted-foreground text-justify">
                              {section.content}
                            </p>
                          )}

                          {section.points?.length > 0 && (
                            <ul className="mt-6 grid gap-3">
                              {section.points.map((point) => (
                                <li
                                  key={point}
                                  className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
                                >
                                  <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-gold" />

                                  <span className="text-sm leading-7 text-foreground">
                                    {point}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </>
                      )}

                      {section.faqs?.length > 0 && (
                        <div>
                          <h2 className="font-display text-3xl">
                            {section.faqHeading ||
                              "Frequently Asked Questions"}
                          </h2>

                          <div className="mt-3 gold-divider" />

                          <div className="mt-8 space-y-4">
                            {section.faqs.map(
                              (faq, faqIndex) => {
                                const isOpen =
                                  openFaq === faqIndex;

                                return (
                                  <div
                                    key={faq.title}
                                    className="overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300"
                                  >
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setOpenFaq(
                                          isOpen
                                            ? null
                                            : faqIndex
                                        )
                                      }
                                      className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                                      aria-expanded={isOpen}
                                    >
                                      <span
                                        className={`font-display text-base md:text-lg leading-7 ${
                                          isOpen
                                            ? "text-gold"
                                            : "text-foreground"
                                        }`}
                                      >
                                        {faq.title}
                                      </span>

                                      <span className="flex h-7 w-7 flex-none items-center justify-center text-2xl font-light text-foreground">
                                        {isOpen ? "×" : "+"}
                                      </span>
                                    </button>

                                    {isOpen && (
                                      <div className="px-6 pb-6">
                                        <div className="mb-5 h-px w-full bg-border" />

                                        <p className="text-sm md:text-[15px] leading-7 text-muted-foreground">
                                          {faq.content}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                )}
            </>
          )}

          {/* =====================================================
              WHAT YOU GET
              NON-DPDP ONLY
              ===================================================== */}

          {!isDpdp && (
            <div>
              <h2 className="font-display text-3xl">
                What you get
              </h2>

              <div className="mt-3 gold-divider" />

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {(service.points || []).map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
                  >
                    <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full gradient-gold text-xs font-bold text-ink">
                      ✓
                    </span>

                    <span className="text-sm text-foreground">
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* =====================================================
              EXISTING 6-STEP METHODOLOGY
              NON-DPDP ONLY
              ===================================================== */}

          {service.slug !== "dpdp" && (
            <div className="rounded-2xl border border-gold/30 bg-secondary/40 p-8">
              <h3 className="font-display text-2xl">
                Our 6-step methodology
              </h3>

              <ol className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  "Gap analysis & scoping",
                  "Risk assessment & treatment",
                  "Documentation framework",
                  "Implementation & training",
                  "Internal audit & review",
                  "Certification & sustenance",
                ].map((step, i) => (
                  <li
                    key={step}
                    className="flex gap-4"
                  >
                    <span className="font-display text-3xl text-gold">
                      0{i + 1}
                    </span>

                    <p className="pt-1 text-sm text-foreground">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* =======================================================
            DESKTOP ENQUIRY FORM
            ======================================================= */}

        <aside className="hidden lg:block lg:sticky lg:top-28 self-start">
          <EnquiryForm compact />
        </aside>
      </section>

      {/* =========================================================
          TISAX ONLY
          ========================================================= */}

      {service.slug === "tisax" && (
        <>
          <section className="container-x pt-0 pb-20">
            <TisaxSections />
          </section>

          <section className="container-x pb-20 lg:hidden">
            <EnquiryForm compact />
          </section>
        </>
      )}
    </>
  );
}