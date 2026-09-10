"use client";

import { useState } from "react";

import Layout from "@/components/Layout";
import ValuesStrip from "@/components/ValuesStrip";
// import Clients from "@/components/Clients";
import AboutClients from "@/components/AboutClients";
import Testimonials from "@/components/Testimonials";

import aboutUsBg from "@/assets/aboutus.webp";
import aboutPageImg from "@/assets/aboutpage.webp";

import galleryImg1 from "@/assets/Gallery/img1.webp";
import galleryImg2 from "@/assets/Gallery/img2.webp";
import galleryImg3 from "@/assets/Gallery/img3.webp";
import galleryImg4 from "@/assets/Gallery/img 4.webp";
import galleryImg5 from "@/assets/Gallery/img5.webp";

import useReveal from "@/hooks/useReveal";

const aboutStats = [
  { value: "10+", label: "Years of combined expertise" },
  { value: "500+", label: "Projects delivered" },
  { value: "20+", label: "Countries served" },
  { value: "98%", label: "Client retention" },
];

/* =========================================================
   COMPANY
========================================================= */

function AboutPageSection() {
  const [imgRef, imgShown] = useReveal();
  const [textRef, textShown] = useReveal();

  return (
    <section className="container-x py-20 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

        {/* IMAGE */}
        <div
          ref={imgRef}
          className={`relative reveal-on-scroll reveal-left ${
            imgShown ? "is-visible" : ""
          }`}
        >
          <div className="absolute -inset-4 -z-10 rounded-3xl gradient-gold opacity-20 blur-2xl float-soft" />

          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-1 shadow-elegant">
            <div className="relative h-[620px] overflow-hidden rounded-xl lg:h-[770px]">

              <img
                src={aboutPageImg.src}
                alt="Hawksberg International ISO consultancy and training team"
                loading="eager"
                decoding="async"
                width={1024}
                height={1280}
                className="h-full w-full object-cover object-center transition-transform duration-[1200ms] hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-8 text-brand-foreground">
                <span className="text-xs uppercase tracking-[0.3em] text-gold">
                  Professional guidance
                </span>

                <p className="mt-3 max-w-sm text-sm text-white/80">
                  Practical solutions built around global standards and local
                  business needs.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div
          ref={textRef}
          className={`flex flex-col justify-center reveal-on-scroll reveal-right ${
            textShown ? "is-visible" : ""
          }`}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            About
          </p>

          <h2 className="mt-3 font-display text-3xl leading-tight md:text-5xl">
            Hawksberg International{" "}
            <span className="text-gold">Certification</span>
          </h2>

          <div className="mt-4 gold-divider" />

          <p className="mt-6 text-muted-foreground">
            Hawksberg International Certification, a global ISO Consultant We help organizations 
            achieve ISO certification, strengthen cyber security posture, and build 
            workplace capability through structured corporate training programs. We translate
            international standards into structured business processes that
            support compliance, certification readiness, and measurable
            operational improvement.
          </p>

          <p className="mt-4 text-muted-foreground">
            As a trusted ISO certification consultant , Our experienced professionals
            work with leadership and teams to build lasting awareness, accountability, 
            and confidence in the way management systems are implemented and maintained. Through clear
            methods and hands-on support, we help organizations develop a
            culture of continual improvement across their operations.
          </p>

          <p className="mt-4 text-muted-foreground">
            With global standards at the core and practical business
            application in focus, we tailor our consultancy and training
            solutions to the needs of different industries. This flexible
            approach enables us to address complex requirements, guide
            certification preparation, and deliver solutions that are relevant
            to each organization’s goals.
          </p>

          {/* STATS */}
          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {aboutStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-border bg-card p-4 text-center hover-lift"
              >
                <p className="font-display text-3xl text-gold">
                  {stat.value}
                </p>

                <p className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* BUTTON */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/contact" className="btn-primary">
              Talk to an Expert
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

/* =========================================================
   COMPANY CONTENT
========================================================= */

function CompanyContent() {
  return (
    <>
      {/* ABOUT */}
      <AboutPageSection />

      {/* VISION / MISSION / GLOBAL REACH */}
      <ValuesStrip />

      {/* =====================================================
          IMPORTANCE
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#f8f7f3] py-20 lg:py-24">
        <div className="container-x">

          {/* HEADING */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Importance
            </p>

            <h2 className="mt-3 font-display text-4xl leading-tight text-foreground md:text-5xl">
              Why ISO certification matters
            </h2>

            <div className="mx-auto mt-4 gold-divider" />

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              A look at the key benefits and improvements that ISO
              certification can bring to an organization.
            </p>
          </div>

          {/* ISO BENEFITS */}
          <div className="iso-carousel">

            {/* TIMELINE */}
            <div className="iso-carousel-timeline">

              <div className="iso-timeline-line" />

              <div className="iso-timeline-progress" />

              <div className="iso-timeline-point iso-point-completed">
                <span>✓</span>
              </div>

              <div className="iso-timeline-point iso-point-active">
                <span />
              </div>

              <div className="iso-timeline-point iso-point-upcoming">
                <span />
              </div>

              <div className="iso-point-connector iso-connector-left" />
              <div className="iso-point-connector iso-connector-center" />
              <div className="iso-point-connector iso-connector-right" />

            </div>

            {/* CAROUSEL */}
            <div className="iso-carousel-viewport">
              <div className="iso-carousel-track">

                {/* 01 */}
                <article className="iso-carousel-card iso-card-01 overflow-hidden">
                  <div className="iso-carousel-card-inner h-full overflow-hidden">

                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-display text-4xl text-gold">
                          01
                        </p>

                        <span className="mt-3 inline-flex max-w-full rounded-full bg-[#f7f1e5] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold sm:text-[11px] sm:tracking-[0.2em]">
                          Standardised Processes
                        </span>
                      </div>

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f7f1e5] text-base sm:h-11 sm:w-11 sm:text-lg">
                        ✓
                      </div>
                    </div>

                    <h3 className="mt-5 break-words font-display text-xl leading-tight text-foreground sm:mt-7 sm:text-2xl">
                      Standardised processes
                    </h3>

                    <p className="mt-3 break-words text-xs leading-6 text-muted-foreground sm:text-sm sm:leading-7">
                      All processes are evaluated and standardised across the
                      organisation.
                    </p>

                  </div>
                </article>

                {/* 02 */}
                <article className="iso-carousel-card iso-card-02">
                  <div className="iso-carousel-card-inner">

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-display text-4xl text-gold">
                          02
                        </p>

                        <span className="mt-3 inline-flex rounded-full bg-[#f7f1e5] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                          Issue Detection
                        </span>
                      </div>

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f7f1e5] text-lg">
                        ◆
                      </div>
                    </div>

                    <h3 className="mt-7 font-display text-2xl text-foreground">
                      Faster issue detection
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      Issues are detected quickly and resolved with
                      traceability.
                    </p>

                  </div>
                </article>

                {/* 03 */}
                <article className="iso-carousel-card iso-card-03">
                  <div className="iso-carousel-card-inner">

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-display text-4xl text-gold">
                          03
                        </p>

                        <span className="mt-3 inline-flex rounded-full bg-[#f7f1e5] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                          Customer Trust
                        </span>
                      </div>

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f7f1e5] text-lg">
                        ★
                      </div>
                    </div>

                    <h3 className="mt-7 font-display text-2xl text-foreground">
                      Customer trust
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      International recognition that strengthens credibility
                      with customers.
                    </p>

                  </div>
                </article>

                {/* 04 */}
                <article className="iso-carousel-card iso-card-04">
                  <div className="iso-carousel-card-inner">

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-display text-4xl text-gold">
                          04
                        </p>

                        <span className="mt-3 inline-flex rounded-full bg-[#f7f1e5] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                          Continuous Improvement
                        </span>
                      </div>

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f7f1e5] text-lg">
                        ✓
                      </div>
                    </div>

                    <h3 className="mt-7 font-display text-2xl text-foreground">
                      Continuous improvement
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      Embeds a culture of measurable, continual improvement.
                    </p>

                  </div>
                </article>

               {/* 05 */}
<article className="iso-carousel-card iso-card-05 overflow-hidden">
  <div className="iso-carousel-card-inner h-full overflow-hidden">

    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="font-display text-4xl text-gold">
          05
        </p>

        <span className="mt-3 inline-flex max-w-full rounded-full bg-[#f7f1e5] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold sm:text-[11px] sm:tracking-[0.2em]">
          Stronger Compliance
        </span>
      </div>

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f7f1e5] text-base sm:h-11 sm:w-11 sm:text-lg">
        ✓
      </div>
    </div>

    <h3 className="mt-5 break-words font-display text-xl leading-tight text-foreground sm:mt-7 sm:text-2xl">
      Stronger compliance
    </h3>

    <p className="mt-3 break-words text-xs leading-6 text-muted-foreground sm:text-sm sm:leading-7">
      Helps organisations meet regulatory, contractual, and industry-specific
      requirements with greater consistency and accountability.
    </p>

  </div>
</article>


{/* 06 */}
<article className="iso-carousel-card iso-card-06 overflow-hidden">
  <div className="iso-carousel-card-inner h-full overflow-hidden">

    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="font-display text-4xl text-gold">
          06
        </p>

        <span className="mt-3 inline-flex max-w-full rounded-full bg-[#f7f1e5] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold sm:text-[11px] sm:tracking-[0.2em]">
          Risk Management
        </span>
      </div>

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f7f1e5] text-base sm:h-11 sm:w-11 sm:text-lg">
        ◆
      </div>
    </div>

    <h3 className="mt-5 break-words font-display text-xl leading-tight text-foreground sm:mt-7 sm:text-2xl">
      Better risk management
    </h3>

    <p className="mt-3 break-words text-xs leading-6 text-muted-foreground sm:text-sm sm:leading-7">
      Identifies potential risks early and supports structured actions to
      reduce their impact on business operations.
    </p>

  </div>
</article>


{/* 07 */}
<article className="iso-carousel-card iso-card-07 overflow-hidden">
  <div className="iso-carousel-card-inner h-full overflow-hidden">

    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="font-display text-4xl text-gold">
          07
        </p>

        <span className="mt-3 inline-flex max-w-full rounded-full bg-[#f7f1e5] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold sm:text-[11px] sm:tracking-[0.2em]">
          Operational Efficiency
        </span>
      </div>

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f7f1e5] text-base sm:h-11 sm:w-11 sm:text-lg">
        ★
      </div>
    </div>

    <h3 className="mt-5 break-words font-display text-xl leading-tight text-foreground sm:mt-7 sm:text-2xl">
      Improved efficiency
    </h3>

    <p className="mt-3 break-words text-xs leading-6 text-muted-foreground sm:text-sm sm:leading-7">
      Creates clearer processes, defined responsibilities, and better control
      over day-to-day organisational activities.
    </p>

  </div>
</article>

                {/* 08 */}
                <article className="iso-carousel-card iso-card-08">
                  <div className="iso-carousel-card-inner">

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-display text-4xl text-gold">
                          08
                        </p>

                        <span className="mt-3 inline-flex rounded-full bg-[#f7f1e5] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                          Business Growth
                        </span>
                      </div>

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f7f1e5] text-lg">
                        ✓
                      </div>
                    </div>

                    <h3 className="mt-7 font-display text-2xl text-foreground">
                      Business growth
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      Strengthens organisational credibility and supports
                      long-term growth.
                    </p>

                  </div>
                </article>

                {/* CLONE */}
                <article className="iso-carousel-card iso-card-clone">
                  <div className="iso-carousel-card-inner">

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-display text-4xl text-gold">
                          01
                        </p>

                        <span className="mt-3 inline-flex rounded-full bg-[#f7f1e5] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                          Standardised Processes
                        </span>
                      </div>

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f7f1e5] text-lg">
                        ✓
                      </div>
                    </div>

                    <h3 className="mt-7 font-display text-2xl text-foreground">
                      Standardised processes
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      All processes are evaluated and standardised across the
                      organisation.
                    </p>

                  </div>
                </article>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />
    </>
  );
}

/* =========================================================
   CLIENTS
========================================================= */

function ClientsContent() {
  // return <Clients />;
  return <AboutClients />;
}

/* =========================================================
   GALLERY
========================================================= */

function GalleryContent() {
 const galleryItems = [
  {
    type: "image",
    src: galleryImg5,
    alt: "Hawksberg International professional engagement",
  },
  {
    type: "image",
    src: galleryImg1,
    alt: "Hawksberg International professional interaction",
    // description:
    //   "Connecting professionals and industry leaders through knowledge and collaboration.",
  },
  {
    type: "image",
    src: galleryImg2,
    alt: "Hawksberg International team and industry professionals",
    // description:
    //   "Bringing people together to share expertise, ideas and professional experience.",
  },
  {
    type: "image",
    src: galleryImg3,
    alt: "Hawksberg International recognition and achievement",
    // description:
    //   "Recognising excellence and celebrating professional achievements with our partners.",
  },
  {
    type: "image",
    src: galleryImg4,
    alt: "Hawksberg International training session",
  },
  {
    type: "video",
    src: "/Gallery/video1.mp4",
    alt: "Hawksberg International training and professional activities",
    // description:
    //   "A glimpse into Hawksberg International's training, consultancy and professional engagements.",
  },
];

  return (
    <section className="bg-[#f8f7f3] py-20 lg:py-24">
      <div className="container-x">

        {/* GALLERY HEADING */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Gallery
          </p>

          <h2 className="mt-3 font-display text-4xl leading-tight text-foreground md:text-5xl">
            Our Moments
          </h2>

          <div className="mx-auto mt-4 gold-divider" />
        </div>

        {/* GALLERY GRID */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

         {galleryItems.map((item, index) => (
  <div
    key={`${item.type}-${index}`}
    className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-elegant"
  >
    {/* IMAGE / VIDEO */}
    {item.type === "video" ? (
     <video
  controls
  playsInline
  preload="metadata"
  className="h-[300px] w-full cursor-pointer object-cover"
>
  <source src={item.src} type="video/mp4" />
  Your browser does not support the video tag.
</video>
    ) : (
      <img
        src={item.src.src}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        className="h-[300px] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
      />
    )}

    {/* DESCRIPTION */}
    {(item.description || item.type === "video") && (
      <>
        {/* DARK GRADIENT */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

        {/* DESCRIPTION TEXT */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
          {item.description && (
            // <p className="max-w-[90%] text-lg font-semibold leading-snug text-white drop-shadow-md md:text-xl">
            <p className="max-w-[90%] text-sm font-semibold leading-snug text-white drop-shadow-md md:text-base">
              {item.description}
            </p>
          )}

          {item.type === "video" && (
            <p className="mt-2 text-sm font-medium text-white/90">
              ▶ Click to Play
            </p>
          )}
        </div>
      </>
    )}
  </div>
))}

        </div>
      </div>
    </section>
  );
}

/* =========================================================
   ABOUT PAGE
========================================================= */

export default function About() {
  const [activeTab, setActiveTab] = useState("company");

  const tabs = [
    {
      id: "company",
      label: "Company",
    },
    {
      id: "clients",
      label: "Clients",
    },
    {
      id: "gallery",
      label: "Gallery",
    },
  ];

  return (
    <Layout>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="relative overflow-hidden bg-cover bg-center py-20 text-brand-foreground"
        style={{
          backgroundImage: `url(${aboutUsBg?.src || aboutUsBg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 grid-pattern opacity-10" />

        <div className="container-x relative">

          <h1 className="mt-3 font-display text-5xl text-gold md:text-6xl">
            About Us
          </h1>

          <div className="mt-4 gold-divider" />

          <p className="mt-6 max-w-2xl text-brand-foreground/80">
            Hawksberg International is a global ISO consultancy and cyber
            security training firm with deep expertise across regulated
            industries.
          </p>

        </div>
      </section>

   {/* =====================================================
    TABS — REFERENCE HOVER EFFECT
    ===================================================== */}

<nav
  className="relative z-20 border-b border-border bg-white shadow-sm"
  aria-label="About Us sections"
>
  <div className="container-x">
    <div className="flex items-center justify-center gap-8 md:gap-14">

      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            aria-current={isActive ? "page" : undefined}
            className="group relative flex min-w-[90px] cursor-pointer flex-col items-center justify-center pt-4 pb-4 md:min-w-[110px]"
          >

            {/* =========================
                SVG ICON
                ========================= */}
            <span
              className={`
                mb-2 flex h-6 w-6 items-center justify-center
                transition-all duration-300 ease-out
                ${
                  isActive
                    ? "text-gold"
                    : "text-[#0B1F33] group-hover:-translate-y-0.5 group-hover:text-[#1295A8]"
                }
              `}
            >

              {/* COMPANY */}
              {tab.id === "company" && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M3 21h18" />
                  <path d="M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16" />
                  <path d="M15 9h4a2 2 0 0 1 2 2v10" />
                  <path d="M8 7h3" />
                  <path d="M8 11h3" />
                  <path d="M8 15h3" />
                  <path d="M18 13h1" />
                  <path d="M18 17h1" />
                </svg>
              )}

              {/* CLIENTS */}
              {tab.id === "clients" && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              )}

              {/* GALLERY */}
              {tab.id === "gallery" && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="2"
                  />
                  <circle
                    cx="8.5"
                    cy="8.5"
                    r="1.5"
                  />
                  <path d="m21 15-5-5L5 21" />
                </svg>
              )}

            </span>

            {/* =========================
                TEXT
                ========================= */}
            <span
              className={`
                text-sm font-semibold
                transition-colors duration-300 ease-out
                ${
                  isActive
                    ? "text-gold"
                    : "text-[#0B1F33] group-hover:text-[#1295A8]"
                }
              `}
            >
              {tab.label}
            </span>

            {/* =========================
                REFERENCE UNDERLINE
                ========================= */}
            <span
              className={`
                absolute bottom-0 left-1/2
                h-[3px]
                -translate-x-1/2
                rounded-full
                bg-[#1295A8]
                transition-all duration-300 ease-out
                ${
                  isActive
                    ? "w-14 opacity-100"
                    : "w-0 opacity-0 group-hover:w-14 group-hover:opacity-100"
                }
              `}
            />

          </button>
        );
      })}

    </div>
  </div>
</nav>

      {/* =====================================================
          TAB CONTENT
      ===================================================== */}

      <div>
        {activeTab === "company" && <CompanyContent />}

        {activeTab === "clients" && <ClientsContent />}

        {activeTab === "gallery" && <GalleryContent />}
      </div>

    </Layout>
  );
}
