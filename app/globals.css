"use client";

import { useEffect, useState } from "react";

const SHOWN_KEY = "ep.splash.shown";

/**
 * Glass Pane Lift:
 * - Fullscreen splash with your /ep-splash.png as the background.
 * - A frosted "glass" overlay lifts upward (bottom -> top), revealing the site.
 * - Shows once per session.
 */
export default function Splash() {
  const [visible, setVisible] = useState(true);
  const [lift, setLift] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Already shown this session? Skip.
    if (sessionStorage.getItem(SHOWN_KEY) === "1") {
      setVisible(false);
      return;
    }

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    // Slightly shorter timings on small screens
    const isMobile = window.innerWidth < 768;

    // Timings (ms)
    const delay = prefersReduced ? 600 : isMobile ? 2200 : 3000;   // hold splash before lift
    const duration = prefersReduced ? 300 : isMobile ? 1400 : 2200; // lift duration
    const buffer = 300; // small buffer after lift to remove node

    const liftTimer = window.setTimeout(() => setLift(true), delay);
    const hideTimer = window.setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(SHOWN_KEY, "1");
    }, delay + duration + buffer);

    return () => {
      window.clearTimeout(liftTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="
        fixed inset-0 z-[1000]
        pointer-events-none select-none
      "
      style={{
        backgroundImage: `url(/ep-splash.png)`, // ensure this exists in /public
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#0B0E13",
      }}
    >
      {/* The frosted glass pane that lifts away */}
      <div className={`glass-pane glass-anim ${lift ? "lifted" : ""}`} />
    </div>
  );
}