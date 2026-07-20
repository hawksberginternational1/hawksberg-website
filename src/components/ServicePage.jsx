import { Link } from "react-router-dom";
import EnquiryForm from "./EnquiryForm";
import pageHeroBg from "@/assets/page-hero-bg.webp";
import tisaxBg from "@/assets/TISAX.webp";
import iso14001Bg from "@/assets/14001.webp";
import iso9001Bg from "@/assets/9001.webp";
import iso45001Bg from "@/assets/45001.webp";
import iatf16949Bg from "@/assets/16949.webp";
import iso50001Bg from "@/assets/50001.webp";
// import soc2Bg from "@/assets/Soc2.webp";
import dpdpBg from "@/assets/soc consulting.webp";
import TisaxSections from "./TisaxSections";

export default function ServicePage({ service }) {
  return (
    <>
      {/* <section className="relative overflow-hidden gradient-hero py-20 text-brand-foreground"> */}
  <section
  className={`relative overflow-hidden py-20 text-brand-foreground ${
    [
      "iso-27001",
      "tisax",
      "iso-14001",
      "iso-9001",
      "iso-45001",
      "iatf-16949",
      "iso-50001",
      // "soc-2",
      "dpdpp",
    ].includes(service.slug)
      ? "bg-cover bg-center"
      : "gradient-hero"
  }`}
  style={
    service.slug === "iso-27001"
      ? { backgroundImage: `url(${pageHeroBg})` }
      : service.slug === "tisax"
      ? { backgroundImage: `url(${tisaxBg})` }
      : service.slug === "iso-14001"
      ? { backgroundImage: `url(${iso14001Bg})` }
      : service.slug === "iso-9001"
      ? { backgroundImage: `url(${iso9001Bg})` }
      : service.slug === "iso-45001"
      ? { backgroundImage: `url(${iso45001Bg})` }
      : service.slug === "iatf-16949"
      ? { backgroundImage: `url(${iatf16949Bg})` }
      : service.slug === "iso-50001"
      ? { backgroundImage: `url(${iso50001Bg})` }
      // : service.slug === "soc-2"
      // ? { backgroundImage: `url(${soc2Bg})` }
      : service.slug === "dpdpp"
      ? { backgroundImage: `url(${dpdpBg})` }
      : {}
      
  }
>
  {/* {service.slug === "iso-27001" && (
  <div className="absolute inset-0 bg-[#0b3d91]/50 backdrop-blur-[1px]" />
)} */}
{[
  "iso-27001",
  "tisax",
  "iso-14001",
  "iso-9001",
  "iso-45001",
  "iatf-16949",
  "iso-50001",
  // "soc-2",
  "dpdpp",
].includes(service.slug) && (
  <div className="absolute inset-0 bg-black/75" />
)}
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="container-x relative">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            ISO Consulting Services
          </p>
          {/* <h1 className="mt-3 font-display text-5xl md:text-6xl">
            {service.code}{" "}
            <span className="text-gold">— {service.title}</span>
          </h1> */}
          <h1 className="mt-3 text-5xl md:text-6xl">
  <span
    style={{
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 400,
      letterSpacing: "-1px",
    }}
  >
    {service.code}
  </span>{" "}
  
  <span
    className="text-gold"
    style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontWeight: 400,
    }}
  >
    — {service.title}
  </span>
</h1>
          <div className="mt-4 gold-divider" />
          <p className="mt-6 max-w-2xl text-brand-foreground/80">
            {service.short}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary">
              Get Free Evaluation →
            </Link>
            {/* <Link to="/services/iso-27001" className="btn-outline">
              Other Services
            </Link> */}
          </div>
        </div>
      </section>

      <section className="container-x grid gap-12 py-20 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-10">
          {/* <div>
            <h2 className="font-display text-3xl">
              {service.overviewTitle || `About ${service.code} Consulting`}
            </h2>
            <div className="mt-3 gold-divider" />
            {(service.description && service.description.length > 0
              ? service.description
              : [
                  `Hawksberg International offers complete ${service.code} consulting — from gap analysis through certification — designed for measurable business value. Our consultants combine global best practice with local domain knowledge.`,
                  "Whether you are pursuing certification for the first time or upgrading an existing system, our phase-wise approach ensures audit readiness with minimal business disruption.",
                ]
            ).map((p, i) => (
              <p key={i} className="mt-5 text-muted-foreground">
                {p}
              </p>
            ))}
            {service.benefitsTitle && service.benefits && (
              <div className="mt-8">
                <h3 className="font-display text-2xl text-gold">
                  {service.benefitsTitle}
                </h3>
                <div className="mt-3 gold-divider" />
                <ul className="mt-5 grid gap-2">
                  {service.benefits.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-sm text-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-gold" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div> */}
{service.slug === "dpdpp" ? (
  <div>
    <h2 className="font-display text-3xl">
      DPDP Act Compliance for Indian Businesses
    </h2>
    <div className="mt-3 gold-divider" />

    <p className="mt-5 text-muted-foreground">
      The Digital Personal Data Protection Act, 2023 establishes mandatory obligations for businesses that collect, store, or process personal data in India.
    </p>

    <p className="mt-5 text-muted-foreground">
      From customer information to employee records, organizations must ensure lawful consent, secure data handling, and clear governance structures to remain compliant.
    </p>

    <p className="mt-5 text-muted-foreground">
      With enforcement expected, businesses should proactively assess DPDP readiness to avoid penalties of up to ₹250 crores, operational and reputational risks.
    </p>

    <div className="mt-10">
      <h3 className="font-display text-2xl text-gold">
        Who Must Comply With the DPDP Act?
      </h3>

      <div className="mt-3 gold-divider" />

      <ul className="mt-5 grid gap-2">
        {[
          "MSMEs and startups",
          "IT and SaaS companies",
          "Pharma and healthcare organizations",
          "FMCG brands and distributors",
          "E-commerce platforms",
          "Businesses using websites, apps, CRMs, or digital marketing tools",
          "Organizations handling customer, employee, or vendor personal data",
        ].map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-sm text-foreground"
          >
            <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-gold" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="mt-10">
      <h3 className="font-display text-2xl text-gold">
        Are You Compliant With the Latest DPDP Updates?
      </h3>

      <div className="mt-3 gold-divider" />

      <p className="mt-5 text-muted-foreground">
        Even small businesses that thought they were compliant may now be at risk.
      </p>

      <ul className="mt-5 grid gap-3">
        {[
          "Your data collection and processing might not meet legal standards",
          "Consent forms and privacy policies may be outdated or unenforceable",
          "High-risk data practices could trigger penalties or audits",
          "Cross-border transfers and vendor arrangements may be non-compliant",
        ].map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
          >
            <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-gold" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="mt-10">
      <h3 className="font-display text-2xl text-gold">
        Compliance Risks and Penalties
      </h3>

      <div className="mt-3 gold-divider" />

      <ul className="mt-5 grid gap-3">
        {[
          "Monetary penalties up to ₹250 crore",
          "Regulatory inquiries and notices",
          "Mandatory corrective actions",
          "Reputational and customer trust damage",
          "Business disruption during investigations",
        ].map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
          >
            <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-gold" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
) : (
  <div>
    <h2 className="font-display text-3xl">
      {service.overviewTitle || `About ${service.code} Consulting`}
    </h2>
    <div className="mt-3 gold-divider" />
    {(service.description && service.description.length > 0
      ? service.description
      : [
          `Hawksberg International offers complete ${service.code} consulting — from gap analysis through certification.`,
        ]
    ).map((p, i) => (
      <p key={i} className="mt-5 text-muted-foreground">
        {p}
      </p>
    ))}
  </div>
)}
          <div>
            <h2 className="font-display text-3xl">What you get</h2>
            <div className="mt-3 gold-divider" />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.points.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
                >
                  <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full gradient-gold text-xs font-bold text-ink">
                    ✓
                  </span>
                  <span className="text-sm text-foreground">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* <div className="rounded-2xl border border-gold/30 bg-secondary/40 p-8">
            <h3 className="font-display text-2xl">Our 6-step methodology</h3>
            <ol className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                "Gap analysis & scoping",
                "Risk assessment & treatment",
                "Documentation framework",
                "Implementation & training",
                "Internal audit & review",
                "Certification & sustenance",
              ].map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="font-display text-3xl text-gold">
                    0{i + 1}
                  </span>
                  <p className="pt-1 text-sm text-foreground">{step}</p>
                </li>
              ))}
            </ol>
          </div> */}
          {service.slug !== "dpdpp" && (
  <div className="rounded-2xl border border-gold/30 bg-secondary/40 p-8">
    <h3 className="font-display text-2xl">Our 6-step methodology</h3>
    <ol className="mt-5 grid gap-4 sm:grid-cols-2">
      {[
        "Gap analysis & scoping",
        "Risk assessment & treatment",
        "Documentation framework",
        "Implementation & training",
        "Internal audit & review",
        "Certification & sustenance",
      ].map((step, i) => (
        <li key={step} className="flex gap-4">
          <span className="font-display text-3xl text-gold">
            0{i + 1}
          </span>
          <p className="pt-1 text-sm text-foreground">{step}</p>
        </li>
      ))}
    </ol>
  </div>
)}
{/* {service.slug === "tisax" && (
    <TisaxSections service={service} />
)} */}
        </div>

        {/* <aside className="lg:sticky lg:top-28 self-start">
          <EnquiryForm compact />
        </aside> */}
        <aside className="hidden lg:block lg:sticky lg:top-28 self-start">
  <EnquiryForm compact />
</aside>
      </section>
   {service.slug === "tisax" && (
  <>
    <section className="container-x py-20">
      <TisaxSections />
    </section>

    <section className="container-x pb-20 lg:hidden">
      <EnquiryForm compact />
    </section>
  </>
)}
    </>
  );
}
