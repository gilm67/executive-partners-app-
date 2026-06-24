import type { Metadata } from "next";
import Link from "next/link";
import { INSIGHTS_FR } from "./articles";

const SITE = "https://www.execpartners.ch";

export const metadata: Metadata = {
  title: { absolute: "Insights Banque Privée | Articles et Analyses | Executive Partners" },
  description: "Articles et analyses sur le recrutement en banque privée, les salaires et les tendances du marché à Genève, Zurich et dans les grandes places financières mondiales.",
  alternates: { canonical: `${SITE}/fr/insights` },
  robots: { index: true, follow: true },
};

export default function FrInsightsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 text-white">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#C9A14A]">
        Insights
      </div>
      <h1 className="text-3xl font-semibold text-white mb-2">
        Banque Privée — Analyses et Marché
      </h1>
      <p className="text-white/60 mb-10 text-sm">
        Articles de terrain sur le recrutement senior, les salaires et les dynamiques de marché en banque privée.
      </p>
      <div className="space-y-6">
        {INSIGHTS_FR.map((article) => (
          <Link
            key={article.slug}
            href={`/fr/insights/${article.slug}`}
            className="block rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
          >
            <div className="flex items-center gap-3 text-xs text-white/50 mb-2">
              <time dateTime={article.date}>{new Date(article.date).toLocaleDateString("fr-CH", { day: "numeric", month: "long", year: "numeric" })}</time>
              <span>·</span>
              <span>{article.readTime} de lecture</span>
            </div>
            <h2 className="text-lg font-semibold text-white mb-2">{article.title}</h2>
            <p className="text-white/60 text-sm leading-relaxed">{article.summary}</p>
            <div className="mt-3 text-xs text-[#C9A14A]">Lire l&apos;article →</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
