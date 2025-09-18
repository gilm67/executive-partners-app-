'use client';

import { useEffect, useState } from 'react';

// Use the image that exists in /public
const BG_IMAGE = '/imageep2.png';   // <-- your file
const HIDE_AFTER_MS = 1300;         // auto-hide after ~1.3s

export default function HydratedSplash() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHidden(true), HIDE_AFTER_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[9999] transition-opacity duration-700 ${hidden ? 'opacity-0 pointer-events-none' : ''}`}
      style={{
        background: '#0B0E13',               // fallback brand color
        backgroundImage: `url(${BG_IMAGE})`, // your image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
}
