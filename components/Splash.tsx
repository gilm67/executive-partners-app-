// components/Splash.tsx
"use client";

import { useEffect, useState } from "react";

const SHOWN_KEY = "ep.splash.shown";

export default function Splash() {
  const [visible, setVisible] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Don’t show twice per session
    if (sessionStorage.getItem(SHOWN_KEY) === "1") {
      setVisible(false);
      return;
    }

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    // Balanced: 3.5s hold, 2s reveal, 1.5s linger clear
    const hold = prefersReduced ? 500 : 3500;
    const revealDuration = prefersReduced ? 400 : 2000;
    const linger = prefersReduced ? 0 : 1500;

    // Trigger deblur
    const t1 = window.setTimeout(() => setReveal(true), hold);

    // Start fade-out
    const t2 = window.setTimeout(() => setExiting(true), hold + revealDuration + linger);

    // Fully remove
    const t3 = window.setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(SHOWN_KEY, "1");
    }, hold + revealDuration + linger + 1000); // allow 1s fade-out

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[1000] pointer-events-none select-none splash-gradient cinematic-rise
        ${reveal ? "revealed" : ""} ${exiting ? "exiting" : ""}`}
      style={{
        backgroundImage: "url(/ep-splash.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#0B0E13",
      }}
    />
  );
}