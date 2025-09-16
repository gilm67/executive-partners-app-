// src/components/TopNav.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string; external?: boolean };

// ✅ Hardcode the NEW Streamlit URL
const BP_SIM_URL = "https://ep-bp-simulator.streamlit.app/";

const nav: NavItem[] = [
  { href: "/jobs", label: "Jobs" },
  { href: "/candidates", label: "Candidates" },
  { href: "/hiring-managers", label: "Hiring Managers" },
  { href: BP_SIM_URL, label: "BP Simulator", external: true }, // always new tab
  { href: "/markets", label: "Markets" },
  { href: "/portability", label: "Portability" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function TopNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const ItemLink = ({ item }: { item: NavItem }) => {
    const isActive =
      !item.external && (pathname === item.href || pathname.startsWith(item.href + "/"));

    if (item.external) {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-white hover:text-white/90"
          aria-label={`${item.label} (opens in a new tab)`}
        >
          {item.label}
        </a>
      );
    }

    return (
      <Link
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        className={`text-sm font-semibold text-white hover:text-white/90 ${
          isActive ? "underline underline-offset-8 decoration-white/70" : ""
        }`}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-neutral-900/85 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/60">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="text-white font-semibold" aria-label="Executive Partners — Home">
            Executive Partners
          </Link>

          <div className="hidden md:flex items-center gap-5">
            {nav.map((item) => (
              <ItemLink key={`${item.label}-${item.href}`} item={item} />
            ))}
          </div>

          <button
            className="md:hidden rounded p-2 text-white ring-1 ring-white/20"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {open && (
          <div className="md:hidden mb-3 grid gap-2">
            {nav.map((item) =>
              item.external ? (
                <a
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 text-base font-bold bg-neutral-900/90 text-white ring-1 ring-white/15"
                  aria-label={`${item.label} (opens in a new tab)`}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 text-base font-bold bg-neutral-900/90 text-white ring-1 ring-white/15"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        )}
      </nav>
    </header>
  );
}