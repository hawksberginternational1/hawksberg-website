import EnquiryForm from "@/components/EnquiryForm";
import iso9001Img from "@/assets/services/iso90012026.webp";
import Layout from "@/components/Layout";

export const metadata = {
  title: "ISO 9001:2026 Lead Auditor Training",
 description:
  "5-day ISO 9001:2026 Lead Auditor course: plan, lead and report QMS audits using ISO 19011:2026. Practical training in Chennai and online. Enquire now.",
  keywords:
    "ISO 9001:2026 Lead Auditor Training, ISO 9001 Lead Auditor Course, QMS Lead Auditor, ISO 19011:2026",
  alternates: {
    canonical: "/iso-training/iso-9001-2026-lead-auditor",
  },
};

export default function ISO90012026LeadAuditor() {
  const modules = [
    "Introduction to ISO 9001:2026 Quality Management Systems",
    "ISO 9001:2026 Requirements and QMS Principles",
    "ISO 19011:2026 Auditing Guidelines",
    "Audit Principles and Auditor Responsibilities",
    "Audit Planning and Preparation",
    "Conducting the QMS Audit and Collecting Audit Evidence",
    "Nonconformities, Audit Findings and Corrective Actions",
    "Audit Reporting, Follow-Up and Certification Audits",
  ];

  const courseCovers = [
    "Understanding the purpose, structure and benefits of a Quality Management System (QMS).",
    "Understanding ISO 9001:2026 requirements and applying them from an auditing perspective.",
    "Understanding the principles and guidelines for auditing management systems according to ISO 19011:2026.",
    "Understanding auditor roles, responsibilities, competence and professional conduct.",
    "Planning an audit programme, preparing audit plans, checklists and audit activities.",
    "Conducting opening meetings, interviews, process-based auditing and evidence collection.",
    "Evaluating objective evidence and determining conformity or nonconformity against audit criteria.",
    "Recording audit findings clearly and preparing factual, evidence-based audit reports.",
    "Evaluating corrective actions and carrying out effective audit follow-up activities.",
    "Understanding the requirements and approach for first-, second- and third-party QMS audits.",
  ];

  const benefits = [
    "Develop strong knowledge of ISO 9001:2026 Quality Management System requirements.",
    "Build practical skills to plan, conduct, report and follow up QMS audits.",
    "Understand the application of ISO 19011:2026 auditing principles.",
    "Develop confidence in evaluating objective audit evidence and identifying nonconformities.",
    "Learn how to communicate audit findings clearly and professionally.",
    "Develop the competence required to lead audit teams and manage audit activities.",
    "Strengthen your professional profile for QMS auditing and quality management roles.",
  ];

  const audience = [
    "Quality Managers",
    "Quality Assurance Professionals",
    "QMS Managers and Management Representatives",
    "Lead Auditors and Internal Auditors",
    "ISO Consultants",
    "Compliance Professionals",
    "Professionals responsible for maintaining ISO 9001:2026 QMS",
    "Professionals planning to develop their career as QMS auditors",
  ];

  const prerequisites = [
    "Good knowledge of ISO 9001:2026 requirements and the key principles of a Quality Management System is recommended.",
    "Basic understanding of management system auditing is beneficial.",
    "Previous experience with internal, supplier or process audits is helpful but not essential for developing auditing competence.",
    "Participants should be familiar with quality management concepts before attending an advanced Lead Auditor programme.",
  ];

  const faqs = [
    {
      question: "What is ISO 9001:2026 Lead Auditor Training?",
      answer:
        "ISO 9001:2026 Lead Auditor Training develops the knowledge and practical auditing skills required to plan, conduct, report and follow up Quality Management System audits against ISO 9001:2026 and applicable auditing guidelines.",
    },
    {
      question: "What auditing standard is covered in the course?",
      answer:
        "The course covers management system auditing principles and practices aligned with ISO 19011:2026, including audit planning, conducting audits, collecting evidence, reporting findings and audit follow-up.",
    },
    {
      question: "How long is the Lead Auditor training?",
      answer:
        "A typical ISO 9001:2026 Lead Auditor programme is delivered over 5 days. The exact training schedule may vary depending on the delivery format and programme structure.",
    },
    {
      question: "Who should attend this course?",
      answer:
        "The course is suitable for quality professionals, QMS managers, auditors, consultants, compliance professionals and individuals responsible for auditing or overseeing an ISO 9001:2026 Quality Management System.",
    },
    {
      question: "Do I need prior knowledge of ISO 9001:2026?",
      answer:
        "Yes. A good working knowledge of ISO 9001:2026 requirements and QMS principles is recommended because the Lead Auditor programme focuses primarily on auditing rather than teaching the complete standard from the beginning.",
    },
    {
      question: "Will I learn how to conduct an actual audit?",
      answer:
        "Yes. The course focuses on practical audit activities including audit planning, interviews, evidence collection, evaluating findings, reporting and follow-up.",
    },
    {
      question: "What certificate will I receive?",
      answer:
        "Participants who successfully complete the applicable training and assessment requirements can receive the certificate associated with the training programme. Certification and accreditation details depend on the specific course delivery and certification scheme.",
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
              ISO 9001:2026 Lead Auditor Training
            </h1>

            <div className="mx-auto mt-5 gold-divider" />

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/85 md:text-lg">
              Develop the knowledge and practical skills required to plan,
              conduct, report and follow up Quality Management System audits
              against ISO 9001:2026.
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
                  The ISO 9001:2026 Lead Auditor Training is designed for
                  professionals who need to develop the competence to lead and
                  perform Quality Management System audits. The programme
                  focuses on the practical application of ISO 9001:2026
                  requirements from an auditing perspective.
                </p>

                <p className="mt-6 text-justify text-[15px] leading-9 text-muted-foreground">
                  Participants learn how to plan audit activities, conduct
                  interviews and process-based audits, collect objective
                  evidence, evaluate conformity, document nonconformities,
                  prepare audit reports and perform follow-up activities.
                </p>

                <p className="mt-6 text-justify text-[15px] leading-9 text-muted-foreground">
                  The course also introduces the auditing principles and
                  practices of ISO 19011:2026 and develops the professional
                  skills required to manage audit activities effectively.
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
                    <strong>Course :</strong> ISO 9001:2026 Lead Auditor
                    Training
                  </p>

                  <p>
                    <strong>Duration :</strong> 5 Days
                  </p>

                  <p>
                    <strong>Level :</strong> Advanced
                  </p>

                  <p>
                    <strong>Auditing Guideline :</strong> ISO 19011:2026
                  </p>
                </div>
              </div>

              {/* Why Take */}
              <div>
                <h2 className="font-display text-3xl">
                  Why Take ISO 9001:2026 Lead Auditor Training?
                </h2>

                <div className="mt-3 gold-divider" />

                <p className="mt-8 max-w-4xl text-justify text-[15px] leading-9 text-slate-700">
                  Effective QMS auditing requires more than understanding the
                  standard. Auditors need to know how to plan audits, collect
                  reliable evidence, evaluate processes, identify
                  nonconformities and communicate findings objectively.
                  ISO 9001:2026 Lead Auditor Training develops these practical
                  capabilities and prepares professionals to contribute to
                  effective and value-adding audits.
                </p>
              </div>

              {/* Course Covers */}
              <div>
                <h2 className="font-display text-3xl">
                  What the ISO 9001:2026 Lead Auditor Course Covers
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

              {/* Career Value */}
              <div>
                <h2 className="font-display text-3xl">
                  Career Opportunities
                </h2>

                <div className="mt-3 gold-divider" />

                <p className="mt-8 max-w-4xl text-justify text-[15px] leading-9 text-slate-700">
                  ISO 9001:2026 Lead Auditor competence can support career
                  opportunities in quality assurance, quality management,
                  compliance, management systems auditing and ISO consultancy.
                  Professionals can apply these skills in manufacturing,
                  services, healthcare, technology and other sectors that
                  operate Quality Management Systems.
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