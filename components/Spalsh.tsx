'use client';

import { useEffect, useState } from 'react';

const KEY = 'ep:splash:v2';

export default function Splash() {
  const [show, setShow] = useState(false);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    // Skip if we've already shown it or user prefers reduced motion
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const seen = typeof window !== 'undefined' && sessionStorage.getItem(KEY) === 'done';
    if (seen || prefersReduced) return; // don’t render splash

    setShow(true);
    // Lock scroll while splash is visible
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Auto hide after a short moment
    const SHOW_MS = 2600; // sweet spot
    const t1 = setTimeout(() => setHiding(true), SHOW_MS);
    const t2 = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem(KEY, 'done');
      document.body.style.overflow = prevOverflow;
    }, SHOW_MS + 550); // let fade finish

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Intro"
      className={`ep-splash ${hiding ? 'ep-splash--hide' : ''}`}
      style={{ backgroundImage: "url('/imageep2.png')" }}
      onClick={() => setHiding(true)} // tap to skip faster
    >
      {/* Subtle foreground copy (optional) */}
      <div className="ep-splash__center">
        <div className="ep-chip">Private Banking &amp; Wealth Management</div>
        <h1 className="ep-splash__title">Executive Partners</h1>
      </div>
    </div>
  );
}