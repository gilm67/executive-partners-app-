"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type NavItem = { href: string; label: string; external?: boolean };

function withBase(base: string, href: string) {
  if (!href.startsWith("/")) return href;
  if (!base) return href;
  if (href.startsWith("/en/")) return href; // avoid double-prefix
  return `${base}${href}`;
}

export default function TopNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // mobile panel
  const [scrolled, setScrolled] = useState(false);
  const [dd, setDd] = useState<null | "Tools" | "Insights">(null); // desktop dropdown

  // ✅ Prevent dropdown from closing instantly when moving cursor button -> panel
  const closeTimer = useRef<number | null>(null);
  const openDd = (which: "Tools" | "Insights") => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setDd(which);
  };
  const scheduleCloseDd = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setDd(null), 180);
  };

  // ✅ locale-aware base
  const base = useMemo(() => (pathname?.startsWith("/en") ? "/en" : ""), [pathname]);

  // ✅ Normalize pathname for active matching (strip /en)
  const normalizedPath = useMemo(() => {
    if (!pathname) return "";
    return pathname.startsWith("/en/") ? pathname.slice(3) : pathname; // "/en/xyz" -> "/xyz"
  }, [pathname]);

  // ✅ Active check uses normalizedPath and *unprefixed* route
  const isActive = (href: string) =>
    normalizedPath === href || normalizedPath.startsWith(href + "/");

  // ----- Nav structure (unprefixed routes)
  const TOP: NavItem[] = [
    { href: "/markets", label: "Markets" },
    { href: "/jobs", label: "Jobs" },
    { href: "/candidates", label: "Candidates" },
    { href: "/hiring-managers", label: "Hiring Managers" },
    { href: "/about", label: "About" },
  ];

  const TOOLS: NavItem[] = [
    { href: "/bp-simulator", label: "Business Plan Simulator" },
    { href: "/portability", label: "Portability Score" },
  ];

  const INSIGHTS: NavItem[] = [
    { href: "/insights", label: "Insights" },
    {
      href: "/insights/private-banking-career-intelligence",
      label: "Career Intelligence 2026",
    },
  ];

  const CONTACT: NavItem = { href: "/contact", label: "Contact" };

  // Apply base to internal routes
  const TOP_BASE = useMemo(
    () => TOP.map((i) => (i.external ? i : { ...i, href: withBase(base, i.href) })),
    [base]
  );
  const TOOLS_BASE = useMemo(
    () => TOOLS.map((i) => (i.external ? i : { ...i, href: withBase(base, i.href) })),
    [base]
  );
  const INSIGHTS_BASE = useMemo(
    () => INSIGHTS.map((i) => (i.external ? i : { ...i, href: withBase(base, i.href) })),
    [base]
  );
  const CONTACT_BASE = useMemo(
    () => (CONTACT.external ? CONTACT : { ...CONTACT, href: withBase(base, CONTACT.href) }),
    [base]
  );

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    document.body.classList.toggle("ep-lock-scroll", open);
    return () => document.body.classList.remove("ep-lock-scroll");
  }, [open]);

  // Close menus on route change
  useEffect(() => {
    setOpen(false);
    setDd(null);
    document.body.classList.remove("ep-lock-scroll");
  }, [pathname]);

  // Header style on scroll + ESC to close
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setDd(null);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  const bar =
    "fixed inset-x-0 top-0 z-40 transition-colors " +
    (scrolled
      ? "border-b border-white/10 bg-[#050814]/80 backdrop-blur supports-[backdrop-filter]:bg-[#050814]/65"
      : "bg-transparent");

  const linkClasses = (active: boolean) =>
    [
      "relative rounded-full px-3 py-1.5 text-sm whitespace-nowrap transition-colors",
      active
        ? "text-[#F5D778] bg-white/5"
        : "text-slate-200 hover:text-white hover:bg-white/5",
    ].join(" ");

  const ddButtonClasses = (active: boolean, isOpen: boolean) =>
    [
      "relative rounded-full px-3 py-1.5 text-sm whitespace-nowrap transition-colors flex items-center gap-1",
      active || isOpen
        ? "text-[#F5D778] bg-white/5"
        : "text-slate-200 hover:text-white hover:bg-white/5",
    ].join(" ");

  // ✅ IMPORTANT: open inward & above other elements
  const ddPanel =
    "absolute right-0 mt-2 w-72 rounded-2xl border border-white/10 bg-[#050814]/95 backdrop-blur p-2 shadow-xl z-50";

  const ddItemClasses = (active: boolean) =>
    [
      "block rounded-xl px-3 py-2 text-sm transition-colors",
      active
        ? "bg-white/10 text-[#F5D778]"
        : "text-slate-200 hover:text-white hover:bg-white/5",
    ].join(" ");

  const toolsActive = TOOLS.some((i) => isActive(i.href));
  const insightsActive = INSIGHTS.some((i) => isActive(i.href));

  return (
    <header className={bar}>
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Brand */}
          <Link
            href={base || "/"}
            className="shrink-0 text-base sm:text-lg font-semibold tracking-tight text-white hover:text-[#F5D778] transition-colors"
            aria-label="Executive Partners — Home"
          >
            Executive Partners
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            {/* ✅ Left: scrolling links only (no dropdowns inside overflow container) */}
            <div className="flex items-center gap-2 max-w-[62vw] overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch] pr-1">
              {TOP_BASE.map((item) =>
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
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>

            {/* ✅ Right: dropdowns + CTA (no overflow clipping) */}
            <div className="relative flex items-center gap-2">
              {/* Tools dropdown */}
              <div
                className="relative"
                onMouseEnter={() => openDd("Tools")}
                onMouseLeave={scheduleCloseDd}
              >
                <button
                  type="button"
                  className={ddButtonClasses(toolsActive, dd === "Tools")}
                  aria-haspopup="menu"
                  aria-expanded={dd === "Tools"}
                  onClick={() => setDd(dd === "Tools" ? null : "Tools")}
                >
                  Tools <span className="text-xs opacity-80">▾</span>
                </button>

                {dd === "Tools" && (
                  <div
                    role="menu"
                    className={ddPanel}
                    onMouseEnter={() => openDd("Tools")}
                    onMouseLeave={scheduleCloseDd}
                  >
                    {TOOLS_BASE.map((i) => (
                      <Link
                        key={i.href}
                        href={i.href}
                        role="menuitem"
                        className={ddItemClasses(isActive(i.href))}
                        onClick={() => setDd(null)}
                      >
                        {i.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Insights dropdown */}
              <div
                className="relative"
                onMouseEnter={() => openDd("Insights")}
                onMouseLeave={scheduleCloseDd}
              >
                <button
                  type="button"
                  className={ddButtonClasses(insightsActive, dd === "Insights")}
                  aria-haspopup="menu"
                  aria-expanded={dd === "Insights"}
                  onClick={() => setDd(dd === "Insights" ? null : "Insights")}
                >
                  Insights <span className="text-xs opacity-80">▾</span>
                </button>

                {dd === "Insights" && (
                  <div
                    role="menu"
                    className={ddPanel}
                    onMouseEnter={() => openDd("Insights")}
                    onMouseLeave={scheduleCloseDd}
                  >
                    {INSIGHTS_BASE.map((i) => (
                      <Link
                        key={i.href}
                        href={i.href}
                        role="menuitem"
                        className={ddItemClasses(isActive(i.href))}
                        onClick={() => setDd(null)}
                      >
                        {i.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact CTA */}
              <Link
                href={CONTACT_BASE.href}
                className="ml-2 rounded-full bg-[#F5D778] px-4 py-2 text-sm font-semibold text-[#050814] hover:opacity-90 transition"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Mobile burger */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white hover:bg-white/10"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        {/* Mobile panel */}
        <div
          className={
            (open ? "mt-3" : "hidden") +
            " md:hidden rounded-2xl border border-white/10 bg-[#050814]/95 backdrop-blur p-3"
          }
        >
          <ul className="grid gap-1">
            {TOP_BASE.map((item) => {
              const active = isActive(item.href.replace(base, "") || item.href);
              const cls = [
                "block rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-white/10 text-[#F5D778]"
                  : "text-slate-200 hover:text-white hover:bg-white/5",
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

            {/* Mobile section: Tools */}
            <li className="mt-2 px-3 pt-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Tools
            </li>
            {TOOLS_BASE.map((item) => {
              const active = isActive(item.href.replace(base, "") || item.href);
              const cls = [
                "block rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-white/10 text-[#F5D778]"
                  : "text-slate-200 hover:text-white hover:bg-white/5",
              ].join(" ");

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cls}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}

            {/* Mobile section: Insights */}
            <li className="mt-2 px-3 pt-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Insights
            </li>
            {INSIGHTS_BASE.map((item) => {
              const active = isActive(item.href.replace(base, "") || item.href);
              const cls = [
                "block rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-white/10 text-[#F5D778]"
                  : "text-slate-200 hover:text-white hover:bg-white/5",
              ].join(" ");

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cls}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}

            {/* Mobile Contact CTA */}
            <li className="mt-2">
              <Link
                href={CONTACT_BASE.href}
                className="block rounded-xl bg-[#F5D778] px-4 py-3 text-sm font-semibold text-[#050814] text-center hover:opacity-90 transition"
                onClick={() => setOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Subtle divider when not scrolled */}
      {!scrolled && (
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      )}
    </header>
  );
}