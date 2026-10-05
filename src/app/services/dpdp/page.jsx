import Layout from "@/components/Layout";
import ServicePage from "@/components/ServicePage";

// Services Grid image
import dpdpGridImage from "@/assets/services/dpdp.webp";

// DPDP detail page actual hero background
import dpdpHeroImage from "@/assets/soc consulting.webp";

export const service = {
  slug: "dpdp",

  code: "DPDP",

  title: "DPDP Compliance Audit & Consulting Services in India",

  heroLabel: "Data Protection & Compliance Consulting",

  heroTitle: "DPDP Compliance Audit & Consulting Services in India",

  short:
    "Expert compliance guidance to assess applicability, close gaps and prepare your business for India's Digital Personal Data Protection law.",

  overviewTitle: "DPDP Act Compliance for Indian Businesses",

  // Services Grid image
  image: dpdpGridImage,

  // Actual hero background image
  heroImage: dpdpHeroImage,

  description: [
    "The Digital Personal Data Protection (DPDP) Act, 2023 sets mandatory obligations for any business that collects, stores or processes personal data in India. From customer information to employee records, organisations must ensure lawful consent, secure data handling and clear governance.",

    "Hawksberg International provides DPDP compliance audit and consulting services from Chennai, supporting businesses across India. We help you understand where you stand, fix the gaps and build processes you can demonstrate during an audit or inquiry.",

    "Failure to maintain reasonable security safeguards can attract penalties of up to ₹250 crore under the Act, along with regulatory notices and reputational damage. Assessing your readiness early is far cheaper than responding to a breach or notice later.",
  ],

  // ------------------------------------------------------------
  // DPDP COMPLIANCE AUDIT
  // ------------------------------------------------------------

  auditTitle: "What is a DPDP Compliance Audit?",

  auditDescription:
    "A DPDP compliance audit reviews how your organisation collects, uses, stores, shares and deletes personal data, and compares those practices with the requirements of the DPDP Act and Rules. The result is a clear gap report and a prioritised plan to fix what matters first.",

  // ------------------------------------------------------------
  // COMMON COMPLIANCE GAPS
  // ------------------------------------------------------------

  complianceGapsTitle: "Common Compliance Gaps We Find",

  complianceGaps: [
    "Data collection and processing that does not meet legal standards",

    "Consent forms and privacy notices that are outdated or unclear",

    "No record of what personal data you hold, where it sits and who can access it",

    "No process for handling access, correction and erasure requests",

    "No breach detection or reporting procedure",

    "Vendor and cross-border data arrangements without proper agreements",
  ],

  // ------------------------------------------------------------
  // DPDP CONSULTING SERVICES
  // ------------------------------------------------------------

  consultingServicesTitle: "Our DPDP Consulting Services",

  consultingServices: [
    {
      title: "Applicability assessment and risk mapping",
      description: "Which obligations apply to your organisation",
    },

    {
      title: "Data audit and gap analysis",
      description: "Personal data inventory and data-flow mapping",
    },

    {
      title: "Consent management and privacy framework",
      description: "Consent mechanisms and clear privacy notices",
    },

    {
      title: "Data principal rights management",
      description:
        "Processes for access, correction, erasure and grievances",
    },

    {
      title: "Data security and breach response planning",
      description: "Safeguards, detection and reporting procedure",
    },

    {
      title: "Vendor, employee and third-party compliance",
      description: "Data processor agreements and controls",
    },

    {
      title: "Children's data controls",
      description: "Verifiable parental consent where applicable",
    },

    {
      title: "Significant Data Fiduciary support",
      description: "DPO, independent audit and impact assessment",
    },

    {
      title: "Training, awareness and governance",
      description: "Staff training and accountability structure",
    },

    {
      title: "Regulatory advisory and ongoing support",
      description: "",
    },
  ],

  // ------------------------------------------------------------
  // DPDP AUDIT APPROACH
  // ------------------------------------------------------------

  auditApproachTitle: "Our DPDP Audit Approach",

  auditApproach: [
    {
      title: "Scoping and data discovery",
      description: "Identify what personal data you process and why",
    },

    {
      title: "Gap assessment",
      description: "Compare your practices against the DPDP Act and Rules",
    },

    {
      title: "Risk rating and findings report",
      description: "A prioritised list of gaps",
    },

    {
      title: "Remediation roadmap",
      description: "Policies, consent flows, procedures and controls",
    },

    {
      title: "Verification and ongoing support",
      description:
        "Confirm fixes and keep you compliant as rules evolve",
    },
  ],

  // ------------------------------------------------------------
  // WHY CHOOSE HAWKSBERG
  // ------------------------------------------------------------

  whyChooseTitle: "Why Choose Hawksberg International?",

  whyChoosePoints: [
    "Experience across ISO 27001, TISAX and other compliance frameworks",

    "Practical, business-focused approach for MSMEs and enterprises",

    "Based in Chennai, serving clients on-site and remotely across India",

    "Clear deliverables you can show to customers, auditors and regulators",
  ],

  // relatedLinks: [
  //   {
  //     label: "ISO Consultant in Chennai",
  //     href: "/services/iso-27001",
  //   },
  //   {
  //     label: "TISAX Consulting",
  //     href: "/services/tisax",
  //   },
  // ],

  // ------------------------------------------------------------
  // FAQ
  // ------------------------------------------------------------

  faqTitle: "Frequently Asked Questions",

  faqs: [
    {
      title: "What is a DPDP compliance audit?",
      content:
        "A structured review of your personal data practices against the DPDP Act and Rules, ending in a gap report and an action plan.",
    },

    {
      title: "Does my small business need to comply with the DPDP Act?",
      content:
        "Yes, if you process digital personal data of individuals in India. Your specific obligations depend on your role and the volume and nature of the data.",
    },

    {
      title: "What are the penalties for non-compliance?",
      content:
        "Penalties can reach ₹250 crore for failure to maintain reasonable security safeguards, with other violations carrying lower caps.",
    },

    {
      title: "How long does DPDP compliance take?",
      content:
        "Usually a few weeks to a few months, depending on your size, systems and the complexity of your data.",
    },

    {
      title: "How is DPDP different from GDPR?",
      content:
        "Both protect personal data, but they differ in legal bases for processing, rights, and penalties. DPDP is built mainly around consent and defined fiduciary duties.",
    },
  ],
};

export const serviceMeta = {
  label: "DPDP",

  slug: "dpdp",

  // Services Grid image
  image: dpdpGridImage,

  to: "/services/dpdp",
};

export default function DPDP() {
  return (
    <Layout>
      <ServicePage service={service} />
    </Layout>
  );
}