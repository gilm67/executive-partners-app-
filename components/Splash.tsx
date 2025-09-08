"use client";

import { useEffect, useState } from "react";

export default function Splash() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const key = "ep.splash.shown";
    if (typeof window === "undefined") return;

    if (sessionStorage.getItem(key) === "1") {
      setShow(false);
      return;
    }

    const t = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem(key, "1");
    }, 2200);

    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] transition-opacity duration-700"
      style={{
        backgroundImage: "url(/ep-splash.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
            Executive Partners
          </h1>
          <p className="mt-3 text-base md:text-lg text-white/90">
            Innovative Talent Solutions for Private Banking &amp; Wealth Management
          </p>
        </div>
      </div>
    </div>
  );
}
