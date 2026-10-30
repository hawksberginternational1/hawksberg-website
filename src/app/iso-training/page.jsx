import Link from "next/link";
import Layout from "@/components/Layout";
import EnquiryForm from "@/components/EnquiryForm";
import isoTrainingImage from "@/assets/isotraining/isotraining.webp";

export const metadata = {
  title: {
    absolute: "ISO Certification Training | Lead Auditor & Internal Auditor | Hawksberg",
  },
  description:
    "Join ISO certification training courses for Lead Auditor, Internal Auditor and ISO Foundation programs. Build your ISO expertise with Hawksberg International.",
  keywords: "ISO certification course, ISO Audit training",
  robots: "index, follow",
};

const trainingPrograms = [
  {
    title: "ISO Lead Auditor Training",
    description:
      "Build practical auditing skills for assessing management systems against international standards.",
    href: "/iso-training/iso-lead-auditor-Training-Chennai",
  },
  {
    title: "ISO Internal Auditor Training",
    description:
      "Learn to plan, conduct, report and follow up internal audits within your organization.",
   href: "/iso-training/iso-internal-auditor-Training-Chennai",
  },
  {
    title: "ISO Foundation Training",
    description:
      "Understand the fundamentals of ISO standards and management system implementation.",
    href: "/iso-training/iso-foundation",
  },
  {
    title: "Online ISO Training",
    description:
      "Study from anywhere through flexible online programs for professionals and teams.",
    href: "/iso-training/online-iso-training",
  },
];

export default function ISOTrainingLandingPage() {
  return (
    <>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="title" content="ISO Certification Training | Lead Auditor & Internal Auditor | Hawksberg" />
      <meta name="language" content="English" />
      <Layout>
      <section
        className="relative min-h-[430px] overflow-hidden bg-cover bg-center bg-no-repeat text-white md:min-h-[440px]"
        style={{ backgroundImage: `url(${isoTrainingImage.src})` }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 grid-pattern opacity-[0.12]" />
        <div className="container-x relative flex min-h-[430px] items-center justify-center md:min-h-[440px]">
          <div className="mx-auto w-full max-w-7xl px-4 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-gold md:text-sm">
              ISO Training Programs
            </p>
            <h1 className="mx-auto mt-5 max-w-7xl font-display text-4xl font-medium uppercase leading-tight tracking-wide sm:text-5xl md:text-6xl lg:text-[64px]">
              ISO Certification Training
            </h1>
            <div className="mx-auto mt-6 gold-divider" />
            <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-white/90">
              Practical training programs that help individuals and organizations understand, implement and audit internationally recognized ISO standards.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background pt-16 pb-16 md:pt-20 md:pb-10">
        <div className="container-x">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">
            <div>
            <h2 className="font-display text-3xl uppercase tracking-wide text-foreground md:text-4xl">
              About ISO Training
            </h2>
            <div className="mt-4 gold-divider" />
            <div className="mt-8 space-y-6 text-base leading-8 text-muted-foreground">
              <p>
                Our ISO training programs are structured to equip organizations with the competencies necessary for aligning with standards developed by the International Organization for Standardization (ISO). These programs focus on enhancing understanding and implementation of ISO standards to strengthen quality management systems, improve operational efficiencies, and support a culture of continual improvement.
              </p>
              <p>
                Our training is designed for professionals at different levels of experience, from those seeking a fundamental understanding of ISO standards to individuals responsible for implementing, maintaining, or auditing management systems. The programs combine practical knowledge with a clear understanding of ISO requirements, helping participants apply the concepts effectively within their organizational environment.
              </p>
              <p>
                To ensure your team is knowledgeable in these standards, consider enrolling them in a course aligned with your organization's specific needs. Hawksberg International provides a range of ISO training courses, each tailored to different aspects of ISO standards, enabling employees to implement practices that align with your organization's quality objectives.
              </p>
            </div>
            </div>
            <EnquiryForm compact />
          </div>
        </div>
      </section>

      <section className="bg-background pt-20 pb-20 md:pt-10 md:pb-24">
        <div className="container-x">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-3xl uppercase tracking-wide text-foreground md:text-4xl">
              Build Practical ISO Expertise
            </h2>
            <div className="mx-auto mt-4 gold-divider" />
            <p className="mt-8 text-base leading-8 text-muted-foreground">
              Hawksberg International provides professional ISO certification training for learners at every stage, helping teams build knowledge for compliance, continual improvement and successful audits.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trainingPrograms.map((program) => (
              <article
                key={program.title}
                className="flex h-full flex-col rounded-xl border border-border bg-card p-6 text-foreground shadow-sm transition-transform duration-300 hover:-translate-y-1"
              >
                <h3 className="font-display text-xl">{program.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">
                  {program.description}
                </p>
                <Link
                  href={program.href}
                  className="mt-6 inline-flex w-fit items-center font-semibold text-gold transition-colors hover:text-gold/80"
                >
                  Explore Training <span className="ml-2" aria-hidden="true">-&gt;</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
    </>
  );
}
