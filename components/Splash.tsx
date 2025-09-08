"use client";

import { useEffect, useState } from "react";

/**
 * Ken Burns crossfade — slower, text-free.
 * - 4.5s hold (image still)
 * - 4.0s gentle zoom (Ken Burns)
 * - 3.0s fade to homepage
 * Total ≈ 7.5s. Only shows once per session.
 */

const SHOWN_KEY = "ep.splash.shown";

// timings (ms)
const HOLD_MS = 4500;     // still image before animation
const ZOOM_MS = 4000;     // ken burns zoom duration
const FADE_MS = 3000;     // fade-out duration
const OVERLAP_MS = 800;   // start fade slightly before zoom ends

export default function Splash() {
  const [visible, setVisible] = useState(true);
  const [zoom, setZoom] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Don’t show again in the same session
    if (sessionStorage.getItem(SHOWN_KEY) === "1") {
      setVisible(false);
      return;
    }

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    if (prefersReduced) {
      // Short, accessibility-friendly version
      const t1 = window.setTimeout(() => setHide(true), 600);
      const t2 = window.setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem(SHOWN_KEY, "1");
      }, 1200);
      return () => {
        window.clearTimeout(t1);
        window.clearTimeout(t2);
      };
    }

    // Start zoom after the hold
    const zoomTimer = window.setTimeout(() => setZoom(true), HOLD_MS);

    // Start fade slightly before zoom ends
    const fadeStart = HOLD_MS + Math.max(0, ZOOM_MS - OVERLAP_MS);
    const hideTimer = window.setTimeout(() => setHide(true), fadeStart);

    // Fully remove after fade completes
    const removeTimer = window.setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(SHOWN_KEY, "1");
    }, fadeStart + FADE_MS);

    return () => {
      window.clearTimeout(zoomTimer);
      window.clearTimeout(hideTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={[
        "splash-base",
        "splash-gradient",      // optional depth overlay
        zoom ? "splash-zoom" : "",
        hide ? "splash-hide" : "",
      ].join(" ")}
      style={{
        backgroundImage: `url(/ep-splash.png)`, // ensure this file exists in /public
      }}
    />
  );
}