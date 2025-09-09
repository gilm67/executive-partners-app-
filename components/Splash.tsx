"use client";

import { useEffect, useState } from "react";

const SHOWN_KEY = "ep.splash.shown";

export default function Splash() {
  const [visible, setVisible] = useState(true);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Don’t show twice per session
    if (sessionStorage.getItem(SHOWN_KEY) === "1") {
      setVisible(false);
      return;
    }

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    // Balanced timing: 3.5s hold (image visible but blurred/offset),
    // then 2s reveal, then 1.5s linger after it’s sharp (from your last request).
    const hold = prefersReduced ? 500 : 3500;
    const revealDuration = prefersReduced ? 400 : 2000;
    const lingerExtra = prefersReduced ? 300 : 1500;

    const t1 = window.setTimeout(() => setReveal(true), hold);
    const t2 = window.setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(SHOWN_KEY, "1");
    }, hold + revealDuration + lingerExtra);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`splash-root splash-gradient cinematic-rise ${reveal ? "revealed" : ""}`}
    >
      {/* Image element lets us control mobile fit without touching desktop */}
      <img
        src="/ep-splash.png"
        alt=""
        className="splash-img"
        draggable={false}
      />
    </div>
  );
}