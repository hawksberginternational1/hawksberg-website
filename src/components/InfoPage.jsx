import { Link } from "react-router-dom";
import gdprBg from "@/assets/gdpr.webp";
import socConsultingBg from "@/assets/soc consulting.webp";
import vaptImg from "@/assets/vapt.webp";
import webImg from "@/assets/web.webp";
import mobileImg from "@/assets/mobile.webp";
import networkImg from "@/assets/network.webp";

export default function InfoPage({ page }) {
  return (
    <>
      {/* Hero */}
      {/* <section className="relative overflow-hidden gradient-hero py-24 text-brand-foreground"> */}
      {/* Hero */}
<section
  className={`relative overflow-hidden bg-cover bg-center py-24 text-brand-foreground`}
 style={{
  backgroundImage: `url(${
    page.slug === "gdpr"
      ? gdprBg
      : page.slug === "soc-consulting"
      ? socConsultingBg
      : page.slug === "vapt"
      ? vaptImg
      : page.slug === "web-pentest"
      ? webImg
      : page.slug === "mobile-pentest"
      ? mobileImg
      : page.slug === "network-pentest"
      ? networkImg
      : ""
  })`,
}}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/70" />

  {/* Pattern */}
  <div className="absolute inset-0 grid-pattern opacity-15" />

  <div className="container-x relative text-center">
    <h1 className="font-display text-4xl uppercase tracking-wide md:text-5xl">
      {page.hero}
    </h1>

    <div className="mx-auto mt-5 gold-divider" />
  </div>
</section>

      {/* Lead: image + copy */}
      <section className="bg-background py-20">
        {/* <div className="container-x grid items-center gap-12 lg:grid-cols-2"> */}
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* <div className="reveal overflow-hidden rounded-xl shadow-elegant"> */}
          <div className="reveal overflow-hidden rounded-xl shadow-elegant h-[320px] lg:h-[420px]">
            {/* <img
              src={page.lead.image}
              alt={page.lead.title}
              loading="lazy"
              className="h-full w-full object-cover"
            /> */}
            <img
  src={page.lead.image}
  alt={page.lead.title}
  loading="eager"
  fetchPriority="high"
  decoding="async"
  className="h-full w-full object-cover object-center"
/>
          </div>
          <div>
            <h2 className="font-display text-3xl text-foreground md:text-4xl">
              {page.lead.title}
            </h2>
            <div className="mt-4 gold-divider" />
            {page.lead.paragraphs.map((p, i) => (
              <p key={i} className="mt-5 text-muted-foreground">
                {p}
              </p>
            ))}
            <Link to="/contact" className="btn-primary mt-8 inline-block">
              Get Free Evaluation & Get Started Today!
            </Link>
          </div>
        </div>
      </section>

      {/* Panels (optional) */}
      {page.panels && page.panels.length > 0 && (
        <section className="bg-muted/40 py-16">
          {/* <div className="container-x grid gap-8 lg:grid-cols-2"> */}
          <div
  className={
    page.slug === "mobile-pentest" ||
    page.slug === "network-pentest" ||
    page.slug === "web-pentest"
      ? "container-x"
      : "container-x grid gap-8 lg:grid-cols-2"
  }
>
            {page.panels.map((panel, i) => (
              <div
                key={i}
                // className="rounded-xl border border-border bg-card p-8 shadow-elegant"
                className={
  page.slug === "mobile-pentest" ||
  page.slug === "network-pentest" ||
  page.slug === "web-pentest"
    ? "mx-auto w-full max-w-6xl rounded-xl border border-border bg-card p-8 shadow-elegant"
    : "rounded-xl border border-border bg-card p-8 shadow-elegant"
}
              >
                <h3 className="font-display text-2xl text-gold">
                  {panel.title}
                </h3>
                <div className="mt-3 gold-divider" />
                {panel.body.map((b, j) => (
                  <p key={j} className="mt-4 text-sm text-muted-foreground">
                    {b}
                  </p>
                ))}
                {panel.image && (
                  <div className="mt-6 overflow-hidden rounded-lg">
                    <img
                      src={panel.image}
                      alt={panel.title}
                      loading="lazy"
                      className="h-56 w-full object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Grid (optional) */}
      {page.grid && (
        <section className="bg-background py-20">
          <div className="container-x">
            <div className="rounded-xl border border-gold/30 bg-gold/5 p-8 md:p-12">
              <h2 className="text-center font-display text-3xl text-foreground">
                {page.grid.title}
              </h2>
              <div className="mx-auto mt-3 gold-divider" />
              {page.grid.intro && (
                <p className="mx-auto mt-6 max-w-4xl text-center text-muted-foreground">
                  {page.grid.intro}
                </p>
              )}
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {page.grid.items.map((it) => (
                  <div
                    key={it.title}
                    className="rounded-lg border border-border bg-card p-5"
                  >
                    <h4 className="font-semibold text-gold">{it.title}</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {it.body}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-10 text-center">
                <Link to="/contact" className="btn-primary inline-block">
                  Get Free Evaluation & Get Started Today!
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
