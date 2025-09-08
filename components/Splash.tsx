"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * Ken Burns crossfade with mobile tuning:
 * - Desktop: longer, richer zoom
 * - Mobile: slightly shorter & gentler zoom, earlier fade
 * - Text-free
 * - Only shows once per session
 */

const SHOWN_KEY = "ep.splash.shown";

export default function Splash() {
  const [visible, setVisible] = useState(true);
  const [startZoom, setStartZoom] = useState(false);
  const [startHide, setStartHide] = useState(false);

  // Detect mobile once on mount (server-safe)
  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(max-width: 640px)").matches ?? false;
  }, []);

  // Timings (ms) — tuned per device
  const HOLD_MS   = isMobile ? 2200 : 4500; // still before zoom
  const ZOOM_MS   = isMobile ? 2200 : 4000; // ken burns duration
  const FADE_MS   = isMobile ? 1400 : 3000; // fade-out duration
  const OVERLAP   = isMobile ? 600  : 800;  // fade overlaps zoom end

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Don’t show again in the same session
    if (sessionStorage.getItem(SHOWN_KEY) === "1") {
      setVisible(false);
      return;
    }

    // Accessibility: reduce motion
    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    if (prefersReduced) {
      const t1 = window.setTimeout(() => setStartHide(true), 600);
      const t2 = window.setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem(SHOWN_KEY, "1");
      }, 1200);
      return () => { window.clearTimeout(t1); window.clearTimeout(t2); };
    }

    const tZoom = window.setTimeout(() => setStartZoom(true), HOLD_MS);
    const fadeStart = HOLD_MS + Math.max(0, ZOOM_MS - OVERLAP);
    const tHide = window.setTimeout(() => setStartHide(true), fadeStart);
    const tRemove = window.setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(SHOWN_KEY, "1");
    }, fadeStart + FADE_MS);

    return () => {
      window.clearTimeout(tZoom);
      window.clearTimeout(tHide);
      window.clearTimeout(tRemove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [HOLD_MS, ZOOM_MS, FADE_MS, OVERLAP]);

  if (!visible) return null;

  // Choose the zoom class for this device
  const zoomClass = isMobile ? "splash-zoom-mobile" : "splash-zoom-desktop";

  return (
    <div
      aria-hidden="true"
      className={[
        "splash-base",
        "splash-gradient",
        startZoom ? zoomClass : "",
        startHide ? "splash-hide" : "",
      ].join(" ")}
      style={{
        backgroundImage: `url(/ep-splash.png)`,
        // Refined crop on mobile (keeps center mass)
        backgroundPosition: isMobile ? "center center" : "center",
        // Drive durations from JS so CSS can share classes
        animationDuration: startHide
          ? `${FADE_MS}ms`
          : startZoom
          ? `${ZOOM_MS}ms`
          : undefined,
      }}
    />
  );
}