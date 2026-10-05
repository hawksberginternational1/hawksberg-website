"use client";

import { useState } from "react";
import Link from "next/link";

export default function IsoTrainingDropdown() {
  const [activeCategory, setActiveCategory] = useState(null);

  const leadAuditor = [
    {
      label: "ISO 9001 Lead Auditor Training",
      to: "/iso-training/iso-9001-lead-auditor",
    },
    {
      label: "ISO 9001:2026 Lead Auditor Training",
      to: "/iso-training/iso-9001-2026-lead-auditor",
    },
    {
      label: "ISO 27001 Lead Auditor Training",
      to: "/iso-training/iso-27001-lead-auditor",
    },
    {
      label: "ISO 45001 Lead Auditor Training",
      to: "/iso-training/iso-45001-lead-auditor",
    },
    {
      label: "ISO 22301 Lead Auditor Training",
      to: "/iso-training/iso-22301-lead-auditor",
    },
    {
      label: "ISO 22000 Lead Auditor Training",
      to: "/iso-training/iso-22000-lead-auditor",
    },
    {
      label: "ISO 14001 Lead Auditor Training",
      to: "/iso-training/iso-14001-lead-auditor",
    },
    {
      label: "ISO 13485 Lead Auditor Training",
      to: "/iso-training/iso-13485-lead-auditor",
    },
    {
      label: "ISO 50001 Lead Auditor Training",
      to: "/iso-training/iso-50001-lead-auditor",
    },
    {
      label: "ISO 17025 Lead Auditor Training",
      to: "/iso-training/iso-17025-lead-auditor",
    },
    {
      label: "ISO 15189 Lead Auditor Training",
      to: "/iso-training/iso-15189-lead-auditor",
    },
    {
      label: "FSSC 22000 Lead Auditor Training",
      to: "/iso-training/fssc-22000-lead-auditor",
    },
  ];

  const internalAuditor = [
    {
      label: "ISO 13485 Internal Auditor Training",
      to: "/iso-training/iso-13485-internal-auditor",
    },
    {
      label: "ISO 14001 Internal Auditor Training",
      to: "/iso-training/iso-14001-internal-auditor",
    },
    {
      label: "ISO 27001 Internal Auditor Training",
      to: "/iso-training/iso-27001-internal-auditor",
    },
    {
      label: "ISO 50001 Internal Auditor Training",
      to: "/iso-training/iso-50001-internal-auditor",
    },
    {
      label: "ISO 45001 Internal Auditor Training",
      to: "/iso-training/iso-45001-internal-auditor",
    },
    {
      label: "ISO 9001 Internal Auditor Training",
      to: "/iso-training/iso-9001-internal-auditor",
    },
    {
      label: "ISO 9001:2026 Internal Auditor Training",
      to: "/iso-training/iso-9001-2026-internal-auditor",
    },
    {
      label: "ISO 22000 Internal Auditor Training",
      to: "/iso-training/iso-22000-internal-auditor",
    },
    {
      label: "ISO 22301 Internal Auditor Training",
      to: "/iso-training/iso-22301-internal-auditor",
    },
    {
      label: "ISO 17025 Internal Auditor Training",
      to: "/iso-training/iso-17025-internal-auditor",
    },
    {
      label: "ISO 15189 Internal Auditor Training",
      to: "/iso-training/iso-15189-internal-auditor",
    },
    {
      label: "IATF 16949 Internal Auditor Training",
      to: "/iso-training/iatf-16949-internal-auditor",
    },
    {
      label: "ISO 31000 Internal Auditor Training",
      to: "/iso-training/iso-31000-internal-auditor",
    },
  ];

  const categories = [
    {
      title: "ISO Lead Auditor Training",
      items: leadAuditor,
    },
    {
      title: "ISO Internal Auditor Training",
      items: internalAuditor,
    },
  ];

  return (
    <div
      className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
      onMouseLeave={() => setActiveCategory(null)}
    >
      <div className="relative w-72 rounded-lg border border-gray-200 bg-white shadow-2xl">
        {/* Lead + Internal Auditor */}
        {categories.map((category, index) => (
          <div
            key={category.title}
            className="relative"
            onMouseEnter={() => setActiveCategory(index)}
          >
            <button
              type="button"
              className={`flex w-full items-center justify-between px-6 py-4 text-left text-sm transition ${
                activeCategory === index
                  ? "bg-[#D8A43C] text-white"
                  : "bg-white text-gray-900 hover:bg-gray-100"
              }`}
            >
              <span>{category.title}</span>

              <span
                className={`ml-3 text-lg ${
                  activeCategory === index
                    ? "text-white"
                    : "text-gray-400"
                }`}
              >
                ›
              </span>
            </button>

            {activeCategory === index && (
              <div className="absolute left-full top-0 ml-1 max-h-[70vh] w-80 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-2xl">
                {category.items.map((item) => (
                  <Link
                    key={item.to}
                    href={item.to}
                    className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 hover:bg-gray-100 last:border-b-0"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* ISO Foundation */}
        <Link
          href="/iso-training/iso-foundation"
          className="flex w-full items-center px-6 py-4 text-left text-sm text-gray-900 hover:bg-gray-100"
        >
          ISO Foundation
        </Link>

        {/* ISO 31000 */}
        <Link
          href="/iso-training/iso-31000-risk-management"
          className="flex w-full items-center px-6 py-4 text-left text-sm text-gray-900 hover:bg-gray-100"
        >
          ISO 31000 Risk Management
        </Link>

        {/* Online ISO Training */}
        <Link
          href="/iso-training/online-iso-training"
          className="flex w-full items-center px-6 py-4 text-left text-sm text-gray-900 hover:bg-gray-100"
        >
          Online ISO Training
        </Link>
      </div>
    </div>
  );
}