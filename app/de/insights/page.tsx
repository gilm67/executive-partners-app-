import type { Metadata } from "next";
import Link from "next/link";
import { INSIGHTS_DE } from "./articles";

const SITE = "https://www.execpartners.ch";

export const metadata: Metadata = {
  title: "Insights auf Deutsch | Private Banking Schweiz | Executive Partners",
  description:
    "Fact-checked Marktanalysen für Senior Private Banker in Zürich und der Deutschschweiz. UBS-Integration, FINMA-Regulierung, Kompensation und Portabilität.",
  alternates: {
    canonical: `${SITE}/de/insights`,
    languages: { en: `${SITE}/en/insights`, de: `${SITE}/de/insights` },
  },
  openGraph: {
    title: "Insights auf Deutsch | Executive Partners",
    description: "Marktanalysen und Talentsignale im Schweizer Private Banking.",
    locale: "de_CH",
    type: "website",
    siteName: "Executive Partners",
    images: [{ url: `${SITE}/og.webp` }],
  },
};

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat("de-CH", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export default function DeInsightsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-14">
      <nav className="text-xs text-white/60">
        <Link href="/en" className="hover:text-white">Home</Link>
        <span className="mx-1">/</span>
        <Link href="/en/insights" className="hover:text-white">Insights</Link>
        <span className="mx-1">/</span>
        <span className="text-white/80">Deutsch</span>
      </nav>

      <div className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
          Insights auf Deutsch
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-white">
          Private Banking Schweiz
        </h1>
        <p className="mt-2 text-sm text-white/70">
          Fact-checked Marktanalysen für Senior Private Banker in Zürich und der Deutschschweiz.
        </p>
      </div>

      <div className="mt-8 grid gap-5">
        {INSIGHTS_DE.map((article) => (
          <Link
            key={article.slug}
            href={`/de/insights/${article.slug}`}
            className="block rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/[0.08]"
          >
            <div className="flex items-center gap-3 text-xs text-white/60">
              <time>{formatDate(article.date)}</time>
              <span>·</span>
              <span>{article.readTime} Lesezeit</span>
            </div>
            <h2 className="mt-2 text-lg font-semibold text-white">
              {article.title}
            </h2>
            <p className="mt-2 text-sm text-white/70">{article.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {article.markets.map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
                >
                  {m === "CH" ? "Switzerland" : m}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 border-t border-white/10 pt-6">
        <Link href="/en/insights" className="text-sm text-white/60 hover:text-white">
          ← Back to English Insights
        </Link>
      </div>
    </main>
  );
}