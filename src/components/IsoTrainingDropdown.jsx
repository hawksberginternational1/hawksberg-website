import { useState } from "react";
import { Link } from "react-router-dom";
import { isoTrainingMenu } from "@/data/site";

export default function IsoTrainingDropdown() {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div
      className="absolute left-1/2 top-full -translate-x-1/2 pt-3 z-50"
      onMouseLeave={() => setActiveCategory(null)}
    >
      <div className="relative w-72 rounded-lg border border-gray-200 bg-white shadow-2xl">

        {isoTrainingMenu.map((category, index) => (
          <div
            key={category.title}
            className="relative"
            onMouseEnter={() => {
              if (index < 2) {
                setActiveCategory(index);
              } else {
                setActiveCategory(null);
              }
            }}
          >

            {/* FIRST 2 ITEMS - WITH SUBMENU */}
            {index < 2 ? (
              <button
                className={`flex w-full items-center justify-between px-6 py-4 text-left text-sm transition
                  ${
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
            ) : (
              /* REMAINING ITEMS - DIRECT LINK */
              <Link
                to={`/iso-training/${category.items[0].slug}`}
                className="flex w-full items-center justify-between px-6 py-4 text-left text-sm text-gray-900 hover:bg-gray-100"
              >
                <span>{category.title}</span>
              </Link>
            )}

            {/* SUBMENU ONLY FOR FIRST 2 */}
            {index < 2 && activeCategory === index && (
              <div className="absolute left-full top-0 ml-1 w-80 max-h-[70vh] overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-2xl">

                {category.items.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/iso-training/${item.slug}`}
                    className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 hover:bg-gray-100 last:border-b-0"
                  >
                    {item.label}
                  </Link>
                ))}

              </div>
            )}

          </div>
        ))}

      </div>
    </div>
  );
}