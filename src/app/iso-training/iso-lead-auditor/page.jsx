import Link from "next/link";
import Layout from "@/components/Layout";
import leadauditorImg from "@/assets/isotraining/leadauditor.webp";

export const metadata = {
  title: "ISO Lead Auditor Training in Chennai (5-Day) | Hawksberg",
  description:
    "ISO Lead Auditor training in Chennai for quality, EHS and IT professionals. Expert trainers, real case studies and a course certificate. Book your seat now.",
  keywords:
    "ISO Lead Auditor Training Chennai, ISO Lead Auditor Course, ISO 9001 Lead Auditor, ISO 14001 Lead Auditor, ISO 45001 Lead Auditor, ISO 27001 Lead Auditor",
  alternates: {
    canonical: "/iso-training/iso-lead-auditor",
  },
};

export default function ISOLeadAuditorTraining() {
  return (
    <Layout>
      <main className="bg-white text-[#172746]">

        {/* =========================================================
            BANNER
        ========================================================= */}
        <section className="relative overflow-hidden">
          <div className="relative min-h-[360px] md:min-h-[430px]">

            <img
              src={leadauditorImg.src}
              alt="ISO Lead Auditor Training in Chennai"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="relative mx-auto flex min-h-[360px] max-w-7xl items-center px-6 py-12 md:min-h-[430px] md:px-10">
              <div className="max-w-6xl">

                <p className="text-base font-medium text-[#D8A43C] md:text-lg">
                  <span className="font-bold">
                    Hawksberg International
                  </span>
                  {" · Chennai"}
                </p>

                <h1 className="mt-4 max-w-[1000px] font-display text-3xl leading-tight text-white md:text-4xl">
                  ISO Lead Auditor Training in Chennai
                </h1>

                <p className="mt-5 max-w-[1000px] text-base leading-7 text-white md:text-lg">
                  Learn to plan, lead and report third-party and second-party
                  management system audits.
                  <br />
                  Practical 5-day course for ISO 9001, 14001, 45001 and 27001.
                </p>

              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            INTRODUCTION
        ========================================================= */}
        <section className="bg-white py-8 md:py-10">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="max-w-5xl">

              <p className="text-base leading-7 text-[#243653] md:text-base">
                If you work in quality, safety or information security, you
                have probably thought about moving from doing audits to
                leading them. A 5-day ISO Lead Auditor course is the usual
                route. This guide explains what the training involves, how
                the five days are structured, and how to decide whether it is
                right for you.
              </p>

            </div>
          </div>
        </section>

        {/* =========================================================
            WHY CHOOSE THIS COURSE
        ========================================================= */}
        {/* <section className="bg-white py-8 md:py-10">
          <div className="mx-auto max-w-7xl px-6 md:px-10">

            <h2 className="font-display text-3xl leading-tight text-[#142342] md:text-[36px]">
              Why choose this course
            </h2>

            <div className="mt-8 grid gap-x-16 gap-y-4 md:grid-cols-2">

              <div>
                <h3 className="font-display text-xl text-[#142342]">
                  Practical audit skills
                </h3>

                <p className="mt-2 text-base leading-7 text-[#243653] md:text-base">
                  Role plays, case studies and mock audits, not just theory.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl text-[#142342]">
                  Expert trainers
                </h3>

                <p className="mt-2 text-base leading-7 text-[#243653] md:text-base">
                  Learn from experienced auditors and implementers.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl text-[#142342]">
                  Career growth
                </h3>

                <p className="mt-2 text-base leading-7 text-[#243653] md:text-base">
                  Qualify for auditor, consultant and compliance roles.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl text-[#142342]">
                  Certificate
                </h3>

                <p className="mt-2 text-base leading-7 text-[#243653] md:text-base">
                  Course completion certificate and exam on the final day.
                </p>
              </div>

            </div>
          </div>
        </section> */}
        {/* Why choose this course */}
{/* <section className="bg-[#f8fafc] py-20 md:py-24"> */}
<section className="bg-[#f8fafc] py-4 md:py-6">
  <div className="mx-auto max-w-6xl px-6">
    <div className="mb-12 max-w-3xl">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#c88a24]">
        Why choose this course
      </p>

      <h2 className="font-display text-4xl leading-tight text-[#172746] md:text-5xl">
        Build practical lead auditor skills
      </h2>

      <div className="mt-5 h-[2px] w-16 bg-[#c88a24]" />
    </div>

    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
        {/* <h3 className="text-xl font-semibold text-[#172746]"> */}
        <h3 className="text-2xl text-[#D89A2B]">
          Practical audit skills
        </h3>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Role plays, case studies and mock audits, not just theory.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
        {/* <h3 className="text-xl font-semibold text-[#172746]"> */}
        <h3 className="text-2xl text-[#D89A2B]">
          Expert trainers
        </h3>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Learn from experienced auditors and implementers.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
        {/* <h3 className="text-xl font-semibold text-[#172746]"> */}
        <h3 className="text-2xl text-[#D89A2B]">
          Career growth
        </h3>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Qualify for auditor, consultant and compliance roles.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
        {/* <h3 className="text-xl font-semibold text-[#172746]"> */}
        <h3 className="text-2xl text-[#D89A2B]">
          Certificate
        </h3>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Course completion certificate and exam on the final day.
        </p>
      </div>
    </div>
  </div>
</section>

        {/* =========================================================
            WHAT YOU WILL LEARN
        ========================================================= */}
        <section className="bg-white py-8 md:py-10">
          <div className="mx-auto max-w-7xl px-6 md:px-10">

            <h2 className="font-display text-3xl leading-tight text-[#142342] md:text-[36px]">
              What you will learn?
            </h2>

            <ul className="mt-6 list-disc space-y-2 pl-6 text-base leading-7 text-[#243653] md:text-base">
              <li>
                Management system audit principles and ISO 19011 guidelines
              </li>
              <li>
                Planning and leading an audit team
              </li>
              <li>
                Opening meeting, evidence collection and interviewing
                techniques
              </li>
              <li>
                Writing nonconformity reports and audit findings
              </li>
              <li>
                Closing meeting, audit reports and follow-up
              </li>
              <li>
                Certification process and auditor competence
              </li>
            </ul>

          </div>
        </section>

        {/* =========================================================
            COURSE DETAILS
        ========================================================= */}
        {/* <section className="bg-white py-8 md:py-10"> */}
        {/* <section className="bg-white pt-0 pb-16 md:pb-20"> */}
        <section className="bg-white pt-0 pb-4 md:pb-6">
          <div className="mx-auto max-w-7xl px-6 md:px-10">

            <h2 className="font-display text-3xl leading-tight text-[#142342] md:text-[36px]">
              Course details
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">

              <div className="rounded-lg border border-[#e2e6eb] bg-[#fafbfc] p-5">
                <p className="text-sm font-semibold uppercase tracking-wide text-[#D89A2B]">
                  Duration
                </p>
                <p className="mt-2 text-base text-[#243653]">
                  5 days (about 40 hours)
                </p>
              </div>

              <div className="rounded-lg border border-[#e2e6eb] bg-[#fafbfc] p-5">
                <p className="text-sm font-semibold uppercase tracking-wide text-[#D89A2B]">
                  Mode
                </p>
                <p className="mt-2 text-base text-[#243653]">
                  Classroom in Chennai / live online
                </p>
              </div>

              <div className="rounded-lg border border-[#e2e6eb] bg-[#fafbfc] p-5">
                <p className="text-sm font-semibold uppercase tracking-wide text-[#D89A2B]">
                  Standards
                </p>
                <p className="mt-2 text-base text-[#243653]">
                  ISO 9001, 14001, 45001, 27001 (choose one)
                </p>
              </div>

              <div className="rounded-lg border border-[#e2e6eb] bg-[#fafbfc] p-5">
                <p className="text-sm font-semibold uppercase tracking-wide text-[#D89A2B]">
                  Prerequisite
                </p>
                <p className="mt-2 text-base text-[#243653]">
                  Basic knowledge of the chosen standard
                </p>
              </div>

              <div className="rounded-lg border border-[#e2e6eb] bg-[#fafbfc] p-5">
                <p className="text-sm font-semibold uppercase tracking-wide text-[#D89A2B]">
                  Assessment
                </p>
                <p className="mt-2 text-base text-[#243653]">
                  Written exam and audit exercises
                </p>
              </div>

              <div className="rounded-lg border border-[#e2e6eb] bg-[#fafbfc] p-5">
                <p className="text-sm font-semibold uppercase tracking-wide text-[#D89A2B]">
                  Next batch
                </p>
                <p className="mt-2 text-base text-[#243653]">
                  Contact us for dates
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* =========================================================
            WHO SHOULD ATTEND
        ========================================================= */}
        {/* <section className="bg-white py-8 md:py-10"> */}
        <section className="bg-white pt-0 pb-0">
          <div className="mx-auto max-w-7xl px-6 md:px-10">

            <h2 className="font-display text-3xl leading-tight text-[#142342] md:text-[36px]">
              Who should attend?
            </h2>

            <ul className="mt-6 list-disc space-y-2 pl-6 text-base leading-7 text-[#243653] md:text-base">
              <li>Quality, EHS and IT security managers</li>
              <li>Internal auditors moving up to lead auditor</li>
              <li>Consultants and compliance professionals</li>
              <li>Anyone planning a career in ISO auditing</li>
            </ul>

          </div>
        </section>

        {/* =========================================================
            WHAT IS AN ISO LEAD AUDITOR?
        ========================================================= */}
        {/* <section className="bg-white py-8 md:py-10"> */}
        <section className="bg-white pt-6 pb-4 md:pt-8 md:pb-6">
          <div className="mx-auto max-w-7xl px-6 md:px-10">

            <h2 className="font-display text-3xl leading-tight text-[#142342] md:text-[36px]">
              What is an ISO Lead Auditor?
            </h2>

            <div className="mt-5 max-w-5xl space-y-2 text-base leading-7 text-[#243653] md:text-base">

              <p>
                A Lead Auditor plans an audit, leads the audit team, and
                reports the findings to the organisation. An internal
                auditor usually checks their own company's system. A Lead
                Auditor is trained to run a full audit from the opening
                meeting to the final report, including third-party and
                supplier audits.
              </p>

              <p>
                Lead Auditors work from the principles in ISO 19011, the
                standard that guides how management system audits should be
                carried out.
              </p>

            </div>

          </div>
        </section>

        {/* =========================================================
            WHY 5 DAYS?
        ========================================================= */}
        {/* <section className="bg-white py-8 md:py-10"> */}
        <section className="bg-white pt-4 pb-8 md:pt-6 md:pb-10">
          <div className="mx-auto max-w-7xl px-6 md:px-10">

            <h2 className="font-display text-3xl leading-tight text-[#142342] md:text-[36px]">
              Why 5 days?
            </h2>

            <p className="mt-2 max-w-5xl text-base leading-7 text-[#243653] md:text-base">
              Leading an audit takes more than knowing the standard. You
              have to plan, question people, judge evidence and write
              findings that hold up. Five days gives enough time to learn
              the process and practise it, rather than just read about it.
            </p>

          </div>
        </section>

        {/* =========================================================
            ENQUIRE NOW
        ========================================================= */}
        <section className="bg-white py-8 md:py-10">
          <div className="mx-auto max-w-7xl px-6 md:px-10">

            <div className="rounded-xl bg-[#172746] px-6 py-8 text-center md:px-12 md:py-10">

              <p className="mx-auto max-w-3xl text-base leading-7 text-white md:text-base">
                Enquire now Limited seats per batch. Call, WhatsApp or email
                us for the next batch dates and fees.
              </p>

              <div className="mt-5">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md bg-[#D8A43C] px-7 py-3 text-sm font-semibold text-[#172746] transition hover:bg-[#c7932f]"
                >
                  Enquire Now
                </Link>
              </div>

            </div>

          </div>
        </section>

      </main>
    </Layout>
  );
}