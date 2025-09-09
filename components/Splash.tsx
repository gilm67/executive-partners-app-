"use client";

import { useEffect, useState } from "react";

const SHOWN_KEY = "ep.splash.shown";
const HOLD_MS = 3500;   // wait before reveal (adjust here)
const REVEAL_MS = 2600; // animation length (slows near end)

export default function Splash() {
  const [visible, setVisible] = useState(true);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (sessionStorage.getItem(SHOWN_KEY) === "1") {
      setVisible(false);
      return;
    }

    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const hold = prefersReduced ? 500 : HOLD_MS;
    const revealDur = prefersReduced ? 400 : REVEAL_MS;

    const t1 = window.setTimeout(() => setReveal(true), hold);
    const t2 = window.setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(SHOWN_KEY, "1");
    }, hold + revealDur + 200);

    return () => { window.clearTimeout(t1); window.clearTimeout(t2); };
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
      <div className="curtain top-half" style={{ animationDuration: `${REVEAL_MS}ms` }} {...(reveal && { className: "curtain top-half slide-up" })} />
      <div className="curtain bottom-half" style={{ animationDuration: `${REVEAL_MS}ms` }} {...(reveal && { className: "curtain bottom-half slide-down" })} />
    </div>
  );
}