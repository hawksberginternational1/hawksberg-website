import { useEffect, useState } from "react";

const items = [
  {
    quote:
      "Hawksberg's team made our ISO 27001 journey effortless. Their methodology is sharp, structured and deeply professional.",
    name: "Sendil Coumar",
    role: "Founder, Minuscule",
  },
  {
    quote:
      "The TISAX labelling was completed ahead of schedule. Hawksberg understood automotive compliance like no one else.",
    name: "Priya Menon",
    role: "Compliance Lead, Avon Logistics",
  },
  // {
  //   quote:
  //     "Our team's ethical hacking training was hands-on and current. Trainers are clearly senior practitioners.",
  //   name: "Arun Iyer",
  //   role: "Head of Security, Aroopa",
  // },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="container-x py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Testimonials</p>
        <h2 className="mt-3 font-display text-4xl md:text-5xl">
          What our clients say
        </h2>
        <div className="mx-auto mt-4 gold-divider" />
      </div>

      <div className="relative mx-auto mt-12 max-w-3xl">
        {items.map((it, idx) => (
          <div
            key={idx}
            className={`transition-all duration-700 ${
              idx === i ? "relative opacity-100" : "pointer-events-none absolute inset-0 opacity-0"
            }`}
          >
            <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-soft">
              <span className="font-display text-7xl leading-none text-gold">“</span>
              <p className="-mt-6 font-display text-2xl italic text-foreground md:text-3xl">
                {it.quote}
              </p>
              <div className="mt-6">
                <p className="font-semibold text-foreground">{it.name}</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {it.role}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div className="mt-6 flex justify-center gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? "w-10 bg-gold" : "w-3 bg-muted-foreground/40"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
