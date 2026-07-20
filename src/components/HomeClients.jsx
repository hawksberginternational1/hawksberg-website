import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// =====================
// Logos
// =====================
import accumed from "@/assets/clients/accumed.webp";
import amritha from "@/assets/clients/amritha.webp";
import aperta from "@/assets/clients/aperta.webp";
import asiaeo from "@/assets/clients/asia e & o.webp";
import barani from "@/assets/clients/barani.webp";
import courtyard from "@/assets/clients/courtyard.webp";
import deccan from "@/assets/clients/deccan.webp";
import electraev from "@/assets/clients/electraev.webp";
import epc from "@/assets/clients/epc.webp";
import gighz from "@/assets/clients/gighz.webp";
import iit from "@/assets/clients/iit.webp";
import indo from "@/assets/clients/INDO.webp";
import janatics from "@/assets/clients/janatics.webp";
import jmi from "@/assets/clients/jmi.webp";
import jwmarriott from "@/assets/clients/jwmarriott.webp";
import kalyani from "@/assets/clients/kalyani.webp";
import logicvalley from "@/assets/clients/logicvalley.webp";
import mercedes from "@/assets/clients/mercedes.webp";
import messer from "@/assets/clients/messer.webp";
import minuscule from "@/assets/clients/minuscule.webp";
import mobility from "@/assets/clients/mobility.webp";
import ppts from "@/assets/clients/ppts.webp";
import profit from "@/assets/clients/profit.webp";
import resolute from "@/assets/clients/resolute.webp";
import rikun from "@/assets/clients/rikun.webp";
import royal from "@/assets/clients/royal.webp";
import salzer from "@/assets/clients/salzer.webp";
import search from "@/assets/clients/search.webp";
import space from "@/assets/clients/space.webp";
import steam from "@/assets/clients/steam.webp";
import vit from "@/assets/clients/vit.webp";
import qikink from "@/assets/clients/qikink.webp";
import rabwin from "@/assets/clients/rabwin.webp";
import westin from "@/assets/clients/westin.webp";
import aloft from "@/assets/clients/aloft.webp";
import kurinji from "@/assets/clients/kurinji.webp";
import state from "@/assets/clients/state.webp";
import revx from "@/assets/clients/revx.webp";

// =====================
// Layout grid (design-time coordinates) — UNCHANGED
// =====================
const COL = 125;
const ROW = 44;
const CARD_W = 125;
const CARD_H = 53;

const pos = (col, row) => ({ x: col * COL, y: row * ROW });

// Default logo image size (all logos not listed below use this)
const DEFAULT_LOGO_SIZE = { width: 120, height: 40 };

// Enlarged size for the 8 specified logos — a controlled ~25–35% increase
// over the default (width 120→150 = +25%, height 40→52 = +30%), still
// comfortably inside the CARD_H = 53 card so nothing overflows or crops.
const LARGE_LOGO_SIZE = { width: 150, height: 52 };

const LOGO_LAYOUT = [
  // { src: state, ...pos(5, -2)  ,...LARGE_LOGO_SIZE},
  { src: space, ...pos(5, 0) },
  { src: janatics, ...pos(4, 1) },
  { src: kalyani, ...pos(3, 2) },
  { src: minuscule, ...pos(5, 2) },
  { src: deccan, ...pos(2, 3) },
  { src: gighz, ...pos(4, 3) },
  { src: vit, ...pos(1, 4), ...LARGE_LOGO_SIZE },
  { src: epc, ...pos(3, 4) },
  { src: steam, ...pos(5, 4) },
  { src: iit, ...pos(0, 5), ...LARGE_LOGO_SIZE },
  { src: mercedes, ...pos(2, 5) },
  { src: electraev, ...pos(4, 5) },
  { src: amritha, ...pos(1, 6), ...LARGE_LOGO_SIZE },
  { src: profit, ...pos(3, 6) },
  { src: salzer, ...pos(5, 6) },
  { src: ppts, ...pos(2, 7) },
  { src: courtyard, ...pos(4, 7), ...LARGE_LOGO_SIZE },
  { src: royal, ...pos(3, 8) },
  { src: rikun, ...pos(5, 8) },
  { src: qikink, ...pos(1, 9), y: 9 * ROW - 40 },
  { src: revx, ...pos(1, 10) },
  { src: search, ...pos(2, 9) },
  { src: asiaeo, ...pos(4, 9), ...LARGE_LOGO_SIZE },
   { src: rabwin, ...pos(2, 11) },
   { src: state, ...pos(2, 13) ,...LARGE_LOGO_SIZE},
  { src: indo, ...pos(3, 10) },
  { src: mobility, ...pos(5, 10), ...LARGE_LOGO_SIZE },
  { src: resolute, ...pos(4, 11) },
  { src: messer, ...pos(3, 12) },
  { src: kurinji, ...pos(3, 14) },
  { src: logicvalley, ...pos(5, 12) },
  { src: barani, ...pos(4, 13), ...LARGE_LOGO_SIZE },
  { src: aloft, ...pos(4, 15), ...LARGE_LOGO_SIZE },
  { src: jwmarriott, ...pos(5, 14), ...LARGE_LOGO_SIZE },
   { src: westin, ...pos(5, 16), ...LARGE_LOGO_SIZE },
   
];

// Native (unscaled) footprint of the diagonal grid — UNCHANGED
const GRID_W = 5 * COL + CARD_W;
const GRID_H = 14 * ROW + CARD_H;

// Full set for the mobile/tablet fallback grid
const CLIENTS = [
  accumed,
  amritha,
  aperta,
  resolute,
  iit,
  minuscule,
  search,
  ppts,
  space,
  deccan,
  vit,
  kalyani,
  epc,
  profit,
  royal,
  indo,
  messer,
  barani,
  asiaeo,
  courtyard,
  electraev,
  gighz,
  janatics,
  jmi,
  jwmarriott,
  logicvalley,
  mobility,
  rikun,
  salzer,
  steam,
];

// Same set used to flag the 8 logos for the mobile fallback grid too
const LARGE_LOGOS = new Set([
  amritha,
  vit,
  iit,
  jwmarriott,
  mobility,
  courtyard,
  asiaeo,
  barani,
]);

// ==========================================
// Logo Card
// ==========================================
function LogoCard({ src, x, y, delay, width, height }) {
  const imgWidth = width ?? DEFAULT_LOGO_SIZE.width;
  const imgHeight = height ?? DEFAULT_LOGO_SIZE.height;

  return (
    <motion.div
      // className="client-card absolute flex items-center justify-center rounded-none border border-slate-200 bg-white px-4 shadow-[0_4px_12px_rgba(15,23,42,0.05)]"
      className="client-card absolute flex items-center justify-center border border-[#d9d9d9] bg-white"
      // style={{ left: x, top: y, width: CARD_W, height: CARD_H }}
      style={{
  left: x,
  top: y,
  width: CARD_W,
  height: CARD_H,
  borderRadius: "0px",
  boxShadow: "none",
}}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, boxShadow: "0 8px 20px rgba(15,23,42,0.10)" }}
      transition={{ duration: 0.45, delay }}
    >
      <img
        src={src}
        alt=""
        style={{
          maxWidth: `${imgWidth}px`,
          maxHeight: `${imgHeight}px`,
          width: "auto",
          height: "auto",
        }}
        className="object-contain"
        loading="lazy"
        decoding="async"
      />
    </motion.div>
  );
}

// ==========================================
// Responsive scaling wrapper — UNCHANGED
// ==========================================
function ScaledLogoGrid() {
  const outerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    // const computeScale = () => {
    //   const availableWidth = el.offsetWidth;
    //   const nextScale = Math.min(1, availableWidth / GRID_W);
    //   setScale(nextScale);
    // };
    const computeScale = () => {
  const availableWidth = el.offsetWidth;

  let nextScale = Math.min(
    1,
    availableWidth / GRID_W
  );

  if (window.innerWidth < 768) {
    nextScale *= 0.99;
  }

  setScale(nextScale);
};

    computeScale();

    const observer = new ResizeObserver(computeScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    // <div
    //   ref={outerRef}
    //   className="relative hidden w-full max-w-[744px] lg:block"
    //   style={{ height: GRID_H * scale }}
    // >
    <div
  ref={outerRef}
  className="relative w-full max-w-[744px] mx-auto"
  style={{ height: GRID_H * scale }}
>
      <div
        className="absolute left-0 top-0"
        style={{
          width: GRID_W,
          height: GRID_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        
        {LOGO_LAYOUT.map((item, index) => (
          <LogoCard
            key={index}
            src={item.src}
            x={item.x}
            y={item.y}
            delay={index * 0.03}
            width={item.width}
            height={item.height}
          />
        ))}
      </div>
    </div>
  );
}

// ==========================================
// Component
// ==========================================
// export default function HomeClients() {
//   return (
//     <section className="relative overflow-hidden bg-[#F8F6F2] py-20">
      {/* background blocks */}
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[35%] top-0 h-full w-[170px] bg-white/25" />
        <div className="absolute left-[56%] top-20 h-[720px] w-[180px] bg-white/25" />
        <div className="absolute right-[5%] top-0 h-full w-[170px] bg-white/20" />
      </div> */}
      {/* ===== Premium SaaS background layer ===== */}
{/* <div className="home-clients-bg absolute inset-0 z-0 pointer-events-none overflow-hidden">
  <div className="hcb-panels absolute inset-0" />
  <div className="hcb-lines absolute inset-0" />
</div> */}
export default function HomeClients() {
  return (
    <section className="relative overflow-hidden bg-[#F8F6F2] py-20">
      {/* ===== Premium SaaS background layer (Sprinto-style) ===== */}
      <div className="home-clients-bg absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="hcb-beam absolute inset-0" />
        <div className="hcb-lines absolute inset-0" />
      </div>

      <div className="container-x relative z-10">
        {/* <div className="flex items-center justify-between gap-6"> */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          {/* LEFT */}
          <motion.div
            // className="w-full max-w-[420px] shrink-0 -mt-20"
            // className="w-full max-w-[420px] shrink-0 -mt-50 lg:-mt-30 lg:ml-10"
            className="w-full max-w-[420px] shrink-0 -mt-20 lg:-mt-30 lg:ml-10"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* <p className="mb-4 uppercase tracking-[0.3em] text-[11px] text-slate-500"> */}
            <p className="mb-4 uppercase tracking-[0.3em] text-[11px] lg:text-[14px] text-slate-500">
              Trusted Worldwide
            </p>

            {/* <h2 className="text-4xl font-bold leading-[1.1] text-slate-900 xl:text-5xl"> */}
            {/* <h2 className="text-5xl lg:text-6xl font-bold leading-[1.02] text-slate-900"> */}
            <h2 className="text-4xl lg:text-6xl xl:text-6xl font-bold leading-[1.08] text-slate-900">
              Trusted by
              <br />
              Leading
              <br />
              Organisations
              <br />
              Worldwide.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600">
              Hundreds of organisations trust Hawksberg International for ISO
              Consulting, Cyber Security, Risk Management, Compliance and
              Professional Training.
            </p>
          </motion.div>

          {/* RIGHT — diagonal brick grid, auto-scales to fit available space */}
          {/* <div className="min-w-0 flex-1"> */}
          <div className="min-w-0 flex flex-1 justify-center lg:justify-end">
            <ScaledLogoGrid />
          </div>
        </div>

        {/* MOBILE / TABLET fallback grid */}
        {/* <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:hidden">
          {CLIENTS.map((src, index) => {
            const isLarge = LARGE_LOGOS.has(src);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 8) * 0.04 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="flex h-20 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
              >
                <img
                  src={src}
                  alt="client logo"
                  className={
                    isLarge
                      ? "max-h-11 max-w-[100px] object-contain"
                      : "max-h-9 max-w-[90px] object-contain"
                  }
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            );
          })}
        </div> */}
      </div>
    </section>
  );
}

