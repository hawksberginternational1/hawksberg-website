import { useState } from "react";
// import { Link } from "react-router-dom";
// import { courseMenu } from "@/data/site";
// import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { courseMenu } from "@/data/site";

export default function CourseDropdown() {
  const [activeCategory, setActiveCategory] = useState(null);
  

  return (
    <div
      className="absolute left-1/2 top-full -translate-x-1/2 pt-3 z-50"
      onMouseLeave={() => setActiveCategory(null)}
    >
      {/* <div className="relative w-64 rounded-lg border border-gray-200 bg-white shadow-2xl"> */}
      <div className="relative w-46 rounded-lg border border-gray-200 bg-white shadow-2xl">

        {courseMenu.map((category, index) => (
          <div
            key={category.title}
            className="relative"
            onMouseEnter={() => setActiveCategory(index)}
          >
            <button
              className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition
                ${
                //   activeCategory === index
                //     ? "bg-gray-100 text-black"
                //     : "hover:bg-gray-50"
                activeCategory === index
  ? "bg-[#D8A43C] text-white"
  : "bg-white text-gray-900 hover:bg-gray-100"
                }`}
            >
              <span>{category.title}</span>
              <span className="text-[10px] text-gray-400 ml-3">
   ›
</span>
            </button>

          {activeCategory === index && (
//   <div className="absolute left-full top-0 ml-1 w-80 rounded-lg border border-gray-200 bg-white shadow-2xl">
 <div className="absolute left-full top-0 ml-1 w-72 max-h-[70vh] overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-2xl">

    {category.items.map((item) => (
      <Link
        key={item.slug}
        to={`/course/${item.slug}`}
        className="block border-b border-gray-100 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 last:border-b-0"
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