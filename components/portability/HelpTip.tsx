// components/portability/HelpTip.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

export default function HelpTip({ content }: { content: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click / ESC
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        aria-label="More info"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="h-5 w-5 rounded-full border border-white/20 text-xs leading-5 text-white/80 hover:text-white hover:border-white/40 flex items-center justify-center"
      >
        i
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="false"
          className="
            absolute left-0 top-7 z-[9999]
            w-[min(90vw,28rem)]
            rounded-lg border border-white/15
            bg-black/90 backdrop-blur
            p-3 shadow-2xl
            text-xs text-white/90
            whitespace-normal leading-snug
          "
        >
          {content}
        </div>
      )}
    </div>
  );
}