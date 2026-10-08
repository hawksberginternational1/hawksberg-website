import EnquiryForm from "@/components/EnquiryForm";
import iso9001Img from "@/assets/services/iso90012026.webp";
import Layout from "@/components/Layout";

export const metadata = {
  title: "ISO 9001:2026 Internal Auditor Training",
 description:
  "2-day ISO 9001:2026 Internal Auditor course covering audit planning, ISO 19011:2026, evidence, nonconformities and reporting. Enquire for dates and fees.",
  keywords:
    "ISO 9001:2026 Internal Auditor Training, ISO 9001 Internal Auditor Course, QMS Internal Audit, ISO 19011:2026",
  alternates: {
    canonical: "/iso-training/iso-9001-2026-internal-auditor",
  },
};

export default function ISO90012026InternalAuditor() {
  const modules = [
    "Introduction to ISO 9001:2026 Quality Management Systems",
    "Understanding ISO 9001:2026 Requirements for Internal Auditing",
    "ISO 19011:2026 Internal Audit Principles",
    "Internal Audit Programme and Audit Planning",
    "Audit Checklists, Audit Criteria and Objective Evidence",
    "Conducting Internal Audits and Interview Techniques",
    "Nonconformities, Corrective Actions and Audit Findings",
    "Audit Reporting, Follow-Up and Continual Improvement",
  ];

  const courseCovers = [
    "Understanding the purpose and benefits of an ISO 9001:2026 Quality Management System.",
    "Understanding how ISO 9001:2026 requirements can be evaluated during an internal audit.",
    "Understanding ISO 19011:2026 principles and their application to internal QMS audits.",
    "Planning an internal audit programme based on organizational processes and audit priorities.",
    "Preparing audit plans, audit checklists, audit criteria and evidence requirements.",
    "Conducting interviews, process reviews and evidence-based audit activities.",
    "Identifying and documenting conformity, nonconformity and opportunities for improvement.",
    "Writing clear and factual internal audit reports.",
    "Evaluating corrective actions and verifying their effectiveness during follow-up.",
    "Using internal audit results to support continual improvement of the Quality Management System.",
  ];

  const benefits = [
    "Develop a practical understanding of ISO 9001:2026 internal auditing.",
    "Learn how to plan and organize effective internal audit activities.",
    "Improve skills in interviewing, evidence collection and process evaluation.",
    "Learn how to identify and document nonconformities objectively.",
    "Develop professional audit report-writing skills.",
    "Learn how to evaluate corrective actions and perform audit follow-up.",
    "Support continual improvement and effective QMS performance.",
  ];

  const audience = [
    "Quality Managers",
    "Quality Assurance Professionals",
    "QMS Coordinators",
    "Management Representatives",
    "Internal Auditors",
    "Process Owners",
    "Compliance Professionals",
    "Employees responsible for maintaining an ISO 9001:2026 QMS",
  ];

  const prerequisites = [
    "A basic or working knowledge of ISO 9001:2026 requirements is recommended.",
    "Participants should understand the key principles of a Quality Management System.",
    "Previous auditing experience is not mandatory, although exposure to organizational processes is beneficial.",
    "Participants should be familiar with their organization's processes and responsibilities.",
  ];

  const faqs = [
    {
      question: "What is ISO 9001:2026 Internal Auditor Training?",
      answer:
        "ISO 9001:2026 Internal Auditor Training develops the practical knowledge and skills required to plan, conduct, report and follow up internal audits of a Quality Management System.",
    },
    {
      question: "What will I learn during the course?",
      answer:
        "Participants learn internal audit planning, audit preparation, checklist development, evidence collection, interviewing, identifying nonconformities, audit reporting, corrective action evaluation and follow-up.",
    },
    {
      question: "How long is the Internal Auditor training?",
      answer:
        "A typical ISO 9001:2026 Internal Auditor programme is delivered over 2 days. The exact schedule can vary depending on the training format and programme structure.",
    },
    {
      question: "Who should attend this course?",
      answer:
        "The course is suitable for professionals involved in auditing, maintaining or supervising an ISO 9001 Quality Management System, including quality professionals, process owners, QMS coordinators and internal auditors.",
    },
    {
      question: "Do I need previous audit experience?",
      answer:
        "Previous audit experience is not normally required for an introductory internal auditor programme. However, a good understanding of ISO 9001:2026 requirements and QMS principles is recommended.",
    },
    {
      question: "What is the difference between Lead Auditor and Internal Auditor training?",
      answer:
        "Internal Auditor Training focuses mainly on first-party internal audits within an organization. Lead Auditor Training develops more advanced competence for planning, managing and leading management system audits, including first-, second- and third-party audit activities.",
    },
    {
      question: "Will I receive a certificate?",
      answer:
        "Participants who successfully complete the applicable training and assessment requirements can receive the certificate associated with the training programme.",
    },
  ];

  return (
    <Layout>
      <>
        {/* =========================================================
            HERO
        ========================================================= */}
        <section
          className="relative overflow-hidden bg-cover bg-center py-24 text-brand-foreground"
          style={{
            backgroundImage: `url(${iso9001Img.src})`,
          }}
        >
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 grid-pattern opacity-15" />

          <div className="container-x relative text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-gold">
              ISO Training Programs
            </p>

            <h1
              className="mt-4 font-display text-4xl uppercase tracking-wide md:text-6xl"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              ISO 9001:2026 Internal Auditor Training
            </h1>

            <div className="mx-auto mt-5 gold-divider" />

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/85 md:text-lg">
              Develop the practical skills required to plan, conduct, report
              and follow up effective internal Quality Management System
              audits.
            </p>
          </div>
        </section>

        {/* =========================================================
            COURSE OVERVIEW
        ========================================================= */}
        <section className="bg-background py-20">
          <div className="container-x">
            <div className="mx-auto max-w-6xl">
              <h2 className="font-display text-3xl uppercase tracking-wide text-foreground md:text-4xl">
                Course Overview
              </h2>

              <div className="mt-4 gold-divider" />

              <div className="mt-8 max-w-5xl">
                <p className="text-justify text-[15px] leading-9 text-muted-foreground">
                  The ISO 9001:2026 Internal Auditor Training is designed to
                  develop the knowledge and practical skills required to
                  perform effective internal audits of a Quality Management
                  System.
                </p>

                <p className="mt-6 text-justify text-[15px] leading-9 text-muted-foreground">
                  Participants learn how to initiate an audit, prepare an
                  audit plan and checklist, conduct audit activities, collect
                  objective evidence, evaluate conformity, identify
                  nonconformities and prepare factual audit reports.
                </p>

                <p className="mt-6 text-justify text-[15px] leading-9 text-muted-foreground">
                  The course also covers corrective action evaluation and
                  audit follow-up so that internal audits can contribute to
                  continual improvement and effective QMS performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            MAIN CONTENT
        ========================================================= */}
        <section className="bg-muted/40 py-20">
          <div className="container-x grid gap-12 lg:grid-cols-3">

            {/* LEFT CONTENT */}
            <div className="space-y-10 lg:col-span-2">

              {/* Modules */}
              <div>
                <h2 className="font-display text-3xl">
                  Modules Covered
                </h2>

                <div className="mt-3 gold-divider" />

                <ol className="mt-6 grid gap-3 sm:grid-cols-2">
                  {modules.map((module, index) => (
                    <li
                      key={module}
                      className="flex items-start gap-4 rounded-lg border border-border bg-card p-4"
                    >
                      <span className="font-display text-2xl text-gold">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="pt-1 text-[14px] leading-6 text-slate-700">
                        {module}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Course Details */}
              <div>
                <h2 className="font-display text-3xl">
                  Course Details
                </h2>

                <div className="mt-3 gold-divider" />

                <div className="mt-6 space-y-3 text-slate-700">
                  <p>
                    <strong>Course :</strong> ISO 9001:2026 Internal Auditor
                    Training
                  </p>

                  <p>
                    <strong>Duration :</strong> 2 Days
                  </p>

                  <p>
                    <strong>Level :</strong> Intermediate
                  </p>

                  <p>
                    <strong>Auditing Guideline :</strong> ISO 19011:2026
                  </p>
                </div>
              </div>

              {/* Why Take */}
              <div>
                <h2 className="font-display text-3xl">
                  Why Take ISO 9001:2026 Internal Auditor Training?
                </h2>

                <div className="mt-3 gold-divider" />

                <p className="mt-8 max-w-4xl text-justify text-[15px] leading-9 text-slate-700">
                  Internal audits help organizations evaluate whether their
                  Quality Management System is effectively implemented and
                  maintained. This training gives participants a structured
                  approach to planning, conducting and reporting internal
                  audits while developing the skills needed to evaluate
                  evidence and identify areas for improvement.
                </p>
              </div>

              {/* Course Covers */}
              <div>
                <h2 className="font-display text-3xl">
                  What the ISO 9001:2026 Internal Auditor Course Covers
                </h2>

                <div className="mt-3 gold-divider" />

                <ul className="mt-8 max-w-4xl space-y-5">
                  {courseCovers.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-4 text-[15px] leading-8 text-slate-700"
                    >
                      <span className="mt-1 text-lg text-gold">
                        ✓
                      </span>

                      <span className="flex-1">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h2 className="font-display text-3xl">
                  Benefits of the Course
                </h2>

                <div className="mt-3 gold-divider" />

                <ul className="mt-8 max-w-4xl space-y-5">
                  {benefits.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-4 text-[15px] leading-8 text-slate-700"
                    >
                      <span className="mt-1 text-lg text-gold">
                        ✓
                      </span>

                      <span className="flex-1">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Who Should Attend */}
              <div>
                <h2 className="font-display text-3xl">
                  Who Should Attend
                </h2>

                <div className="mt-3 gold-divider" />

                <ul className="mt-8 max-w-4xl space-y-5">
                  {audience.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-4 text-[15px] leading-8 text-slate-700"
                    >
                      <span className="mt-1 text-lg text-gold">
                        ✓
                      </span>

                      <span className="flex-1">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prerequisites */}
              <div>
                <h2 className="font-display text-3xl">
                  Prerequisites
                </h2>

                <div className="mt-3 gold-divider" />

                <ul className="mt-8 max-w-4xl space-y-5">
                  {prerequisites.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-4 text-[15px] leading-8 text-slate-700"
                    >
                      <span className="mt-1 text-lg text-gold">
                        ✓
                      </span>

                      <span className="flex-1">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Internal Audit Value */}
              <div>
                <h2 className="font-display text-3xl">
                  How Internal Audits Support Continual Improvement
                </h2>

                <div className="mt-3 gold-divider" />

                <p className="mt-8 max-w-4xl text-justify text-[15px] leading-9 text-slate-700">
                  Effective internal audits provide management with objective
                  information about the performance and effectiveness of the
                  Quality Management System. Audit findings can help
                  organizations identify process weaknesses, address
                  nonconformities, evaluate corrective actions and identify
                  opportunities for improvement.
                </p>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="font-display text-3xl">
                  Frequently Asked Questions
                </h2>

                <div className="mt-3 gold-divider" />

                <div className="mt-6 space-y-4">
                  {faqs.map((faq, index) => (
                    <details
                      key={index}
                      className="rounded-xl border border-border bg-card p-5"
                    >
                      <summary className="cursor-pointer font-semibold text-slate-800">
                        {faq.question}
                      </summary>

                      <p className="mt-4 leading-8 text-slate-700">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </div>

            {/* ENQUIRY FORM */}
            <aside className="self-start lg:sticky lg:top-28">
              <EnquiryForm compact />
            </aside>
          </div>
        </section>
      </>
    </Layout>
  );
}