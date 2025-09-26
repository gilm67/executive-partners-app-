"use client";

import { useEffect, useRef, useState } from "react";

const KEY = "ep.splash.shown";

export default function Splash() {
  // Hydration-safe: decide visibility after mount
  const [visible, setVisible] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // show every page load while testing (uncomment next line to force-show)
    // sessionStorage.removeItem(KEY);

    if (sessionStorage.getItem(KEY) === "1") return;

    setVisible(true);

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    // timings: hold blurred, reveal to sharp, then linger sharp
    const HOLD   = prefersReduced ? 600 : 1200;  // blur hold
    const REVEAL = prefersReduced ? 400 : 900;   // blur -> sharp transition
    const LINGER = prefersReduced ? 800 : 2500;  // sharp linger (you asked 2.5s)

    timers.current.push(window.setTimeout(() => setRevealed(true), HOLD));
    timers.current.push(
      window.setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem(KEY, "1");
      }, HOLD + REVEAL + LINGER)
    );

    return () => {
      timers.current.forEach(t => clearTimeout(t));
      timers.current = [];
    };
  }, []);

  const skip = () => {
    timers.current.forEach(t => clearTimeout(t));
    timers.current = [];
    setVisible(false);
    sessionStorage.setItem(KEY, "1");
  };

  if (!visible) return null;

  return (
    <div id="ep-splash" className={revealed ? "revealed" : ""} onClick={skip} aria-hidden>
      {/* sharp base image */}
      <img src="/imageep2.png" alt="" className="base" draggable={false} />
      {/* blurred overlay that fades out */}
      <img src="/imageep2.png" alt="" className="blur" draggable={false} />
    </div>
  );
}