import useReveal from "@/hooks/useReveal";
import PointerNetworkCanvas from "@/components/PointerNetworkCanvas";
import { useEffect, useState } from "react";


const items = [
  ["Vision", "To become the world's premier ISO consultancy and training services provider."],
  ["Mission", "Create value for clients by providing systematic instruction and assistance in securing ISO certification through a renowned panel of professionals."],
  ["Global Reach", "We operate worldwide with our head office in Chennai. Local staff with local knowledge support clients managing operations remotely."],
];

function ValueCard({ t, d, i }) {
  const [ref, shown] = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${i * 120}ms` }}
      className={`reveal-on-scroll reveal-tilt ${shown ? "is-visible" : ""}`}
    >
      <p className="text-xs uppercase tracking-[0.3em] text-gold">Our</p>
      <h3 className="mt-2 font-display text-3xl">{t}</h3>
      <div className="mt-3 gold-divider" />
      <p className="mt-4 text-sm leading-relaxed text-brand-foreground/75">{d}</p>
    </div>
  );
}

// export default function ValuesStrip() {
//   return (
export default function ValuesStrip() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    // <section className="bg-brand text-brand-foreground">
    <section className="relative overflow-hidden bg-brand text-brand-foreground">
      {/* <PointerNetworkCanvas /> */}
      {!isMobile && <PointerNetworkCanvas />}
      {/* <div className="container-x grid gap-10 py-16 md:grid-cols-3"> */}
      <div className="relative z-10 container-x grid gap-10 py-16 md:grid-cols-3">
        {items.map(([t, d], i) => (
          <ValueCard key={t} t={t} d={d} i={i} />
        ))}
      </div>
    </section>
  );
}