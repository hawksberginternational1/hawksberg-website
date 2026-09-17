import Link from "next/link";
import Layout from "@/components/Layout";
import EnquiryForm from "@/components/EnquiryForm";

import iso9001Img from "@/assets/iso90001-2026.webp";

export const metadata = {
  title: {
    absolute:
      "ISO 9001:2026 Certification & Consulting | Hawksberg International",
  },
  description:
    "ISO 9001:2026 certification and consulting services by Hawksberg International. Prepare your QMS, understand the new requirements, complete gap analysis, transition planning, implementation, training and certification support.",
  keywords: [
    "ISO 9001:2026",
    "ISO 9001:2026 certification",
    "ISO 9001:2026 consultant",
    "ISO 9001:2026 consulting",
    "ISO 9001 certification",
    "ISO 9001 consultant in Chennai",
    "ISO 9001 certification consultant in Chennai",
    "ISO 9001:2026 transition",
    "ISO 9001 gap analysis",
    "ISO 9001 Quality Management System",
    "ISO 9001 transition consulting",
  ],
  robots: "index, follow",
  alternates: {
    canonical: "/services/iso-9001-2026",
  },
};

/* =========================================================
   CERTIFICATION CONTENT
========================================================= */

const keyChanges = [
  {
    title: "Stronger Quality Culture",
    text: "ISO 9001:2026 places clearer emphasis on developing a culture in which quality is understood and supported throughout the organisation. Quality is treated as part of normal business activity rather than being limited to documented procedures.",
  },
  {
    title: "Ethics and Integrity",
    text: "The revised requirements give greater visibility to ethical behaviour and organisational integrity. Leadership and personnel are expected to understand how ethical conduct contributes to an effective Quality Management System.",
  },
  {
    title: "Clearer Separation of Risks and Opportunities",
    text: "The revised edition provides greater clarity around risks and opportunities. Organisations are expected to consider potential threats while also identifying and pursuing opportunities that can support improvement and better results.",
  },
  {
    title: "Leadership and Accountability",
    text: "Senior leadership continues to play a central role in the QMS. The revised standard reinforces leadership involvement in quality objectives, performance, resources, improvement and the effectiveness of the management system.",
  },
  {
    title: "Stronger Link Between Quality and Business Strategy",
    text: "The quality policy and Quality Management System are more closely connected with the organisation's context and strategic direction. This supports the use of quality management as part of broader business planning.",
  },
  {
    title: "People, Awareness and Quality Culture",
    text: "The revised requirements place additional attention on awareness. People working within the organisation should understand the importance of quality, ethical behaviour and how their responsibilities contribute to the QMS.",
  },
  {
    title: "Harmonised Structure",
    text: "ISO 9001:2026 follows the latest Harmonised Structure used across ISO management system standards. This supports consistency and makes integration with other management systems easier.",
  },
  {
    title: "Updated Terminology and Guidance",
    text: "The revised edition introduces clearer terminology and supporting guidance intended to make the requirements easier to understand and apply consistently across different organisations and sectors.",
  },
  {
    title: "Climate Change Considerations",
    text: "Climate change considerations introduced through the 2024 amendment remain relevant within the revised standard. Organisations should continue considering whether climate change is a relevant issue within their management system context.",
  },
];

const certificationBenefits = [
  "Demonstrate a structured approach to quality management",
  "Improve consistency of products and services",
  "Strengthen customer confidence and satisfaction",
  "Support continual improvement across business processes",
  "Improve identification and management of risks and opportunities",
  "Strengthen leadership involvement in quality performance",
  "Improve process efficiency and organisational control",
  "Support credibility with customers, partners and other interested parties",
];

const certificationSteps = [
  "Understand the ISO 9001:2026 requirements",
  "Review the existing Quality Management System",
  "Perform a detailed gap analysis",
  "Update required processes and documented information",
  "Implement the required improvements",
  "Conduct internal audits and management review",
  "Complete readiness assessment",
  "Coordinate the certification or transition audit with the certification body",
];

const preparationSteps = [
  {
    title: "Understand the New Standard",
    text: "Organisations should first familiarise themselves with ISO 9001:2026 and understand how the revised requirements relate to their existing Quality Management System.",
  },
  {
    title: "Review the Existing QMS",
    text: "Review current processes, policies, objectives, controls and performance arrangements. Identify what is already effective and which areas may require adjustment.",
  },
  {
    title: "Perform a Gap Analysis",
    text: "Compare the existing QMS with ISO 9001:2026 requirements. The assessment should identify compliant areas, improvement opportunities and actions required for transition.",
  },
  {
    title: "Review Documentation",
    text: "Review policies, procedures, records and other documented information. Documentation should be updated where necessary to reflect the revised requirements and actual business processes.",
  },
  {
    title: "Create Awareness",
    text: "Brief senior management, process owners and employees about relevant changes. Everyone involved should understand their responsibilities within the Quality Management System.",
  },
  {
    title: "Implement Improvements",
    text: "Apply the required changes in a controlled manner. Organisations should maintain evidence that the revised processes have been implemented and are operating effectively.",
  },
  {
    title: "Use Internal Audits",
    text: "Internal audits can be used to verify whether revised requirements have been effectively implemented and to identify issues before the formal certification or transition audit.",
  },
  {
    title: "Plan the Certification Transition",
    text: "Coordinate with the certification body to understand the applicable transition arrangements, audit requirements and timing for moving to ISO 9001:2026.",
  },
];

const transitionPoints = [
  "Review the current ISO 9001:2015-based Quality Management System.",
  "Understand the requirements introduced or clarified in ISO 9001:2026.",
  "Perform a structured transition gap assessment.",
  "Update relevant processes, policies and documented information.",
  "Provide awareness and training to relevant personnel.",
  "Verify implementation through internal audits.",
  "Conduct management review and address identified actions.",
  "Coordinate the transition audit with the certification body.",
];

/* =========================================================
   CONSULTING CONTENT
========================================================= */

const consultingServices = [
  {
    title: "ISO 9001:2026 Gap Analysis",
    text: "We assess your existing Quality Management System against ISO 9001:2026 requirements and identify areas requiring attention before certification or transition.",
  },
  {
    title: "QMS Review",
    text: "Our consultants review existing processes, responsibilities, controls and performance arrangements to determine how effectively the current system aligns with the revised standard.",
  },
  {
    title: "Transition Planning",
    text: "We help organisations establish a practical transition roadmap with priorities, responsibilities, actions and target completion dates.",
  },
  {
    title: "Documentation Review and Update",
    text: "We support the review and controlled updating of policies, procedures, forms, records and other documented information affected by the revised requirements.",
  },
  {
    title: "Implementation Support",
    text: "Our consulting team assists organisations in putting required improvements into practice while keeping the QMS aligned with actual operational activities.",
  },
  {
    title: "Training and Awareness",
    text: "We provide awareness sessions and role-specific training to help leadership, process owners and employees understand their responsibilities under ISO 9001:2026.",
  },
  {
    title: "Internal Audit Support",
    text: "We support internal audit planning, execution and follow-up so organisations can identify gaps and verify the effectiveness of implemented improvements.",
  },
  {
    title: "Management Review Support",
    text: "We help organisations prepare management review inputs, evaluate QMS performance and identify actions related to quality objectives, risks, opportunities and continual improvement.",
  },
  {
    title: "Certification and Transition Audit Support",
    text: "We help organisations prepare for certification or transition audits by reviewing readiness, addressing identified gaps and supporting the organisation through the audit process.",
  },
  {
    title: "Ongoing ISO 9001 Consulting",
    text: "Our consulting support can continue beyond certification through periodic QMS reviews, internal audits, improvement planning and ongoing compliance support.",
  },
];

const consultingBenefits = [
  "Clear understanding of ISO 9001:2026 requirements",
  "Structured transition planning",
  "Reduced uncertainty during QMS updates",
  "Better alignment between documented processes and actual operations",
  "Improved employee awareness",
  "Early identification of certification readiness gaps",
  "Practical support throughout implementation",
  "Continued assistance after certification",
];

/* =========================================================
   FAQ
========================================================= */

const faqs = [
  {
    question: "What is ISO 9001:2026?",
    answer:
      "ISO 9001:2026 is the sixth edition of ISO 9001, the international standard for Quality Management Systems. It was published on 16 September 2026 and replaces ISO 9001:2015. The revised edition builds on the established ISO 9001 framework while introducing targeted changes for clearer requirements, stronger quality culture, leadership, ethics, and clearer treatment of risks and opportunities.",
  },
  {
    question: "Is ISO 9001:2026 officially published?",
    answer:
      "Yes. ISO officially published ISO 9001:2026 on 16 September 2026. It is the current edition of the standard and replaces ISO 9001:2015.",
  },
  {
    question: "Does ISO 9001:2026 completely replace ISO 9001:2015?",
    answer:
      "Yes. ISO 9001:2026 is the current edition and ISO 9001:2015 has been withdrawn. Organisations certified to the previous edition should contact their certification body regarding the applicable transition arrangements.",
  },
  {
    question: "Will organisations need to completely redesign their Quality Management System?",
    answer:
      "No. ISO 9001:2026 builds on the established ISO 9001 framework. Organisations should review their existing processes and make targeted changes where necessary rather than automatically rebuilding the entire Quality Management System.",
  },
  {
    question: "What are the main changes in ISO 9001:2026?",
    answer:
      "The revised edition gives greater emphasis to leadership, quality culture, ethical behaviour, accountability, strategic alignment, and clearer consideration of risks and opportunities. It also follows the latest Harmonised Structure and includes additional guidance to help users understand the requirements.",
  },
  {
    question: "What should an organisation do if it is already certified to ISO 9001:2015?",
    answer:
      "The organisation should review the ISO 9001:2026 requirements, assess its existing QMS, perform a transition gap analysis, update affected processes and documented information, provide awareness or training, verify implementation through internal audits and coordinate transition arrangements with its certification body.",
  },
  {
    question: "How long do organisations have to transition to ISO 9001:2026?",
    answer:
      "ISO has confirmed that organisations using ISO 9001:2015 will need to transition according to the timeframe established through the certification and transition arrangements. The applicable timing should be confirmed with the organisation's certification body rather than relying on an assumed universal deadline.",
  },
  {
    question: "Can ISO 9001:2026 be integrated with other ISO management systems?",
    answer:
      "Yes. ISO 9001:2026 uses the Harmonised Structure shared by ISO management system standards. This supports integration with other management systems such as ISO 14001, ISO 45001, ISO 50001 and ISO/IEC 27001.",
  },
  {
    question: "Does Hawksberg International provide ISO 9001:2026 consulting?",
    answer:
      "Yes. Hawksberg International provides ISO 9001:2026 consulting support including gap analysis, QMS review, transition planning, documentation review, implementation support, training, internal audit support, management review support and certification or transition audit preparation.",
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function ISO9001_2026() {
  return (
    <Layout>
      <>
        {/* =====================================================
            HERO
        ====================================================== */}
        <section className="relative overflow-hidden bg-cover bg-center py-20 text-brand-foreground">
          <img
            src={iso9001Img.src}
            alt="ISO 9001:2026 Quality Management System"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/75" />
          <div className="absolute inset-0 grid-pattern opacity-10" />

          <div className="container-x relative z-10">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">
              ISO 9001:2026 Certification & Consulting
            </p>

            <h1 className="mt-3 text-5xl md:text-6xl">
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  letterSpacing: "-1px",
                }}
              >
                ISO 9001:2026
              </span>{" "}
              <span
                className="text-gold"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                }}
              >
                — Quality Management System
              </span>
            </h1>

            <div className="mt-4 gold-divider" />

            <p className="mt-6 max-w-3xl text-brand-foreground/80">
              Understand the new ISO 9001:2026 requirements, prepare your
              Quality Management System, complete your transition planning and
              move towards certification with structured professional support
              from Hawksberg International.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Get Free Evaluation →
              </Link>
            </div>
          </div>
        </section>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}
        <section className="container-x grid gap-12 py-20 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            {/* =================================================
                CERTIFICATION SECTION
            ================================================== */}
            <div>
              <div className="mb-10 rounded-2xl border border-gold/30 bg-secondary/40 p-8">
                <p className="text-xs uppercase tracking-[0.25em] text-gold">
                  ISO 9001:2026 Certification
                </p>

                <h2 className="mt-3 font-display text-4xl">
                  ISO 9001:2026 Certification
                </h2>

                <p className="mt-5 text-[16px] leading-9 text-muted-foreground text-justify">
                  ISO 9001:2026 is the latest edition of the international
                  Quality Management System standard. Published on 16 September
                  2026, it replaces ISO 9001:2015 and builds on the established
                  framework used by organisations across industries and
                  sectors.
                </p>

                <p className="mt-5 text-[16px] leading-9 text-muted-foreground text-justify">
                  The revised edition introduces targeted changes intended to
                  improve clarity, usability and relevance while strengthening
                  areas such as leadership, quality culture, ethical behaviour,
                  accountability and the management of risks and opportunities.
                </p>
              </div>

              {/* What is ISO */}
              <div>
                <h2 className="font-display text-3xl">
                  What Is ISO 9001:2026?
                </h2>

                <div className="mt-3 gold-divider" />

                <p className="mt-5 text-[16px] leading-9 text-muted-foreground text-justify">
                  ISO 9001:2026 specifies requirements for establishing,
                  implementing, maintaining and continually improving a Quality
                  Management System. It is designed for organisations of
                  different sizes, sectors and operational contexts.
                </p>

                <p className="mt-5 text-[16px] leading-9 text-muted-foreground text-justify">
                  The 2026 edition retains the familiar foundations of ISO
                  9001 while refining the requirements to reflect modern
                  business environments, evolving stakeholder expectations,
                  interconnected supply chains, digitalisation and the need
                  for organisations to respond effectively to risks and
                  opportunities.
                </p>

                <p className="mt-5 text-[16px] leading-9 text-muted-foreground text-justify">
                  ISO confirms that the new edition maintains the established
                  quality management principles while providing clearer
                  direction for organisations seeking consistent performance,
                  customer confidence and continual improvement.
                </p>
              </div>

              {/* What is happening */}
              <div>
                <h2 className="mt-12 font-display text-3xl">
                  What Is Happening With ISO 9001 in 2026?
                </h2>

                <div className="mt-3 gold-divider" />

                <p className="mt-5 text-[16px] leading-9 text-muted-foreground text-justify">
                  ISO 9001:2026 has now been officially published and is the
                  current edition of the Quality Management System standard.
                  ISO 9001:2015 has been withdrawn and replaced by the 2026
                  edition.
                </p>

                <p className="mt-5 text-[16px] leading-9 text-muted-foreground text-justify">
                  The revision was developed to ensure that ISO 9001 continues
                  to provide a relevant and practical framework for
                  organisations operating in a changing business environment.
                </p>

                <p className="mt-5 text-[16px] leading-9 text-muted-foreground text-justify">
                  Organisations already using ISO 9001:2015 should now review
                  the new requirements and determine what changes are relevant
                  to their Quality Management System.
                </p>
              </div>

              {/* Timeline */}
              <div>
                <h2 className="mt-12 font-display text-3xl">
                  ISO 9001 Revision and Publication Timeline
                </h2>

                <div className="mt-3 gold-divider" />

                <div className="mt-6 space-y-4">
                  {[
                    [
                      "2015",
                      "ISO 9001:2015 was published as the fifth edition.",
                    ],
                    [
                      "2023",
                      "The international revision project was formally initiated.",
                    ],
                    [
                      "2025",
                      "The revised standard progressed through the international development and approval stages.",
                    ],
                    [
                      "May 2026",
                      "The Final Draft International Standard entered the final approval process.",
                    ],
                    [
                      "July 2026",
                      "The final voting stage was completed.",
                    ],
                    [
                      "16 September 2026",
                      "ISO 9001:2026 was officially published as the sixth edition.",
                    ],
                  ].map(([year, text]) => (
                    <div
                      key={year}
                      className="flex gap-4 rounded-xl border border-border bg-card p-5"
                    >
                      <span className="min-w-[120px] font-semibold text-gold">
                        {year}
                      </span>
                      <span className="text-sm leading-7 text-foreground">
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why revised */}
              <div>
                <h2 className="mt-12 font-display text-3xl">
                  Why Was ISO 9001 Revised?
                </h2>

                <div className="mt-3 gold-divider" />

                <p className="mt-5 text-[16px] leading-9 text-muted-foreground text-justify">
                  Organisations now operate in business environments that are
                  significantly different from those that existed when ISO
                  9001:2015 was developed. Digital technologies, complex
                  supply chains, changing customer expectations and new
                  organisational risks have changed how businesses manage
                  quality.
                </p>

                <p className="mt-5 text-[16px] leading-9 text-muted-foreground text-justify">
                  ISO 9001:2026 responds to these developments while retaining
                  the core principles that have made ISO 9001 a widely used
                  framework for quality management.
                </p>

                <p className="mt-5 text-[16px] leading-9 text-muted-foreground text-justify">
                  The revision therefore focuses on improving clarity,
                  strengthening leadership and quality culture, improving the
                  treatment of risks and opportunities, and making the
                  standard easier to integrate with other management systems.
                </p>
              </div>

              {/* Key changes */}
              <div>
                <h2 className="mt-12 font-display text-3xl">
                  What Are the Key Changes in ISO 9001:2026?
                </h2>

                <div className="mt-3 gold-divider" />

                <p className="mt-5 text-[16px] leading-9 text-muted-foreground text-justify">
                  ISO 9001:2026 does not discard the established Quality
                  Management System framework. Instead, the revised edition
                  introduces targeted changes and clearer requirements in areas
                  that have become increasingly important to organisations.
                </p>

                <div className="mt-8 space-y-5">
                  {keyChanges.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-border bg-card p-6"
                    >
                      <h3 className="text-xl font-semibold text-foreground">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-[15px] leading-8 text-muted-foreground text-justify">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* What means for business */}
              <div>
                <h2 className="mt-12 font-display text-3xl">
                  What Does ISO 9001:2026 Mean for Businesses?
                </h2>

                <div className="mt-3 gold-divider" />

                <p className="mt-5 text-[16px] leading-9 text-muted-foreground text-justify">
                  For most organisations, ISO 9001:2026 represents an evolution
                  of an established Quality Management System rather than a
                  requirement to rebuild everything from the beginning.
                </p>

                <p className="mt-5 text-[16px] leading-9 text-muted-foreground text-justify">
                  Businesses with a well-maintained QMS can review their
                  existing arrangements, retain processes that remain
                  effective and introduce targeted improvements where the new
                  requirements require them.
                </p>

                <p className="mt-5 text-[16px] leading-9 text-muted-foreground text-justify">
                  Particular attention should be given to leadership,
                  organisational culture, ethical behaviour, risks,
                  opportunities, strategic alignment and awareness.
                </p>
              </div>

              {/* Benefits */}
              <div>
                <h2 className="mt-12 font-display text-3xl">
                  Benefits of ISO 9001:2026 Certification
                </h2>

                <div className="mt-3 gold-divider" />

                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {certificationBenefits.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
                    >
                      <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full gradient-gold text-xs font-bold text-ink">
                        ✓
                      </span>

                      <span className="text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Certified organisations */}
              <div>
                <h2 className="mt-12 font-display text-3xl">
                  What Does ISO 9001:2026 Mean for Organisations Already
                  Certified to ISO 9001:2015?
                </h2>

                <div className="mt-3 gold-divider" />

                <p className="mt-5 text-[16px] leading-9 text-muted-foreground text-justify">
                  Organisations that previously held ISO 9001:2015
                  certification should not assume that their Quality
                  Management System needs to be completely rebuilt. The
                  appropriate approach is to understand the new edition,
                  assess the existing system and implement the changes relevant
                  to the organisation.
                </p>

                <p className="mt-5 text-[16px] leading-9 text-muted-foreground text-justify">
                  The transition arrangements and applicable timing should be
                  confirmed with the organisation&apos;s certification body.
                  Organisations should therefore begin reviewing the new
                  requirements rather than waiting until the final stage of
                  their transition.
                </p>

                <div className="mt-6 rounded-2xl border border-gold/30 bg-secondary/40 p-7">
                  <p className="font-semibold text-foreground">
                    Recommended transition activities:
                  </p>

                  <ul className="mt-5 space-y-3">
                    {transitionPoints.map((item, index) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-7 text-foreground"
                      >
                        <span className="font-semibold text-gold">
                          {index + 1}.
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Preparation */}
              <div>
                <h2 className="mt-12 font-display text-3xl">
                  What Should Businesses Do Now to Prepare for ISO 9001:2026?
                </h2>

                <div className="mt-3 gold-divider" />

                <p className="mt-5 text-[16px] leading-9 text-muted-foreground text-justify">
                  Organisations should begin by understanding the published
                  requirements and assessing their existing Quality Management
                  System. Preparation should be controlled, evidence-based and
                  aligned with the organisation&apos;s actual processes.
                </p>

                <div className="mt-8 space-y-5">
                  {preparationSteps.map((item, index) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-border bg-card p-6"
                    >
                      <div className="flex gap-4">
                        <span className="font-display text-3xl text-gold">
                          0{index + 1}
                        </span>

                        <div>
                          <h3 className="text-xl font-semibold text-foreground">
                            {item.title}
                          </h3>

                          <p className="mt-3 text-[15px] leading-8 text-muted-foreground text-justify">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certification process */}
              <div>
                <h2 className="mt-12 font-display text-3xl">
                  ISO 9001:2026 Certification Process
                </h2>

                <div className="mt-3 gold-divider" />

                <p className="mt-5 text-[16px] leading-9 text-muted-foreground text-justify">
                  Organisations seeking ISO 9001:2026 certification can use a
                  structured implementation and assessment process. The exact
                  certification arrangements are determined by the accredited
                  certification body.
                </p>

                <ol className="mt-7 grid gap-4 sm:grid-cols-2">
                  {certificationSteps.map((step, index) => (
                    <li
                      key={step}
                      className="flex gap-4 rounded-xl border border-border bg-card p-5"
                    >
                      <span className="font-display text-3xl text-gold">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="pt-1 text-sm leading-7 text-foreground">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* =================================================
                CONSULTING SECTION
            ================================================== */}
            <div className="border-t border-border pt-14">
              <div className="rounded-2xl border border-gold/30 bg-secondary/40 p-8">
                <p className="text-xs uppercase tracking-[0.25em] text-gold">
                  ISO 9001:2026 Consulting
                </p>

                <h2 className="mt-3 font-display text-4xl">
                  ISO 9001:2026 Consulting Services
                </h2>

                <p className="mt-5 text-[16px] leading-9 text-muted-foreground text-justify">
                  ISO 9001:2026 consulting helps organisations understand the
                  revised standard, assess their existing Quality Management
                  System and implement the changes required for certification
                  or transition.
                </p>

                <p className="mt-5 text-[16px] leading-9 text-muted-foreground text-justify">
                  Hawksberg International provides practical consulting support
                  across the complete ISO 9001:2026 preparation cycle, from
                  initial gap analysis and QMS review through implementation,
                  training, internal audit and certification or transition
                  audit preparation.
                </p>
              </div>

              {/* Consulting services */}
              <div>
                <h2 className="mt-12 font-display text-3xl">
                  How Hawksberg International Can Support Your ISO 9001:2026
                  Transition
                </h2>

                <div className="mt-3 gold-divider" />

                <div className="mt-8 space-y-5">
                  {consultingServices.map((item, index) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-border bg-card p-6"
                    >
                      <div className="flex gap-4">
                        <span className="grid h-9 w-9 flex-none place-items-center rounded-full gradient-gold text-sm font-bold text-ink">
                          {index + 1}
                        </span>

                        <div>
                          <h3 className="text-xl font-semibold text-foreground">
                            {item.title}
                          </h3>

                          <p className="mt-3 text-[15px] leading-8 text-muted-foreground text-justify">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consulting benefits */}
              <div>
                <h2 className="mt-12 font-display text-3xl">
                  Why Use ISO 9001:2026 Consulting Support?
                </h2>

                <div className="mt-3 gold-divider" />

                <p className="mt-5 text-[16px] leading-9 text-muted-foreground text-justify">
                  Professional consulting support can help organisations
                  organise their transition activities, identify gaps early
                  and coordinate QMS improvements without unnecessarily
                  disrupting day-to-day operations.
                </p>

                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {consultingBenefits.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
                    >
                      <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full gradient-gold text-xs font-bold text-ink">
                        ✓
                      </span>

                      <span className="text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Consulting approach */}
              {/* <div>
                <h2 className="mt-12 font-display text-3xl">
                  Our ISO 9001:2026 Consulting Approach
                </h2>

                <div className="mt-3 gold-divider" />

                <p className="mt-5 text-[16px] leading-9 text-muted-foreground text-justify">
                  Our approach is designed around the organisation&apos;s
                  existing Quality Management System. Instead of introducing
                  unnecessary changes, we focus on understanding current
                  practices, identifying applicable requirements and supporting
                  controlled improvements.
                </p>

                <p className="mt-5 text-[16px] leading-9 text-muted-foreground text-justify">
                  The consulting process can include an initial assessment,
                  transition roadmap, documentation review, implementation
                  support, employee awareness, internal auditing and
                  certification readiness activities.
                </p>
              </div> */}

              {/* Consulting CTA */}
              <div className="mt-12 rounded-2xl border border-gold/30 bg-secondary/40 p-8 text-center">
                <h3 className="font-display text-2xl">
                  Prepare Your Organisation for ISO 9001:2026
                </h3>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  Speak with Hawksberg International about your ISO 9001:2026
                  certification, transition and Quality Management System
                  requirements.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Link href="/contact" className="btn-primary">
                    Request a Free Consultation →
                  </Link>
                </div>
              </div>
            </div>

            {/* =================================================
                FAQ
            ================================================== */}
            <div>
              <h2 className="font-display text-3xl">
                ISO 9001:2026 Frequently Asked Questions
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

          {/* =====================================================
              ENQUIRY FORM
          ====================================================== */}
          <aside className="hidden self-start lg:sticky lg:top-28 lg:block">
            <EnquiryForm compact sourcePage="iso-9001-2026" />
          </aside>
        </section>

        <section className="container-x pb-20 lg:hidden">
          <EnquiryForm compact sourcePage="iso-9001-2026" />
        </section>
      </>
    </Layout>
  );
}