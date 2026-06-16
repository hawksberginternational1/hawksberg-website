import { Link, NavLink as RRNavLink } from "react-router-dom";
import { useState } from "react";
import { company, isoServices, trainings, isoTrainings, serviceMenu } from "@/data/site";
// import mainLogo from "../assets/main-logo.jpg";
import mainLogo from "../assets/shieldlogo.jpg";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState(false);
  const [activeCat, setActiveCat] = useState("iso");
  const [training, setTraining] = useState(false);
  const [isoTr, setIsoTr] = useState(false);

  const NavLink = ({ to, children }) => (
    <RRNavLink
      to={to}
      end
      className={({ isActive }) =>
        `text-sm font-medium tracking-wide transition-colors hover:text-gold ${
          isActive ? "text-gold" : "text-foreground/80"
        }`
      }
      onClick={() => setOpen(false)}
    >
      {children}
    </RRNavLink>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="hidden bg-brand text-brand-foreground/90 md:block">
        <div className="container-x flex items-center justify-between py-2 text-xs">
          <div className="flex items-center gap-6">
            <a href={`tel:${company.phone}`} className="hover:text-gold">
              ☎ {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="hover:text-gold">
              ✉ {company.email}
            </a>
          </div>
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-gold">
            ISO Consulting · Cyber Security · Trainings
          </div>
        </div>
      </div>

      {/* <div className="container-x flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="logo-circle h-11 w-11 flex items-center justify-center">
            <img src={mainLogo} alt="Hawksberg" className="w-full h-full object-cover scale-[1.18]" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-xl tracking-wide text-foreground">
              Hawksberg
              <span className="text-gold"> International</span>
            </span>
            <span className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              certification
            </span>
          </span>
        </Link> */}

        {/* <div className="container-x flex h-20 items-center justify-between">
  <Link to="/" className="flex items-center gap-3">
    <span className="logo-circle h-11 w-11 flex items-center justify-center">
      <img
        src={mainLogo}
        alt="Hawksberg"
        className="w-full h-full object-cover scale-[1.18]"
      />
    </span>

    <span className="leading-tight">
      
      <span
        className="block text-xl tracking-wide text-foreground"
        style={{
          fontFamily: '"Copperplate", "Copperplate Gothic Bold", serif',
          letterSpacing: "0.08em",
        }}
      >
        <span style={{ color: "##111111",fontFamily: '"Copperplate", "Copperplate Gothic Light", serif' }}>Hawksberg</span>
        
        <span className="text-gold"
         style={{
          fontFamily: '"Copperplate", "Copperplate Gothic Light", serif',
        }}> International</span>
      </span>

     
      <span
        className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground"
        style={{
          fontFamily: '"Copperplate", "Copperplate Gothic Light", serif',
        }}
      >
        certification
      </span>
    </span>
  </Link> */}

  {/* <div className="container-x flex h-20 items-center justify-between"> */}
  <div className="container-x flex h-15 lg:h-20 items-center justify-between">
  <Link to="/" className="flex items-center gap-3">
    {/* <span className="logo-circle h-11 w-11 flex items-center justify-center">
      <img
        src={mainLogo}
        alt="Hawksberg"
        className="w-full h-full object-cover scale-[1.18]"
      />
    </span> */}
    <span className="flex items-center justify-center">
  <img
    src={mainLogo}
    alt="Hawksberg"
    // className="h-14 lg:h-16 w-auto object-contain"
    //  className="h-20 lg:h-24 w-auto object-contain"
    fetchPriority="high"
    decoding="async"
     className="h-16 lg:h-18 w-auto object-contain"
    style={{
      background: "transparent",
    }}
  />
</span>

    <span className="leading-tight">
      {/* COMPANY NAME */}
      <span
        // className="block text-[17px] tracking-wide text-foreground"
        className="block text-[14px] lg:text-[17px] tracking-wide text-foreground"
        style={{
          fontFamily: '"Copperplate", "Copperplate Gothic Bold", serif',
          letterSpacing: "0.06em",
          fontWeight: "700",
        }}
      >
        <span
          style={{
            color: "#111111",
            fontFamily: '"Copperplate", "Copperplate Gothic Light", serif',
          }}
        >
          Hawksberg
        </span>

        <span
          className="text-gold"
          style={{
            fontFamily: '"Copperplate", "Copperplate Gothic Light", serif',
          }}
        >
          {" "}
          International
        </span>
      </span>

      {/* SUB TEXT */}
      <span
        className="block text-[8px] uppercase tracking-[0.22em] text-muted-foreground"
        style={{
          fontFamily: '"Copperplate", "Copperplate Gothic Light", serif',
        }}
      >
        certification
      </span>
    </span>
  </Link>



        {/* <nav className="hidden items-center gap-8 lg:flex"> */}
        <nav className="hidden items-center gap-4 xl:gap-8 lg:flex">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>

          <div
            className="relative"
            onMouseEnter={() => setServices(true)}
            onMouseLeave={() => setServices(false)}
          >
            <button className="text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-gold">
              Services ▾
            </button>
            {services && (
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
                <div className="reveal flex overflow-hidden rounded-lg border border-border bg-white text-black shadow-elegant">
                  {/* Categories column */}
                  <ul className="w-56 border-r border-black/10 bg-white py-2">
                    {serviceMenu.map((cat) => (
                      <li key={cat.key}>
                        <button
                          onMouseEnter={() => setActiveCat(cat.key)}
                          onClick={() => setActiveCat(cat.key)}
                          className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold transition-colors ${
                            activeCat === cat.key
                              ? "bg-black/5 text-black"
                              : "text-black/80 hover:bg-black/5"
                          }`}
                        >
                          <span>{cat.label}</span>
                          <span className="text-black/40">›</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  {/* Items column */}
                  <ul className="min-w-[260px] bg-white py-2">
                    {(serviceMenu.find((c) => c.key === activeCat)?.items || []).map(
                      (item) => (
                        <li key={item.label}>
                          <Link
                            to={item.to}
                            className="block px-5 py-2.5 text-sm font-medium text-black/85 hover:bg-black/5 hover:text-black"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setIsoTr(true)}
            onMouseLeave={() => setIsoTr(false)}
          >
            <button className="text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-gold">
              ISO Trainings ▾
            </button>
            {isoTr && (
              <div className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3">
                <div className="reveal rounded-lg border border-border bg-card p-2 shadow-elegant">
                  {isoTrainings.filter((t) => t.slug === "iso-9001").map((t) => (
                    <Link
                      key={t.slug}
                      to={`/iso-training/${t.slug}`}
                      className="block rounded-md px-3 py-2 text-sm hover:bg-muted hover:text-gold"
                    >
                      <span className="font-medium">{t.code}</span>
                      <span className="ml-1 text-muted-foreground">
                        — Training
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setTraining(true)}
            onMouseLeave={() => setTraining(false)}
          >
            <button className="text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-gold">
              Cyber Security Courses ▾
            </button>
            {training && (
              <div className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3">
                <div className="reveal rounded-lg border border-border bg-card p-2 shadow-elegant">
                  {trainings.map((t) => (
                    <Link
                      key={t.slug}
                      to={`/training/${t.slug}`}
                      className="block rounded-md px-3 py-2 text-sm hover:bg-muted hover:text-gold"
                    >
                      {t.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* <NavLink to="/consultancy">
  Consultants
</NavLink> */}

          <NavLink to="/contact">Contact</NavLink>
          {/* <Link to="/contact" className="btn-primary !px-5 !py-2 text-xs"> */}
          <Link to="/contact" className="btn-primary !px-4 !py-2 !text-[11px]">
            Enquire Now
          </Link>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden"
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className="block h-0.5 w-6 bg-foreground" />
            <span className="block h-0.5 w-6 bg-foreground" />
            <span className="block h-0.5 w-4 bg-foreground" />
          </div>
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-x flex flex-col gap-3 py-4">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <details className="group">
              <summary className="cursor-pointer text-sm font-medium text-foreground/80">
                Services
              </summary>
              <div className="mt-2 grid gap-1 pl-3">
                {isoServices.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    onClick={() => setOpen(false)}
                    className="text-sm text-muted-foreground hover:text-gold"
                  >
                    {s.code} — {s.title}
                  </Link>
                ))}
              </div>
            </details>
            <details className="group">
              <summary className="cursor-pointer text-sm font-medium text-foreground/80">
                ISO Trainings
              </summary>
              <div className="mt-2 grid gap-1 pl-3">
                {isoTrainings.filter((t) => t.slug === "iso-9001").map((t) => (
                  <Link
                    key={t.slug}
                    to={`/iso-training/${t.slug}`}
                    onClick={() => setOpen(false)}
                    className="text-sm text-muted-foreground hover:text-gold"
                  >
                    {t.code} — Training
                  </Link>
                ))}
              </div>
            </details>
            <details className="group">
              <summary className="cursor-pointer text-sm font-medium text-foreground/80">
                Cyber Security Courses
              </summary>
              <div className="mt-2 grid gap-1 pl-3">
                {trainings.map((t) => (
                  <Link
                    key={t.slug}
                    to={`/training/${t.slug}`}
                    onClick={() => setOpen(false)}
                    className="text-sm text-muted-foreground hover:text-gold"
                  >
                    {t.title}
                  </Link>
                ))}
              </div>
            </details>
            <NavLink to="/contact">Contact</NavLink>
            {/* <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary self-start"
            >
              Enquire Now
            </Link> */}
          </div>
        </div>
      )}
    </header>
  );
}
