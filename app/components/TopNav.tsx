"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";

type NavItem = { href: string; label: string; external?: boolean };

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Executive Partners" },
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

  const closeMenu = useCallback(() => {
    setOpen(false);
    unlockScroll();
  }, []);

  const toggleMenu = useCallback(() => {
    setOpen((v) => {
      const next = !v;
      if (next) lockScroll();
      else unlockScroll();
      return next;
    });
  }, []);

  // Close on route change
  useEffect(() => {
    if (open) closeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Close on unmount (safety)
  useEffect(() => {
    return () => unlockScroll();
  }, []);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeMenu]);

  const NavLinks = ({ className = "", onClick }: { className?: string; onClick?: () => void }) => (
    <nav className={`flex flex-col md:flex-row md:flex-wrap items-start md:items-center gap-4 text-sm ${className}`}>
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
        const cls =
          "transition hover:text-emerald-400 " + (active ? "text-emerald-400" : "text-white/70");
        return item.external ? (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cls}
            onClick={onClick}
          >
            {item.label}
          </a>
        ) : (
          <Link key={item.href} href={item.href} className={cls} onClick={onClick}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <header className="relative z-40">
      <div className="flex items-center justify-between">
        {/* Brand (left) */}
        <Link href="/" className="text-sm font-medium text-white hover:text-emerald-400">
          Executive Partners
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:block">
          <NavLinks />
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-controls="mobile-nav"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={toggleMenu}
          className="md:hidden inline-flex items-center justify-center rounded-lg border border-neutral-700 px-3 py-2 text-white/80 hover:text-white hover:border-neutral-500"
        >
          {/* Simple icon swap */}
          <svg
            className={`h-5 w-5 ${open ? "hidden" : "block"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path strokeWidth="2" strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg
            className={`h-5 w-5 ${open ? "block" : "hidden"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path strokeWidth="2" strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Mobile overlay + panel */}
      <div
        id="mobile-nav"
        className={`md:hidden fixed inset-0 z-40 transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm" />

        {/* Panel (clicks inside should not close) */}
        <div
          className={`absolute left-0 right-0 top-0 rounded-b-2xl border-b border-neutral-800 bg-neutral-900 px-4 pb-6 pt-16 safe-pt shadow-xl transition-transform ${
            open ? "translate-y-0" : "-translate-y-5"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <NavLinks className="gap-5" onClick={closeMenu} />
          <p className="mt-4 text-xs text-neutral-400">
            Privacy: We do not store any data without your explicit consent.
          </p>
        </div>
      </div>
    </header>
  );
}