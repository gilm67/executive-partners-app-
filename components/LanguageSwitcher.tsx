"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

const LOCALES = ["en", "fr", "de"] as const;

function switchLocaleInPath(pathname: string, targetLocale: string) {
  // assumes routes like /en/... /fr/... /de/...
  const segments = pathname.split("/");
  if (LOCALES.includes(segments[1] as any)) {
    segments[1] = targetLocale;
  } else {
    // If someone is on / (root), just prefix
    return `/${targetLocale}${pathname === "/" ? "" : pathname}`;
  }
  return segments.join("/") || "/";
}

export default function LanguageSwitcher() {
  const pathname = usePathname() || "/";

  return (
    <div className="flex items-center gap-2 rounded-full border border-amber-400/40 bg-slate-900/60 px-2 py-1 text-xs">
      {LOCALES.map((locale) => {
        const href = switchLocaleInPath(pathname, locale);
        const isActive = pathname.startsWith(`/${locale}`);

        return (
          <Link
            key={locale}
            href={href}
            className={clsx(
              "px-2 py-0.5 rounded-full uppercase tracking-[0.15em]",
              "transition text-[10px] md:text-[11px]",
              isActive
                ? "bg-amber-400 text-slate-950 font-semibold"
                : "text-slate-300 hover:text-amber-300"
            )}
          >
            {locale}
          </Link>
        );
      })}
    </div>
  );
}