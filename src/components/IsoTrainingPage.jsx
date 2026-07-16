import { Link } from "react-router-dom";
import EnquiryForm from "./EnquiryForm";
// import trainingBg from "@/assets/Training.webp";

export default function IsoTrainingPage({ training }) {
  return (
    <>
      {/* Hero banner */}
      {/* <section className="relative overflow-hidden gradient-hero py-24 text-brand-foreground"> */}
      <section
  className="relative overflow-hidden bg-cover bg-center py-24 text-brand-foreground"
  // style={{
  //   backgroundImage: `url(${trainingBg})`,
  // }}
  style={{
  backgroundImage: `url(${training.heroImage})`,
}}
>
   {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/70" />

        <div className="absolute inset-0 grid-pattern opacity-15" />
        <div
          className="absolute inset-0 opacity-25 bg-cover bg-center mix-blend-overlay"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1581091215367-9b6c00b3039c?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="container-x relative text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-gold">
            ISO Training Programs
          </p>
          <h1 className="mt-4 font-display text-5xl uppercase tracking-wide md:text-6xl"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {/* {training.code} Training */}
            {training.title}
          </h1>
          <div className="mx-auto mt-5 gold-divider" />
        </div>
      </section>

      {/* Intro section with image + copy */}
      <section className="bg-background py-20">
        {/* <div className="container-x grid items-center gap-12 lg:grid-cols-2"> */}
        <div className="container-x">
          {/* <div className="reveal overflow-hidden rounded-xl shadow-elegant">
            <img
              // src={training.image}
              src={training.image}
              // alt={`${training.code} training`}
              alt={`${training.code} training`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div> */}
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-3xl uppercase tracking-wide text-foreground md:text-4xl">
              Training Courses
            </h2>
            <div className="mt-4 gold-divider" />
            {/* <p className="mt-6 text-muted-foreground">{training.intro}</p> */}
            <p className="mt-6 text-muted-foreground">{training.short}</p>
            {/* <p className="mt-4 text-muted-foreground">
              {training.detail.split("ISO training").map((part, i, arr) =>
                i < arr.length - 1 ? (
                  <span key={i}>
                    {part}
                    <span className="font-semibold text-gold">ISO training</span>
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </p> */}
            <div className="mt-6 space-y-4">
  {training.description?.map((item, index) => (
    <p
      key={index}
      className="text-muted-foreground leading-8"
    >
      {item}
    </p>
  ))}
</div>
            {/* <Link to="/contact" className="btn-primary mt-8 inline-block">
              Get Free Evaluation & Get Started Today!
            </Link> */}
          </div>
        </div>
      </section>

      {/* Modules + Audience + Enquiry */}
      <section className="bg-muted/40 py-20">
        <div className="container-x grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            {training.programOverview && (
  <div>
    <h2 className="font-display text-3xl">
      Program Overview
    </h2>

    <div className="mt-3 gold-divider" />

    <div className="mt-8 grid gap-10 lg:grid-cols-2 items-center">
      {/* Left Content */}
      <div>
        {training.programOverview.map((p, i) => (
          <p
            key={i}
            className="mt-5 text-[15px] leading-8 text-muted-foreground"
          >
            {p}
          </p>
        ))}
      </div>

      {/* Right Image */}
      <div>
        <img
          src={training.toolsImage}
          alt="Tools Covered"
          className="w-full rounded-xl"
        />
      </div>
    </div>
  </div>
)}
            <div>
              <h2 className="font-display text-3xl">Modules covered</h2>
              <div className="mt-3 gold-divider" />
              <ol className="mt-6 grid gap-3 sm:grid-cols-2">
                {training.modules.map((m, i) => (
                  <li
                    key={m}
                    className="flex items-start gap-4 rounded-lg border border-border bg-card p-4"
                  >
                    <span className="font-display text-2xl text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="pt-1 text-foreground">{m}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* <div>
              <h2 className="font-display text-3xl">Who should attend</h2>
              <div className="mt-3 gold-divider" />
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {training.audience.map((a) => (
                  <li
                    key={a}
                    className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground"
                  >
                    <span className="mr-2 text-gold">◆</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div> */}
            <div>
  <h2 className="font-display text-3xl">
    Course Details
  </h2>

  <div className="mt-3 gold-divider" />

  <div className="mt-6 space-y-3">
    <p>
      <strong>Duration :</strong> {training.duration}
    </p>

    <p>
      <strong>Level :</strong> {training.level}
    </p>
  </div>
</div>
          </div>

          <aside className="lg:sticky lg:top-28 self-start">
            <EnquiryForm compact />
          </aside>
        </div>
      </section>
    </>
  );
}
