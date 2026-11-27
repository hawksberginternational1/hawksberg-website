"use client";

import Link from "next/link";
import Image from "next/image";

export default function FreeTrainingFloat() {
  return (
    <Link
      href="/free-training/iso-9001-2026-online-workshop"
      aria-label="Free ISO 9001:2026 training course"
      className="fixed bottom-[94px] right-3 z-40 block w-[150px] max-w-[calc(100vw-24px)] overflow-hidden rounded-xl shadow-[0_12px_30px_rgba(37,5,47,0.28)] transition-transform hover:-translate-y-0.5 sm:right-6 sm:w-[260px]"
    >
      <Image
        src="/free-iso-9001-2026-training-banner.png"
        alt="HAWKSBERG INTERNATIONAL Free Online ISO 9001:2026 Training Day"
        width={852}
        height={851}
        sizes="(max-width: 640px) 220px, 260px"
        style={{ width: "100%", height: "auto", objectFit: "contain" }}
        priority
      />
    </Link>
  );
}
