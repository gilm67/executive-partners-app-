// components/TopNav.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string; external?: boolean };

const NAV: NavItem[] = [
  { href: "/jobs", label: "Jobs" },
  { href: "/insights", label: "Insights" },
  { href: "/candidates", label: "Candidates" },
  { href: "/hiring-managers", label: "Hiring Managers" },
  // ✅ Fixed: point to the Next.js simulator page
  { href: "/business-plan-simulator", label: "BP Simulator" },
  { href: "/portability", label: "Portability" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function TopNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";

  // Close mobile menu on route change
  useEffect(() => {
    if (open) setOpen(false);
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const ItemLink = ({ item }: { item: NavItem }) => {
    const active = isActive(item.href);

    if (item.external) {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-white hover:text-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-md px-1.5 py-1"
        >
          {item.label}
        </a>
      );
    }

    return (
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={[
          "text-sm font-semibold text-white hover:text-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-md px-1.5 py-1",
          active ? "underline underline-offset-8 decoration-white/70" : "",
        ].join(" ")}
      >
        {item.label}
      </Link>
    );
  };

  const ItemLinkMobile = ({ item }: { item: NavItem }) => {
    const active = isActive(item.href);

    if (item.external) {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-lg px-4 py-3 text-base font-bold bg-neutral-900/90 text-white ring-1 ring-white/15"
        >
          {item.label}
        </a>
      );
    }

    return (
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={[
          "block rounded-lg px-4 py-3 text-base font-bold text-white ring-1 ring-white/15",
          active ? "bg-blue-600" : "bg-neutral-900/90 hover:bg-neutral-800",
        ].join(" ")}
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
          className="text-sm font-extrabold tracking-tight text-white hover:text-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-md px-1.5 py-1"
        >
          Executive Partners
        </Link>

        {/* Desktop */}
        <ul className="hidden gap-6 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <li key={item.href}>
              <ItemLink item={item} />
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link
            href="/apply"
            className="rounded-xl bg-[#1D4ED8] px-4 py-2 text-sm font-bold text-white hover:bg-[#1E40AF] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            Submit CV
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden rounded-md border border-neutral-700 px-3 py-2 text-sm font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          type="button"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          id="mobile-nav"
          className="md:hidden border-t border-neutral-800 bg-neutral-950/95 backdrop-blur"
        >
          <ul className="space-y-2 px-4 py-4" aria-label="Primary mobile">
            {NAV.map((item) => (
              <li key={item.href}>
                <ItemLinkMobile item={item} />
              </li>
            ))}
            <li>
              <Link
                href="/apply"
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