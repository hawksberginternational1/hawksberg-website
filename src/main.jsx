import React from "react";
import ReactDOM from "react-dom/client";
// import { HashRouter } from "react-router-dom"; // ✅ CHANGE THIS
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles.css";
import mainLogo from "./assets/main-logo.jpg";

// ✅ Set favicon dynamically
const setFavicon = (url) => {
  try {
    let link = document.querySelector("link[rel~='icon']");

    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }

    link.href = url;
  } catch (e) {
    // ignore
  }
};

// ✅ Create circular favicon
const setCircularFaviconFromImage = async (imgUrl) => {
  try {
    const resp = await fetch(imgUrl);

    const blob = await resp.blob();

    const reader = new FileReader();

    reader.onload = () => {
      const dataUrl = reader.result;

      const svg = `
        <svg xmlns='http://www.w3.org/2000/svg'
             width='64'
             height='64'
             viewBox='0 0 64 64'>

          <defs>
            <clipPath id='c'>
              <circle cx='32' cy='32' r='32'/>
            </clipPath>
          </defs>

          <image
            href='${dataUrl}'
            x='0'
            y='0'
            width='64'
            height='64'
            preserveAspectRatio='xMidYMid slice'
            clip-path='url(#c)'
          />
        </svg>
      `;

      const url =
        "data:image/svg+xml;utf8," + encodeURIComponent(svg);

      setFavicon(url);
    };

    reader.onerror = () => setFavicon(imgUrl);

    reader.readAsDataURL(blob);

  } catch (e) {
    setFavicon(imgUrl);
  }
};

setCircularFaviconFromImage(mainLogo);

// ✅ ROOT RENDER
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    {/* ✅ USE BROWSER ROUTER */}
    <BrowserRouter>
      <App />
    </BrowserRouter>

  </React.StrictMode>
);