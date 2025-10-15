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
  // ⬇️ Localized markets path
  { href: "/en/markets", label: "Markets" },
  { href: "/portability", label: "Portability" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function TopNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Body scroll lock
  useEffect(() => {
    document.body.classList.toggle("ep-lock-scroll", open);
    return () => document.body.classList.remove("ep-lock-scroll");
  }, [open]);

  // Close on route change
  useEffect(() => {
    setOpen(false);
    document.body.classList.remove("ep-lock-scroll");
  }, [pathname]);

  // Header style on scroll + ESC to close
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const bar =
    "fixed inset-x-0 top-0 z-40 transition-colors " +
    (scrolled
      ? "border-b border-white/10 bg-[#0B0E13]/70 backdrop-blur supports-[backdrop-filter]:bg-[#0B0E13]/55"
      : "bg-transparent");

  const linkClasses = (active: boolean) =>
    [
      "rounded-md px-3 py-1.5 text-sm whitespace-nowrap transition",
      active ? "bg-white/10 text-white" : "text-white/80 hover:text-white hover:bg-white/5",
    ].join(" ");

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + "/");

  return (
    <header className={bar}>
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Brand */}
          <Link
            href="/"
            className="shrink-0 text-base sm:text-lg font-semibold tracking-tight text-white hover:opacity-90"
            aria-label="Executive Partners — Home"
          >
            Executive Partners
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-2 overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
              {NAV.map((item) =>
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClasses(isActive(item.href))}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={linkClasses(isActive(item.href))}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Mobile burger */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white hover:bg-white/10"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        {/* Mobile panel (hidden when closed) */}
        <div
          className={
            (open ? "mt-3" : "hidden") +
            " md:hidden rounded-2xl border border-white/10 bg-[#0B0E13]/95 backdrop-blur p-3"
          }
        >
          <ul className="grid gap-1">
            {NAV.map((item) => {
              const active = isActive(item.href);
              const cls = [
                "block rounded-md px-3 py-2 text-sm",
                active ? "bg-white/10 text-white" : "text-white/80 hover:text-white hover:bg-white/5",
              ].join(" ");
              return (
                <li key={item.href}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cls}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className={cls}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* subtle divider when not scrolled */}
      {!scrolled && <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />}
    </header>
  );
}