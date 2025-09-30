"use client";

import { useEffect, useRef, useState } from "react";

const KEY = "ep.splash.shown";

function getQueryFlag(name: string) {
  if (typeof window === "undefined") return null;
  const v = new URLSearchParams(window.location.search).get(name);
  return v === "" ? true : v === "1" || v === "true";
}

export default function Splash() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    // ---- URL overrides ----
    const forceOn = getQueryFlag("splash");    // ?splash=1
    const forceOff = getQueryFlag("nosplash"); // ?nosplash=1
    if (forceOff) return;

    // 🚨 Desktop only (unless forced on)
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    if (!forceOn && isMobile) return; // <- prevents splash on mobile

    // Only once per session (unless forced on)
    if (!forceOn && sessionStorage.getItem(KEY) === "1") return;

    setVisible(true);

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    // —— Timings ——
    const HOLD = prefersReduced ? 400 : 600;
    const REVEAL = prefersReduced ? 200 : 700;
    const LINGER = prefersReduced ? 400 : 1200;

    timers.current.push(
      window.setTimeout(() => setRevealed(true), HOLD)
    );
    timers.current.push(
      window.setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem(KEY, "1");
      }, HOLD + REVEAL + LINGER)
    );

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        skip();
      }
    }
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      timers.current.forEach((t) => clearTimeout(t));
      timers.current = [];
    };
  }, [mounted]);

  // Skip immediately
  const skip = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
    setVisible(false);
    if (typeof window !== "undefined") sessionStorage.setItem(KEY, "1");
  };

  // 🚨 If not visible or mobile, render nothing
  if (!mounted || !visible) return null;

  return (
    <div
      id="ep-splash"
      className={revealed ? "revealed hidden lg:block" : "hidden lg:block"}
      onClick={skip}
      role="button"
      aria-label="Skip intro splash"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " " || e.key === "Escape") skip();
      }}
    />
  );
}