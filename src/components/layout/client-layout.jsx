"use client";

import "lenis/dist/lenis.css";

import { useEffect, useState } from "react";
import { ReactLenis, useLenis } from "lenis/react";

import { shouldShowPreloader } from "@/lib/preloader";

const MOBILE_BREAKPOINT = 1000;

const LENIS_SHARED = {
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smooth: true,
  infinite: false,
  wheelMultiplier: 1,
  orientation: "vertical",
  smoothWheel: true,
  syncTouch: true,
};

const LENIS_MOBILE = {
  ...LENIS_SHARED,
  duration: 0.8,
  smoothTouch: true,
  touchMultiplier: 1.5,
  lerp: 0.09,
};

const LENIS_DESKTOP = {
  ...LENIS_SHARED,
  duration: 1.2,
  smoothTouch: false,
  touchMultiplier: 2,
  lerp: 0.1,
};

function LenisGate() {
  const lenis = useLenis();

  // Controla apenas o estado inicial do preloader na primeira entrada do site,
  // sem interferir nas trocas de página posteriores.
  useEffect(() => {
    if (!lenis) return;

    if (window.location.pathname !== "/" || !shouldShowPreloader()) {
      lenis.start();
    } else {
      lenis.stop();
    }
  }, [lenis]);

  return null;
}

export default function ClientLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () =>
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const lenisOptions = isMobile ? LENIS_MOBILE : LENIS_DESKTOP;

  return (
    <ReactLenis root options={lenisOptions}>
      <LenisGate />
      {children}
    </ReactLenis>
  );
}
