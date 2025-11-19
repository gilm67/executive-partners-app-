"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/types";
import { SUPPORTED_LOCALES } from "@/lib/i18n/types";

/* ---------- locale helpers ---------- */

function getCurrentLocale(pathname: string): Locale {
  const segments = pathname.split("/");
  const maybeLocale = segments[1];
  if (SUPPORTED_LOCALES.includes(maybeLocale as Locale)) {
    return maybeLocale as Locale;
  }
  return "en";
}

function getNavItems(locale: Locale) {
  const prefix = `/${locale}`;

  if (locale === "fr") {
    return [
      { name: "Marchés", href: `${prefix}/markets` },
      { name: "Jobs", href: `${prefix}/jobs` },
      { name: "Candidats", href: `${prefix}/candidates` },
      { name: "Employeurs", href: `${prefix}/hiring-managers` },
      { name: "BP Simulator", href: `${prefix}/bp-simulator` },
      { name: "Portabilité", href: `${prefix}/portability` },
      { name: "Analyses", href: `${prefix}/insights` },
      { name: "À propos", href: `${prefix}/about` },
      { name: "Contact", href: `${prefix}/contact` },
    ];
  }

  if (locale === "de") {
    return [
      { name: "Märkte", href: `${prefix}/markets` },
      { name: "Jobs", href: `${prefix}/jobs` },
      { name: "Kandidaten", href: `${prefix}/candidates` },
      { name: "Auftraggeber", href: `${prefix}/hiring-managers` },
      { name: "BP-Simulator", href: `${prefix}/bp-simulator` },
      { name: "Portabilität", href: `${prefix}/portability` },
      { name: "Insights", href: `${prefix}/insights` },
      { name: "Über uns", href: `${prefix}/about` },
      { name: "Kontakt", href: `${prefix}/contact` },
    ];
  }

  // EN default – same order as live site
  return [
    { name: "Markets", href: `${prefix}/markets` },
    { name: "Jobs", href: `${prefix}/jobs` },
    { name: "Candidates", href: `${prefix}/candidates` },
    { name: "Hiring Managers", href: `${prefix}/hiring-managers` },
    { name: "BP Simulator", href: `${prefix}/bp-simulator` },
    { name: "Portability", href: `${prefix}/portability` },
    { name: "Insights", href: `${prefix}/insights` },
    { name: "About", href: `${prefix}/about` },
    { name: "Contact", href: `${prefix}/contact` },
  ];
}

function switchLocaleInPath(pathname: string, targetLocale: Locale) {
  const segments = pathname.split("/");

  if (SUPPORTED_LOCALES.includes(segments[1] as Locale)) {
    segments[1] = targetLocale;
    const newPath = segments.join("/");
    return newPath === "" ? "/" : newPath;
  }

  if (pathname === "/" || pathname === "") {
    return `/${targetLocale}`;
  }

  return `/${targetLocale}${pathname}`;
}

/* ---------- Header (TopNav) ---------- */

export default function TopNav() {
  const pathname = usePathname() || "/";
  const locale = getCurrentLocale(pathname);
  const navItems = getNavItems(locale);

  return (
    <div className="mx-auto flex h-16 md:h-20 max-w-6xl items-center justify-between px-4 md:px-6">
      {/* BRAND – visible, elegant */}
      <Link
        href={`/${locale}`}
        className="mr-8 whitespace-nowrap text-[22px] md:text-[26px] tracking-tight text-white"
      >
        <span className="font-normal">Executive</span>{" "}
        <span className="font-semibold">Partners</span>
      </Link>

      {/* NAV + LANGUAGE SWITCHER */}
      <div className="flex flex-1 items-center justify-between gap-4">
        {/* Main nav – DESKTOP */}
        <nav className="hidden md:flex flex-1 items-center gap-6 text-[14px] md:text-[15px] font-medium text-slate-100/85">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative whitespace-nowrap pb-0.5 transition-colors ${
                  isActive
                    ? "text-amber-200"
                    : "text-slate-100/80 hover:text-amber-200"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Main nav – MOBILE (scrollable) */}
        <nav className="flex md:hidden flex-1 items-center gap-4 overflow-x-auto text-[14px] font-medium text-slate-100/85">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap transition-colors hover:text-amber-200"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Language pill – more readable & premium */}
        <div className="ml-3 flex items-center rounded-full border border-amber-300/60 bg-black/85 px-2.5 py-1 text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-white/70 shadow-[0_0_18px_rgba(0,0,0,0.7)]">
          {SUPPORTED_LOCALES.map((lng, idx) => {
            const targetHref = switchLocaleInPath(pathname, lng);
            const isActive = lng === locale;
            return (
              <Link
                key={lng}
                href={targetHref}
                className={[
                  "rounded-full px-2.5 py-0.5 transition-colors",
                  isActive
                    ? "bg-[#F6C859] text-black font-semibold"
                    : "text-white/75 hover:text-white hover:bg-white/10",
                  idx === 0 ? "" : "ml-1.5",
                ].join(" ")}
              >
                {lng.toUpperCase()}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}