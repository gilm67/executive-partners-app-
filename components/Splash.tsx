"use client";

import { useEffect, useState } from "react";

const SHOWN_KEY = "ep.splash.shown";

export default function Splash() {
  const [visible, setVisible] = useState(true);
  const [lift, setLift] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Only show once per session
    if (sessionStorage.getItem(SHOWN_KEY) === "1") {
      setVisible(false);
      return;
    }

    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Timing (you said slow it down + nicer on mobile):
    // Desktop: 3.5s delay, 2.5s lift
    // Mobile:  4.5s delay, 3.0s lift
    const delay = prefersReduced ? 400 : isMobile ? 4500 : 3500;
    const total = prefersReduced ? 800 : isMobile ? 4500 + 3000 : 3500 + 2500;

    const t1 = window.setTimeout(() => setLift(true), delay);
    const t2 = window.setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(SHOWN_KEY, "1");
    }, total);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[1000] pointer-events-none select-none splash-gradient"
      style={{
        backgroundImage: "url(/ep-splash.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#0B0E13",
      }}
    >
      <div className={`glass-lift-overlay ${lift ? "lifted" : ""}`} />
    </div>
  );
}