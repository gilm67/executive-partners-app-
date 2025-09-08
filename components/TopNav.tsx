// components/TopNav.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string; external?: boolean };

const nav: NavItem[] = [
  { href: "/jobs", label: "Jobs" },
  { href: "/insights", label: "Insights" },                 // ✅ new
  { href: "/candidates", label: "Candidates" },
  { href: "/hiring-managers", label: "Hiring Managers" },
  { href: "/bp-simulator", label: "BP Simulator", external: true }, // new tab
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function TopNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const ItemLink = ({ item }: { item: NavItem }) => {
    const isActive = pathname === item.href;

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
    const isActive = pathname === item.href;

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
        className={`block rounded-lg px-4 py-3 text-base font-bold text-white ring-1 ring-white/15 ${
          isActive
            ? "bg-blue-600"
            : "bg-neutral-900/90 hover:bg-neutral-800"
        }`}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/85 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="text-sm font-extrabold tracking-tight text-white hover:text-white/90"
        >
          Executive Partners
        </Link>

        {/* Desktop */}
        <ul className="hidden gap-6 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <ItemLink item={item} />
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link
            href="/apply"
            className="rounded-xl bg-[#1D4ED8] px-4 py-2 text-sm font-bold text-white hover:bg-[#1E40AF]"
          >
            Submit CV
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden rounded-md border border-neutral-700 px-3 py-2 text-sm font-semibold text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          Menu
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-neutral-800 bg-neutral-950/95 backdrop-blur">
          <ul className="space-y-2 px-4 py-4">
            {nav.map((item) => (
              <li key={item.href}>
                <ItemLinkMobile item={item} />
              </li>
            ))}
            <li>
              <Link
                href="/apply"
                onClick={() => setOpen(false)}
                className="block text-center rounded-lg px-4 py-3 text-base font-bold bg-blue-600 text-white hover:bg-blue-700"
              >
                Submit CV
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}