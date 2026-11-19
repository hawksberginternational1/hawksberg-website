// "use client";
// import { useEffect, useState } from "react";

// const items = [
//    {
//     company: "RABWIN INDUSTRIES PRIVATE LIMITED",
//     quote:
//       "Hawksberg delivered professional, timely service with exceptional expertise and responsiveness throughout our engagement. Their practical recommendations and attention to detail strengthened our management systems and compliance. We confidently recommend Hawksberg for reliable certification, auditing, and management system consulting services.",
//     name: "Mr. A.V. Arulprakasam",
//     role: "Management Representative",
//   },
//   {
//   company: "DATAMINFO LTD T/A MAVARICK",
//   quote:
//     "We are highly satisfied with the professional services delivered by Hawksberg for the Information Security Management System covering Analytical Software for Manufacturing Productivity Management, Energy Management, and Carbon Reporting. Their team demonstrated strong technical expertise, professionalism, and a thorough understanding of our business and compliance requirements. The engagement was managed efficiently, with practical recommendations that strengthened our management system and information security controls. We appreciate their commitment to quality and would confidently recommend their services to organizations seeking reliable certification and compliance support.",
//   name: "Ms. Riya Parikh",
//   role: "Authorized Client Representative",
// },
//   // {
//   //   quote:
//   //     "Our team's ethical hacking training was hands-on and current. Trainers are clearly senior practitioners.",
//   //   name: "Arun Iyer",
//   //   role: "Head of Security, Aroopa",
//   // },
// ];

// export default function Testimonials() {
//   const [i, setI] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => setI((v) => (v + 1) % items.length), 5500);
//     return () => clearInterval(t);
//   }, []);

//   return (
//     <section className="container-x py-24">
//       <div className="mx-auto max-w-2xl text-center">
//         <p className="text-xs uppercase tracking-[0.3em] text-gold">Testimonials</p>
//         <h2 className="mt-3 font-display text-4xl md:text-5xl">
//           What our clients say
//         </h2>
//         <div className="mx-auto mt-4 gold-divider" />
//       </div>

//       <div className="relative mx-auto mt-12 max-w-3xl">
//         {items.map((it, idx) => (
//           <div
//             key={idx}
//             className={`transition-all duration-700 ${
//               idx === i ? "relative opacity-100" : "pointer-events-none absolute inset-0 opacity-0"
//             }`}
//           >
//             <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-soft">
//               <span className="font-display text-7xl leading-none text-gold">“</span>
//               <p className="-mt-6 font-display text-2xl italic text-foreground md:text-3xl">
//                 {it.quote}
//               </p>
//               <div className="mt-6">
//                 <p className="font-semibold text-foreground">{it.name}</p>
//                 <p className="text-xs uppercase tracking-widest text-muted-foreground">
//                   {it.role}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//         <div className="mt-6 flex justify-center gap-2">
//           {items.map((_, idx) => (
//             <button
//               key={idx}
//               onClick={() => setI(idx)}
//               className={`h-1.5 rounded-full transition-all ${
//                 idx === i ? "w-10 bg-gold" : "w-3 bg-muted-foreground/40"
//               }`}
//               aria-label={`Slide ${idx + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";

import { useEffect, useState } from "react";

const items = [
  {
    company: "RABWIN INDUSTRIES PRIVATE LIMITED",
    quote:
      "Hawksberg delivered professional, timely service with exceptional expertise and responsiveness throughout our engagement. Their practical recommendations and attention to detail strengthened our management systems and compliance. We confidently recommend Hawksberg for reliable certification, auditing, and management system consulting services.",
    name: "Mr. A.V. Arulprakasam",
    role: "Management Representative",
  },
  {
    company: "DATAMINFO LTD T/A MAVARICK",
    quote:
      "We are highly satisfied with the professional services delivered by Hawksberg for the Information Security Management System covering Analytical Software for Manufacturing Productivity Management, Energy Management, and Carbon Reporting. Their team demonstrated strong technical expertise, professionalism, and a thorough understanding of our business and compliance requirements. The engagement was managed efficiently, with practical recommendations that strengthened our management system and information security controls. We appreciate their commitment to quality and would confidently recommend their services to organizations seeking reliable certification and compliance support.",
    name: "Ms. Riya Parikh",
    role: "Authorized Client Representative",
  },
  {
  company: "MINISTRY OF INTERIOR – SECURITY PRINTING PRESS",
  quote:
    "Your team showed great dedication, a positive attitude and a strong grasp of the project requirements. Working with your team was a pleasant experience.",
  name: "Mr. Syed Sakubar Malungu",
},
{
  company: "LE MÉRIDIEN GURGAON, DELHI NCR",
  quote:
    "We, Le Méridien Gurgaon, Delhi NCR, are pleased with the professional services provided by Hawksberg International Certification for our ISO 14001:2015 Environmental Management System. Hawksberg supported us in conducting Internal Audits, facilitating Management Review Meetings (MRM), and providing guidance for the effective closure of External Audit Nonconformities (NCs). Their team demonstrated good technical knowledge, professionalism, and timely support throughout the engagement. The services provided helped us strengthen our environmental management system, ensure compliance with ISO 14001:2015 requirements, and support our continual improvement initiatives. We appreciate their valuable support and look forward to continuing our association with Hawksberg International Certification.",
  name: "Mr. Kamlesh Singh",
  role: "DOE",
},
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  const activeItem = items[activeIndex];

  return (
    <section className="container-x bg-[#faf9f6] py-10 md:py-12">

      {/* Heading */}
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
          Client Testimonials
        </p>

        <h2 className="mt-2 font-display text-3xl md:text-4xl">
          What our clients say
        </h2>

        <div className="mx-auto mt-3 gold-divider" />

        <p className="mt-3 text-sm text-muted-foreground">
          Trusted feedback from organizations we have worked with.
        </p>
      </div>

      {/* Compact Testimonial Card */}
      <div className="mx-auto mt-7 max-w-3xl">

        <div
          key={activeIndex}
          className="overflow-hidden rounded-xl border border-border bg-white shadow-[0_8px_25px_rgba(15,23,42,0.05)] transition-all duration-500"
        >
          <div className="h-1 w-full gradient-gold" />

          <div className="px-5 py-6 sm:px-8 sm:py-7 md:px-10">

            {/* Company */}
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
                Client Organization
              </p>

              <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-slate-900 sm:text-2xl">
                {activeItem.company}
              </h3>
            </div>

            <div className="my-5 h-px bg-slate-200" />

            {/* Feedback */}
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500">
                Client Feedback
              </p>

              <div className="flex items-start gap-2">
                <span className="font-display text-3xl leading-none text-gold">
                  “
                </span>

                <p className="min-w-0 flex-1 text-sm leading-7 text-slate-700 sm:text-[15px]">
                  {activeItem.quote}
                </p>
              </div>
            </div>

            {/* Feedback By */}
            <div className="mt-5 flex flex-col gap-2 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gold">
                  Feedback By
                </p>

                <p className="mt-1 text-base font-semibold text-slate-900">
                  {activeItem.name}
                </p>

                <p className="text-xs text-slate-500">
                  {activeItem.role}
                </p>
              </div>

              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                Hawksberg International Certification
              </p>
            </div>

          </div>
        </div>

        {/* Navigation */}
        <div className="mt-5 flex justify-center gap-2">
          {items.map((item, index) => (
            <button
              key={item.company}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View testimonial ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-8 bg-gold"
                  : "w-2.5 bg-slate-300 hover:bg-gold/60"
              }`}
            />
          ))}
        </div>

        <p className="mt-2 text-center text-[10px] text-muted-foreground">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(items.length).padStart(2, "0")}
        </p>

      </div>
    </section>
  );
}
