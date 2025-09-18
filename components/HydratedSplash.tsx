'use client';

import { useEffect, useState } from 'react';

export default function HydratedSplash() {
  const [hidden, setHidden] = useState(false);

  // Auto-hide splash after 1.6s (fail-safe)
  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 1600);
    return () => clearTimeout(timer);
  }, []);

  if (hidden) return null;

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0B0E13', // brand background
        display: 'grid',
        placeItems: 'center',
        opacity: 1,
        transition: 'opacity 600ms ease',
        pointerEvents: 'none', // never block clicks
      }}
      className={hidden ? 'opacity-0' : undefined}
    >
      <img
        src="/logo.svg"
        alt="Executive Partners"
        style={{ width: 180, height: 'auto' }}
      />
    </div>
  );
}
