import Layout from "@/components/Layout";
import ServicePage from "@/components/ServicePage";

import iso27001Image from "@/assets/services/iso-27001.webp";
import iso27001HeroBg from "@/assets/page-hero-bg.webp";

export const service = {
  slug: "iso-27001",

  code: "ISO 27001",

  title: "Consulting — Auditing — Training",

  short:
    "Implement a robust ISMS framework to safeguard data, ensure confidentiality and earn customer trust.",

  overviewTitle:
    "ISO 27001 Consulting Services, ISMS Implementation & Certification",

  // Service/content image
  image: iso27001Image,

  // Static hero background image
  heroImage: iso27001HeroBg,

  // description: [
  //   "ISO 27001 requires 14 information security disciplines that correspond to 114 security controls to ensure all information means — covering people, processes and technology including suppliers and merchandisers — are secure. An ISO 27001 Consultant offers a fast, effective way to achieve certification.",

  //   "ISO Risk Categorization: Associations must classify their information and information systems in order of risk to ensure that sensitive information and the systems that use it are given the topmost level of security.",

  //   "ISO System Security Plan: ISO 27001 requires agencies to produce a security plan which is regularly maintained and kept up to date. The plan should cover items like the security controls executed within the association, security programs, and a schedule for the introduction of further controls.",

  //   "ISO Security Controls: ISO 27001 outlines an extensive catalogue of suggested security controls for ISO 27001 compliance. The standard does not require an agency to apply every single control; rather, they are instructed to apply the controls that are applicable to their organisation and systems. Once the applicable controls are selected and the security conditions have been satisfied, the organisation must validate the named controls in their system security plan.",

  //   "Information Security Management System (ISMS) certification is an international standard which helps you identify the threats that may affect your organization's confidential information or data security and implement effective measures to reduce or eliminate the identified risk factors.",

  //   "Similar to other management systems, ISO 27001 is based on the P-D-C-A approach towards quality improvement. ISO 27001 certification for IT companies offers a methodical and well-organized approach that will protect the confidentiality of your data, fortify the integrity of business data and intensify the availability of your business IT systems.",

  //   "When you are certified to ISO 27001:2013, you are demonstrating that your Information Security Management System meets the standards of the ISO model of implementation, maintenance and continual improvement. Our ISO 27001 security consulting services include ISMS implementation and an ISO 27001-ready program of an organization through a well-defined, phased approach.",
  // ],

  description: [
    "Protect your data, win customer trust and meet client security requirements. Hawksberg International is an ISO 27001 consultant in Chennai that helps IT companies, manufacturers, startups and service providers build an Information Security Management System (ISMS) and get ready for certification audits",
  ],

  // New content added AFTER the existing description
  contentSections: [
    {
      title: "What is ISO 27001?",

      content:
        "ISO/IEC 27001 is the international standard for information security management. It gives your organisation a structured way to find information security risks, decide which controls you need, and keep improving over time. The current version is ISO/IEC 27001:2022. It protects the confidentiality, integrity and availability of your information across people, processes and technology.",
    },

    {
      title: "Why Chennai companies need ISO 27001?",

      points: [
        "Global clients and vendor questionnaires increasingly require certified security practices.",
        "Many tenders and enterprise contracts ask for ISO 27001.",
        "It supports compliance with data protection requirements, including India's DPDP Act.",
        "It reduces the risk of breaches, downtime and loss of customer trust.",
        "It strengthens your position in IT/ITES, SaaS, BPO, automotive, manufacturing and healthcare.",
      ],
    },

    {
      title: "Who we help?",

      content:
        "IT and software companies, SaaS and startups, BPO/KPO, manufacturing and automotive suppliers, healthcare and education, and any business handling client or customer data in Chennai and across India.",
    },

    {
      title: "How long does ISO 27001 certification take?",

      content:
        "It depends on company size, scope and how mature your existing security is. Small and mid-sized organisations commonly take a few months from kickoff to certification. We give you a clear timeline after the gap analysis.",
    },

    {
      title: "Why choose Hawksberg International?",

      points: [
        "Chennai-based consultants, so you get on-site support, not just remote calls.",
        "A cybersecurity background (VAPT, SOC 2 readiness, TISAX), so controls are practical and technically sound.",
        "A structured 6-step method focused on audit-ready results.",
        "Related support under one roof: TISAX consulting, DPDP consulting, ISO training",
      ],
    },

    {
      title: "FAQs",

      faqHeading: "Frequently Asked Questions",

      faqs: [
        {
          title: "Do you provide ISO 27001 consulting in Chennai?",
          content:
            "Yes. We support organisations in Chennai and across India with ISMS implementation, internal audits and certification readiness.",
        },

        {
          title: "Do you issue the ISO 27001 certificate?",
          content:
            "No. Certificates are issued by an accredited certification body. We prepare you for the audit and support you through it.",
        },

        {
          title: "Which version of ISO 27001 do you implement?",
          content:
            "ISO/IEC 27001:2022, the current version.",
        },

        {
          title: "What does ISO 27001 consulting cost?",
          content:
            "It depends on scope, number of employees, locations and existing controls. Contact us for a quote after a short evaluation.",
        },

        {
          title: "Can a small company or startup get ISO 27001?",
          content:
            "Yes. The ISMS is scaled to your size and scope.",
        },

        {
          title: "Do we need to implement all Annex A controls?",
          content:
            "No. You select the controls that apply to your risks and document your reasoning in the Statement of Applicability.",
        },
      ],
    },

    // {
    //   title: "Talk to an ISO 27001 consultant in Chennai",
    // },
  ],

  points: [
    "Gap analysis and risk assessment",
    "ISMS documentation and policy framework",
    "Internal audit and certification readiness",
    "Continuous improvement support",
  ],
};

export const serviceMeta = {
  label: "ISO 27001",
  slug: "iso-27001",
  image: iso27001Image,
  to: "/services/iso-27001",
};

export default function ISO27001() {
  return (
    <Layout>
      <ServicePage service={service} />
    </Layout>
  );
}