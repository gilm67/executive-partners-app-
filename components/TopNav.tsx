// components/TopNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    document.body.classList.toggle("ep-lock-scroll", open);
    return () => document.body.classList.remove("ep-lock-scroll");
  }, [open]);

  useEffect(() => {
    setOpen(false);
    document.body.classList.remove("ep-lock-scroll");
  }, [pathname]);

  const base = pathname?.startsWith("/en") ? "/en" : "";

  const hrefFor = (href: string) => (base ? `${base}${href}` : href);

  const linkCls = (active: boolean) =>
    [
      "rounded-md px-3 py-1.5 text-sm whitespace-nowrap transition",
      active ? "bg-white/10 text-white" : "text-white/80 hover:text-white hover:bg-white/5",
    ].join(" ");

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0B0E13]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0B0E13]/60">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Brand on the left */}
        <Link href={base || "/"} className="text-white font-semibold text-lg">
          Executive Partners
        </Link>

        {/* Desktop nav centered */}
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

        {/* Mobile menu button */}
        <button
          aria-label="Open menu"
          aria-expanded={open}
          className="md:hidden rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white hover:bg-white/10"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
      </nav>
    </header>
  );
}
