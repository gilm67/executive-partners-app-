'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function HydratedSplash() {
  // Enable only when you explicitly set NEXT_PUBLIC_ENABLE_SPLASH=1
  const ENABLED = process.env.NEXT_PUBLIC_ENABLE_SPLASH === '1';
  if (!ENABLED) return null;

  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);   // controls render/unmount
  const [visible, setVisible] = useState(false);   // controls opacity only
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const unmountTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Normalize: treat "/" and "/en" (with/without trailing slash) as landing.
  const isLanding = useMemo(() => {
    const p = (pathname || '').replace(/\/+$/, '');
    return p === '' || p === '/en';
  }, [pathname]);

  useEffect(() => {
    if (!isLanding) return;

    // Only show once per browser (until storage cleared)
    const KEY = 'ep:splash-shown:v1';
    try {
      if (localStorage.getItem(KEY)) return;
    } catch { /* ignore */ }

    // mount + fade in (next tick)
    setMounted(true);
    const raf = requestAnimationFrame(() => setVisible(true));

    // Keep visible briefly, then fade out
    hideTimer.current = setTimeout(() => {
      setVisible(false); // triggers CSS opacity transition
      try { localStorage.setItem(KEY, '1'); } catch { /* ignore */ }

      // Unmount after the fade duration (keep in sync with transition below)
      unmountTimer.current = setTimeout(() => setMounted(false), 600);
    }, 1200); // visible duration before fade (tweak to taste)

    return () => {
      cancelAnimationFrame(raf);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      if (unmountTimer.current) clearTimeout(unmountTimer.current);
    };
  }, [isLanding]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{
        background:
          'linear-gradient(180deg, rgba(10,10,12,1) 0%, rgba(16,16,20,0.96) 40%, rgba(0,0,0,0.92) 100%)',
        transition: 'opacity 600ms ease',
        opacity: visible ? 1 : 0,
      }}
    />
  );
}