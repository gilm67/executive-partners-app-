// components/TopNav.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string; external?: boolean };

const nav: NavItem[] = [
  { href: "/jobs", label: "Jobs" },
  { href: "/candidates", label: "Candidates" },
  { href: "/hiring-managers", label: "Hiring Managers" },
  { href: "/bp-simulator", label: "BP Simulator", external: true }, // open Streamlit in new tab
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function TopNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const ItemLink = ({ item }: { item: NavItem }) =>
    item.external ? (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-neutral-700 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white"
      >
        {item.label}
      </a>
    ) : (
      <Link
        href={item.href}
        className={`text-sm font-medium ${
          pathname === item.href
            ? "text-blue-600"
            : "text-neutral-700 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white"
        }`}
      >
        {item.label}
      </Link>
    );

  const ItemLinkMobile = ({ item }: { item: NavItem }) =>
    item.external ? (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setOpen(false)}
        className="block rounded-lg px-4 py-3 text-base font-semibold bg-neutral-900/90 text-white ring-1 ring-white/15"
      >
        {item.label}
      </a>
    ) : (
      <Link
        href={item.href}
        onClick={() => setOpen(false)}
        className={`block rounded-lg px-4 py-3 text-base font-semibold ${
          pathname === item.href
            ? "bg-blue-600 text-white"
            : "bg-neutral-900/90 text-white hover:bg-neutral-800"
        } ring-1 ring-white/15`}
      >
        {item.label}
      </Link>
    );

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-neutral-800 dark:bg-neutral-950/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="text-sm font-bold tracking-tight text-neutral-900 dark:text-neutral-100"
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
          <Link href="/apply" className="ep-btn-primary">Submit CV</Link>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          Menu
        </button>
      </nav>

      {/* Mobile drawer (high-contrast, large tap targets) */}
      {open && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-neutral-950/95 backdrop-blur">
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
                className="block text-center rounded-lg px-4 py-3 text-base font-semibold bg-blue-600 text-white hover:bg-blue-700"
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