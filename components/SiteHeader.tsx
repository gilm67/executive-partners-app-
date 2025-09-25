'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function SiteHeader() {
  const pathname = usePathname();
  const base = useMemo(() => (pathname?.startsWith('/en') ? '/en' : ''), [pathname]);

  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Close on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Close on Escape and focus the first control
  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const nav = [
    ['Jobs', `${base}/jobs`],
    ['Candidates', `${base}/candidates`],
    ['Hiring Managers', `${base}/hiring-managers`],
    ['BP Simulator', `${base}/bp-simulator`],
    ['Markets', `${base}/markets`],
    ['Portability', `${base}/portability`],
    ['Insights', `${base}/insights`],
    ['Contact', `${base}/contact`],
  ] as const;

  const isActive = (href: string) =>
    href !== `${base}/` && pathname?.startsWith(href);

  return (
    <header
      data-site-header
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-neutral-950/85 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60"
    >
      {/* Top bar */}
      <div className="mx-auto flex h-14 items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link
          href={base || '/en'}
          className="text-[13px] font-extrabold tracking-wide text-white"
          aria-label="Executive Partners — Home"
        >
          Executive Partners
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {nav.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={`text-sm transition ${
                isActive(href) ? 'text-white' : 'text-white/80 hover:text-white'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open ? 'true' : 'false'}
          onClick={() => setOpen(true)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/90"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
          </svg>
        </button>
      </div>

      {/* Mobile slide-over */}
      <div
        className={`fixed inset-0 z-40 md:hidden pointer-events-none ${open ? '' : 'invisible'}`}
        aria-hidden={!open}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 ease-out ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setOpen(false)}
        />

        {/* Panel */}
        <div
          role="dialog"
          aria-modal="true"
          className={`absolute inset-y-0 right-0 w-[85%] max-w-xs rounded-l-2xl border-l border-white/10 bg-neutral-950 p-5 shadow-2xl pointer-events-auto
                      transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-semibold">Menu</div>
            <button
              type="button"
              aria-label="Close menu"
              ref={closeBtnRef}
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/90"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
              </svg>
            </button>
          </div>

          <nav className="grid gap-1">
            {nav.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={`rounded-xl px-3 py-3 text-[15px] transition ${
                  isActive(href) ? 'bg-white/10 text-white' : 'text-white/90 hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}