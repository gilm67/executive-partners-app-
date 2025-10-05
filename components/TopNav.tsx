// components/TopNav.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
<<<<<<< HEAD
=======
import { useEffect, useState } from "react";
>>>>>>> feat/mobile-hero-only

type NavItem = { href: string; label: string; external?: boolean };

// NOTE: Internal routes only; /bp-simulator is legacy and redirected in next.config.js
const NAV: NavItem[] = [
  { href: "/jobs", label: "Jobs" },
  { href: "/insights", label: "Insights" },
  { href: "/candidates", label: "Candidates" },
  { href: "/hiring-managers", label: "Hiring Managers" },
  { href: "/business-plan-simulator", label: "BP Simulator" },
  { href: "/portability", label: "Portability" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// Strip optional locale prefix like /en, /fr, /de for active-match checks
function stripLocalePrefix(path: string) {
  return path.replace(/^\/(en|fr|de)(?=\/|$)/, "");
}

export default function TopNav() {
<<<<<<< HEAD
  const [open, setOpen] = useState(false);
  const pathnameRaw = usePathname() || "/";
  const pathname = stripLocalePrefix(pathnameRaw);

  // Close mobile menu on route change
  useEffect(() => {
    if (open) setOpen(false);
  }, [pathname]); // close whenever path changes

  const isActive = (href: string) => {
    const target = stripLocalePrefix(href);
    if (target === "/") return pathname === "/";
    return pathname === target || pathname.startsWith(target + "/");
  };

  const baseLinkCls =
    "text-sm font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-md px-1.5 py-1";

  const ItemLink = ({ item }: { item: NavItem }) => {
    const active = isActive(item.href);

    if (item.external) {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseLinkCls} hover:text-white/90`}
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
          baseLinkCls,
          "hover:text-white/90 transition",
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
          onClick={() => setOpen(false)}
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
          "block rounded-lg px-4 py-3 text-base font-bold text-white ring-1 ring-white/15 transition",
          active ? "bg-blue-600" : "bg-neutral-900/90 hover:bg-neutral-800",
        ].join(" ")}
        onClick={() => setOpen(false)}
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
                onClick={() => setOpen(false)}
              >
                Submit CV
              </Link>
            </li>
          </ul>
        </div>
      )}
=======
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
>>>>>>> feat/mobile-hero-only
    </header>
  );
}
