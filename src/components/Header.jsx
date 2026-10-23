"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
// import { useState } from "react";
import { useEffect, useState } from "react";
// import { company, isoServices, trainings, isoTrainings, serviceMenu } from "@/data/site";
// import {
//   company,
//   // isoServices,
//   trainings,
//   // isoTrainings,
//   // serviceMenu,
//   courseMenu,
//   // isoTrainingMenu,
// } from "@/data/site";
// import {
//   company,
//   courseMenu,
// } from "@/data/site";
import { company } from "@/data/site";
import { serviceMenu } from "@/components/ServiceMenu";
import mainLogo from "../assets/shieldlogo.jpg";
import CourseDropdown from "./CourseDropdown";
import IsoTrainingDropdown from "@/components/IsoTrainingDropdown";

/* =========================================================
   MOBILE ISO TRAINING MENU

   ONLY ISO LEAD AUDITOR TRAINING AND ISO INTERNAL AUDITOR
   TRAINING HAVE SUB-MENUS.

   ISO FOUNDATION TRAINING, ISO 31000 RISK MANAGEMENT,
   AND ISO TRAINING ONLINE ARE DIRECT PAGE LINKS.
========================================================= */
const isoTrainingMenu = [
  {
    title: "ISO Lead Auditor Training",
    items: [
      { label: "ISO 9001 Lead Auditor Training", slug: "iso-9001-lead-auditor" },
      { label: "ISO 9001:2026 Lead Auditor Training", slug: "iso-9001-2026-lead-auditor" },
      { label: "ISO 27001 Lead Auditor Training", slug: "iso-27001-lead-auditor" },
      { label: "ISO 45001 Lead Auditor Training", slug: "iso-45001-lead-auditor" },
      { label: "ISO 22301 Lead Auditor Training", slug: "iso-22301-lead-auditor" },
      { label: "ISO 22000 Lead Auditor Training", slug: "iso-22000-lead-auditor" },
      { label: "ISO 14001 Lead Auditor Training", slug: "iso-14001-lead-auditor" },
      { label: "ISO 13485 Lead Auditor Training", slug: "iso-13485-lead-auditor" },
      { label: "ISO 50001 Lead Auditor Training", slug: "iso-50001-lead-auditor" },
      { label: "ISO 17025 Lead Auditor Training", slug: "iso-17025-lead-auditor" },
      { label: "ISO 15189 Lead Auditor Training", slug: "iso-15189-lead-auditor" },
      { label: "FSSC 22000 Lead Auditor Training", slug: "fssc-22000-lead-auditor" },
    ],
  },
  {
    title: "ISO Internal Auditor Training",
    items: [
      { label: "ISO 13485 Internal Auditor Training", slug: "iso-13485-internal-auditor" },
      { label: "ISO 14001 Internal Auditor Training", slug: "iso-14001-internal-auditor" },
      { label: "ISO 27001 Internal Auditor Training", slug: "iso-27001-internal-auditor" },
      { label: "ISO 50001 Internal Auditor Training", slug: "iso-50001-internal-auditor" },
      { label: "ISO 45001 Internal Auditor Training", slug: "iso-45001-internal-auditor" },
      { label: "ISO 9001 Internal Auditor Training", slug: "iso-9001-internal-auditor" },
      { label: "ISO 9001:2026 Internal Auditor Training", slug: "iso-9001-2026-internal-auditor" },
      { label: "ISO 22000 Internal Auditor Training", slug: "iso-22000-internal-auditor" },
      { label: "ISO 22301 Internal Auditor Training", slug: "iso-22301-internal-auditor" },
      { label: "ISO 17025 Internal Auditor Training", slug: "iso-17025-internal-auditor" },
      { label: "ISO 15189 Internal Auditor Training", slug: "iso-15189-internal-auditor" },
      { label: "IATF 16949 Internal Auditor Training", slug: "iatf-16949-internal-auditor" },
      { label: "ISO 31000 Internal Auditor Training", slug: "iso-31000-internal-auditor" },
    ],
  },
  {
    title: "ISO Foundation Training",
    items: [{ label: "ISO Foundation Training", slug: "iso-foundation-training" }],
  },
  {
    title: "ISO 31000 Risk Management",
    items: [{ label: "ISO 31000 Risk Management", slug: "iso-31000-risk-management" }],
  },
  {
    title: "ISO Training Online",
    items: [{ label: "Online ISO Training", slug: "online-iso-training" }],
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState(false);
  const [activeCat, setActiveCat] = useState("iso");
  const [training, setTraining] = useState(false);
  const [activeCourse, setActiveCourse] = useState(0);
  const [activeSubCourse, setActiveSubCourse] = useState(null);
  const [isoTr, setIsoTr] = useState(false);
  // const { pathname } = useLocation();
  const pathname = usePathname();
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
  const NavLink = ({ href, children, className = "" }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={`text-[15px] font-bold tracking-wide transition-colors hover:text-gold ${
          isActive
            ? "text-gold"
            : open
            ? "text-foreground"
            : isHome && !scrolled
            ? "text-white"
            : "text-foreground/80"
        } ${className}`}
        onClick={() => setOpen(false)}
      >
        {children}
      </Link>
    );
  };

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
        <Link href="/" className="flex items-center gap-3">
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
  <Link href="/" className="flex items-center gap-3">
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
  <Link
    href="/"
    className={`flex items-center gap-3 ${
      isHome && !scrolled ? "-translate-x-3" : ""
    }`}
  >
    {/* <span className="logo-circle h-11 w-11 flex items-center justify-center">
      <img
        src={mainLogo}
        alt="Hawksberg"
        className="w-full h-full object-cover scale-[1.18]"
      />
    </span> */}
    <span className="flex items-center justify-center">
  <img
    src={mainLogo.src}
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
          <NavLink href="/" className={isHome && !scrolled ? "translate-x-8" : ""}>
            Home
          </NavLink>
          <NavLink href="/about" className={isHome && !scrolled ? "translate-x-8" : ""}>
            About
          </NavLink>

          <div
            className="relative"
            onMouseEnter={() => setServices(true)}
            onMouseLeave={() => setServices(false)}
          >
            {/* <button className="text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-gold">
              Services ▾
            </button> */}
          <Link
  href="/ISO-consulting-services"
  className={`inline-block text-[15px] font-bold tracking-wide transition-colors hover:text-gold ${
    isHome && !scrolled
      ? "text-white translate-x-8"
      : "text-foreground/80"
  }`}
>
  Services ▾
</Link>
            {services && (
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
                <div className="reveal flex overflow-hidden rounded-lg border border-border bg-white text-black shadow-elegant">
                  {/* Categories column */}
                  <ul className="w-56 border-r border-black/10 bg-white py-2">
                    {/* {serviceMenu.map((cat) => (
                      <li key={cat.key}>
                        <button
                          onMouseEnter={() => setActiveCat(cat.key)}
                          onClick={() => setActiveCat(cat.key)}
                          className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold transition-colors ${
                            activeCat === cat.key
                              ? "bg-black/5 text-black"
                              : "text-black/80 hover:bg-black/5"
                          }`}
                        > */}
                          {/* <span>{cat.label}</span> */}
                          {/* <span>
  {cat.key === "iso" ? "ISO-Certification" : cat.label}
</span>
                          <span className="text-black/40">›</span>
                        </button>
                      </li>
                    ))} */}

                    {/* {serviceMenu.map((cat) => (
  <li key={cat.key}>
    {cat.key === "iso" ? (
      <Link
        href="/iso-certification"
        onMouseEnter={() => setActiveCat(cat.key)}
        className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold transition-colors ${
          activeCat === cat.key
            ? "bg-black/5 text-black"
            : "text-black/80 hover:bg-black/5"
        }`}
      >
        <span>ISO-Certification</span>
        <span className="text-black/40">›</span>
      </Link>
    ) : (
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
    )}
  </li>
))} */}
{serviceMenu.map((cat) => (
  <li key={cat.key}>
    {cat.key === "iso" ? (
      <Link
        href="/iso-certification"
        onMouseEnter={() => setActiveCat(cat.key)}
        className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold transition-colors ${
          activeCat === cat.key
            ? "bg-black/5 text-black"
            : "text-black/80 hover:bg-black/5"
        }`}
      >
        <span>ISO-Certification</span>
        <span className="text-black/40">›</span>
      </Link>
    ) : cat.key === "certificate-verification" ? (
      <Link
        href="/info/certificate-verification"
        onMouseEnter={() => setActiveCat(null)}
        className={`flex w-full items-center px-4 py-3 text-left text-sm font-semibold transition-colors ${
          activeCat === cat.key
            ? "bg-black/5 text-black"
            : "text-black/80 hover:bg-black/5"
        }`}
      >
        <span>Certificate Verification</span>
      </Link>
    ) : (
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
    )}
  </li>
))}
                  </ul>
                  {/* Items column */}
                  <ul className="min-w-[260px] bg-white py-2">
                    {(serviceMenu.find((c) => c.key === activeCat)?.items || []).map(
                      (item) => (
                        <li key={item.label}>
                          <Link
                            href={item.to}
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
 <div
  className={`text-[15px] font-bold tracking-wide transition-colors hover:text-gold ${
    isHome && !scrolled
      ? "text-white translate-x-8"
      : "text-foreground/80"
  }`}
>
  <Link href="/iso-training">ISO Trainings</Link> ▾
</div>

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
      ? "text-white translate-x-8"
      : "text-foreground/80"
  }`}
>
  Courses ▾
</button>

  {/* {training && ( */}
  {training && <CourseDropdown />}
</div>

          {/* <NavLink href="/contact">Contact</NavLink> */}
          <NavLink
            href="/training-login"
            className={isHome && !scrolled ? "translate-x-8" : ""}
          >
            TrainingLogin
          </NavLink>
          {/* <Link to="/contact" className="btn-primary !px-5 !py-2 text-xs"> */}
          {/* <Link
            href="/contact"
            className={`btn-primary !px-4 !py-2 !text-[11px] ${
              isHome && !scrolled ? "ml-4" : ""
            }`}
          >
            Enquire Now
          </Link> */}
          <Link
  href="/contact"
  className={`btn-primary !px-4 !py-2 !text-[11px] ${
    isHome && !scrolled ? "translate-x-6 whitespace-nowrap" : ""
  }`}
>
  Enquire Now
</Link>
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
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
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
      category.to ? (
        <Link
          key={category.key}
          href={category.to}
          onClick={() => setOpen(false)}
          className="text-sm font-semibold text-foreground"
        >
          {category.label}
        </Link>
      ) : (
        <details key={category.key} className="group">

        <summary className="cursor-pointer text-sm font-semibold text-foreground">
          {category.label}
        </summary>

        <div className="mt-2 ml-4 flex flex-col gap-2">

          {category.items.map((item) => (
            <Link
              key={item.label}
              href={item.to}
              onClick={() => setOpen(false)}
              className="text-sm text-muted-foreground hover:text-gold"
            >
              {item.label}
            </Link>
          ))}

        </div>

        </details>
      )
    ))}

  </div>
</details>
            <details className="group">
              <summary className="cursor-pointer text-sm font-medium text-foreground/80">
                ISO Trainings
              </summary>
           
<div className="mt-2 space-y-2 pl-3">

  {/* ISO LEAD AUDITOR TRAINING — DROPDOWN */}
  <details className="group">
    <summary className="cursor-pointer text-sm font-semibold text-foreground">
      ISO Lead Auditor Training
    </summary>

    <div className="mt-2 ml-4 flex flex-col gap-2">
      {isoTrainingMenu[0].items.map((item) => (
        <Link
          key={item.slug}
          href={`/iso-training/${item.slug}`}
          onClick={() => setOpen(false)}
          className="text-sm text-muted-foreground hover:text-gold"
        >
          {item.label}
        </Link>
      ))}
    </div>
  </details>


  {/* ISO INTERNAL AUDITOR TRAINING — DROPDOWN */}
  <details className="group">
    <summary className="cursor-pointer text-sm font-semibold text-foreground">
      ISO Internal Auditor Training
    </summary>

    <div className="mt-2 ml-4 flex flex-col gap-2">
      {isoTrainingMenu[1].items.map((item) => (
        <Link
          key={item.slug}
          href={`/iso-training/${item.slug}`}
          onClick={() => setOpen(false)}
          className="text-sm text-muted-foreground hover:text-gold"
        >
          {item.label}
        </Link>
      ))}
    </div>
  </details>


  {/* ISO FOUNDATION — DIRECT PAGE */}
<Link
  href="/iso-training/iso-foundation"
  onClick={() => setOpen(false)}
  className="block text-sm font-semibold text-foreground hover:text-gold"
>
  ISO Foundation Training
</Link>


  {/* ISO 31000 — DIRECT PAGE */}
  <Link
    href="/iso-training/iso-31000-risk-management"
    onClick={() => setOpen(false)}
    className="block text-sm font-semibold text-foreground hover:text-gold"
  >
    ISO 31000 Risk Management
  </Link>


  {/* ONLINE ISO TRAINING — DIRECT PAGE */}
  <Link
    href="/iso-training/online-iso-training"
    onClick={() => setOpen(false)}
    className="block text-sm font-semibold text-foreground hover:text-gold"
  >
    ISO Training Online
  </Link>

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
                {/* {courseMenu.map((category) => (
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
))} */}

{/* =========================================================
    STATIC COURSES MENU
    Courses no longer use site.js / courseMenu
========================================================= */}

{/* DIPLOMA */}
<details className="group">
  <summary className="cursor-pointer text-sm font-semibold text-foreground">
    Diploma
  </summary>

  <div className="mt-2 ml-4 flex flex-col gap-2">
    <Link
      href="/courses/diploma-cyber-security"
      onClick={() => setOpen(false)}
      className="text-sm text-muted-foreground hover:text-gold"
    >
      Diploma in Cyber Security
    </Link>

    <Link
      href="/courses/diploma-machine-learning"
      onClick={() => setOpen(false)}
      className="text-sm text-muted-foreground hover:text-gold"
    >
      Diploma in Machine Learning
    </Link>

    <Link
      href="/courses/diploma-network-security"
      onClick={() => setOpen(false)}
      className="text-sm text-muted-foreground hover:text-gold"
    >
      Diploma in Network Security
    </Link>

    <Link
      href="/courses/diploma-web-security"
      onClick={() => setOpen(false)}
      className="text-sm text-muted-foreground hover:text-gold"
    >
      Diploma in Web Security
    </Link>

    <Link
      href="/courses/diploma-advanced-cloud-network-security"
      onClick={() => setOpen(false)}
      className="text-sm text-muted-foreground hover:text-gold"
    >
      Diploma in Advanced Cloud & Network Security
    </Link>
  </div>
</details>


{/* CYBERSECURITY */}
<details className="group">
  <summary className="cursor-pointer text-sm font-semibold text-foreground">
    Cybersecurity
  </summary>

  <div className="mt-2 ml-4 flex flex-col gap-2">
    <Link href="/courses/ethical-hacking" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-gold">
      Ethical Hacking
    </Link>

    <Link href="/courses/bug-bounty" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-gold">
      Bug Bounty
    </Link>

    <Link href="/courses/cyber-security-professional" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-gold">
      Cyber Security Professional
    </Link>

    <Link href="/courses/cyber-psychology" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-gold">
      Cyber Psychology
    </Link>

    <Link href="/courses/web-application-penetration-tester" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-gold">
      Web Application Penetration Tester
    </Link>

    <Link href="/courses/network-penetration-tester" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-gold">
      Network Penetration Tester
    </Link>

    <Link href="/courses/android-penetration-tester" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-gold">
      Android Penetration Tester
    </Link>

    <Link href="/courses/iot-penetration-tester" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-gold">
      IoT Penetration Tester
    </Link>

    <Link href="/courses/certified-penetration-tester" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-gold">
      Certified Penetration Tester
    </Link>

    <Link href="/courses/reverse-engineering" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-gold">
      Reverse Engineering
    </Link>

    <Link href="/courses/computer-forensic-training" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-gold">
      Computer Forensic Training
    </Link>

    <Link href="/courses/cissp-training" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-gold">
      CISSP Training
    </Link>

    <Link href="/courses/soc-analyst-training" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-gold">
      SOC Analyst Training
    </Link>

    <Link href="/courses/penetration-testing" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-gold">
      Penetration Testing
    </Link>

    <Link href="/courses/advanced-penetration-testing-red-teaming" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-gold">
      Advanced Penetration Testing & Red Teaming
    </Link>
  </div>
</details>


{/* MACHINE LEARNING */}
<details className="group">
  <summary className="cursor-pointer text-sm font-semibold text-foreground">
    Machine Learning
  </summary>

  <div className="mt-2 ml-4 flex flex-col gap-2">
    <Link href="/courses/artificial-intelligence" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-gold">
      Artificial Intelligence
    </Link>

    <Link href="/courses/machine-learning-python" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-gold">
      Machine Learning with Python
    </Link>

    <Link href="/courses/data-science-python" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-gold">
      Data Science with Python
    </Link>

    <Link href="/courses/embedded-system-robotics" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-gold">
      Embedded System & Robotics
    </Link>
  </div>
</details>


{/* NETWORKING */}
<details className="group">
  <summary className="cursor-pointer text-sm font-semibold text-foreground">
    Networking
  </summary>

  <div className="mt-2 ml-4 flex flex-col gap-2">
    <Link href="/courses/ccna" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-gold">
      CCNA
    </Link>

    <Link href="/courses/ccnp" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-gold">
      CCNP
    </Link>
  </div>
</details>


{/* CLOUD */}
<details className="group">
  <summary className="cursor-pointer text-sm font-semibold text-foreground">
    Cloud Computing
  </summary>

  <div className="mt-2 ml-4 flex flex-col gap-2">
    <Link href="/courses/aws-basic-training" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-gold">
      AWS Basic Training
    </Link>

    <Link href="/courses/microsoft-azure-training" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-gold">
      Microsoft Azure Training
    </Link>

    <Link href="/courses/advance-cloud-computing" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-gold">
      Advance Cloud Computing
    </Link>
  </div>
</details>


{/* PROGRAMMING */}
<details className="group">
  <summary className="cursor-pointer text-sm font-semibold text-foreground">
    Programming
  </summary>

  <div className="mt-2 ml-4 flex flex-col gap-2">
    <Link href="/courses/python-programming" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-gold">
      Python Programming
    </Link>

    <Link href="/courses/django-developer" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-gold">
      Django Developer
    </Link>

    <Link href="/courses/java-programming" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-gold">
      Java Programming
    </Link>

    <Link href="/courses/android-developer" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-gold">
      Android Developer
    </Link>

    <Link href="/courses/devops-certification" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-gold">
      DevOps Certification
    </Link>

    <Link href="/courses/secure-full-stack-developer" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-gold">
      Secure Full Stack Developer
    </Link>

    <Link href="/courses/iot-development" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-gold">
      IoT Development
    </Link>
  </div>
</details>
              </div>
            </details>
            {/* <NavLink href="/contact">Contact</NavLink> */}
            <NavLink href="/training-login">Training Login</NavLink>
            {/* <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary self-start"
            >
              Enquire Now
            </Link> */}
            <NavLink href="/contact">
  Contact
</NavLink>
          </div>
        </div>
      )}
    </header>
  );
}