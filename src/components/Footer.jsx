import { Link } from "react-router-dom";
import { company, isoServices } from "@/data/site";

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-brand text-brand-foreground">
      <div className="absolute inset-0 grid-pattern opacity-[0.07]" />
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-md gradient-gold font-display text-xl text-ink">
              H
            </span>
            <span className="font-display text-2xl">
              Hawksberg <span className="text-gold">International</span>
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-brand-foreground/75">
            Trusted partner for ISO consultancy, cyber security and corporate
            training. Helping enterprises meet international standards with
            measurable business outcomes.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { l: "f", h: company.social.facebook },
              { l: "in", h: company.social.linkedin },
              { l: "ig", h: company.social.instagram },
            ].map((s) => (
              <a
                key={s.l}
                href={s.h}
                className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 text-xs text-gold transition-colors hover:bg-gold hover:text-ink"
              >
                {s.l}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg text-gold">Quick Links</h4>
          <div className="mt-3 gold-divider" />
          <ul className="mt-5 space-y-2 text-sm text-brand-foreground/80">
            {[
              ["Home", "/"],
              ["About Us", "/about"],
              ["Contact Us", "/contact"],
              ["Ethical Hacking", "/training/ethical-hacking"],
              ["CCNA Training", "/training/ccna"],
            ].map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="transition-colors hover:text-gold">
                  → {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-gold">ISO Consulting</h4>
          <div className="mt-3 gold-divider" />
          <ul className="mt-5 space-y-2 text-sm text-brand-foreground/80">
            {isoServices.slice(0, 7).map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/services/${s.slug}`}
                  className="transition-colors hover:text-gold"
                >
                  → {s.code} Consulting
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-gold">Reach Us</h4>
          <div className="mt-3 gold-divider" />
          <address className="mt-5 space-y-3 text-sm not-italic text-brand-foreground/80">
            <p>{company.address}</p>
            <p>
              <span className="text-gold">Phone: +91 90805 83283</span>{" "}
              <a href={`tel:${company.altPhone}`} className="hover:text-gold">
                {company.altPhone}
              </a>
            </p>
            <p>
              <span className="text-gold">Email:</span>{" "}
              <a href={`mailto:${company.email}`} className="hover:text-gold">
                {company.email}
              </a>
            </p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-brand-foreground/60 md:flex-row">
          <p>© {new Date().getFullYear()} Hawksberg International. All rights reserved.</p>
          <p>Crafted with precision · Chennai, India</p>
        </div>
      </div>
    </footer>
  );
}
