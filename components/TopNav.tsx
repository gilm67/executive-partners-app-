// components/TopNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function TopNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const navItems = [
    { href: "/jobs", label: "Jobs" },
    { href: "/candidates", label: "Candidates" },
    { href: "/hiring-managers", label: "Hiring Managers" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname?.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-[70] bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-neutral-200 transition-shadow ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-3">
        {/* Brand */}
        <Link
          href="/"
          className="font-semibold text-lg tracking-tight text-neutral-900"
        >
          Executive Partners
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`transition-colors hover:text-blue-600 ${
                isActive(href)
                  ? "font-semibold underline underline-offset-4 text-blue-700"
                  : "text-neutral-700"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex">
          <Link
            href="/candidates/register"
            className="inline-flex items-center rounded-md bg-blue-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit CV
          </Link>
        </div>

        {/* Mobile actions: tiny CTA + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <Link
            href="/candidates/register"
            className="inline-flex items-center rounded-md border border-blue-600 px-2.5 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-50"
            onClick={() => setOpen(false)}
          >
            Submit CV
          </Link>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {/* Hamburger / Close */}
            <svg
              className={`h-6 w-6 ${open ? "hidden" : "block"}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
            <svg
              className={`h-6 w-6 ${open ? "block" : "hidden"}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile sheet: fixed, above backdrop, with pointer-events control */}
      <div
        className={`md:hidden fixed top-14 left-0 right-0 z-[60] bg-white border-b border-neutral-200 transition-[max-height,opacity] duration-300 ease-out overflow-hidden ${
          open
            ? "max-h-96 opacity-100 pointer-events-auto"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3">
          {/* Big primary CTA on mobile sheet */}
          <Link
            href="/candidates/register"
            className="mb-2 inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
            onClick={() => setOpen(false)}
          >
            Submit CV
          </Link>

          <div className="flex flex-col gap-1">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2 text-base transition-colors ${
                  isActive(href)
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-neutral-800 hover:bg-neutral-100"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Backdrop: sits below the sheet */}
      {open && (
        <button
          aria-hidden
          className="fixed inset-0 z-50 md:hidden bg-black/30"
          onClick={() => setOpen(false)}
        />
      )}
    </header>
  );
}