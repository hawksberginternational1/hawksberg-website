// import { Link, NavLink as RRNavLink } from "react-router-dom";
import { Link, NavLink as RRNavLink, useLocation } from "react-router-dom";
// import { useState } from "react";
import { useEffect, useState } from "react";
// import { company, isoServices, trainings, isoTrainings, serviceMenu } from "@/data/site";
import {
  company,
  isoServices,
  trainings,
  isoTrainings,
  serviceMenu,
  courseMenu,
  isoTrainingMenu,
} from "@/data/site";
// import mainLogo from "../assets/main-logo.jpg";
import mainLogo from "../assets/shieldlogo.jpg";
import CourseDropdown from "./CourseDropdown";
import IsoTrainingDropdown from "@/components/IsoTrainingDropdown";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState(false);
  const [activeCat, setActiveCat] = useState("iso");
  const [training, setTraining] = useState(false);
  const [activeCourse, setActiveCourse] = useState(0);
  const [activeSubCourse, setActiveSubCourse] = useState(null);
  const [isoTr, setIsoTr] = useState(false);
  const { pathname } = useLocation();
const isHome = pathname === "/";

const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  // const NavLink = ({ to, children }) => (
  //   <RRNavLink
  //     to={to}
  //     end
  //     className={({ isActive }) =>
  //       `text-sm font-medium tracking-wide transition-colors hover:text-gold ${
  //         isActive ? "text-gold" : "text-foreground/80"
  //       }`
  //     }
  //     onClick={() => setOpen(false)}
  //   >
  //     {children}
  //   </RRNavLink>
  // );
  const NavLink = ({ to, children }) => (
  <RRNavLink
    to={to}
    end
    className={({ isActive }) =>
      // `text-sm font-medium tracking-wide transition-colors hover:text-gold ${
    `text-[15px] font-bold tracking-wide transition-colors hover:text-gold ${
        isActive
          ? "text-gold"
          // : isHome && !scrolled
          // ? "text-white"
          // : "text-foreground/80"
          : open
? "text-foreground"
: isHome && !scrolled
? "text-white"
: "text-foreground/80"
      }`
    }
    onClick={() => setOpen(false)}
  >
    {children}
  </RRNavLink>
);

  return (
    // <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
//    <header
//   className={`fixed top-0 left-0 right-0 z-[9999] w-full transition-all duration-300
//   ${
//     isHome && !scrolled
//       ? "bg-transparent"
//       : "bg-white border-b border-border shadow-sm"
//   }`}
// >
<header
  className={`fixed top-0 left-0 right-0 z-[9999] w-full transition-all duration-300 ${
    open
      ? "bg-white border-b border-border shadow-sm"
      : isHome && !scrolled
      ? "bg-transparent"
      : "bg-white border-b border-border shadow-sm"
  }`}
>
  <div
  className={`md:hidden transition-all duration-300 ${
    isHome && !scrolled
      ? "bg-transparent text-white"
      : "bg-brand text-brand-foreground/90"
  }`}
>
  <div className="flex items-center justify-between px-3 py-2 text-[10px]">
    <a
      href={`tel:${company.phone}`}
      className="flex items-center gap-1 whitespace-nowrap"
    >
      ☎ <span>{company.phone}</span>
    </a>

    <a
      href={`mailto:${company.email}`}
      className="flex items-center gap-1 whitespace-nowrap"
    >
      ✉ <span>{company.email}</span>
    </a>
  </div>
</div>
      {/* <div className="hidden bg-brand text-brand-foreground/90 md:block"> */}
      <div
  className={`hidden md:block transition-all duration-300 ${
    isHome && !scrolled
      ? "bg-transparent text-white"
      : "bg-brand text-brand-foreground/90"
  }`}
>
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
  <div className="container-x flex h-15 lg:h-20 items-center justify-between px-4">
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
    //  className="h-16 lg:h-18 w-auto object-contain"
    className={`w-auto object-contain transition-all duration-300 ${
  isHome && !scrolled
    // ? "h-20 lg:h-24"
    // : "h-16 lg:h-18"
     ? "h-16 lg:h-24"
    : "h-16 lg:h-18"
}`}
    style={{
      background: "transparent",
    }}
  />
</span>

    <span className="leading-tight">
      {/* COMPANY NAME */}
      <span
        // className="block text-[17px] tracking-wide text-foreground"
//        className={`block text-[14px] lg:text-[17px] tracking-wide ${
//   isHome && !scrolled ? "text-white" : "text-foreground"
// }`}
className={`block tracking-wide transition-all duration-300 ${
  isHome && !scrolled
    ? "text-[14px] lg:text-[22px] text-white"
    : "text-[14px] lg:text-[17px] text-foreground"
}`}
        style={{
          fontFamily: '"Copperplate", "Copperplate Gothic Bold", serif',
          letterSpacing: "0.06em",
          fontWeight: "700",
        }}
      >
        <span
          // style={{
          //   color: "#111111",
          //   fontFamily: '"Copperplate", "Copperplate Gothic Light", serif',
          // }}
          style={{
  fontFamily: '"Copperplate", "Copperplate Gothic Light", serif',
}}
// className={isHome && !scrolled ? "text-white" : "text-[#111111]"}
className={open || !isHome || scrolled ? "text-[#111111]" : "text-white"}
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
        // className="block text-[8px] uppercase tracking-[0.22em] text-muted-foreground"
//         className={`block text-[8px] uppercase tracking-[0.22em] ${
//   isHome && !scrolled
//     ? "text-white/80"
//     : "text-muted-foreground"
// }`}
// className={`block text-[8px] uppercase tracking-[0.22em] ${
//   open || !isHome || scrolled
//     ? "text-muted-foreground"
//     : "text-white/80"
// }`}
className={`block uppercase tracking-[0.22em] transition-all duration-300 ${
  isHome && !scrolled
    ? "text-[8px] lg:text-[10px] text-white/80"
    : "text-[8px] text-muted-foreground"
}`}
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
            {/* <button className="text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-gold">
              Services ▾
            </button> */}
          <button
  className={`text-[15px] font-bold tracking-wide transition-colors hover:text-gold ${
    isHome && !scrolled
      ? "text-white"
      : "text-foreground/80"
  }`}
>
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

{/* desktop */}
          <div
  className="relative z-50"
  onMouseEnter={() => setIsoTr(true)}
  onMouseLeave={() => setIsoTr(false)}
>
 <button
  className={`text-[15px] font-bold tracking-wide transition-colors hover:text-gold ${
    isHome && !scrolled
      ? "text-white"
      : "text-foreground/80"
  }`}
>
  ISO Trainings ▾
</button>

  {isoTr && <IsoTrainingDropdown />}
</div>

          {/* <div
            className="relative"
            onMouseEnter={() => setTraining(true)}
            onMouseLeave={() => setTraining(false)}
          >
            <button className="text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-gold">
              Courses ▾
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
          </div> */}
          <div
  className="relative z-50"
  onMouseEnter={() => setTraining(true)}
  onMouseLeave={() => {
  setTraining(false);
  setActiveCourse(null);
  setActiveSubCourse(null);
}}
>
  {/* <button className="text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-gold">
    Courses ▾
  </button> */}
 <button
  className={`text-[15px] font-bold tracking-wide transition-colors hover:text-gold ${
    isHome && !scrolled
      ? "text-white"
      : "text-foreground/80"
  }`}
>
  Courses ▾
</button>

  {/* {training && ( */}
  {training && <CourseDropdown />}
</div>
          {/* <NavLink to="/consultancy">
  Consultants
</NavLink> */}

          <NavLink to="/contact">Contact</NavLink>
          {/* <Link to="/contact" className="btn-primary !px-5 !py-2 text-xs"> */}
          <Link to="/contact" className="btn-primary !px-4 !py-2 !text-[11px]">
            Enquire Now
          </Link>
{/*          
<Link
  to="/training-login"
  onClick={() => setOpen(false)}
  className={`text-[15px] font-bold tracking-wide transition-colors hover:text-gold ${
    isHome && !scrolled
      ? "text-white"
      : "text-foreground/80"
  }`}
>
  Training Login
</Link> */}

 {/* <Link
  to="/training-login"
  className={`text-sm font-bold transition-colors duration-300 ${
    isTransparent
      ? "text-white hover:text-gold"
      : "text-foreground hover:text-gold"
  }`}
>
  Training Login
</Link> */}
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          // className="lg:hidden"
          className="lg:hidden flex-shrink-0 ml-6 z-50 p-1"
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            {/* <span className="block h-0.5 w-6 bg-foreground" />
            <span className="block h-0.5 w-6 bg-foreground" />
            <span className="block h-0.5 w-4 bg-foreground" /> */}
            <span
  // className={`block h-0.5 w-6 ${
  //   isHome && !scrolled ? "bg-white" : "bg-foreground"
  // }`}
  className={`block h-0.5 w-6 ${
  isHome && !scrolled && !open
    ? "bg-white"
    : "bg-foreground"
}`}
/>

<span
  // className={`block h-0.5 w-6 ${
  //   isHome && !scrolled ? "bg-white" : "bg-foreground"
  // }`}
  className={`block h-0.5 w-6 ${
  isHome && !scrolled && !open
    ? "bg-white"
    : "bg-foreground"
}`}
/>

<span
  // className={`block h-0.5 w-4 ${
  //   isHome && !scrolled ? "bg-white" : "bg-foreground"
  // }`}
  className={`block h-0.5 w-4 ${
  isHome && !scrolled && !open
    ? "bg-white"
    : "bg-foreground"
}`}
/>
          </div>
        </button>
      </div>

      {/* {open && (
        <div className="border-t border-border bg-background lg:hidden"> */}
        {open && (
  <div className="border-t border-border bg-white lg:hidden">
          <div className="container-x flex flex-col gap-3 py-4">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            {/* <details className="group">
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
            </details> */}
            <details className="group">
  <summary className="cursor-pointer text-sm font-medium text-foreground/80">
    Services
  </summary>

  <div className="mt-2 space-y-2 pl-3">

    {serviceMenu.map((category) => (
      <details key={category.key} className="group">

        <summary className="cursor-pointer text-sm font-semibold text-foreground">
          {category.label}
        </summary>

        <div className="mt-2 ml-4 flex flex-col gap-2">

          {category.items.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setOpen(false)}
              className="text-sm text-muted-foreground hover:text-gold"
            >
              {item.label}
            </Link>
          ))}

        </div>

      </details>
    ))}

  </div>
</details>
            <details className="group">
              <summary className="cursor-pointer text-sm font-medium text-foreground/80">
                ISO Trainings
              </summary>
              {/* <div className="mt-2 grid gap-1 pl-3">
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
              </div> */}
              {/* <div
  className="relative z-50"
  onMouseEnter={() => setIsoTr(true)}
  onMouseLeave={() => setIsoTr(false)}
>
  <button className="text-sm font-medium tracking-wide text-foreground/80 hover:text-gold">
    ISO Trainings ▾
  </button>

  {isoTr && (
    <IsoTrainingDropdown />
  )}
</div> */}
{/* <div className="mt-2 grid gap-1 pl-3">
  {isoTrainingMenu.map((item) => (
    <Link
      key={item.label}
      to={item.to}
      onClick={() => setOpen(false)}
      className="text-sm text-muted-foreground hover:text-gold"
    >
      {item.label}
    </Link>
  ))}
</div> */}
<div className="mt-2 space-y-2 pl-3">

  {isoTrainingMenu.map((category, index) => (

    index < 2 ? (

      <details key={category.title} className="group">

        <summary className="cursor-pointer text-sm font-semibold text-foreground">
          {category.title}
        </summary>

        <div className="mt-2 ml-4 flex flex-col gap-2">

          {category.items.map((item) => (
            <Link
              key={item.slug}
              to={`/iso-training/${item.slug}`}
              onClick={() => setOpen(false)}
              className="text-sm text-muted-foreground hover:text-gold"
            >
              {item.label}
            </Link>
          ))}

        </div>

      </details>

    ) : (

      <Link
        key={category.title}
        to={`/iso-training/${category.items[0].slug}`}
        onClick={() => setOpen(false)}
        className="block text-sm text-muted-foreground hover:text-gold"
      >
        {category.title}
      </Link>

    )

  ))}

</div>
            </details>
            <details className="group">
              <summary className="cursor-pointer text-sm font-medium text-foreground/80">
               Courses
              </summary>
              <div className="mt-2 grid gap-1 pl-3">
                {/* {trainings.map((t) => (
                  <Link
                    key={t.slug}
                    to={`/training/${t.slug}`}
                    onClick={() => setOpen(false)}
                    className="text-sm text-muted-foreground hover:text-gold"
                  >
                    {t.title}
                  </Link>
                ))} */}
                {courseMenu.map((category) => (
  <details key={category.title} className="group">

    <summary className="cursor-pointer text-sm font-semibold text-foreground">
      {category.title}
    </summary>

    <div className="mt-2 ml-4 flex flex-col gap-2">

      {category.items.map((item) => (
        <Link
          key={item.slug}
          to={`/course/${item.slug}`}
          onClick={() => setOpen(false)}
          className="text-sm text-muted-foreground hover:text-gold"
        >
          {item.label}
        </Link>
      ))}

    </div>

  </details>
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