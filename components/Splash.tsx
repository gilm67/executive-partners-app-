// components/Splash.tsx
"use client";

import { useEffect, useRef, useState } from "react";

const KEY = "ep.splash.shown";

export default function Splash() {
  const [visible, setVisible] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(KEY) === "1") return;

    setVisible(true);

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    // Adjusted timings:
    // Hold blurred ~800ms, reveal, then linger sharp ~2500ms
    const HOLD = prefersReduced ? 600 : 800;     // initial blurred
    const REVEAL = prefersReduced ? 200 : 700;   // sharpen + settle
    const LINGER = prefersReduced ? 1200 : 2500; // sharp image on screen

    // start reveal (unblur/zoom settle)
    timers.current.push(window.setTimeout(() => setRevealed(true), HOLD));

    // hide + mark shown
    timers.current.push(
      window.setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem(KEY, "1");
      }, HOLD + REVEAL + LINGER)
    );

    return () => {
      timers.current.forEach((t) => clearTimeout(t));
      timers.current = [];
    };
  }, []);

  const skip = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
    setVisible(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(KEY, "1");
    }
  };

  if (!visible) return null;

  return (
    <div
      id="ep-splash"
      className={revealed ? "revealed" : ""}
      onClick={skip}
      aria-hidden
      style={{
        backgroundImage: "url(/imageep2.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}