"use client";

import {useTransition} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

const LOCALES = ["en", "fr", "de"] as const;
type Locale = (typeof LOCALES)[number];

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Detect current locale from the first URL segment
  const seg1 = pathname.split("/")[1];
  const currentLocale: Locale = (LOCALES as readonly string[]).includes(seg1)
    ? (seg1 as Locale)
    : "en";

  function switchTo(nextLocale: Locale) {
    const qs = searchParams?.toString();
    const rest = (LOCALES as readonly string[]).includes(seg1)
      ? pathname.split("/").slice(2).join("/") // strip current locale
      : pathname.replace(/^\//, ""); // no locale segment yet

    const newPath = `/${nextLocale}${rest ? `/${rest}` : ""}${qs ? `?${qs}` : ""}`;

    startTransition(() => {
      router.replace(newPath);
    });
  }

  return (
    <div className="flex items-center gap-2">
      {LOCALES.map((code) => (
        <button
          key={code}
          onClick={() => switchTo(code)}
          className={`rounded px-2 py-1 text-xs border transition ${
            currentLocale === code
              ? "border-emerald-400 text-emerald-400"
              : "border-white/20 text-white/70 hover:text-white"
          }`}
          disabled={isPending}
          aria-current={currentLocale === code ? "true" : "false"}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
