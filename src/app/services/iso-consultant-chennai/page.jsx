import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import EnquiryForm from "@/components/EnquiryForm";
import isoConsultantBanner from "@/assets/isoconsultant.webp";

export const metadata = {
  title: "ISO Consultant in Chennai | Expert ISO Certification Services",
  description:
    "Hawksberg International is a leading ISO consultant in Chennai, helping organizations achieve and maintain ISO certifications through gap analysis, documentation, internal audit training, mock audits, and pre-audit support.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/services/iso-consultant-chennai" },
};

export default function IsoConsultantChennaiPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <img
          src={isoConsultantBanner.src}
          alt="ISO Consultant in Chennai"
          className="block w-full h-auto"
        />

        <section className="container-x py-16 md:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-bold text-[#0b2341] sm:text-4xl lg:text-5xl">
              ISO Consultant in Chennai | Expert ISO Certification Services
            </h1>

            <p className="mt-4 text-lg font-semibold text-gold sm:text-xl">
              Professional ISO Compliance & Certification Solutions for Your Business
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-4xl">
            <h2 className="text-2xl font-bold text-[#0b2341] sm:text-3xl">
              Why Choose an ISO Consultant in Chennai?
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              As a leading ISO consultant in Chennai, Hawksberg International specializes in helping organizations achieve and maintain ISO certifications that enhance their credibility, operational efficiency, and market competitiveness. Whether you're a manufacturing facility, service provider, or trading company in Chennai, our experienced ISO consultants provide end-to-end guidance through the entire certification process. We understand the unique challenges businesses face in Chennai's dynamic market and tailor our ISO consulting services to meet your specific organizational needs. With years of expertise in ISO standards implementation, our team of certified ISO consultants ensures your company not only achieves certification but also derives maximum value from the certification process.
            </p>

            <div className="mt-8 flex justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#d99a2b] px-8 py-4 font-bold text-[#10243d] transition hover:bg-[#e7ad3d]"
              >
                Get Your Free ISO Consultation
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-4xl">
            <h2 className="text-2xl font-bold text-[#0b2341] sm:text-3xl">
              Comprehensive ISO Consulting Services in Chennai
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Our ISO consultant services in Chennai cover a wide range of ISO standards including ISO 9001 (Quality Management), ISO 14001 (Environmental Management), ISO 45001 (Occupational Health & Safety), ISO 27001 (Information Security), and ISO 50001 (Energy Management). As an experienced ISO consultant in Chennai, we provide gap analysis assessments, documentation development, internal audit training, mock audits, and pre-audit support to ensure your organization's readiness. Our consultants work closely with your team to minimize disruption to your operations while implementing robust ISO management systems. From startups to large enterprises, our ISO certification consultants in Chennai have successfully guided numerous organizations across industries like automotive, pharmaceuticals, hospitality, IT, and manufacturing toward ISO compliance and certification excellence.
            </p>

            <div className="mt-8 flex justify-center">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#c98b2e] px-8 py-4 font-bold text-[#c98b2e] transition hover:bg-blue-50"
              >
                Explore Our ISO Services
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-6xl">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
              <div className="order-1 mx-auto w-full max-w-md lg:order-2 lg:mx-0 lg:ml-auto">
                <EnquiryForm sourcePage="iso-consultant-chennai" />
              </div>

              <div className="order-2 lg:order-1">
                <h2 className="text-2xl font-bold text-[#0b2341] sm:text-3xl">
                  Transform Your Business with ISO Certification in Chennai
                </h2>

                <p className="mt-5 leading-8 text-slate-600">
                  Choosing a qualified ISO consultant in Chennai is crucial for the success of your certification journey. At Hawksberg International, our ISO consultants are committed to delivering measurable business benefits through systematic certification processes. An ISO consultant in Chennai from our team will help you streamline operations, reduce costs, improve customer satisfaction, and gain competitive advantage in the local and global marketplace. We pride ourselves on our personalized approach—every organization's ISO requirements are unique, and our expert consultants adapt strategies accordingly. By partnering with our ISO consultants in Chennai, you're investing in long-term business sustainability and regulatory compliance. Our post-certification support ensures your ISO systems remain effective and aligned with business objectives, giving you peace of mind and a strong foundation for continuous improvement.
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-[#0b2341] sm:text-3xl">
              Start Your ISO Journey Today
            </h2>
          </div>
        </section>
      </main>

      <Footer />

      <WhatsAppFloat />
    </div>
  );
}
