"use client";

import { useEffect, useRef, useState } from "react";

const KEY = "ep.splash.shown";

function getQueryFlag(name: string) {
  if (typeof window === "undefined") return null;
  const v = new URLSearchParams(window.location.search).get(name);
  return v === "" ? true : v === "1" || v === "true";
}

export default function Splash() {
  // Hydration-safe gating
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    // ---- URL overrides (for quick testing) ----
    const forceOn  = getQueryFlag("splash");     // ?splash=1
    const forceOff = getQueryFlag("nosplash");   // ?nosplash=1
    if (forceOff) return;

    // Desktop only (unless forced on)
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    if (!forceOn && isMobile) return;

    // Only once per session (unless forced on)
    if (!forceOn && sessionStorage.getItem(KEY) === "1") return;

    setVisible(true);

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    // —— Timings tuned for desktop “premium” feel ——
    // 1) brief soft hold (blurred), 2) reveal, 3) linger sharp
    const HOLD   = prefersReduced ? 400 : 600;
    const REVEAL = prefersReduced ? 200 : 700;
    const LINGER = prefersReduced ? 400 : 1200;

    timers.current.push(window.setTimeout(() => setReveal(true), HOLD));
    timers.current.push(
      window.setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem(KEY, "1");
      }, HOLD + REVEAL + LINGER)
    );

    function setReveal(v: boolean) {
      setRevealed(v);
    }

    return () => {
      timers.current.forEach((t) => clearTimeout(t));
      timers.current = [];
    };
  }, [mounted]);

  // Click to skip (desktop)
  const skip = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
    setVisible(false);
    if (typeof window !== "undefined") sessionStorage.setItem(KEY, "1");
  };

  if (!mounted || !visible) return null;

  // Background image & animation are controlled in CSS (#ep-splash)
  return (
    <div
      id="ep-splash"
      className={revealed ? "revealed" : ""}
      onClick={skip}
      aria-hidden
    />
  );
}