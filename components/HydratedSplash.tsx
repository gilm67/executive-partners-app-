'use client';
import { useEffect, useState } from 'react';

export default function HydratedSplash() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      const seen = localStorage.getItem('epSplashSeen');
      if (seen === '1') return;               // already shown once → never show again
      setVisible(true);
      const t = setTimeout(() => {
        setVisible(false);
        localStorage.setItem('epSplashSeen', '1');
      }, 1200); // keep short; just a branded reveal
      return () => clearTimeout(t);
    } catch {
      // fail open: if storage blocked, still just show once this session
      setVisible(false);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[60] opacity-100 pointer-events-none"
      style={{
        backgroundImage: 'url(/imageep2.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'opacity 800ms ease',
      }}
    />
  );
}
