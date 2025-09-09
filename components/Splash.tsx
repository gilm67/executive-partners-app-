"use client";

import { useEffect, useState } from "react";

const SHOWN_KEY = "ep.splash.shown";

export default function Splash() {
  const [visible, setVisible] = useState(true);
  const [lift, setLift] = useState(false);

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

    // Balanced preset: 3.5s hold, 2s reveal
    const hold = prefersReduced ? 500 : 4500;
    const reveal = prefersReduced ? 400 : 2000;

    const liftTimer = window.setTimeout(() => setLift(true), hold);
    const hideTimer = window.setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(SHOWN_KEY, "1");
    }, hold + reveal + 150); // a tiny buffer after the lift

    return () => {
      window.clearTimeout(liftTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`
        fixed inset-0 z-[1000]
        pointer-events-none select-none
        splash-gradient curtain
        ${lift ? "curtain-up" : ""}
      `}
      style={{
        backgroundImage: `url(/ep-splash.png)`, // put image at /public/ep-splash.png
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#0B0E13",
      }}
    />
  );
}