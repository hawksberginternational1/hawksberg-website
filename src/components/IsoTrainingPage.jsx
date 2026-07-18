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
  <div className="container-x">
    <div className="max-w-6xl mx-auto">
      {/* <h2 className="font-display text-3xl uppercase tracking-wide text-foreground md:text-4xl">
        Course Overview
      </h2>

      <div className="mt-4 gold-divider" />

      <p className="mt-8 text-muted-foreground leading-9 whitespace-pre-line text-justify">
        {training.overview}
      </p> */}
      {training.slug !== "iso-31000-risk-management" &&
 training.slug !== "online-iso-training" && (
  <>
    <h2 className="font-display text-3xl uppercase tracking-wide text-foreground md:text-4xl">
      Course Overview
    </h2>

    <div className="mt-4 gold-divider" />
  </>
)}

<p className="mt-8 text-muted-foreground leading-9 whitespace-pre-line text-justify">
  {training.overview}
</p>
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
            {/* <div>
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
            </div> */}
            {training.slug !== "iso-31000-risk-management" &&
 training.slug !== "online-iso-training" && (
  <div>
    <h2 className="font-display text-3xl">
      Modules covered
    </h2>

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

          <span className="pt-1 text-foreground">
            {m}
          </span>
        </li>
      ))}
    </ol>
  </div>
)}

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


{/* {training.overview && (
  <div>
    <h2 className="font-display text-3xl">
      Course Overview
    </h2>

    <div className="mt-3 gold-divider" />

    <p className="mt-6 leading-8 text-muted-foreground">
      {training.overview}
    </p>
  </div>
)} */}

{training.whyTake && (
  <div>
    {/* <h2 className="font-display text-3xl">
      Why Take the ISO 9001 Lead Auditor Course?
    </h2> */}
    <h2 className="font-display text-3xl">
  {training.whyTakeTitle}
</h2>

    <div className="mt-3 gold-divider" />

    <p className="mt-6 leading-8 text-muted-foreground">
      {training.whyTake}
    </p>
  </div>
)}
{/* 
{training.courseCovers && (
  <div>
   
    <h2 className="font-display text-3xl">
  {training.courseCoversTitle}
</h2>

    <div className="mt-3 gold-divider" />

    <ul className="mt-6 space-y-4">
      {training.courseCovers.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="text-gold">✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
)} */}
{training.courseCovers && (
  <div>
    <h2 className="font-display text-3xl">
      {training.courseCoversTitle}
    </h2>

    <div className="mt-3 gold-divider" />

    {Array.isArray(training.courseCovers) ? (
      <ul className="mt-6 space-y-4">
        {training.courseCovers.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-gold">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ) : (
      <div className="mt-6 whitespace-pre-line leading-8 text-muted-foreground text-justify">
        {training.courseCovers}
      </div>
    )}
  </div>
)}
{/* 
{training.benefits && (
  <div>
    <h2 className="font-display text-3xl">
  {training.benefitsTitle || "Benefits of the Course"}
</h2>

    <div className="mt-3 gold-divider" />

    <ul className="mt-6 space-y-4">
      {training.benefits.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="text-gold">✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
)} */}

{training.benefits && (
  <div>
    <h2 className="font-display text-3xl">
      {training.benefitsTitle || "Benefits of the Course"}
    </h2>

    <div className="mt-3 gold-divider" />

    {Array.isArray(training.benefits) ? (
      <ul className="mt-6 space-y-4">
        {training.benefits.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-gold">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ) : (
      <div className="mt-6 whitespace-pre-line leading-8 text-muted-foreground text-justify">
        {training.benefits}
      </div>
    )}
  </div>
)}

{training.trainingMethods && (
  <div>
    <h2 className="font-display text-3xl">
      {training.trainingMethodsTitle}
    </h2>

    <div className="mt-3 gold-divider" />

    <div className="mt-6 whitespace-pre-line leading-8 text-muted-foreground text-justify">
      {training.trainingMethods}
    </div>
  </div>
)}

{training.assessmentContent && (
  <div>
    <h2 className="font-display text-3xl">
      {training.assessmentTitle}
    </h2>

    <div className="mt-3 gold-divider" />

    <div className="mt-6 whitespace-pre-line leading-8 text-muted-foreground text-justify">
      {training.assessmentContent}
    </div>
  </div>
)}

{training.aboutUpdate && (
  <div>
    <h2 className="font-display text-3xl">
      {training.aboutUpdateTitle}
    </h2>

    <div className="mt-3 gold-divider" />

    <div className="mt-6 whitespace-pre-line leading-8 text-muted-foreground text-justify">
      {training.aboutUpdate}
    </div>
  </div>
)}

{training.updateBenefits && (
  <div>
    <h2 className="font-display text-3xl">
      {training.updateBenefitsTitle}
    </h2>

    <div className="mt-3 gold-divider" />

    <div className="mt-6 whitespace-pre-line leading-8 text-muted-foreground text-justify">
      {training.updateBenefits}
    </div>
  </div>
)}
{training.audience && (
  <div>
    <h2 className="font-display text-3xl">
      Who Should Attend
    </h2>

    <div className="mt-3 gold-divider" />

    <ul className="mt-6 space-y-4">
      {training.audience.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="text-gold">✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
)}

{training.prerequisites && (
  <div>
    <h2 className="font-display text-3xl">
      Prerequisites
    </h2>

    <div className="mt-3 gold-divider" />

    <ul className="mt-6 space-y-4">
      {training.prerequisites.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>
)}

{training.faq && (
  <div>
    <h2 className="font-display text-3xl">
      Frequently Asked Questions
    </h2>

    <div className="mt-3 gold-divider" />

    <div className="mt-6 space-y-4">
      {training.faq.map((item, i) => (
        <details key={i} className="rounded-xl border p-5">
          <summary className="cursor-pointer font-semibold">
            {item.question}
          </summary>

          <p className="mt-4">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  </div>
)}
          </div>

          <aside className="lg:sticky lg:top-28 self-start">
            <EnquiryForm compact />
          </aside>
        </div>
      </section>
    </>
  );
}
