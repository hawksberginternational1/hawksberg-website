// "use client";
// import Header from "./Header";
// import Footer from "./Footer";
// import WhatsAppFloat from "./WhatsAppFloat";
// import { usePathname } from "next/navigation";

// export default function Layout({ children }) {
//   const { pathname } = useLocation();
//   return (
//     <div className="flex min-h-screen flex-col">
//       <Header />
//       {/* <main className="flex-1">{children}</main> */}
//       {/* <main
//   className={`flex-1 ${
//     window.location.pathname === "/" ? "" : "pt-[112px]"
//   }`}
// > */}
// {/* <main
//   className={`flex-1 ${
//     window.location.pathname === "/"
//       ? ""
//       : "pt-[60px] lg:pt-[112px]"
//   }`}
// > */}
// <main
//   className={`flex-1 ${
//     pathname === "/"
//       ? ""
//       : "pt-[60px] lg:pt-[112px]"
//   }`}
// >
//   {children}
// </main>
//       <Footer />
//       <WhatsAppFloat />
//     </div>
//   );
// }

"use client";

import Header from "./Header";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";
import FreeTrainingFloat from "./FreeTrainingFloat";
import { usePathname } from "next/navigation";

export default function Layout({ children, hideFooter = false }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main
        className={`flex-1 ${
          pathname === "/" ? "" : "pt-[60px] lg:pt-[112px]"
        }`}
      >
        {children}
      </main>

      {!hideFooter && <Footer />}
      {pathname === "/" && <FreeTrainingFloat />}
      <WhatsAppFloat />
    </div>
  );
}