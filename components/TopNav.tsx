// components/TopNav.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string; external?: boolean };

const nav: NavItem[] = [
  { href: "/", label: "Executive Partners" },
  { href: "/markets", label: "Markets" },
  { href: "/jobs", label: "Jobs" },
  { href: "/candidates", label: "Candidates" },
  { href: "/hiring-managers", label: "Hiring Managers" },
  { href: "https://ep-bp-simulator.streamlit.app/", label: "BP Simulator", external: true },
  { href: "/portability-score", label: "Portability" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function TopNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const ItemLink = ({ item }: { item: NavItem }) => {
    const isActive = !item.external && pathname === item.href;

    if (item.external) {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-white hover:text-white/90"
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

  const ItemLinkMobile = ({ item }: { item: NavItem }) => {
    const isActive = !item.external && pathname === item.href;

    if (item.external) {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="block rounded-lg px-4 py-3 text-base font-bold bg-neutral-900/90 text-white ring-1 ring-white/15"
        >
          {item.label}
        </a>
      );
    }

    return (
      <Link
        href={item.href}
        onClick={() => setOpen(false)}
        aria-current={isActive ? "page" : undefined}
        className={`block rounded-lg px-4 py-3 text-base font-bold bg-neutral-900/90 text-white ring-1 ring-white/15 ${
          isActive ? "outline outline-1 outline-white/30" : ""
        }`}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-black/40">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Left: brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="text-white font-bold text-lg hover:text-white/90">
            Exec Partners
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <ItemLink key={item.label} item={item} />
          ))}
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          aria-label="Toggle menu"
          className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/85 backdrop-blur">
          <div className="mx-auto grid max-w-7xl gap-2 px-4 py-3 sm:px-6 lg:px-8">
            {nav.map((item) => (
              <ItemLinkMobile key={item.label} item={item} />
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
