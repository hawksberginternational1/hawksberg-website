import Layout from "@/components/Layout";
import InfoPage from "@/components/InfoPage";

import socBg from "@/assets/soc consulting.webp";
import socLeadImg from "@/assets/unsplash/soc-network.webp";
import socPanelImg from "@/assets/unsplash/soc-panel.webp";

const info = {
  slug: "soc-consulting",

  backgroundImage: socBg,

  hero: "Expert SOC Consulting Services",

  lead: {
    title: "Expert SOC Consulting Services",

    image: socLeadImg,

    paragraphs: [
      "Being driven close to at least one customer to have a SOC review performed is frequently the impetus that makes an organisation start investigating their choices concerning the different reports and their information. It is advantageous for associations to use professional SOC consulting services and they can definitely acquire it on account of a thorough report being directed.",

      "Numerous associations before they need to start the SOC cost, yet they don't have the foggiest idea how to kick things off. This is the place where our 'SOC Readiness' or 'SOC Consulting' services come into play.",
    ],
  },

  panels: [
    {
      title: "What is SOC 2?",

      body: [
        "SOC 2 is a voluntary certification report certified by an accredited CPA firm that requires the documentation of leading controls against a rigorous management arrangement of data security controls covering trust service criteria (security, availability, processing integrity, confidentiality, and privacy).",

        "SOC 2 Type I — A SOC Type 1 report relates to the design and documentation of a system provided to control for the operation at a specific date. It does not provide assurance on the design or effectiveness of those controls over a period of time.",

        "SOC 2 Type II — A SOC 2 Type 2 report (also known as SOC 2 Type II) covers the design and documentation of controls in SOC 2 Type 2 and also provides additional assurance on how the organisation systems process data in real terms and how the documentation provides certainty as to how this data is managed.",
      ],
    },

    {
      title: "Why SOC 2 Compliance?",

      body: [
        "SOC 2 compliance helps organizations demonstrate that their controls are designed to address risks related to security, availability, processing integrity, confidentiality, and privacy. It is particularly relevant for service organizations that manage systems or data on behalf of customers and business partners.",
      ],

      image: socPanelImg,
    },
  ],

  grid: {
    title: "Get Certified in 5 Steps",

    items: [
      {
        title: "Pre-Assessment & Gap Analysis",
        body: "Our team will provide the support needed to understand current security controls and identify gaps against the relevant SOC framework, ensuring each step is understood.",
      },

      {
        title: "Training and Competence",
        body: "Your organisation's people will be trained with the required competence and will support implementing the recommendations needed for a successful SOC audit.",
      },

      {
        title: "Implementation and Review",
        body: "We help organisations implement and improve the required controls in your organisation to meet all the requirements specified by the relevant SOC framework.",
      },

      {
        title: "Final Audit & Certification Readiness",
        body: "We will work with your organisation to get it ready for its certification audit with a full review before the official audit with the assessors.",
      },

      {
        title: "Achieve Certificate",
        body: "We work with assessors and organisations to help organisations achieve and maintain their certificates and ongoing compliance requirements.",
      },
    ],
  },
};

export const metadata = { title: "SOC Consulting", description: "Security operations consulting and readiness information from Hawksberg International.", alternates: { canonical: "/info/soc-consulting" } };

export default function SOCConsulting() {
  return (
    <Layout>
      <InfoPage page={info} />
    </Layout>
  );
}
