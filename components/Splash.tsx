"use client";

import { useEffect, useState } from "react";

const SHOWN_KEY = "ep.splash.shown";

export default function Splash() {
  const [visible, setVisible] = useState(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Skip if already shown in this session
    if (sessionStorage.getItem(SHOWN_KEY) === "1") {
      setVisible(false);
      return;
    }

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    // Balanced: 3.5s hold, then ~2s Ken Burns crossfade
    const holdMs = prefersReduced ? 500 : 3500;
    const animMs = prefersReduced ? 200 : 2000;

    const fadeTimer = window.setTimeout(() => setAnimate(true), holdMs);
    const hideTimer = window.setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(SHOWN_KEY, "1");
    }, holdMs + animMs);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[1000] pointer-events-none select-none splash-gradient kenburns ${
        animate ? "anim" : ""
      }`}
      style={{
        backgroundImage: "url(/ep-splash.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#0B0E13",
        transitionProperty: "transform, opacity",
      }}
    />
  );
}