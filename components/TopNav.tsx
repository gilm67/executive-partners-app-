// components/TopNav.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type NavItem = { href: string; label: string; external?: boolean };

// --- Language switcher helpers ---
const LOCALES = ["en", "fr", "de"] as const;
type Locale = (typeof LOCALES)[number];

function buildLocaleHref(
  pathname: string,
  searchParams: ReturnType<typeof useSearchParams>,
  nextLocale: Locale
) {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  const rest = LOCALES.includes(first as Locale) ? segments.slice(1) : segments;
  const href = "/" + [nextLocale, ...rest].join("/");
  const qs = searchParams.toString();
  return qs ? `${href}?${qs}` : href;
}

export default function TopNav() {
  const pathname = usePathname() || "/";
  const params = useSearchParams();
  const segments = pathname.split("/").filter(Boolean);
  const currentLocale: Locale = LOCALES.includes(segments[0] as Locale)
    ? (segments[0] as Locale)
    : "en";

  // your existing items (unchanged)
  const items: NavItem[] = [
    { href: "/", label: "Executive Partners" },
    { href: "/jobs", label: "Jobs" },
    { href: "/candidates", label: "Candidates" },
    { href: "/hiring-managers", label: "Hiring Managers" },
    { href: "/bp-simulator", label: "BP Simulator" },
    { href: "/markets", label: "Markets" },
    { href: "/portability", label: "Portability" },
    { href: "/insights", label: "Insights" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" }
  ];

  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black/30 backdrop-blur supports-[backdrop-filter]:bg-black/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-3">
        {/* LEFT: logo/title + small language switcher */}
        <div className="flex items-center gap-2">
          <Link href={buildLocaleHref("/", params, currentLocale)} className="font-semibold">
            Executive Partners
          </Link>

          {/* tiny locale toggle (FR / DE). Keep subtle, left-aligned */}
          <div className="ml-2 flex items-center gap-1 text-xs">
            {/* You can swap text with 🌐 or a flag if you prefer */}
            {(["fr", "de"] as Locale[]).map((lc) => (
              <Link
                key={lc}
                href={buildLocaleHref(pathname, params, lc)}
                prefetch={false}
                aria-label={`Switch to ${lc.toUpperCase()}`}
                className={[
                  "px-2 py-0.5 rounded-md border border-white/15 hover:bg-white/10",
                  currentLocale === lc ? "opacity-50 pointer-events-none" : ""
                ].join(" ")}
              >
                {lc.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>

        {/* CENTER/RIGHT: your existing nav (unchanged) */}
        <nav className="ml-auto hidden md:flex items-center gap-4 text-sm">
          {items.map((it) => {
            const href = buildLocaleHref(it.href, params, currentLocale);
            return it.external ? (
              <a key={it.href} href={href} target="_blank" rel="noreferrer" className="hover:underline">
                {it.label}
              </a>
            ) : (
              <Link key={it.href} href={href} className="hover:underline">
                {it.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu button (unchanged behavior) */}
        <button
          className="md:hidden ml-auto rounded-md px-2 py-1 border border-white/15 hover:bg-white/10"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
        >
          Menu
        </button>
      </div>

      {/* Mobile menu (prefixes locale automatically) */}
      {open && (
        <div id="mobile-nav" className="md:hidden border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3 grid gap-2 text-sm">
            {items.map((it) => {
              const href = buildLocaleHref(it.href, params, currentLocale);
              return it.external ? (
                <a key={it.href} href={href} target="_blank" rel="noreferrer" className="py-1 hover:underline">
                  {it.label}
                </a>
              ) : (
                <Link key={it.href} href={href} className="py-1 hover:underline" onClick={() => setOpen(false)}>
                  {it.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}