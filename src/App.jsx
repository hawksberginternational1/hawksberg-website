import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import ServiceDetail from "./pages/ServiceDetail.jsx";
import TrainingDetail from "./pages/TrainingDetail.jsx";
import IsoTrainingDetail from "./pages/IsoTrainingDetail.jsx";
import InfoPageDetail from "./pages/InfoPageDetail.jsx";
import NotFound from "./pages/NotFound.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/training/:slug" element={<TrainingDetail />} />
        <Route path="/iso-training/:slug" element={<IsoTrainingDetail />} />
        <Route path="/info/:slug" element={<InfoPageDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
