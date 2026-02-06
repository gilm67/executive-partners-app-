// lib/insights/related.ts
import { INSIGHTS, type InsightArticle } from "@/app/en/insights/articles";

const yearOf = (iso: string) => (iso || "").slice(0, 4);

export function getRelatedInsights(current: InsightArticle, limit = 4) {
  const currentYear = yearOf(current.date);

  return INSIGHTS
    .filter((a) => a.slug !== current.slug)
    .map((a) => {
      const sharedMarkets = a.markets.filter((m) =>
        current.markets.includes(m)
      ).length;

      const sameYear = yearOf(a.date) === currentYear ? 1 : 0;

      const engagement = typeof a.engagementScore === "number" ? a.engagementScore : 0;

      const recency = Date.parse(a.date);
      const recencyScore = Number.isNaN(recency) ? 0 : recency / 1e12; // tiny tie-break

      const score =
        sharedMarkets * 3 + // main signal
        sameYear * 2 +
        engagement / 25 +
        recencyScore;

      return { a, score };
    })
    .sort((x, y) => y.score - x.score)
    .slice(0, limit)
    .map((x) => x.a);
}