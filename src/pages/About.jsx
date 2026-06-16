import Layout from "@/components/Layout";
import AboutSection from "@/components/AboutSection";
import ValuesStrip from "@/components/ValuesStrip";
import Clients from "@/components/Clients";
import Testimonials from "@/components/Testimonials";
import aboutUsBg from "@/assets/aboutus.webp";
export default function About() {
  return (
    <Layout>
      {/* <section className="relative overflow-hidden gradient-hero py-20 text-brand-foreground"> */}
      <section
  className="relative overflow-hidden bg-cover bg-center py-20 text-brand-foreground"
  style={{
    backgroundImage: `url(${aboutUsBg})`,
  }}
>
  <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="container-x relative">
          {/* <p className="text-xs uppercase tracking-[0.3em] text-gold">About Us</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">
            Engineering trust through{" "}
            <span className="text-gold">global standards</span>
          </h1> */}
          <h1 className="mt-3 font-display text-5xl md:text-6xl text-gold">
           About Us 
          </h1>
          <div className="mt-4 gold-divider" />
          <p className="mt-6 max-w-2xl text-brand-foreground/80">
            Hawksberg International is a global ISO consultancy and cyber
            security training firm with deep expertise across regulated
            industries.
          </p>
        </div>
      </section>
      <AboutSection />
      <ValuesStrip />
      <section className="container-x py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            Importance
          </p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            Why ISO certification matters
          </h2>
          <div className="mx-auto mt-4 gold-divider" />
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["Standardised processes", "All processes are evaluated and standardised across the organisation."],
            ["Faster issue detection", "Issues are detected quickly and resolved with traceability."],
            ["Customer trust", "International recognition that strengthens credibility with customers."],
            ["Continuous improvement", "Embeds a culture of measurable, continual improvement."],
          ].map(([t, d]) => (
            <div key={t} className="hover-lift rounded-xl border border-border bg-card p-6">
              <h3 className="font-display text-xl text-gold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <Clients />
      <Testimonials />
    </Layout>
  );
}
