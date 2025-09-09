"use client";

import { useEffect, useState } from "react";

const SHOWN_KEY = "ep.splash.shown";

export default function Splash() {
  const [visible, setVisible] = useState(true);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Don’t show twice per session
    if (sessionStorage.getItem(SHOWN_KEY) === "1") {
      setVisible(false);
      return;
    }

    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Timing (balanced: 3.5s hold, 2s reveal)
    const hold = prefersReduced ? 500 : 3500;
    const revealDuration = prefersReduced ? 400 : 2000;

    const revealTimer = window.setTimeout(() => setReveal(true), hold);
    const hideTimer = window.setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(SHOWN_KEY, "1");
    }, hold + revealDuration + 200);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[1000] pointer-events-none select-none splash-gradient split-reveal"
      style={{
        backgroundImage: "url(/ep-splash.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#0B0E13",
      }}
    >
      <div className={`curtain top-half ${reveal ? "slide-up" : ""}`} />
      <div className={`curtain bottom-half ${reveal ? "slide-down" : ""}`} />
    </div>
  );
}