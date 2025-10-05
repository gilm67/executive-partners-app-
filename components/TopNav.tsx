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

  // Body scroll lock helper
  useEffect(() => {
    const body = document.body;
    if (open) body.classList.add("ep-lock-scroll");
    else body.classList.remove("ep-lock-scroll");
    return () => body.classList.remove("ep-lock-scroll");
  }, [open]);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
    document.body.classList.remove("ep-lock-scroll");
  }, [pathname]);

  // Close menu when tapping any nav link
  function handleNavClick() {
    setOpen(false);
    document.body.classList.remove("ep-lock-scroll");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0B0E13]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0B0E13]/60">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="shrink-0 text-base sm:text-lg font-semibold tracking-tight">
            Executive Partners
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-2 overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
              {NAV.map((item) => {
                const active = pathname === item.href || pathname?.startsWith(item.href + "/");
                const className = [
                  "rounded-md px-3 py-1.5 text-sm whitespace-nowrap transition",
                  active ? "bg-white/10 text-white" : "text-white/80 hover:text-white hover:bg-white/5",
                ].join(" ");
                return item.external ? (
                  <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
                    {item.label}
                  </a>
                ) : (
                  <Link key={item.href} href={item.href} className={className} onClick={handleNavClick}>
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile burger */}
          <button
            aria-label="Open menu"
            aria-expanded={open}
            className="md:hidden rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10"
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>
        </div>

        {/* Mobile panel */}
        <div
          className="ep-mobile-menu md:hidden mt-3 rounded-2xl border border-white/10 bg-[#0B0E13]/95 backdrop-blur p-3"
          aria-hidden={!open}
        >
          <ul className="grid gap-1">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname?.startsWith(item.href + "/");
              const className = [
                "block rounded-md px-3 py-2 text-sm",
                active ? "bg-white/10 text-white" : "text-white/80 hover:text-white hover:bg-white/5",
              ].join(" ");
              return (
                <li key={item.href}>
                  {item.external ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className={className} onClick={handleNavClick}>
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} className={className} onClick={handleNavClick}>
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
