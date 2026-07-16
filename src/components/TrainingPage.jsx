// import { Link, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import EnquiryForm from "./EnquiryForm";

// Background Images
// import cisoBg from "@/assets/ciso.webp";
// import pythonBg from "@/assets/python.webp";
// import javaBg from "@/assets/java.webp";
// import penetrationBg from "@/assets/penetration.webp";
// import ccnpBg from "@/assets/cnnp.webp";
// import ethicalBg from "@/assets/ethicalhacking.webp";
// import bugBg from "@/assets/bug.webp";

export default function TrainingPage({ training }) {
  // const location = useLocation();

  // Route-based background images
  // const bgImages = {
  //   "/training/ccna": cisoBg,
  //   "/training/python": pythonBg,
  //   "/training/java": javaBg,
  //   "/penetration-testing": penetrationBg,
  //   "/training/ccnp": ccnpBg,
  //   "/training/ethical-hacking": ethicalBg,
  //   "/training/bug-bounty": bugBg,
  // };

  // // Current page background
  // const currentBg = bgImages[location.pathname] || cisoBg;
  const currentBg = training.heroImage;

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-20 text-white">
        
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${currentBg})`,
          }}
        />

        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-blue-950/55" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-10" />

        {/* Hero Content */}
        <div className="container-x relative z-10">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            Cyber Security & IT Training
          </p>

          <h1
            className="mt-3 text-5xl md:text-6xl"
            style={{
              fontFamily: "Calibri, sans-serif",
            }}
          >
            {training.title}
          </h1>

          <div className="mt-4 gold-divider" />

          <p className="mt-6 max-w-2xl text-white/80">
            {training.short}
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-widest">
            <span className="rounded-full border border-gold/40 px-4 py-1 text-gold">
              Duration · {training.duration}
            </span>

            <span className="rounded-full border border-gold/40 px-4 py-1 text-gold">
              Level · {training.level}
            </span>
          </div>

          <div className="mt-8">
            <Link to="/contact" className="btn-primary">
              Enroll / Enquire →
            </Link>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="container-x grid gap-12 py-20 lg:grid-cols-3">
        
        {/* LEFT CONTENT */}
        <div className="space-y-10 lg:col-span-2">

          {/* Course Overview */}
          <div>
            <h2 className="font-display text-3xl">
              Course overview
            </h2>

            <div className="mt-3 gold-divider" />

            {(training.description &&
            training.description.length > 0
              ? training.description
              : [
                  `The ${training.title} program at Hawksberg International is built for learners who want practical, job-ready skills. Sessions are led by industry professionals using a mix of theory, labs and capstone projects.`,
                ]
            ).map((p, i) => (
              <p
                key={i}
                className="mt-5 text-muted-foreground"
              >
                {p}
              </p>
            ))}
          </div>

          {/* Modules */}
          <div>
            <h2 className="font-display text-3xl">
              Modules covered
            </h2>

            <div className="mt-3 gold-divider" />

            <ol className="mt-6 space-y-3">
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

          {/* Features */}
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              [
                "Live mentoring",
                "1:1 guidance from active practitioners.",
              ],
              [
                "Hands-on labs",
                "Real-world challenges in a sandbox.",
              ],
              [
                "Career support",
                "Resume reviews & interview prep.",
              ],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-card p-6"
              >
                <h3 className="font-display text-xl text-gold">
                  {title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="self-start lg:sticky lg:top-28">
          <EnquiryForm compact />
        </aside>
      </section>
    </>
  );
}