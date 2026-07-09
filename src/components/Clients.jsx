// import { motion } from "framer-motion";

import { useRef } from "react";
import { useAnimationFrame } from "framer-motion";
// import apptivo from "@/assets/clients/apptivo.webp";
import avon from "@/assets/clients/aperta.webp";
// import marriott from "@/assets/clients/jwmarriott.webp";
import isid from "@/assets/clients/search.webp";
import eprominent from "@/assets/clients/deccan.webp";
import northstar from "@/assets/clients/royal.webp";
import innovex from "@/assets/clients/INDO.webp";
import cygnus from "@/assets/clients/space.webp";
import minuscule from "@/assets/clients/minuscule.webp";
import epc from "@/assets/clients/epc.webp";
import greenmile from "@/assets/clients/kalyani.webp";
import profit from "@/assets/clients/profit.webp";
import shakara from "@/assets/clients/deccan.webp";
import jmi from "@/assets/clients/jmi.webp";
import gighz from "@/assets/clients/gighz.webp";
import logicvalley from "@/assets/clients/logicvalley.webp";
import asiaeo from "@/assets/clients/asia e & o.webp";
import janatics from "@/assets/clients/janatics.webp";
import accumed from "@/assets/clients/accumed.webp";
import salzer from "@/assets/clients/salzer.webp";
import courtyard from "@/assets/clients/courtyard.webp";
// import wentin from "@/assets/clients/royal.webp";
import aloft from "@/assets/clients/jwmarriott.webp";
import steam from "@/assets/clients/steam.webp";
import resolute from "@/assets/clients/resolute.webp";
import electraev from "@/assets/clients/electraev.webp";
import rikun from "@/assets/clients/rikun.webp";
import messer from "@/assets/clients/messer.webp";
import barani from "@/assets/clients/barani.webp";
import ppts from "@/assets/clients/ppts.webp";
import mobility from "@/assets/clients/mobility.webp";
import mercedes from "@/assets/clients/mercedes.webp";

const firstRow = [
  // apptivo,
  avon,
  // marriott,
  isid,
  eprominent,
  northstar,
  innovex,
  cygnus,
  minuscule,
  epc,
  greenmile,
  profit,
  electraev,
  rikun,
  mercedes
];

const secondRow = [
  shakara,
  jmi,
  gighz,
  logicvalley,
  asiaeo,
  janatics,
  accumed,
  mobility,
  salzer,
  courtyard,
  // wentin,
  aloft,
  steam,
  resolute,
  messer,
  barani,
  ppts,
];

// const LogoRow = ({ logos, reverse = false }) => {
//   const duplicated = [...logos, ...logos];

//   return (
//     <div className="overflow-hidden w-full">
//       <motion.div
//         className="flex gap-6 w-max"
//         animate={{
//           x: reverse ? ["-33.33%", "0%"] : ["0%", "-33.33%"],
//         }}
//         transition={{
//           duration: 27,
//           repeat: Infinity,
//           ease: "linear",
//         }}
//       >
//         {duplicated.map((logo, index) => (
//           <div
//             key={index}
//             className="flex h-28 min-w-[220px] items-center justify-center rounded-xl border border-border bg-white px-6 shadow-sm"
//           >
//             <img
//               src={logo}
//               alt={`Client ${index}`}
//               // className="max-h-16 w-auto object-contain transition-transform duration-300 hover:scale-110"
//               className={`object-contain transition-transform duration-300 hover:scale-110 ${
//   [
//     aloft,
//     epc,
//     asiaeo,
//     mobility,
//     janatics,
//   ].includes(logo)
//     // ? "max-h-20 w-auto"
//     ? "max-h-24 w-auto"
//     : "max-h-16 w-auto"
// }`}
//               loading="lazy"
//               decoding="async"
//             />
//           </div>
//         ))}
//       </motion.div>
//     </div>
//   );
// };

const LogoRow = ({ logos, reverse = false }) => {
  const duplicated = [...logos, ...logos];
  const containerRef = useRef(null);
  const x = useRef(reverse ? -3400 : 0);

  const CARD_WIDTH = 220;
  const GAP = 24;
  const totalWidth = logos.length * (CARD_WIDTH + GAP);

  useAnimationFrame((_, delta) => {
    if (!containerRef.current) return;

    const speed = 60; // px/sec

    x.current += (reverse ? 1 : -1) * (speed * delta) / 1000;

    if (!reverse && Math.abs(x.current) >= totalWidth) {
      x.current = 0;
    }

    if (reverse && x.current >= 0) {
      x.current = -totalWidth;
    }

    containerRef.current.style.transform = `translateX(${x.current}px)`;
  });

  return (
    <div className="overflow-hidden w-full">
      <div ref={containerRef} className="flex gap-6 w-max">
        {duplicated.map((logo, index) => (
          <div
            key={index}
            className="flex h-28 min-w-[220px] items-center justify-center rounded-xl border border-border bg-white px-6 shadow-sm"
          >
            <img
              src={logo}
              alt={`Client ${index}`}
              className={`object-contain transition-transform duration-300 hover:scale-110 ${
                [aloft, epc, asiaeo, mobility, janatics].includes(logo)
                  ? "max-h-24 w-auto"
                  : "max-h-16 w-auto"
              }`}
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Clients() {
  return (
    <section className="border-y border-border bg-secondary/40 py-14 overflow-hidden">
      <div className="container-x">
        <p className="mb-10 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Trusted by leading organisations across the globe
        </p>

        <div className="space-y-6">
          <LogoRow logos={firstRow} />
          <LogoRow logos={secondRow} reverse />
        </div>
      </div>
    </section>
  );
}