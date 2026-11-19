// import {
//   ShieldCheck,
//   CalendarDays,
//   BadgeCheck,
//   TrendingUp,
//   ArrowRight,
// } from "lucide-react";
import {
  ShieldCheck,
  CalendarDays,
  BadgeCheck,
  TrendingUp,
  ArrowRight,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
} from "lucide-react";

import {
  Lock,
  Database,
  Car,
  CheckCircle2,
} from "lucide-react";

import {
  FileText,
  Search,
  Settings,
  ClipboardCheck,
  Scale,
  Award,
} from "lucide-react";

const STEPS = [
  {
    icon: FileText,
    label: (
      <>
        Scope &<br />Register
      </>
    ),
  },
  {
    icon: Search,
    label: (
      <>
        Gap<br />Assessment
      </>
    ),
  },
  {
    icon: Settings,
    label: (
      <>
        Build ISMS &<br />Remediate
      </>
    ),
  },
  {
    icon: ClipboardCheck,
    label: (
      <>
        Self-<br />Assessment
      </>
    ),
  },
  {
    icon: Scale,
    label: (
      <>
        External Audit<br />(AL 2 / AL 3)
      </>
    ),
  },
  {
    icon: Award,
    label: (
      <>
        Label &<br />Maintain
      </>
    ),
  },
];
export default function TisaxSections() {
  return (
    // <div className="mt-20 space-y-24">
    <div className="mt-0 space-y-0">

      {/* =======================================================
          WHAT IS TISAX®
      ======================================================== */}
{/* 
      <section>
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.9fr]">

        

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-gold">
              Automotive Information Security
            </p>

            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              What is TISAX®?
            </h2>

            <div className="mt-5 gold-divider" />

            <p className="mt-7 text-lg text-muted-foreground">
              Trusted Information Security Assessment Exchange (TISAX®) is the
              automotive industry's globally recognised information security
              assessment and exchange mechanism.
            </p>

            <div className="mt-8 space-y-6">

              <p className="leading-8 text-muted-foreground">
                Developed by the German Association of the Automotive Industry
                (VDA) and governed by the ENX Association, TISAX enables
                organisations to demonstrate that their Information Security
                Management System (ISMS) meets the strict security expectations
                of automotive manufacturers and suppliers.
              </p>

              <p className="leading-8 text-muted-foreground">
                Unlike ISO 27001 certification, TISAX is specifically tailored
                for the automotive sector. Assessments are performed using the
                VDA ISA (Information Security Assessment) catalogue, which
                incorporates industry-specific controls for information
                security, prototype protection, data protection and secure
                collaboration across the automotive supply chain.
              </p>

              <p className="leading-8 text-muted-foreground">
                Organisations successfully completing a TISAX assessment receive
                a TISAX label that can be securely shared with customers and
                business partners through the ENX platform, reducing duplicate
                customer audits and strengthening trust throughout the supply
                chain.
              </p>

            </div>

          </div>

          

                    <div>

            <div
              className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-[#1f4d8b]
                bg-[#163B73]
                p-8
                shadow-2xl
              "
            >

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.08),transparent_45%)]" />

              <div className="relative">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E0A328]">
                    <ShieldCheck className="h-6 w-6 text-[#163B73]" />
                  </div>

                  <div>

                    <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                      Overview
                    </p>

                    <h3 className="text-2xl font-semibold text-white">
                      KEY FACTS
                    </h3>

                  </div>

                </div>

                <div className="mt-8 space-y-5">

                  <div
                    className="
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/5
                      p-5
                      transition-all
                      duration-300
                      hover:bg-white/10
                    "
                  >

                    <div className="flex items-start gap-4">

                      <CalendarDays className="mt-1 h-6 w-6 text-[#E0A328]" />

                      <div>

                        <h4 className="text-lg font-semibold text-white">
                          Assessment Standard
                        </h4>

                        <p className="mt-2 text-sm leading-6 text-white/75">
                          Based on the VDA ISA 6.0 catalogue and recognised by
                          the ENX Association for the automotive industry.
                        </p>

                      </div>

                    </div>

                  </div>

                  <div
                    className="
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/5
                      p-5
                      transition-all
                      duration-300
                      hover:bg-white/10
                    "
                  >

                    <div className="flex items-start gap-4">

                      <BadgeCheck className="mt-1 h-6 w-6 text-[#E0A328]" />

                      <div>

                        <h4 className="text-lg font-semibold text-white">
                          Industry Recognition
                        </h4>

                        <p className="mt-2 text-sm leading-6 text-white/75">
                          Accepted by major automotive manufacturers and Tier-1
                          suppliers worldwide.
                        </p>

                      </div>

                    </div>

                  </div>

                  <div
                    className="
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/5
                      p-5
                      transition-all
                      duration-300
                      hover:bg-white/10
                    "
                  >

                    <div className="flex items-start gap-4">

                      <TrendingUp className="mt-1 h-6 w-6 text-[#E0A328]" />

                      <div>

                        <h4 className="text-lg font-semibold text-white">
                          Business Benefit
                        </h4>

                        <p className="mt-2 text-sm leading-6 text-white/75">
                          Eliminates multiple customer security audits through a
                          single recognised assessment process.
                        </p>

                      </div>

                    </div>

                  </div>

                  <div
                    className="
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/5
                      p-5
                      transition-all
                      duration-300
                      hover:bg-white/10
                    "
                  >

                    <div className="flex items-start gap-4">

                      <ShieldCheck className="mt-1 h-6 w-6 text-[#E0A328]" />

                      <div>

                        <h4 className="text-lg font-semibold text-white">
                          Security Focus
                        </h4>

                        <p className="mt-2 text-sm leading-6 text-white/75">
                          Covers information security, prototype protection,
                          privacy requirements and secure collaboration across
                          the automotive supply chain.
                        </p>

                      </div>

                    </div>

                  </div>

                </div>


              </div>

            </div>

          </div>

        </div>

      </section> */}

{/* =======================================================
    WHAT IS TISAX
======================================================== */}

<section>
  <div className="max-w-5xl">
    <h2 className="font-display text-4xl md:text-5xl">
      What Is TISAX?
    </h2>

    <div className="mt-5 gold-divider" />

    <p className="mt-7 text-lg leading-9 text-muted-foreground text-justify">
      TISAX is an information security assessment framework created by
      the German Association of the Automotive Industry (VDA) and
      administered by the ENX Association. Companies are assessed
      against a catalogue of security controls called the VDA ISA
      (Information Security Assessment). An ENX-approved audit provider
      performs the assessment, and the result is published on the ENX
      portal as a TISAX label.
    </p>

    <p className="mt-8 text-lg leading-9 text-muted-foreground">
      Three points make it different from other certificates you may
      already know:
    </p>
{/* 
    <ol className="mt-6 list-decimal space-y-6 pl-7 text-[16px] leading-9 text-muted-foreground">
      <li className="pl-2">
        <strong className="text-foreground">
          It is not a certificate in the usual sense.
        </strong>{" "}
        You receive an assessment result and labels that your partners
        can look up on the ENX platform.
      </li>

      <li className="pl-2">
        <strong className="text-foreground">
          It is scoped to your business.
        </strong>{" "}
        You choose which locations, processes and teams are assessed,
        based on what your customers need.
      </li>

      <li className="pl-2">
        <strong className="text-foreground">
          It is built around the automotive supply chain.
        </strong>{" "}
        The catalogue covers information security, prototype protection
        and data protection.
      </li>
    </ol> */}

<ul className="mt-6 list-disc space-y-5 pl-7 marker:text-[#D99A2B] text-[16px] leading-8 text-muted-foreground">
  <li className="pl-2">
    <strong className="font-semibold text-[#B7791F]">
      It is not a certificate in the usual sense.
    </strong>{" "}
    You receive an assessment result and labels that your partners
    can look up on the ENX platform.
  </li>

  <li className="pl-2">
    <strong className="font-semibold text-[#B7791F]">
      It is scoped to your business.
    </strong>{" "}
    You choose which locations, processes and teams are assessed,
    based on what your customers need.
  </li>

  <li className="pl-2">
    <strong className="font-semibold text-[#B7791F]">
      It is built around the automotive supply chain.
    </strong>{" "}
    The catalogue covers information security, prototype protection
    and data protection.
  </li>
</ul>


    {/* <p className="mt-8 text-[16px] leading-9 text-muted-foreground">
      The current catalogue, VDA ISA 6.0, has applied to all new
      assessments since 1 April 2024.
    </p> */}
  </div>
</section>


            {/* =======================================================
          PART 2
          TISAX 6.0 — THE 10 ASSESSMENT OBJECTIVES
      ======================================================== */}

    


            {/* =======================================================
          PART 3
          TISAX ASSESSMENT LEVELS
      ======================================================== */}

      {/* <section className="relative overflow-hidden rounded-[36px] bg-[#163B73] px-10 py-14 md:px-14"> */}
      <section className="py-20">

        <div className="container-x">

          {/* Heading */}

          <h2 className="font-display text-5xl text-center text-foreground">
            TISAX Assessment Levels
          </h2>

          <p className="mt-5 text-center text-xl italic text-gold">
            The assessment level decides how deeply your evidence is checked. The requirements themselves stay the same.
          </p>

          {/* Cards */}

          {/* <div className="mt-14 grid gap-8 lg:grid-cols-3"> */}
          <div className="mt-12 grid gap-6 lg:grid-cols-3 items-start">

            {/* =======================================================
                AL 1
            ======================================================== */}

            <div
             className="
  rounded-3xl
  bg-[#284E89]
  px-6
  py-6
  text-center
"
            >

              {/* Circle */}

              <div
                className="
                  mx-auto
                  flex
                 h-24
w-24
                  items-center
                  justify-center
                  rounded-full
                  bg-[#142B56]
                "
              >

                <span className="font-display text-2xl text-white">
                  AL 1
                </span>

              </div>

              {/* Title */}

              {/* <h3 className="mt-8 text-4xl font-semibold text-white"> */}
              <h3 className="mt-8 text-2xl font-semibold text-white">
                Self-Assessment
              </h3>

              {/* Description */}

              <p className="mx-auto mt-4 max-w-xs text-sm leading-6 text-white/80">
               Self-assessment against the VDA ISA catalogue, with no external check.
              </p>

              {/* Bottom Note */}

              <div
                className="
                 mt-10
rounded-xl
bg-[#162E59]
px-5
py-4
                "
              >

                <p className="text-center text-sm italic text-[#F4C542]">
                  Internal readiness only. It does not produce a label that customers can rely on.
                </p>

              </div>

            </div>
                        {/* =======================================================
                AL 2
            ======================================================== */}

            <div
             className="
  rounded-3xl
  bg-[#284E89]
  px-6
  py-6
  text-center
"
            >

              {/* Circle */}

              <div
                className="
                  mx-auto
                  flex
                 h-24
w-24
                  items-center
                  justify-center
                  rounded-full
                  bg-[#F4C542]
                "
              >

                <span className="font-display text-2xl text-[#163B73]">
                  AL 2
                </span>

              </div>

              {/* Title */}

              <h3 className="mt-8 text-2xl font-semibold text-white">
                Remote Assessment
              </h3>

              {/* Description */}

              <p className="mx-auto mt-4 max-w-xs text-sm leading-6 text-white/80">
               Plausibility check by an approved audit provider, with document review, sampled evidence and interviews, usually done remotely
              </p>

              {/* Bottom Note */}

              <div
                className="
                mt-10
rounded-xl
bg-[#162E59]
px-5
py-4
                "
              >

                <p className="text-center text-sm italic text-[#F4C542]">
                  Information with high protection needs.
                </p>

              </div>

            </div>
                        {/* =======================================================
                AL 3
            ======================================================== */}

            <div
             className="
  rounded-3xl
  bg-[#284E89]
  px-6
  py-6
  text-center
"
            >

              {/* Circle */}

              <div
                className="
                  mx-auto
                  flex
                 h-24
w-24
                  items-center
                  justify-center
                  rounded-full
                  bg-[#F4C542]
                "
              >

                <span className="font-display text-2xl text-[#163B73]">
                  AL 3
                </span>

              </div>

              {/* Title */}

              <h3 className="mt-8 text-2xl font-semibold text-white">
                On-Site Assessment
              </h3>

              {/* Description */}

              <p className="mx-auto mt-4 max-w-xs text-sm leading-6 text-white/80">
                In-depth audit with on-site inspection of systems, facilities and controls.
              </p>

              {/* Bottom Note */}

              <div
                className="
                  mt-10
rounded-xl
bg-[#162E59]
px-5
py-4
                "
              >

                <p className="text-center text-sm italic text-[#F4C542]">
                 Information with very high protection needs, and prototype protection.
                </p>

              </div>

            </div>
            <p className="col-span-full mt-10 w-full text-center text-base leading-8 text-[#163B73] md:text-lg">
  Most suppliers we meet need AL2. Your customer decides the level,
  so ask them in writing before you commit to a scope.
</p>

          </div>

          {/* Bottom Note */}

          {/* <p
            className="
              mt-12
              text-center
              text-2xl
              italic
              text-white/75
            "
          >
            Only AL 2 and AL 3 result in TISAX labels recognised by
            OEMs via the ENX portal.
          </p> */}

        </div>

      </section>

            {/* =======================================================
          PART 4
          WHAT CHANGED WITH VDA ISA 6.0
      ======================================================== */}
{/* 
<section className="py-16 px-6 md:px-12">
<div className="mx-auto max-w-6xl">

  <div className="mx-auto max-w-4xl text-center">

    <h2 className="font-display text-3xl font-semibold text-black md:text-4xl">
      What Changed with VDA ISA 6.0
    </h2>

    <p className="mt-3 text-base italic text-black md:text-lg">
      In force for all new assessments since 1 April 2024
    </p>

  </div>

    <div className="mt-8 grid gap-5 md:grid-cols-2">

      <div className="rounded-2xl bg-[#163B73] p-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E0A328]">
          <svg className="h-5 w-5 text-[#163B73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 11-12 0 6 6 0 0112 0zM7 13l-4 4m0 0l2 2m-2-2h6" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-white">
          New Label Structure
        </h3>
        <p className="mt-2 text-sm leading-6 text-white/75">
          'Info High' and 'Info Very High' replaced by four labels — Confidential, Strictly Confidential, High Availability, Very High Availability — separating confidentiality from availability.
        </p>
      </div>

      <div className="rounded-2xl bg-[#163B73] p-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E0A328]">
          <svg className="h-5 w-5 text-[#163B73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M5 8h14M5 8a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2v-8a2 2 0 00-2-2M5 8l2 2m10-2l-2 2" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-white">
          IT + OT in Scope
        </h3>
        <p className="mt-2 text-sm leading-6 text-white/75">
          Sharper focus on Operational Technology: production networks, controllers and shop-floor systems now sit squarely inside the assessment.
        </p>
      </div>

      <div className="rounded-2xl bg-[#163B73] p-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E0A328]">
          <svg className="h-5 w-5 text-[#163B73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-white">
          ISO/IEC 27001:2022 Alignment
        </h3>
        <p className="mt-2 text-sm leading-6 text-white/75">
          Catalogue references updated to the 2022 revision of ISO 27001, plus mapping to NIST CSF — one ISMS serves multiple frameworks.
        </p>
      </div>

 
      <div className="rounded-2xl bg-[#163B73] p-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E0A328]">
          <svg className="h-5 w-5 text-[#163B73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-white">
          Maturity-Based Assessment
        </h3>
        <p className="mt-2 text-sm leading-6 text-white/75">
          Each control area is rated on maturity levels 0–5; a consistent Level 3 ('Established') is required across all applicable controls.
        </p>
      </div>


      <div className="rounded-2xl bg-[#163B73] p-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E0A328]">
          <svg className="h-5 w-5 text-[#163B73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .672-3 1.5S10.343 11 12 11s3 .672 3 1.5-1.343 1.5-3 1.5m0-6V6m0 1.5V15m0 1.5V15m-7-3a7 7 0 1114 0 7 7 0 01-14 0z" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-white">
          Revised Data Protection Module
        </h3>
        <p className="mt-2 text-sm leading-6 text-white/75">
          The catalogue for 'Data' and 'Special Data' objectives was fully rewritten around Art. 28 GDPR processor obligations.
        </p>
      </div>

      <div className="rounded-2xl bg-[#163B73] p-6">
        <div className="h-11 w-11 rounded-full bg-[#E0A328]" />
        <h3 className="mt-4 text-lg font-semibold text-white">
          English Master Version
        </h3>
        <p className="mt-2 text-sm leading-6 text-white/75">
          English became the leading catalogue language, with translations issued from the English master.
        </p>
      </div>

    </div>

  
    <div className="relative mt-10 overflow-hidden rounded-[24px] bg-gradient-to-r from-[#163B73] via-[#1b4f97] to-[#163B73] p-8 md:p-10">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.08),transparent_45%)]" />

      <div className="relative">

        <div className="inline-flex rounded-full bg-[#E0A328]/15 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase text-[#E0A328]">
          Hawksberg Recommendation
        </div>

        <h3 className="mt-4 text-2xl font-semibold text-white md:text-3xl">
          Prepare Early for VDA ISA 6.0 Requirements
        </h3>

        <p className="mt-4 max-w-3xl text-base leading-7 text-white/85">
          Organisations currently preparing for TISAX should align their Information Security Management System with the latest VDA ISA 6.0 requirements, strengthen supplier security governance, enhance operational technology protection and establish continuous compliance monitoring to ensure successful assessments and long-term customer confidence.
        </p>

      </div>

    </div>

  </div>

</section> */}

{/* =======================================================
    PART 4
    ASSESSMENT OBJECTIVES AND LABELS
======================================================== */}

<section className="py-16 px-6 md:px-12">
  <div className="mx-auto max-w-6xl">

    <div className="mx-auto max-w-4xl text-center">
      <h2 className="font-display text-3xl font-semibold text-black md:text-4xl">
        Assessment Objectives and Labels in VDA ISA 6.0
      </h2>

      <p className="mt-3 text-base italic text-black md:text-lg">
        The objectives you choose determine which parts of the catalogue apply and which labels you receive. There are ten in total.
      </p>
    </div>

    <div className="mt-8 grid gap-5 md:grid-cols-2">

      {/* CARD 01 */}
      <div className="rounded-2xl bg-[#163B73] p-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E0A328]">
          <Lock className="h-5 w-5 text-[#163B73]" />
        </div>

        <h3 className="mt-4 text-lg font-semibold text-white">
          Information Security
        </h3>

        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-white/75">
          <li>Confidential</li>
          <li>Strictly confidential</li>
          <li>High availability</li>
          <li>Very high availability</li>
        </ul>
      </div>

      {/* CARD 02 */}
      <div className="rounded-2xl bg-[#163B73] p-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E0A328]">
          <Car className="h-5 w-5 text-[#163B73]" />
        </div>

        <h3 className="mt-4 text-lg font-semibold text-white">
          Prototype Protection
        </h3>

        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-white/75">
          <li>Proto parts</li>
          <li>Proto vehicles</li>
          <li>Test vehicles</li>
          <li>Proto events</li>
        </ul>
      </div>

      {/* CARD 03 */}
      <div className="rounded-2xl bg-[#163B73] p-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E0A328]">
          <Database className="h-5 w-5 text-[#163B73]" />
        </div>

        <h3 className="mt-4 text-lg font-semibold text-white">
          Data Protection
        </h3>

        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-white/75">
          <li>Data (processing of personal data on behalf of a customer)</li>
          <li>Special data (special categories of personal data)</li>
        </ul>
      </div>

      {/* CARD 04 */}
      <div className="rounded-2xl bg-[#163B73] p-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E0A328]">
          <ShieldCheck className="h-5 w-5 text-[#163B73]" />
        </div>

        <h3 className="mt-4 text-lg font-semibold text-white">
          VDA ISA 6.0 – Key Changes
        </h3>

        <p className="mt-2 text-sm leading-6 text-white/75">
          Version 6.0 separated confidentiality from availability, which means a supplier can now be assessed on one without carrying the weight of the other. It also gave operational technology, such as production networks and shop-floor systems, more attention. If you run a plant, expect your OT environment to be looked at.
        </p>
      </div>

    </div>
  </div>
</section>

{/* =======================================================
    PART 5
    TISAX VS ISO 27001 COMPARISON
======================================================== */}

<section className="px-6 py-16 md:px-12 lg:px-16">
  <div className="mx-auto max-w-6xl">

    {/* Heading */}
    <div className="mx-auto max-w-4xl text-center">
      <h2 className="font-display text-3xl font-semibold text-black md:text-4xl">
        TISAX vs ISO 27001: What Is the Difference?
      </h2>

      <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
        Both deal with information security, but they serve different purposes.
      </p>
    </div>

    {/* Comparison Table */}
    <div className="mt-10 overflow-x-auto rounded-2xl border border-[#D9E1EC] shadow-lg">
      <table className="w-full min-w-[700px] border-collapse text-left">

        <thead>
          <tr className="bg-[#163B73] text-white">
            <th className="w-[23%] px-6 py-5 text-sm font-semibold">
              Comparison
            </th>

            <th className="w-[38.5%] border-l border-white/15 px-6 py-5 text-lg font-semibold text-[#F4C542]">
              TISAX
            </th>

            <th className="w-[38.5%] border-l border-white/15 px-6 py-5 text-lg font-semibold">
              ISO 27001
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[#E2E8F0]">

          <tr className="bg-white">
            <td className="px-6 py-5 font-semibold text-[#163B73]">
              Who asks for it
            </td>
            <td className="border-l border-[#E2E8F0] px-6 py-5 leading-7 text-[#475569]">
              Automotive customers, mainly German OEMs and their suppliers
            </td>
            <td className="border-l border-[#E2E8F0] px-6 py-5 leading-7 text-[#475569]">
              Any industry, any customer
            </td>
          </tr>

          <tr className="bg-[#F5F8FC]">
            <td className="px-6 py-5 font-semibold text-[#163B73]">
              What it is based on
            </td>
            <td className="border-l border-[#E2E8F0] px-6 py-5 leading-7 text-[#475569]">
              VDA ISA catalogue, aligned with ISO 27001
            </td>
            <td className="border-l border-[#E2E8F0] px-6 py-5 leading-7 text-[#475569]">
              ISO/IEC 27001 standard
            </td>
          </tr>

          <tr className="bg-white">
            <td className="px-6 py-5 font-semibold text-[#163B73]">
              Result
            </td>
            <td className="border-l border-[#E2E8F2] px-6 py-5 leading-7 text-[#475569]">
              Assessment result and labels shared through ENX
            </td>
            <td className="border-l border-[#E2E8F2] px-6 py-5 leading-7 text-[#475569]">
              Certificate issued by a certification body
            </td>
          </tr>

          <tr className="bg-[#F5F8FC]">
            <td className="px-6 py-5 font-semibold text-[#163B73]">
              Scope
            </td>
            <td className="border-l border-[#E2E8F2] px-6 py-5 leading-7 text-[#475569]">
              Defined per site and objective
            </td>
            <td className="border-l border-[#E2E8F2] px-6 py-5 leading-7 text-[#475569]">
              Defined by the organisation's ISMS scope
            </td>
          </tr>

          <tr className="bg-white">
            <td className="px-6 py-5 font-semibold text-[#163B73]">
              Extra topics
            </td>
            <td className="border-l border-[#E2E8F2] px-6 py-5 leading-7 text-[#475569]">
              Prototype protection, automotive data handling
            </td>
            <td className="border-l border-[#E2E8F2] px-6 py-5 leading-7 text-[#475569]">
              Not specific to automotive
            </td>
          </tr>

        </tbody>
      </table>
    </div>

  </div>
  {/* ISO 27001 NOTE */}
<div className="mt-8 rounded-2xl border border-[#E0A328]/30 bg-[#F5F8FC] px-6 py-6 md:px-8">
  <p className="text-base leading-8 text-[#475569] md:text-lg">
    If you already hold ISO 27001, you have a strong head start, because
    many controls overlap. It does not replace TISAX, though, and a gap
    assessment will show exactly how much you can reuse. If you are
    starting from scratch, we can build one ISMS that satisfies both.
  </p>
</div>
</section>


            {/* =======================================================
          PART 6
          HAWKSBERG TISAX SERVICES
      ======================================================== */}
{/* <section className="px-6 py-16 md:px-12 lg:px-16">

  <div className="mx-auto max-w-5xl text-center">

    <h2 className="font-serif text-4xl font-normal text-black md:text-5xl">
      Our TISAX Services
    </h2>

    <p className="mt-3 text-lg italic text-black">
      End-to-end support from scoping to label
    </p>

  </div>

  <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">

    <div className="flex items-start gap-5 rounded-xl bg-[#0D2A54] p-7">
      <span className="text-5xl font-bold leading-none text-[#E0A328]">
        01
      </span>
      <div>
        <h3 className="text-lg font-bold text-white">
          Scoping &amp; ENX Registration Support
        </h3>
        <p className="mt-2 text-sm leading-6 text-white/80">
          Define assessment scope, locations, objectives and assessment
          level; guide portal registration.
        </p>
      </div>
    </div>

    <div className="flex items-start gap-5 rounded-xl bg-[#1E4D8B] p-7">
      <span className="text-5xl font-bold leading-none text-[#E0A328]">
        02
      </span>
      <div>
        <h3 className="text-lg font-bold text-white">
          Gap Assessment (VDA ISA 6.0)
        </h3>
        <p className="mt-2 text-sm leading-6 text-white/80">
          Department-wise maturity evaluation against all applicable
          controls, with a prioritised remediation roadmap.
        </p>
      </div>
    </div>

    <div className="flex items-start gap-5 rounded-xl bg-[#0D2A54] p-7">
      <span className="text-5xl font-bold leading-none text-[#E0A328]">
        03
      </span>
      <div>
        <h3 className="text-lg font-bold text-white">
          ISMS Design &amp; Documentation
        </h3>
        <p className="mt-2 text-sm leading-6 text-white/80">
          Policies, procedures, risk assessments, SoA and evidence packs —
          audit-ready and tailored to your operations.
        </p>
      </div>
    </div>

    <div className="flex items-start gap-5 rounded-xl bg-[#1E4D8B] p-7">
      <span className="text-5xl font-bold leading-none text-[#E0A328]">
        04
      </span>
      <div>
        <h3 className="text-lg font-bold text-white">
          Control Implementation Support
        </h3>
        <p className="mt-2 text-sm leading-6 text-white/80">
          Identity &amp; access, endpoint, network segmentation, patching,
          incident response, supplier and prototype controls.
        </p>
      </div>
    </div>

    <div className="flex items-start gap-5 rounded-xl bg-[#0D2A54] p-7">
      <span className="text-5xl font-bold leading-none text-[#E0A328]">
        05
      </span>
      <div>
        <h3 className="text-lg font-bold text-white">
          Training &amp; Awareness
        </h3>
        <p className="mt-2 text-sm leading-6 text-white/80">
          Management briefings, employee awareness and internal auditor
          training for sustained compliance.
        </p>
      </div>
    </div>

    <div className="flex items-start gap-5 rounded-xl bg-[#1E4D8B] p-7">
      <span className="text-5xl font-bold leading-none text-[#E0A328]">
        06
      </span>
      <div>
        <h3 className="text-lg font-bold text-white">
          Assessment Readiness &amp; Audit Support
        </h3>
        <p className="mt-2 text-sm leading-6 text-white/80">
          Self-assessment, mock audits, evidence review and support through
          the AL 2 / AL 3 assessment to label issuance.
        </p>
      </div>
    </div>

  </div>

</section> */}

{/* =======================================================
    PART 5
    OUR TISAX CONSULTING SERVICES
======================================================== */}

<section className="px-6 py-16 md:px-12 lg:px-16">

  <div className="mx-auto max-w-5xl text-center">

    <h2 className="font-serif text-4xl font-normal text-black md:text-5xl">
      Our TISAX Consulting Services
    </h2>

    <p className="mt-3 text-lg italic text-black">
      We support you from the first customer email to the day your label appears on the portal.
    </p>

  </div>

  <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">

    <div className="flex items-start gap-5 rounded-xl bg-[#0D2A54] p-7">
      <span className="text-5xl font-bold leading-none text-[#E0A328]">
        01
      </span>
      <div>
        <h3 className="text-lg font-bold text-white">
          Scoping and ENX registration guidance
        </h3>
        <p className="mt-2 text-sm leading-6 text-white/80">
          We confirm what your customer needs, define sites, objectives and assessment level, and walk you through registration on the ENX portal so the scope is right from day one.
        </p>
      </div>
    </div>

    <div className="flex items-start gap-5 rounded-xl bg-[#1E4D8B] p-7">
      <span className="text-5xl font-bold leading-none text-[#E0A328]">
        02
      </span>
      <div>
        <h3 className="text-lg font-bold text-white">
          VDA ISA 6.0 gap assessment
        </h3>
        <p className="mt-2 text-sm leading-6 text-white/80">
          We review every applicable control, rate maturity department by department, and give you a prioritised action list. You see where you stand before any external auditor does.
        </p>
      </div>
    </div>

    <div className="flex items-start gap-5 rounded-xl bg-[#0D2A54] p-7">
      <span className="text-5xl font-bold leading-none text-[#E0A328]">
        03
      </span>
      <div>
        <h3 className="text-lg font-bold text-white">
          ISMS design and documentation
        </h3>
        <p className="mt-2 text-sm leading-6 text-white/80">
          Policies, procedures, risk assessment and evidence records, written around the way your teams actually work, not copied from a template.
        </p>
      </div>
    </div>

    <div className="flex items-start gap-5 rounded-xl bg-[#1E4D8B] p-7">
      <span className="text-5xl font-bold leading-none text-[#E0A328]">
        04
      </span>
      <div>
        <h3 className="text-lg font-bold text-white">
          Control implementation support
        </h3>
        <p className="mt-2 text-sm leading-6 text-white/80">
          Access management, endpoint and network security, patching, incident response, supplier security and prototype handling. We help your IT and operations teams put the controls in place and keep proof of them.
        </p>
      </div>
    </div>

    <div className="flex items-start gap-5 rounded-xl bg-[#0D2A54] p-7">
      <span className="text-5xl font-bold leading-none text-[#E0A328]">
        05
      </span>
      <div>
        <h3 className="text-lg font-bold text-white">
          Training and awareness
        </h3>
        <p className="mt-2 text-sm leading-6 text-white/80">
          Short sessions for management, employees and internal auditors, so the controls survive after the audit day.
        </p>
      </div>
    </div>

    <div className="flex items-start gap-5 rounded-xl bg-[#1E4D8B] p-7">
      <span className="text-5xl font-bold leading-none text-[#E0A328]">
        06
      </span>
      <div>
        <h3 className="text-lg font-bold text-white">
          Audit readiness and assessment support
        </h3>
        <p className="mt-2 text-sm leading-6 text-white/80">
          Self-assessment review, mock audit, evidence check and support during the AL2 or AL3 assessment, up to label issuance.
        </p>
      </div>
    </div>

  </div>

</section>

{/* =======================================================
    PART 6 - HOW WE TAKE YOU TO A TISAX LABEL
======================================================== */}

<section className="bg-white px-6 py-16 md:px-12 md:py-20">
  <div className="mx-auto max-w-6xl">

    <div className="mx-auto max-w-4xl text-center">
      <h2 className="font-display text-3xl font-semibold text-black md:text-4xl">
        How We Take You to a TISAX Label
      </h2>
      <div className="mx-auto mt-4 gold-divider" />
    </div>

    <div className="mt-12 grid gap-5 md:grid-cols-2">
      {[
        {
          title: "Understand the requirement",
          text: "We read your customer's request and confirm the label, level and deadline.",
        },
        {
          title: "Scope and register",
          text: "Sites, processes and objectives are fixed, and your ENX registration is prepared.",
        },
        {
          title: "Gap assessment",
          text: "We measure your current maturity against VDA ISA 6.0.",
        },
        {
          title: "Build and remediate",
          text: "Risks are assessed, documents are written and controls are implemented.",
        },
        {
          title: "Self-assessment and mock audit",
          text: "We rehearse the assessment so nothing is a surprise.",
        },
        {
          title: "External assessment and label",
          text: "An ENX-approved audit provider assesses you, and we support you through findings and closure.",
        },
      ].map((step, index) => (
        <div
          key={step.title}
          className="flex items-start gap-5 rounded-xl bg-[#163B73] p-6 md:p-7"
        >
          <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[#E0A328] text-lg font-bold text-[#163B73]">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div>
            <h3 className="text-lg font-semibold text-white">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-white/80">
              {step.text}
            </p>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-8 rounded-xl bg-[#1E4D8B] px-6 py-6 md:px-8">
      <p className="text-base leading-8 text-white md:text-lg">
        <strong className="text-[#F4C542]">
          How long does it take?
        </strong>{" "}
        Most projects run between four and nine months from kick-off to label,
        depending on scope, current maturity and assessment level. Companies
        with ISO 27001 already in place often move faster.
      </p>
    </div>

  </div>
</section>


{/* =======================================================
    PART 7 - WHAT AFFECTS THE COST
======================================================== */}

<section className="bg-[#F8F7F3] px-6 py-16 md:px-12 md:py-20">
  <div className="mx-auto max-w-6xl">

    <div className="mx-auto max-w-4xl text-center">
      <h2 className="font-display text-3xl font-semibold text-black md:text-4xl">
        What Affects the Cost of TISAX Certification?
      </h2>
      <div className="mx-auto mt-4 gold-divider" />
      <p className="mt-5 text-base leading-8 text-muted-foreground md:text-lg">
        No two TISAX projects cost the same, so we avoid quoting a flat price
        before understanding your scope. The main factors are:
      </p>
    </div>

    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[
        "Number of sites and employees in scope",
        "Assessment level (AL2 or AL3) and number of objectives",
        "Your current security maturity and existing certifications",
        "Whether prototype protection or OT environments are included",
        "The audit provider's fees, which are charged separately from consulting",
      ].map((factor, index) => (
        <div
          key={factor}
          className="flex items-start gap-4 rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm"
        >
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#E0A328] font-bold text-[#163B73]">
            {index + 1}
          </span>
          <p className="text-[15px] leading-7 text-[#334155]">
            {factor}
          </p>
        </div>
      ))}
    </div>

    <div className="mt-8 rounded-xl bg-[#163B73] px-6 py-7 md:px-8">
      <p className="text-base leading-8 text-white md:text-lg">
        After a short scoping call we send a clear proposal with consulting
        effort and a realistic timeline. The audit provider's fee is paid
        directly to them.
      </p>
    </div>

  </div>
</section>


{/* =======================================================
    PART 8 - WHY CHOOSE HAWKSBERG
======================================================== */}

<section className="bg-white px-6 py-16 md:px-12 md:py-20">
  <div className="mx-auto max-w-6xl">

    <div className="mx-auto max-w-4xl text-center">
      <h2 className="font-display text-3xl font-semibold text-black md:text-4xl">
        Why Suppliers Choose Hawksberg International
      </h2>
      <div className="mx-auto mt-4 gold-divider" />
    </div>

    <div className="mt-10 grid gap-5 md:grid-cols-2">
      {[
        {
          title: "Gap-first approach.",
          text: "We find the weak spots before the external assessor does.",
        },
        {
          title: "Plain communication.",
          text: "You get clear actions, not a stack of jargon.",
        },
        {
          title: "Right-sized scope.",
          text: "We aim to protect you from over-scoping, which wastes time and budget.",
        },
        {
          title: "Local support.",
          text: "",
        },
        {
          title: "Combined expertise.",
          text: "Our team also advises on ISO 27001, IATF 16949 and DPDP compliance, so your frameworks can work together instead of competing for attention.",
        },
      ].map((item, index) => (
        <div
          key={item.title}
          className="flex items-start gap-4 rounded-xl border border-[#E2E8F0] bg-[#F8F7F3] p-6"
        >
          <span className="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#E0A328] text-[#163B73]">
            ✓
          </span>
          <div>
            <h3 className="font-semibold text-[#163B73]">
              {item.title}
            </h3>
            {item.text && (
              <p className="mt-2 text-sm leading-7 text-[#475569]">
                {item.text}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>

  </div>
</section>


{/* =======================================================
    PART 9 - FREQUENTLY ASKED QUESTIONS
======================================================== */}

<section className="bg-[#F8F7F3] px-6 py-16 md:px-12 md:py-20">
  <div className="mx-auto max-w-5xl">

    <div className="mx-auto max-w-4xl text-center">
      <h2 className="font-display text-3xl font-semibold text-black md:text-4xl">
        Frequently Asked Questions
      </h2>
      <div className="mx-auto mt-4 gold-divider" />
    </div>

    <div className="mt-10 space-y-4">
      {[
        {
          q: "Is TISAX mandatory for suppliers in India?",
          a: "Not by law. It becomes mandatory in practice when a German OEM or Tier-1 customer makes it a condition of doing business with you.",
        },
        {
          q: "How long is a TISAX label valid?",
          a: "Labels are valid for three years. You will need a new assessment before they expire.",
        },
        {
          q: "What is the difference between AL2 and AL3?",
          a: "AL2 is a plausibility check, usually remote. AL3 is a deeper audit with on-site inspection. Your customer decides which one you need.",
        },
        {
          q: "Can ISO 27001 replace TISAX?",
          a: "No. ISO 27001 helps a great deal because many controls overlap, but customers who ask for TISAX expect a TISAX assessment result.",
        },
        {
          q: "Which TISAX label do I need?",
          a: "That depends on the data you handle and what your customer has requested. Common examples are Confidential, Strictly confidential and Proto parts. We confirm this in the scoping stage.",
        },
        {
          q: "Do I need consultants to get TISAX?",
          a: "Not strictly. Many first-time companies find the catalogue hard to interpret, and a failed or over-scoped assessment is expensive, so most choose to have a guide.",
        },
        {
          q: "How do I register on the ENX portal?",
          a: "You create a participant account, define your scope and choose an approved audit provider. We guide you through each step so the scope matches your customer's expectation.",
        },
        {
          q: "Do you help with TISAX in cities outside Chennai?",
          a: "Yes. We work with suppliers across India and can run most stages remotely.",
        },
      ].map((faq, index) => (
        <details
          key={faq.q}
          className="group rounded-xl border border-[#DCE3ED] bg-white p-5 shadow-sm"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-[#163B73] md:text-lg">
            <span>{faq.q}</span>
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#E0A328] text-[#163B73] transition-transform group-open:rotate-45">
              +
            </span>
          </summary>

          <p className="mt-4 border-t border-[#E2E8F0] pt-4 text-sm leading-7 text-[#475569] md:text-base">
            {faq.a}
          </p>
        </details>
      ))}
    </div>

  </div>
</section>



            {/* =======================================================
          PART 7
          YOUR TISAX JOURNEY
      ======================================================== */}
     <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
       <div className="mx-auto max-w-5xl text-center">
  <h2 className="font-display text-4xl font-semibold text-black md:text-5xl">
    Your TISAX Journey with Hawksberg
  </h2>

  <p className="mt-3 text-base italic text-black md:text-lg">
    A proven six-step path to your TISAX label
  </p>
</div>

        {/* Roadmap */}
        <div className="mt-16">
          {/* Desktop / tablet: horizontal roadmap */}
          <div className="hidden md:flex md:items-start md:justify-between">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === STEPS.length - 1;
              return (
                <div key={index} className="flex flex-1 items-start">
                  <div className="flex flex-col items-center">
                    <div
                      className="
                        flex
                        h-24
                        w-24
                        flex-none
                        items-center
                        justify-center
                        rounded-full
                        bg-[#E0A328]
                      "
                    >
                      <Icon
                        className="h-10 w-10 text-[#163B73]"
                        strokeWidth={2.25}
                      />
                    </div>
                    <p className="mt-4 max-w-[9rem] text-center text-sm font-semibold leading-snug text-black">
                      {step.label}
                    </p>
                  </div>

                  {!isLast && (
                    <div
                      className="
                        mt-12
                        h-[3px]
                        flex-1
                        bg-[#E0A328]
                      "
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile: vertical roadmap */}
          {/* <div className="flex flex-col items-start md:hidden">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === STEPS.length - 1;
              return (
                <div key={index} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div
                      className="
                        flex
                        h-20
                        w-20
                        flex-none
                        items-center
                        justify-center
                        rounded-full
                        bg-[#E0A328]
                      "
                    >
                      <Icon
                        className="h-8 w-8 text-[#163B73]"
                        strokeWidth={2.25}
                      />
                    </div>
                    {!isLast && (
                      <div className="my-2 h-12 w-[3px] flex-1 bg-[#E0A328]" />
                    )}
                  </div>
                  <p className="pt-6 pb-8 text-base font-semibold leading-snug text-white">
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div> */}
          <div className="flex flex-col md:hidden">
  {STEPS.map((step, index) => {
    const Icon = step.icon;
    const isLast = index === STEPS.length - 1;

    return (
      <div
        key={index}
        className="flex items-start gap-5"
      >
        {/* Icon */}
        <div className="flex flex-col items-center flex-none">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E0A328]">
            <Icon
              className="h-8 w-8 text-[#163B73]"
              strokeWidth={2.25}
            />
          </div>

          {!isLast && (
            <div className="my-2 h-12 w-[3px] bg-[#E0A328]" />
          )}
        </div>

        {/* Text */}
        <div className="flex-1 pt-6">
          <p className="text-base font-semibold leading-snug text-black">
            {step.label}
          </p>
        </div>
      </div>
    );
  })}
</div>
        </div>

        {/* Timeline info box */}
        <div
          className="
            mt-14
            rounded-2xl
            bg-[#1f4d8b]
            px-8
            py-6
            md:px-10
            md:py-7
          "
        >
          <p className="text-base leading-8 text-white md:text-lg">
            <span className="font-semibold text-[#E0A328]">
              Typical timeline:
            </span>{" "}
            4–9 months from kick-off to label, depending on scope, current
            maturity and assessment level. Our gap-first approach ensures no
            surprises at the external assessment.
          </p>
        </div>
      </div>
    </section>

{/* =======================================================
    FINAL CTA - TALK TO A TISAX SPECIALIST
======================================================== */}

<section className="relative overflow-hidden bg-[#102B52] px-6 py-16 md:px-12 md:py-20">

  {/* Decorative background */}
  <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />
  <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full border border-[#E0A328]/20" />

  <div className="relative mx-auto max-w-6xl">

    <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">

      {/* Left content */}
      <div>
        <span className="inline-flex items-center rounded-full border border-[#E0A328]/40 bg-[#E0A328]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#F4C542]">
          Let's Get Started
        </span>

        <h2 className="mt-6 max-w-2xl font-display text-3xl font-semibold leading-tight text-white md:text-5xl">
          Talk to a{" "}
          <span className="text-[#F4C542]">
            TISAX Specialist
          </span>
        </h2>

        <p className="mt-6 max-w-xl text-base leading-8 text-white/75 md:text-lg">
          Tell us what your customer has asked for and we will tell you,
          in plain terms, what it will take and how long.
        </p>

        <a
          href="/contact"
          className="mt-8 inline-flex items-center justify-center gap-3 rounded-lg bg-[#E0A328] px-7 py-4 text-sm font-bold text-[#102B52] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#F4C542]"
        >
          Get a Free TISAX Evaluation
          <ArrowRight className="h-5 w-5" />
        </a>
      </div>

      {/* Right contact card */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-md md:p-8">

        <h3 className="text-xl font-semibold text-white">
          Contact Hawksberg International
        </h3>

        <p className="mt-2 text-sm leading-6 text-white/60">
          Connect with our team for TISAX consulting support.
        </p>

        <div className="mt-7 space-y-6">

          {/* Phone */}
          <a
            href="tel:+919080583283"
            className="flex items-start gap-4 transition-colors hover:text-[#F4C542]"
          >
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#E0A328]/15 text-[#F4C542]">
              <Phone className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-xs uppercase tracking-wider text-white/50">
                Phone
              </span>
              <span className="mt-1 block font-semibold text-white">
                +91 90805 83283
              </span>
            </span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/919080583283"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 transition-colors hover:text-[#F4C542]"
          >
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#E0A328]/15 text-[#F4C542]">
              <MessageCircle className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-xs uppercase tracking-wider text-white/50">
                WhatsApp
              </span>
              <span className="mt-1 block font-semibold text-white">
                +91 90805 83283
              </span>
            </span>
          </a>

          {/* Email */}
          <a
            href="mailto:sebastian@hawksberginternational.com"
            className="flex items-start gap-4 transition-colors hover:text-[#F4C542]"
          >
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#E0A328]/15 text-[#F4C542]">
              <Mail className="h-5 w-5" />
            </span>
            {/* <span className="min-w-0">
              <span className="block text-xs uppercase tracking-wider text-white/50">
                Email
              </span>
              <span className="mt-1 block break-all font-semibold text-white">
                sebastian@hawksberginternational.com
              </span>
            </span> */}
            <span className="min-w-0 flex-1">
  <span className="block text-xs uppercase tracking-wider text-white/50">
    Email
  </span>
  <span className="mt-1 block text-sm font-semibold leading-6 text-white [overflow-wrap:anywhere]">
    sebastian@hawksberginternational.com
  </span>
</span>
          </a>

          {/* Office */}
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#E0A328]/15 text-[#F4C542]">
              <MapPin className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-xs uppercase tracking-wider text-white/50">
                Office
              </span>
              <span className="mt-1 block text-sm font-semibold leading-6 text-white">
                Hawksberg International,<br />
                Thirumalai Nagar, Perungudi,<br />
                Chennai 600096
              </span>
            </span>
          </div>

        </div>
      </div>

    </div>
  </div>
</section>

    </div>
  );
}
