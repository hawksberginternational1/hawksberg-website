import {
  ShieldCheck,
  CalendarDays,
  BadgeCheck,
  TrendingUp,
  ArrowRight,
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
    <div className="mt-20 space-y-24">

      {/* =======================================================
          WHAT IS TISAX®
      ======================================================== */}

      <section>
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.9fr]">

          {/* LEFT */}

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

          {/* RIGHT */}

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

      </section>

            {/* =======================================================
          PART 2
          TISAX 6.0 — THE 10 ASSESSMENT OBJECTIVES
      ======================================================== */}

      <section>

        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-gold">
            VDA ISA 6.0
          </p>

          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            TISAX 6.0 — The 10 Assessment Objectives
          </h2>

          <div className="mx-auto mt-5 gold-divider" />

          <p className="mx-auto mt-7 max-w-4xl text-lg leading-8 text-muted-foreground">
            TISAX assessments are performed using the VDA ISA 6.0 catalogue.
            Depending on your organisation's business activities, one or more
            assessment objectives become applicable. Each objective evaluates
            specific security requirements across information security,
            prototype protection and data protection.
          </p>

        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">

          {/* =======================================================
              OBJECTIVE CARD 1
              INFORMATION SECURITY
          ======================================================== */}

          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-[#1f4d8b]
              bg-[#163B73]
              shadow-xl
            "
          >

            <div className="border-b border-white/10 p-3">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#E0A328]">
                  <Lock className="h-7 w-7 text-[#163B73]" />
                </div>

                <div>

                  <p className="text-xs uppercase tracking-[0.25em] text-white/70">
                    Objectives 1 – 5
                  </p>

                  <h3 className="mt-1 text-2xl font-semibold text-white">
                    Information Security
                  </h3>

                </div>

              </div>

            </div>

            <div className="space-y-4 p-7">

              {/* Objective 1 */}

              <div
                className="
                  // rounded-2xl
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  p-5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white/10
                "
              >

                <div className="flex gap-4">

                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-[#E0A328]" />

                  <div>

                    <h4 className="text-base font-semibold text-white">
                      Confidential
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-white/75">
                     High protection needs — AL 2
                    </p>

                  </div>

                </div>

              </div>

              {/* Objective 2 */}

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white/10
                "
              >

                <div className="flex gap-4">

                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-[#E0A328]" />

                  <div>

                    <h4 className="text-base font-semibold text-white">
                      Strictly Confidential
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-white/75">
                     Very high protection — AL 3
                    </p>

                  </div>

                </div>

              </div>

              {/* Continue in Part 2A-2 */}

                            {/* Objective 3 */}

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white/10
                "
              >

                <div className="flex gap-4">

                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-[#E0A328]" />

                  <div>

                    <h4 className="text-base font-semibold text-white">
                      High Availability
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-white/75">
                     Production-relevant suppliers — AL 2
                    </p>

                  </div>

                </div>

              </div>

              {/* Objective 4 */}

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white/10
                "
              >

                <div className="flex gap-4">

                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-[#E0A328]" />

                  <div>

                    <h4 className="text-base font-semibold text-white">
                      Very High Availability
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-white/75">
                      JIT / JIS critical suppliers — AL 3

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

                    {/* =======================================================
              OBJECTIVE CARD 2
              PROTOTYPE PROTECTION
          ======================================================== */}

          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-[#1f4d8b]
              bg-[#163B73]
              shadow-xl
            "
          >

            <div className="border-b border-white/10 p-3">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E0A328]">
                  <Car className="h-7 w-7 text-[#163B73]" />
                </div>

                <div>

                  <p className="text-xs uppercase tracking-[0.25em] text-white/70">
                    Objectives 6 – 8
                  </p>

                  <h3 className="mt-1 text-2xl font-semibold text-white">
                    Prototype Protection
                  </h3>

                </div>

              </div>

            </div>

            <div className="space-y-4 p-7">

              {/* Objective 6 */}

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white/10
                "
              >

                <div className="flex gap-4">

                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-[#E0A328]" />

                  <div>

                    <h4 className="text-base font-semibold text-white">
                      Data
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-white/75">
                      Processing personal data (Art. 28 GDPR).
                    </p>

                  </div>

                </div>

              </div>

              {/* Objective 7 */}

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white/10
                "
              >

                <div className="flex gap-4">

                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-[#E0A328]" />

                  <div>

                    <h4 className="text-base font-semibold text-white">
                      Special Data

                    </h4>

                    <p className="mt-1 text-xs leading-5 text-white/75">
                      Special categories (Art. 9 GDPR).
                    </p>

                  </div>

                </div>

              </div>

              

            </div>

          </div>

                    {/* =======================================================
              OBJECTIVE CARD 3
              DATA PROTECTION & CONNECTED SERVICES
          ======================================================== */}

          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-[#1f4d8b]
              bg-[#163B73]
              shadow-xl
            "
          >

            <div className="border-b border-white/10 p-2">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E0A328]">
                  <Database className="h-7 w-7 text-[#163B73]" />
                </div>

                <div>

                  <p className="text-xs uppercase tracking-[0.25em] text-white/70">
                    Objectives 9 – 10
                  </p>

                  <h3 className="mt-1 text-2xl font-semibold text-white">
                    Data Protection & Connected Services
                  </h3>

                </div>

              </div>

            </div>

            <div className="space-y-4 p-7">

              {/* Objective 9 */}

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white/10
                "
              >

                <div className="flex gap-4">

                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-[#E0A328]" />

                  <div>

                    <h4 className="text-base font-semibold text-white">
                     Proto Parts
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-white/75">
                    Prototype parts & components.
                    </p>

                  </div>

                </div>

              </div>

              {/* Objective 10 */}

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white/10
                "
              >

                <div className="flex gap-4">

                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-[#E0A328]" />

                  <div>

                    <h4 className="text-base font-semibold text-white">
                      Proto Vehicles
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-white/75">
                      Complete prototype vehicles
                    </p>

                  </div>

                </div>

              </div>

                {/* Objective 11 */}

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white/10
                "
              >

                <div className="flex gap-4">

                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-[#E0A328]" />

                  <div>

                    <h4 className="text-base font-semibold text-white">
                     Test Vehicles
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-white/75">
                    Camouflaged road / proving-ground use

                    </p>

                  </div>

                </div>

              </div>

                {/* Objective 11 */}

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white/10
                "
              >

                <div className="flex gap-4">

                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-[#E0A328]" />

                  <div>

                    <h4 className="text-base font-semibold text-white">
                     Proto Events

                    </h4>

                    <p className="mt-1 text-xs leading-5 text-white/75">
                    Events, film & photo shoots

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


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
            Same requirements — the level defines audit depth, not difficulty
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
                Completion of the VDA ISA self-assessment without
                external verification.
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
                  No recognised TISAX label — internal use only.
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
                Plausibility check by an ENX-approved audit provider —
                document review, evidence sampling and video interviews.
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
                  For HIGH protection needs — e.g., "Confidential",
                  "High Availability".
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
                Comprehensive on-site audit — direct system
                verification, interviews, facility inspection and
                validation of implemented security controls.
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
                  For VERY HIGH protection needs — "Strictly
                  Confidential", prototype protection and critical
                  automotive information.
                </p>

              </div>

            </div>

          </div>

          {/* Bottom Note */}

          <p
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
          </p>

        </div>

      </section>

            {/* =======================================================
          PART 4
          WHAT CHANGED WITH VDA ISA 6.0
      ======================================================== */}
{/* <section className="bg-[#0B1E3D] py-16 px-6 md:px-12"> */}
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

      {/* ===================== CARD 01 ===================== */}
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

      {/* ===================== CARD 02 ===================== */}
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

      {/* ===================== CARD 03 ===================== */}
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

      {/* ===================== CARD 04 ===================== */}
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

      {/* ===================== CARD 05 ===================== */}
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

      {/* ===================== CARD 06 ===================== */}
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

    {/* =======================================================
        HAWKSBERG RECOMMENDATION
    ======================================================== */}
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

</section>

            {/* =======================================================
          PART 5
          HAWKSBERG TISAX SERVICES
      ======================================================== */}
<section className="px-6 py-16 md:px-12 lg:px-16">

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

</section>

            {/* =======================================================
          PART 6
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

    </div>
  );
}