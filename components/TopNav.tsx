// components/TopNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

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
  const [open, setOpen] = useState(false);

  // locale base (/en or root)
  const base = useMemo(() => (pathname?.startsWith("/en") ? "/en" : ""), [pathname]);
  const hrefFor = (href: string) => (base ? `${base}${href}` : href);

  // Body scroll lock while menu is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const linkCls = (active: boolean) =>
    [
      "rounded-md px-3 py-1.5 text-sm whitespace-nowrap transition",
      active ? "bg-white/10 text-white" : "text-white/80 hover:text-white hover:bg-white/5",
    ].join(" ");

  return (
    <header className="sticky top-0 z-60 border-b border-white/10 bg-[#0B0E13]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0B0E13]/60">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href={base || "/"} className="text-white font-extrabold tracking-wide text-[13px] sm:text-sm">
          EXECUTIVE PARTNERS
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
          type="button"
          aria-label="Open menu"
          aria-expanded={open ? "true" : "false"}
          onClick={() => setOpen(true)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </nav>

      {/* Mobile slide-over */}
      {open && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-[59] bg-black/60 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          {/* Panel */}
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-y-0 right-0 z-60 w-[86%] max-w-xs rounded-l-2xl border-l border-white/10 bg-neutral-950 p-5 shadow-2xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-semibold">Menu</div>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav className="grid">
              {NAV.map((item) => {
                const href = hrefFor(item.href);
                const active = pathname === href || pathname?.startsWith(href + "/");
                return item.external ? (
                  <a
                    key={item.href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-xl px-3 py-3 text-[15px] ${active ? "bg-white/10 text-white" : "text-white/90 hover:bg-white/5"}`}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={href}
                    className={`rounded-xl px-3 py-3 text-[15px] ${active ? "bg-white/10 text-white" : "text-white/90 hover:bg-white/5"}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}