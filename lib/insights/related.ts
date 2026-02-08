// lib/insights/related.ts
import { INSIGHTS, type InsightArticle } from "@/app/en/insights/articles";

const yearOf = (iso: string) => (iso || "").slice(0, 4);

function overlapCount<T extends readonly string[]>(a: T, b: T) {
  const set = new Set(a);
  let n = 0;
  for (const x of b) if (set.has(x)) n++;
  return n;
}

export function getRelatedInsights(current: InsightArticle, limit = 4) {
  const currentYear = yearOf(current.date);
  const currentPillar = current.pillar;
  const currentSub = current.subTheme;

  return INSIGHTS
    .filter((a) => a.slug !== current.slug)
    .map((a) => {
      const samePillar = currentPillar && a.pillar === currentPillar ? 1 : 0;
      const sameSub =
        samePillar && currentSub && a.subTheme === currentSub ? 1 : 0;

      const sharedMarkets = overlapCount(current.markets, a.markets);
      const sameYear = yearOf(a.date) === currentYear ? 1 : 0;

      const engagement = typeof a.engagementScore === "number" ? a.engagementScore : 0;
      const recency = Date.parse(a.date);
      const recencyScore = Number.isNaN(recency) ? 0 : recency / 1e12; // tiny tie-break

      // Priority order:
      // 1) same pillar + subTheme
      // 2) same pillar
      // 3) markets overlap
      // 4) same year
      const score =
        sameSub * 1000 +
        samePillar * 200 +
        sharedMarkets * 10 +
        sameYear * 3 +
        engagement / 25 +
        recencyScore;

      return { a, score };
    })
    .sort((x, y) => y.score - x.score)
    .slice(0, limit)
    .map((x) => x.a);
}