import Layout from "@/components/Layout";
import ServicePage from "@/components/ServicePage";

// Services Grid image
import tisaxGridImage from "@/assets/services/tisax.webp";

// TISAX detail page actual hero background
import tisaxHeroImage from "@/assets/TISAX.webp";

export const service = {
  slug: "tisax",

  code: "TISAX",

  // title: "Trusted Information Security Assessment Exchange",
  title: "TISAX Certification Consulting for Automotive Suppliers in India",

  // short:
  //   "TISAX labelling for automotive suppliers handling sensitive information.",
  short:
  "One assessment, accepted by many customers. Let us help you prepare properly and avoid repeated security audits",

  // overviewTitle:
  //   "TISAX — Trusted Information Security Assessment Exchange",

  // --------------------------------------------------
  // GRID IMAGE
  // Used only in ServicesGrid.jsx
  // --------------------------------------------------
  image: tisaxGridImage,

  // --------------------------------------------------
  // HERO IMAGE
  // Used as the background on the TISAX detail page
  // --------------------------------------------------
  heroImage: tisaxHeroImage,

  // description: [
  //   "TISAX® stands for Trusted Information Security Assessment Exchange. TISAX® enables mutual acceptance of information security assessments in the automotive industry and provides a common assessment and exchange mechanism that ensures the secure sharing of sensitive information to partner companies, to inspire trust throughout the automotive supply chain.",

  //   "TISAX® was established by VDA (the German association of the automotive industry) and is operated by ENX Association, who have assessed and confirmed approved audit providers to perform the assessments.",

  //   "Developed by automotive industry security experts and based on international information security management system (ISMS) standards like ISO/IEC 27001, TISAX® provides a catalogue of requirements, covering virtual, physical and social aspects of information security, specific to the automotive supply chain. This catalogue is referred to as the Information Security Assessment (ISA) and forms the basis of the assessment conducted by approved TISAX® audit providers.",
  // ],
  contentSections: [
  {
    title: "Does Your Customer Want a TISAX Label?",
    paragraphs: [
      'It usually starts with a line in a purchase contract or a supplier questionnaire: "Please provide a valid TISAX label." For many companies, that is the first time they hear the word.',

      "TISAX stands for Trusted Information Security Assessment Exchange. Put simply, it is a way to prove to German car makers and their Tier-1 partners that you protect their data, drawings and prototypes properly. You are assessed once, the result is shared through a central platform, and every customer who needs it can see it. That ends the cycle of separate security audits from each OEM.",

      "Hawksberg International is a Chennai-based consultancy that helps automotive suppliers, engineering firms and IT service providers reach that label without wasted effort. We work in plain language, we scope carefully, and we do not push you into a bigger assessment than your customer actually requires.",
    ],
  },
  {
    title: "Who Needs TISAX Certification?",
    intro:
      "If any of the following sounds like your business, TISAX is likely on your horizon:",
    points: [
      "You supply parts, tooling or assemblies to German OEMs directly or through a Tier-1.",
      "You are an engineering, design or R&D services company handling CAD data, specifications or test results for an automotive customer.",
      "You are an IT, software or BPO firm that processes automotive data on behalf of a European client.",
      "You handle prototype parts, pre-series vehicles or test drives that must be kept away from public view.",
      "You are a logistics, testing or calibration partner who receives sensitive customer information.",
    ],
    note:
      "A quick note for Indian companies: TISAX is not a government requirement. It is a customer requirement. That is why the first step is always to find out exactly what your customer expects, which label, which level and by when.",
  },
],

  benefitsTitle: "Who does it apply to?",

  benefits: [
    "Original Equipment Manufacturers (OEMs) increasingly recognise — and in some cases mandate — that a TISAX® label demonstrates compliance with information security requirements across the automotive supply chain.",

    "There are currently more than 3,000 TISAX® participants (OEMs and TISAX® certified suppliers) across almost 6,000 registered locations worldwide.",

    "Applies to a wide range of organisations working with OEMs — from vehicle component suppliers to technology service providers and beyond.",
  ],

  points: [
    "TISAX scope definition",
    "Information security implementation",
    "Assessment preparation",
    "Label maintenance support",
  ],
};

export const serviceMeta = {
  label: "TISAX",

  slug: "tisax",

  // IMPORTANT:
  // This image is ONLY for ServicesGrid.jsx
  image: tisaxGridImage,

  to: "/services/tisax",
};

export default function TISAX() {
  return (
    <Layout>
      <ServicePage service={service} />
    </Layout>
  );
}
