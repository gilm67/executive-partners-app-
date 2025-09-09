"use client";

import { useEffect, useState } from "react";

const SHOWN_KEY = "ep.splash.shown";

// Tweak these two numbers to taste
const HOLD_MS = 3500;          // how long the splash sits before reveal starts
const REVEAL_MS = 2600;        // animation length (longer = slower, more luxurious)

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

    const hold = prefersReduced ? 500 : HOLD_MS;
    const revealDur = prefersReduced ? 400 : REVEAL_MS;

    const revealTimer = window.setTimeout(() => setReveal(true), hold);
    const hideTimer = window.setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(SHOWN_KEY, "1");
    }, hold + revealDur + 200); // small buffer after animation end

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
      {/* two “curtains” that animate away */}
      <div
        className={`curtain top-half ${reveal ? "slide-up" : ""}`}
        style={{ animationDuration: `${REVEAL_MS}ms` }}
      />
      <div
        className={`curtain bottom-half ${reveal ? "slide-down" : ""}`}
        style={{ animationDuration: `${REVEAL_MS}ms` }}
      />
    </div>
  );
}