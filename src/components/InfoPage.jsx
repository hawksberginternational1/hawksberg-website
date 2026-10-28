// import { Link } from "react-router-dom";
import Link from "next/link";

const getAssetUrl = (asset) => asset?.src || asset;

export default function InfoPage({ page }) {
  return (
    <>
      {/* Hero */}
      {/* <section className="relative overflow-hidden gradient-hero py-24 text-brand-foreground"> */}
      {/* Hero */}
<section
  className={`relative overflow-hidden bg-cover bg-center py-24 text-brand-foreground`}
>
  {page.backgroundImage && (
    <img
      src={getAssetUrl(page.backgroundImage)}
      alt=""
      className="absolute inset-0 h-full w-full object-cover"
    />
  )}
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/70" />

  {/* Pattern */}
  <div className="absolute inset-0 grid-pattern opacity-15" />

  <div className="container-x relative z-10 text-center">
    <h1 className="font-display text-4xl uppercase tracking-wide md:text-5xl">
      {page.hero}
    </h1>

    {/* <div className="mx-auto mt-5 gold-divider" /> */}
  </div>
</section>

      {/* Lead: image + copy */}
      <section className="bg-background py-20">
        {/* <div className="container-x grid items-center gap-12 lg:grid-cols-2"> */}
        {/* <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center"> */}
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* <div className="reveal overflow-hidden rounded-xl shadow-elegant"> */}
          {page.lead?.image && (
          <div className="reveal overflow-hidden rounded-xl shadow-elegant h-[320px] lg:h-[420px]">
            {/* <img
              src={page.lead.image}
              alt={page.lead.title}
              loading="lazy"
              className="h-full w-full object-cover"
            /> */}
            <img
  src={getAssetUrl(page.lead.image)}
  alt={page.lead.title}
  loading="lazy"
  decoding="async"
  className="h-full w-full object-cover object-center"
/>
          </div>
          )}
          <div>
            <h2 className="font-display text-3xl text-foreground md:text-4xl">
              {page.lead.title}
            </h2>
            <div className="mt-4 gold-divider" />
            {/* {page.lead.paragraphs.map((p, i) => (
              <p key={i} className="mt-5 text-muted-foreground">
                {p}
              </p>
            ))} */}
            {page.lead.paragraphs.map((p, i) => (
  <p
    key={i}
    className="mt-5 text-[15px] leading-9 text-muted-foreground text-justify"
  >
    {p}
  </p>
))}
            <Link href="/contact" className="btn-primary mt-8 inline-block">
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
                      src={getAssetUrl(panel.image)}
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

      {/* Content: heading + paragraphs, then a full-width image below
          — single stacked column (NOT a side-by-side grid), matching
          the reference design. A two-column split here left a large
          empty gap under the shorter image column while the text
          column kept growing, which is what caused the misalignment. */}
    {page.content && (
  <section className="bg-[#F8F6F2] py-20">
    <div className="mx-auto max-w-[1450px] px-8">

      {/* <div className="rounded-[24px] border border-[#E8D8B5] bg-white px-12 pt-12 pb-10 shadow-sm"> */}
      <div className="rounded-[24px] border border-[#E8D8B5] bg-white px-4 pt-2 pb-4 shadow-sm">

        {/* <h2 className="font-display text-[56px] leading-none text-[#1E2430]"> */}
    <h2 className="font-display text-[20px] md:text-[24px] font-normal leading-none tracking-[-0.02em] text-[#1E2430] mb-2">
  {page.content.title}
</h2>
       <div className="mt-4 h-[3px] w-16 rounded bg-[#D89A29]" />

       <div className="max-w-[1080px]">
  {page.content.paragraphs.map((p, i) => (
    <p
      key={i}
      className="mt-5 text-[14px] leading-[2.1] text-[#3F4E63] text-left"
    >
      {p}
    </p>
  ))}
</div>

        {page.content.image && (
          <img
            src={getAssetUrl(page.content.image)}
            alt={page.content.title}
            // className="mt-10 h-[430px] w-full rounded-2xl object-cover"
            className="mt-6 h-[200px] w-full rounded-2xl object-cover"
          />
        )}

      </div>

    </div>
  </section>
)}

      {/* Grid (optional) */}
      {page.grid && (
        // <section className="bg-background py-20">
        <section className="bg-background py-10">
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
                <Link href="/contact" className="btn-primary inline-block">
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
