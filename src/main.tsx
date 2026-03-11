import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import UpcomingSeries from "./pages/UpcomingSeries.tsx";
import CaseStudies from "./pages/CaseStudies.tsx";
import CanvasHQ from "./pages/CanvasHQ.tsx";
import "./index.css";

// Prevent browser from restoring mid-page scroll position on refresh.
// Without this, the browser repositions the page AFTER GSAP initializes,
// causing ScrollTrigger to calculate all trigger points from wrong scroll offsets.
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/upcoming-series" element={<UpcomingSeries />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/canvas-hq" element={<CanvasHQ />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
