'use client';

import { useEffect, useState } from 'react';

const DISPLAY_MS = 3000;   // 👈 stays fully visible for 3s
const FADE_MS = 800;       // 👈 fades out over 0.8s

export default function HydratedSplash() {
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Start fade after DISPLAY_MS
    const t1 = setTimeout(() => setFading(true), DISPLAY_MS);
    // Unmount after fade completes
    const t2 = setTimeout(() => setHidden(true), DISPLAY_MS + FADE_MS + 50);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (hidden) return null;

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        // Use your hero image as the background
        backgroundImage: 'url(/imageep2.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        // Fade via opacity
        opacity: fading ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease`,
        // Never block clicks if something goes wrong
        pointerEvents: 'none',
      }}
    >
      {/* Optional: centered logo overlay (comment out if not needed)
      <div style={{
        position: 'absolute', inset: 0, display: 'grid', placeItems: 'center'
      }}>
        <img src="/logo.svg" alt="Executive Partners" style={{ width: 180, height: 'auto' }} />
      </div>
      */}
    </div>
  );
}
