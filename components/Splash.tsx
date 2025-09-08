"use client";

import { useEffect, useState } from "react";

/**
 * Gradient Wipe Splash
 * - Hold 3.5s (image still)
 * - 3.0s upward gradient wipe
 * - 1.8s fade out
 * Total ≈ 8.3s (luxury pace, but adjustable)
 */

const SHOWN_KEY = "ep.splash.shown";

export default function Splash() {
  const [visible, setVisible] = useState(true);
  const [wipe, setWipe] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Skip if already shown this session
    if (sessionStorage.getItem(SHOWN_KEY) === "1") {
      setVisible(false);
      return;
    }

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    if (prefersReduced) {
      setVisible(false);
      sessionStorage.setItem(SHOWN_KEY, "1");
      return;
    }

    // Timings (ms)
    const HOLD_MS = 3500;
    const WIPE_MS = 3000;
    const FADE_MS = 1800;

    const wipeTimer = window.setTimeout(() => setWipe(true), HOLD_MS);
    const hideTimer = window.setTimeout(() => setHide(true), HOLD_MS + WIPE_MS);
    const removeTimer = window.setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(SHOWN_KEY, "1");
    }, HOLD_MS + WIPE_MS + FADE_MS);

    return () => {
      clearTimeout(wipeTimer);
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={[
        "splash-base",
        "splash-gradient",
        wipe ? "splash-wipe" : "",
        hide ? "splash-hide" : "",
      ].join(" ")}
      style={{
        backgroundImage: `url(/ep-splash.png)`, // ensure in /public
      }}
    />
  );
}