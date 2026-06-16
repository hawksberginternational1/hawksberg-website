import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const slides = [
  {
    eyebrow: "ISO Consultancy & Training",
    title: "Delivering Excellence in Compliance & Cyber Security",
    sub: "From ISO certification to cyber security training — Hawksberg International delivers measurable, audit-ready outcomes for enterprises across the globe.",
    cta: "Explore Services",
    to: "/services/iso-27001",
  },
  {
    eyebrow: "Cyber Security",
    // title: "Defend, Detect, Respond — with Confidence",
    title: "Trusted Cyber Security & Compliance Expertise",
    sub: "VAPT, ISO 27001 ISMS implementation, SOC 2 readiness and TISAX labelling — secured by a team with decades of experience.",
    cta: "Cyber Security Services",
    to: "/services/iso-27001",
  },
  {
    eyebrow: "Industry-Ready Training",
    title: "Our Trainings",
    sub: "Hands-on programs in Ethical Hacking, Bug Bounty, CCNA, Python, Java and Penetration Testing — by industry professionals.",
    cta: "View Trainings",
    to: "/training/ethical-hacking",
  },
];

export default function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);
  const s = slides[i];

  return (
    <section className="relative isolate overflow-hidden gradient-hero text-brand-foreground">
      <video
        // className="absolute inset-0 h-full w-full object-cover opacity-90"
        className="absolute inset-0 h-full w-full object-cover opacity-45"
        src="video/hero-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand/55 via-brand/30 to-brand/10" />
      <div className="absolute inset-0 grid-pattern opacity-[0.08]" />
      <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />

      {/* <div className="container-x relative grid min-h-[88vh] items-center gap-10 py-20"> */}
      <div className="container-x relative flex min-h-[82vh] items-center py-16 lg:py-20">
        {/* <div key={i} className="reveal max-w-xl"> */}
        <div key={i} className="reveal max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-1 text-xs uppercase tracking-[0.25em] text-gold">
            ★ {s.eyebrow}
          </span>
          {/* <h1 className="mt-6 font-display text-5xl leading-[1.05] md:text-6xl lg:text-7xl"> */}
          {/* <h1 className="mt-5 font-display text-4xl leading-tight md:text-5xl lg:text-6xl"> */}
          <h1
  className="mt-5 text-3xl leading-tight md:text-4xl lg:text-5xl"
  style={{ fontFamily: "Copperplate, 'Copperplate Gothic Light', serif" }}
>
            {s.title}
          </h1>
          {/* <p className="mt-6 max-w-lg text-base leading-relaxed text-brand-foreground/80 md:text-lg"> */}
          <p
  className="mt-6 max-w-lg text-base leading-relaxed text-brand-foreground/80 md:text-lg"
  style={{ fontFamily: "'Playfair Display', serif" }}
>
          {/* <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-foreground/80 md:text-lg"> */}
            {s.sub}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to={s.to} className="btn-primary">
              {s.cta} →
            </Link>
            {/* <Link to="/contact" className="btn-outline">
              Enquire Now
            </Link> */}
          </div>

          <div className="mt-10 flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? "w-10 bg-gold" : "w-4 bg-white/30"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}