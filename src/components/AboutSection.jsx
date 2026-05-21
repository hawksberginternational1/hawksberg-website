import { Link } from "react-router-dom";
import { stats } from "@/data/site";
import managementPartnerImg from "@/assets/management-partner.webp";
import useReveal from "@/hooks/useReveal";

export default function AboutSection() {
  const [imgRef, imgShown] = useReveal();
  const [textRef, textShown] = useReveal();

  return (
    // <section className="container-x py-24">
    <section className="container-x py-20 lg:py-24">
      {/* <div className="grid items-center gap-14 lg:grid-cols-2"> */}
      {/* <div className="grid items-center gap-10 lg:gap-16 lg:grid-cols-2"> */}
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div
          ref={imgRef}
          className={`relative reveal-on-scroll reveal-left ${imgShown ? "is-visible" : ""}`}
        >
          <div className="absolute -inset-4 -z-10 rounded-3xl gradient-gold opacity-20 blur-2xl float-soft" />
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-1 shadow-elegant">
            {/* <div className="relative aspect-[4/5] overflow-hidden rounded-xl"> */}
           <div className="relative overflow-hidden rounded-xl h-[620px] lg:h-[770px]">
              <img
  src={managementPartnerImg}
  alt="Hawksberg consulting team — your management partner"
  loading="eager"
  decoding="async"
  width={1024}
  height={1280}
                // className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-110"
                className="h-full w-full object-cover object-center transition-transform duration-[1200ms] hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8 text-brand-foreground">
                <span className="text-xs uppercase tracking-[0.3em] text-gold">
                  Established expertise
                </span>
                {/* <h3 className="mt-2 font-display text-3xl text-white">
                  Four decades of consulting excellence
                </h3> */}
                <p className="mt-3 max-w-sm text-sm text-white/80">
                  Global reach, local service — from Chennai to clients
                  worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <div
          ref={textRef}
          className={`reveal-on-scroll reveal-right ${textShown ? "is-visible" : ""}`}
        > */}
        <div
  ref={textRef}
  className={`flex flex-col justify-center reveal-on-scroll reveal-right ${
    textShown ? "is-visible" : ""
  }`}
>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            About
          </p>
          {/* <h2 className="mt-3 font-display text-4xl md:text-5xl"> */}
          <h2 className="mt-3 font-display text-3xl leading-tight md:text-5xl">
            Hawksbergs International{" "}
            <span className="text-gold">Certification</span>
          </h2>
          <div className="mt-4 gold-divider" />
          <p className="mt-6 text-muted-foreground">
            Hawksbergs International Certification provides unique ISO consultancy and training
            services to help companies achieve greater performance by defining
            required business standard procedures that the companies must 
            follow to accomplish their goals and objectives.
          </p>
          <p className="mt-4 text-muted-foreground">
            Our unique ISO consultancy services also help companies create an
            organizational culture that spontaneously engages in a constant
            cycle of self-evaluation, correction, and advancement of operations
            and processes by boosting the level of employee awareness,
            management, leadership and commitment.
          </p>
          <p className="mt-4 text-muted-foreground">
            We have developed a comprehensive array of ISO consultancy to
            fulfill the specific needs of a wide range of business sectors. By
            integrating global coverage and local knowledge with our broad
            range of services, we are able to design custom-fit solutions to
            complicated issues. Our extensive range of inter-related services
            and modular methodologies ensures that we can accommodate a large
            spectrum of projects.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-lg border border-border bg-card p-4 text-center hover-lift">
                <p className="font-display text-3xl text-gold">{s.value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            {/* <Link to="/about" className="btn-primary">More About Us</Link> */}
            {/* <Link to="/contact" className="btn-outline">Talk to an Expert</Link> */}
            <Link to="/contact" className="btn-primary">Talk to an Expert</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
