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

    // Mark html with mobile/desktop so CSS can pick the right image
    const isMobile = window.matchMedia?.("(max-width: 640px)").matches ?? false;
    document.documentElement.setAttribute("data-ep-splash", isMobile ? "mobile" : "desktop");

    // If you add ?splash=1 to the URL, always show the splash (handy for testing on phone)
    const force = new URLSearchParams(window.location.search).get("splash") === "1";

    // Only show once per session unless forced
    if (!force && sessionStorage.getItem(KEY) === "1") return;

    setVisible(true);

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const HOLD   = prefersReduced ? 600  : 800;   // initial moment
    const REVEAL = prefersReduced ? 200  : 700;   // unblur/settle
    const LINGER = prefersReduced ? 1200 : 2500;  // crisp on screen

    timers.current.push(window.setTimeout(() => setRevealed(true), HOLD));
    timers.current.push(
      window.setTimeout(() => {
        setVisible(false);
        if (!force) sessionStorage.setItem(KEY, "1");
      }, HOLD + REVEAL + LINGER)
    );

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  const skip = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setVisible(false);
    sessionStorage.setItem(KEY, "1");
  };

  if (!visible) return null;

  return (
    <div
      id="ep-splash"
      className={revealed ? "revealed" : ""}
      onClick={skip}
      aria-hidden
    />
  );
}
