import { companyExperienceImg } from "@/data/site";
import useReveal from "@/hooks/useReveal";

export default function CompanyExperience() {
  const [headRef, headShown] = useReveal();
  const [imgRef, imgShown] = useReveal();
  const [textRef, textShown] = useReveal();
  return (
    <section className="container-x py-20">
      <div
        ref={headRef}
        className={`mx-auto max-w-3xl text-center reveal-on-scroll ${headShown ? "is-visible" : ""}`}
      >
        <h2 className="font-display text-3xl uppercase tracking-wider md:text-4xl">
          Company Experience and Capabilities
        </h2>
        <div className="mx-auto mt-4 gold-divider" />
        <p className="mt-5 text-sm text-muted-foreground">
          The specialising work of our experts in ISO Consulting has already been
          furnished as a benchmark in the field and below are some more details
          to add to them.
        </p>
      </div>

      <div className="mt-14 grid items-start gap-12 lg:grid-cols-2">
        <div
          ref={imgRef}
          className={`overflow-hidden rounded-xl shadow-elegant reveal-on-scroll reveal-left ${imgShown ? "is-visible" : ""}`}
        >
          <img
            src={companyExperienceImg}
            alt="Hawksberg International expert team"
            loading="lazy"
            width={1280}
            height={960}
            className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-110"
          />
        </div>

        <div
          ref={textRef}
          className={`reveal-on-scroll reveal-right ${textShown ? "is-visible" : ""}`}
        >
          <h3 className="font-display text-3xl text-foreground">Our Experience</h3>
          <div className="mt-3 h-[2px] w-16 bg-gold" />
          <div className="mt-6 space-y-5 text-sm leading-relaxed text-muted-foreground">
            <p>
             Hawksberg International's expert team has almost four decades of
             rich experience in helping our clients by providing an absolute 
             suite of ISO consultancy and training services.
            </p>
            <p>
              Our unique way of approaching problems comes from the efforts we
              have taken to reach global goals while meeting local needs.
              Hawksberg achieves this uniqueness by delivering the type of
              services that are superior to its competitors and having the
              opportunity to associate with the world's major established and
              emerging markets.
            </p>
            <p>
              From anywhere in the world, you can easily access our network to
              receive exceptional ISO consultancy and training from local staff
              with local knowledge, making it easier for organisations who are
              trying to manage operations in remote areas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
