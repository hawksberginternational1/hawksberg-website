import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import hero1 from "@/assets/hero1.webp";   // change to your image
import hero2 from "@/assets/hero2.webp";   // change to your image
import hero3 from "@/assets/hero3.webp";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
// import homepagedot from "@/assets/homepagedot.webp";
// import heros from "@/assets/heros.webp";

const slides = [
  {
    type: "video",
    src: "/video/homepagevideo.mp4",

    eyebrow: "ISO Consultancy & Training",
    title: "Delivering Excellence in Compliance & Cyber Security",
    sub: "From ISO certification to cyber security training — Hawksberg International delivers measurable, audit-ready outcomes for enterprises across the globe.",
    button: "Explore Services",
link: "/services/iso-27001",
  },

// {
//   type: "image",
//   src: heros,

//   eyebrow: "ISO Consultancy & Training",
//   title: "Delivering Excellence in Compliance & Cyber Security",
//   sub: "From ISO certification to cyber security training — Hawksberg International delivers measurable, audit-ready outcomes for enterprises across the globe.",
//   button: "Explore Services",
//   link: "/services/iso-27001",
// },

  {
    type: "image",
    src: hero1,

    eyebrow: "Cyber Security",
    title: "Trusted Cyber Security & Compliance Expertise",
    sub: "VAPT, ISO 27001 ISMS Implementation, SOC 2 Readiness, TISAX and Enterprise Cyber Security Solutions.",
    button: "Cyber Security Courses",
link: "/services/iso-27001",
  },

  {
    type: "image",
    src: hero2,

    eyebrow: "Industry-Ready Training",
    title: "Our Trainings",
    sub: "Hands-on programs in Ethical Hacking, Bug Bounty, CCNA, Python, Java and Penetration Testing — by industry professionals.",
    button: "View Trainings",
link: "/training/ethical-hacking",
  },

  {
    type: "image",
    src: hero3,

    eyebrow: "ISO Certification",
    title: "Global ISO Consulting & Audit Services",
    sub: "Expert ISO implementation, certification guidance, internal audits and compliance solutions for every business.",
    button: " More About Us",
link: "/about",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const orderedSlides = isMobile
    ? [slides[1], slides[0], slides[2], slides[3]]
    : slides;

 useEffect(() => {
  setCurrent(0);

  const timer = setInterval(() => {
    setCurrent((prev) => (prev + 1) % orderedSlides.length);
  }, 5000);

  return () => clearInterval(timer);
}, [isMobile]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* {slides.map((slide, index) => ( */}
      {orderedSlides.map((slide, index) => (
       
<div
  key={index}
  className={`absolute inset-0 transition-opacity duration-700 ${
    current === index
      ? "opacity-100 z-20"
      : "opacity-0 z-10 pointer-events-none"
  }`}
>
          {slide.type === "video" ? (
            <video
              autoPlay
              muted
              loop
              playsInline
               preload="auto"
              className="h-full w-full object-cover"
            >
              <source src={slide.src} type="video/mp4" />
            </video>
          ) : (
            <img
              src={slide.src}
              alt=""
              className={`h-full w-full object-cover ${
                current === index ? "animate-zoom" : ""
              }`}
            />
          )}

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/45"></div>

          {/* Text */}
          {/* <div className="absolute left-[8%] top-1/2 -translate-y-1/2 z-30 max-w-4xl text-white"> */}
         {/* <div className="absolute left-[7%] top-[60%] -translate-y-1/2 z-30 max-w-2xl text-white"> */}
         <div className="absolute left-[7%] top-[58%] -translate-y-1/2 z-30 max-w-4xl text-white">
           {/* <span className="border border-yellow-500 rounded-full px-5 py-2 text-sm tracking-[4px] uppercase">
  {slide.eyebrow}
</span> */}
<motion.span
  initial={isMobile ? false : { opacity: 0, y: 25 }}
  // animate={
  //   isMobile
  //     ? {}
  //     : current === index
  //     ? { opacity: 1, y: 0 }
  //     : { opacity: 0, y: 25 }
  // }
  animate={
  isMobile
    ? {}
    : current === index
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 25 }
}
  transition={{
    duration: 0.6,
    delay: 0.2,
  }}
  className="inline-flex items-center gap-2 rounded-full border border-[#D8A23A]/70 px-4 py-1.5 text-xs tracking-[0.28em] uppercase text-[#D8A23A]"
>
  ★ <span>{slide.eyebrow}</span>
</motion.span>
{/* //   className="inline-block border border-yellow-500 rounded-full px-5 py-2 text-sm tracking-[4px] uppercase"
// className="inline-block border border-yellow-500 rounded-full px-6 py-3 text-base tracking-[5px] uppercase"
className="inline-flex items-center gap-2 rounded-full border border-[#D8A23A]/70 px-4 py-1.5 text-xs tracking-[0.28em] uppercase text-[#D8A23A]" */}


<motion.h1
  initial={isMobile ? false : { opacity: 0, y: 40 }}
  animate={
  isMobile
    ? {}
    : current === index
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 40 }
}
  transition={{
    duration: 0.8,
    delay: 0.35,
    ease: "easeOut",
  }}
//   className={`mt-5 font-light leading-[1.08]
className={`mt-5 font-semibold leading-[1.08]
    ${
      slide.type === "video"
        ? "max-w-3xl text-[30px] lg:text-[40px]"
        : slide.title === "Our Trainings"
        ? "max-w-2xl text-[30px] lg:text-[40px]"
        : "max-w-3xl text-[42px] lg:text-[52px]"
    }`}
  style={{
    fontFamily: "Copperplate, 'Copperplate Gothic Light', serif",
  }}
>
  {slide.title}
</motion.h1>
 <motion.p
  initial={isMobile ? false : { opacity: 0, y: 30 }}
 animate={
  isMobile
    ? {}
    : current === index
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 30 }
}
  transition={{
    duration: 0.8,
    delay: 0.55,
    ease: "easeOut",
  }}
  className="mt-6 max-w-xl text-[18px] lg:text-[20px] leading-9 text-white/85"
  style={{
    fontFamily: "'Playfair Display', serif",
  }}
>
  {slide.sub}
</motion.p>

            {/* <button 
           className="mt-10 rounded-full bg-[#d89d2d] px-8 py-3 text-[18px] font-semibold text-black transition hover:scale-105">
  {slide.button} →
</button> */}
<Link
  to={slide.link}
  className="mt-10 inline-flex items-center rounded-full bg-[#d89d2d] px-8 py-3 font-semibold text-black transition hover:scale-105"
>
  {slide.button} →
</Link>
          </div>
        </div>
      ))}
    </section>
  );
}