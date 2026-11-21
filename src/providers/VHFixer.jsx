"use client";

import { useEffect } from "react";

export default function VHFix() {
  useEffect(() => {
    const fixVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    fixVH();
    window.addEventListener("resize", fixVH);

    return () => window.removeEventListener("resize", fixVH);
  }, []);

  return null;
}
