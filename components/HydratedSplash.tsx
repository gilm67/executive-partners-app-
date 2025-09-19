'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function HydratedSplash() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Only run on the landing
    const isLanding = pathname === '/en' || pathname === '/';
    if (!isLanding) return;

    const KEY = 'ep:splash-shown:v1';
    try {
      if (localStorage.getItem(KEY)) return; // already shown once
    } catch {}

    setShow(true);
    const t = setTimeout(() => {
      setShow(false);
      try { localStorage.setItem(KEY, '1'); } catch {}
    }, 2200); // keep visible ~2.2s

    return () => clearTimeout(t);
  }, [pathname]);

  if (!show) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{
        backgroundImage: 'url(/imageep2.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 1,
        transition: 'opacity 800ms ease',
      }}
    />
  );
}
