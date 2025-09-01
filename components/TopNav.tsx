// components/TopNav.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

type Item = { href: string; label: string; external?: boolean };

const nav: Item[] = [
  { href: "/jobs", label: "Jobs" },
  { href: "/candidates", label: "Candidates" },
  { href: "/hiring-managers", label: "Hiring Managers" },
  { href: "/bp-simulator", label: "BP Simulator", external: true }, // ✅ ensure it’s here
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function TopNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Executive Partners
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex md:flex-wrap gap-6 overflow-x-auto">
          {nav.map((item) => {
            const active = !item.external && pathname === item.href;
            const base =
              "text-sm transition whitespace-nowrap";
            const activeCls = "text-blue-600";
            const idleCls =
              "text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white";

            return (
              <li key={item.href}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${base} ${idleCls}`}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className={`${base} ${active ? activeCls : idleCls}`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
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

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800">
          <ul className="space-y-1 px-4 py-3">
            {nav.map((item) => {
              const active = !item.external && pathname === item.href;
              return (
                <li key={item.href}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-900"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-lg px-3 py-2 text-sm transition ${
                        active
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
                          : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-900"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
            <li>
              <Link
                href="/apply"
                onClick={() => setOpen(false)}
                className="ep-btn-primary block text-center"
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
TSX
