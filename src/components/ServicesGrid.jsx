// import { Link } from "react-router-dom";
"use client";
import Link from "next/link";

import { serviceMeta as ISO9001 } from "@/app/services/iso-9001/page";
import { serviceMeta as ISO14001 } from "@/app/services/iso-14001/page";
import { serviceMeta as ISO45001 } from "@/app/services/iso-45001/page";
import { serviceMeta as ISO50001 } from "@/app/services/iso-50001/page";
import { serviceMeta as IATF16949 } from "@/app/services/iatf-16949/page";
import { serviceMeta as TISAX } from "@/app/services/tisax-certification-Chennai/page";
// import { serviceMeta as ISO27001 } from "@/app/services/iso-27001/page";
import { serviceMeta as DPDP } from "@/app/services/dpdp/page";

import useReveal from "@/hooks/useReveal";

function ServiceCard({ s, index }) {
  const [ref, shown] = useReveal();

  return (
    <Link
      ref={ref}
      // to={s.to}
      href={s.to}
      style={{
        transitionDelay: `${(index % 3) * 90}ms`,
      }}
      className={`group relative block aspect-[4/3] overflow-hidden rounded-xl shadow-elegant reveal-on-scroll ${
        shown ? "is-visible" : ""
      }`}
    >
      {/* Service Image */}
      {/* <img
        src={s.image}
        alt={`${s.code || s.label}`}
        loading="lazy"
        width={1024}
        height={768}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      /> */}

   <img 
  src={s.image.src} 
  alt={s.code || s.label} 
  loading="lazy" 
  decoding="async" 
  width={1024} 
  height={768} 
  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
/>

      {/* Dark Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

      {/* Service Name */}
      <div className="absolute inset-x-0 bottom-0 p-5 transition-transform duration-500 group-hover:-translate-y-1">
        <h3 className="text-sm leading-relaxed text-white drop-shadow-lg">
          <span
            style={{
              fontFamily: "Calibri",
            }}
          >
            {s.label}
          </span>
        </h3>
      </div>
    </Link>
  );
}

/*
|--------------------------------------------------------------------------
| IMPORTANT:
| This order exactly matches your reference image.
|--------------------------------------------------------------------------
*/

const services = [
  // Row 1
  ISO9001,
  ISO14001,
  ISO45001,

  // Row 2
  ISO50001,
  IATF16949,
  TISAX,

  // Row 3
  // ISO27001,
  DPDP,
];

export default function ServicesGrid() {
  const [headRef, headShown] = useReveal();

  return (
    <section className="py-20">
      {/* Heading */}
      <div
        ref={headRef}
        className={`mx-auto max-w-2xl text-center reveal-on-scroll ${
          headShown ? "is-visible" : ""
        }`}
      >
        <h2 className="text-5xl font-normal tracking-tight text-slate-900 md:text-6xl">
          Our Services
        </h2>

        <div className="mx-auto mt-5 gold-divider" />
      </div>

      {/* Services Grid */}
      <div className="mx-auto mt-16 grid max-w-[1536px] gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <ServiceCard
            key={s.slug}
            s={s}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}