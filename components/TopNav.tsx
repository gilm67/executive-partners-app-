// components/TopNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type NavItem = { href: string; label: string; external?: boolean };

const NAV: NavItem[] = [
  { href: "/jobs", label: "Jobs" },
  { href: "/candidates", label: "Candidates" },
  { href: "/hiring-managers", label: "Hiring Managers" },
  { href: "/bp-simulator", label: "BP Simulator" },
  { href: "/markets", label: "Markets" },
  { href: "/portability", label: "Portability" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function TopNav() {
  const pathname = usePathname();
  const base = pathname?.startsWith("/en") ? "/en" : "";
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Lock scroll when mobile menu is open (and unlock on cleanup)
  useEffect(() => {
    if (open) {
      const prevHtml = document.documentElement.style.overflow;
      const prevBody = document.body.style.overflow;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      // focus the close button for accessibility
      setTimeout(() => closeBtnRef.current?.focus(), 0);
      return () => {
        document.documentElement.style.overflow = prevHtml;
        document.body.style.overflow = prevBody;
      };
    }
  }, [open]);

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  const hrefFor = (href: string) => (base ? `${base}${href}` : href);

  const linkCls = (active: boolean) =>
    [
      "rounded-md px-3 py-1.5 text-sm whitespace-nowrap transition",
      active ? "bg-white/10 text-white" : "text-white/85 hover:text-white hover:bg-white/5",
    ].join(" ");

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0B0E13]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0B0E13]/60">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href={base || "/"} className="text-white font-semibold tracking-tight">
          Executive Partners
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2">
          {NAV.map((item) => {
            const href = hrefFor(item.href);
            const active = pathname === href || pathname?.startsWith(href + "/");
            const cls = linkCls(active);
            return item.external ? (
              <a key={item.href} href={href} target="_blank" rel="noopener noreferrer" className={cls}>
                {item.label}
              </a>
            ) : (
              <Link key={item.href} href={href} className={cls}>
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/12 bg-white/6 text-white/90 hover:bg-white/10"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Dim/blur backdrop */}
          <div
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />

          {/* Panel (full screen for clarity & tap size) */}
          <div
            role="dialog"
            aria-modal="true"
            className="absolute inset-0 flex flex-col bg-[#0B0E13]"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <span className="text-sm font-semibold tracking-tight">Menu</span>
              <button
                ref={closeBtnRef}
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/12 bg-white/6 text-white/90 hover:bg-white/10"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
                  <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 overflow-y-auto">
              <ul className="divide-y divide-white/8">
                {NAV.map((item) => {
                  const href = hrefFor(item.href);
                  const active = pathname === href || pathname?.startsWith(href + "/");
                  return (
                    <li key={item.href}>
                      {item.external ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center justify-between px-5 h-14 text-base ${
                            active ? "bg-white/8 text-white" : "text-white/90 hover:bg-white/6"
                          }`}
                        >
                          <span className="font-medium">{item.label}</span>
                          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="opacity-80">
                            <path d="M9 18l6-6-6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                      ) : (
                        <Link
                          href={href}
                          className={`flex items-center justify-between px-5 h-14 text-base ${
                            active ? "bg-white/8 text-white" : "text-white/90 hover:bg-white/6"
                          }`}
                        >
                          <span className="font-medium">{item.label}</span>
                          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="opacity-80">
                            <path d="M9 18l6-6-6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Footer CTA strip (optional, helps visual polish) */}
            <div className="border-t border-white/10 p-4">
              <Link
                href={hrefFor("/contact")}
                className="block w-full text-center rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold py-3"
              >
                Contact a Recruiter
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}