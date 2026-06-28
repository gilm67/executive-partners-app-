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
  const [dd, setDd] = useState<null | "Tools" | "Insights" | "Markets" | "About">(null); // desktop dropdown

  // ✅ Prevent dropdown from closing instantly when moving cursor button -> panel
  const closeTimer = useRef<number | null>(null);
  const openDd = (which: "Tools" | "Insights" | "Markets" | "About") => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setDd(which);
  };
  const scheduleCloseDd = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setDd(null), 180);
  };

  // ✅ Nav targets (Markets/Jobs/Candidates/Hiring Managers/About/Contact/Tools/Insights)
  // have no separate French or German version, so always point at /en regardless of
  // the current path. Previously this only matched pages already under /en/, so the
  // bare homepage ("/") and /de fell through to unprefixed links (/markets, /jobs...).
  const base = "/en";

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
    { href: "/candidates", label: "Candidates" },
    { href: "/en/specialist-bench", label: "Specialist Bench" },
    { href: "/jobs", label: "Mandates" },
    { href: "/hiring-managers", label: "Hiring Managers" },
  ];

  const TOOLS: NavItem[] = [
    { href: "/bp-simulator", label: "Business Plan Simulator" },
    { href: "/portability", label: "Portability Score" },
  ];

  const INSIGHTS: NavItem[] = [
    { href: "/insights", label: "Private Wealth Pulse" },
    {
      href: "/insights/private-banking-career-intelligence",
      label: "Career Intelligence 2026",
    },
  ];

  const MARKETS_DD: NavItem[] = [
    { href: "/markets", label: "All Financial Hubs" },
    { href: "/latam-private-banking-recruiter-geneva", label: "LATAM Private Banking" },
    { href: "/mea-private-banking-recruiter-geneva", label: "MEA Private Banking" },
    { href: "/nri-private-banking-recruiter-switzerland", label: "NRI Private Banking" },
    { href: "/israeli-market-private-banking-switzerland", label: "Israeli Market" },
    { href: "/apac-private-banking-recruiter-switzerland", label: "APAC Private Banking" },
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
  const MARKETS_DD_BASE = useMemo(
    () => MARKETS_DD.map((i) => (i.external ? i : { ...i, href: withBase(base, i.href) })),
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
  const marketsActive = MARKETS_DD.some((i) => isActive(i.href));

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

              {/* Markets dropdown */}
              <div
                className="relative"
                onMouseEnter={() => openDd("Markets")}
                onMouseLeave={scheduleCloseDd}
              >
                <button
                  type="button"
                  className={ddButtonClasses(marketsActive, dd === "Markets")}
                  aria-haspopup="menu"
                  aria-expanded={dd === "Markets"}
                  onClick={() => setDd(dd === "Markets" ? null : "Markets")}
                >
                  Markets <span className="text-xs opacity-80">▾</span>
                </button>

                {dd === "Markets" && (
                  <div
                    role="menu"
                    className={ddPanel}
                    onMouseEnter={() => openDd("Markets")}
                    onMouseLeave={scheduleCloseDd}
                  >
                    {MARKETS_DD_BASE.map((i) => (
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

              {/* About dropdown */}
              <div
                className="relative"
                onMouseEnter={() => openDd("About")}
                onMouseLeave={scheduleCloseDd}
              >
                <button
                  className={linkClasses(isActive("/about") || isActive("/press"))}
                  aria-haspopup="menu"
                  aria-expanded={dd === "About"}
                >
                  About
                </button>
                {dd === "About" && (
                  <div
                    className="absolute left-0 top-full mt-1 w-44 rounded-xl border border-white/10 bg-[#0B0F1A]/95 py-1.5 shadow-xl backdrop-blur-sm z-50"
                    role="menu"
                    onMouseEnter={() => openDd("About")}
                    onMouseLeave={scheduleCloseDd}
                  >
                    {[
                      { href: withBase(base, "/about"), label: "About Us" },
                      { href: "/en/press", label: "In the Press" },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        className="block px-4 py-2 text-sm text-slate-200 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* German language link */}
              <Link
                href="/de"
                className="rounded-full px-2.5 py-1.5 text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Deutsche Version"
              >
                DE
              </Link>

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

        {/* Mobile panel — compact grid, no scroll */}
        <div className={(open ? "mt-2" : "hidden") + " md:hidden"}>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#050814] shadow-2xl">

            {/* ── Primary nav: 2×2 grid ── */}
            <div className="p-2 pb-1">
              <div className="grid grid-cols-2 gap-1">
                {TOP_BASE.map((item) => {
                  const active = isActive(item.href.replace(base, "") || item.href);
                  return (
                    <Link key={item.href} href={item.href}
                      className={["flex items-center rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                        active ? "bg-amber-500/15 text-amber-300" : "text-slate-200 hover:bg-white/5 hover:text-white"].join(" ")}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="mx-3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* ── Tools + Intelligence: side by side ── */}
            <div className="grid grid-cols-2 divide-x divide-white/8">
              <div className="px-2 py-2">
                <p className="px-2 pb-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-amber-500/70">Tools</p>
                {TOOLS_BASE.map((item) => {
                  const active = isActive(item.href.replace(base, "") || item.href);
                  return (
                    <Link key={item.href} href={item.href}
                      className={["flex items-center rounded-lg px-2 py-2 text-xs font-medium leading-tight transition-colors",
                        active ? "bg-amber-500/15 text-amber-300" : "text-slate-300 hover:bg-white/5 hover:text-white"].join(" ")}
                      onClick={() => setOpen(false)}>
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <div className="px-2 py-2">
                <p className="px-2 pb-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-amber-500/70">Intelligence</p>
                {INSIGHTS_BASE.map((item) => {
                  const active = isActive(item.href.replace(base, "") || item.href);
                  return (
                    <Link key={item.href} href={item.href}
                      className={["flex items-center rounded-lg px-2 py-2 text-xs font-medium leading-tight transition-colors",
                        active ? "bg-amber-500/15 text-amber-300" : "text-slate-300 hover:bg-white/5 hover:text-white"].join(" ")}
                      onClick={() => setOpen(false)}>
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="mx-3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* ── Markets: pill chips ── */}
            <div className="px-3 py-2.5">
              <p className="pb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-amber-500/70">Markets</p>
              <div className="flex flex-wrap gap-1.5">
                {MARKETS_DD_BASE.slice(0, 5).map((item) => {
                  const active = isActive(item.href.replace(base, "") || item.href);
                  const short = item.label
                    .replace(" Private Banking", "")
                    .replace("All Financial Hubs", "All Hubs");
                  return (
                    <Link key={item.href} href={item.href}
                      className={["rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                        active
                          ? "border-amber-500/50 bg-amber-500/15 text-amber-300"
                          : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white"].join(" ")}
                      onClick={() => setOpen(false)}>
                      {short}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="mx-3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* ── Company: 2-col ── */}
            <div className="grid grid-cols-2 gap-1 p-2">
              <Link
                href={withBase(base, "/about")}
                className={["flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive("/about") ? "bg-amber-500/15 text-amber-300" : "text-slate-200 hover:bg-white/5 hover:text-white"].join(" ")}
                onClick={() => setOpen(false)}
                aria-current={isActive("/about") ? "page" : undefined}
              >
                About
              </Link>
              <Link
                href="/en/press"
                className={["flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive("/press") ? "bg-amber-500/15 text-amber-300" : "text-slate-200 hover:bg-white/5 hover:text-white"].join(" ")}
                onClick={() => setOpen(false)}
              >
                <span>Press</span>
                <span className="rounded-full bg-amber-500/20 px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-amber-400">FN</span>
              </Link>
            </div>

            {/* ── Footer: DE + Contact ── */}
            <div className="flex items-center gap-2 border-t border-white/8 bg-white/2 px-3 py-3">
              <Link
                href="/de"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 py-2.5 text-xs font-medium text-slate-400 transition-colors hover:text-slate-200"
                onClick={() => setOpen(false)}
              >
                <span className="text-base">🇩🇪</span>
                <span>DE</span>
              </Link>
              <Link
                href={CONTACT_BASE.href}
                className="flex flex-[2] items-center justify-center rounded-xl bg-[#F5D778] py-2.5 text-sm font-semibold text-[#050814] transition-opacity hover:opacity-90"
                onClick={() => setOpen(false)}
              >
                Contact Us
              </Link>
            </div>

          </div>
        </div>
      </nav>

      {/* Subtle divider when not scrolled */}
      {!scrolled && (
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      )}
    </header>
  );
}