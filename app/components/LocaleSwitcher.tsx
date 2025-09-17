"use client";

import {useTransition} from "react";
// ✅ next-intl hooks must come from the client entry
import {useLocale, usePathname, useRouter} from "next-intl/client";
import {useSearchParams} from "next/navigation";

const LOCALES = [
  {code: "en", label: "EN"},
  {code: "fr", label: "FR"},
  {code: "de", label: "DE"}
];

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function switchTo(nextLocale: string) {
    const qsString = searchParams?.toString();
    const qs = qsString ? `?${qsString}` : "";
    // next-intl router understands the { locale } option
    startTransition(() => {
      router.replace(`${pathname}${qs}`, {locale: nextLocale as "en" | "fr" | "de"});
    });
  }

  return (
    <div className="flex items-center gap-2">
      {LOCALES.map((l) => (
        <button
          key={l.code}
          onClick={() => switchTo(l.code)}
          className={`rounded px-2 py-1 text-xs border transition ${
            locale === l.code
              ? "border-emerald-400 text-emerald-400"
              : "border-white/20 text-white/70 hover:text-white"
          }`}
          disabled={isPending}
          aria-current={locale === l.code ? "true" : "false"}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}