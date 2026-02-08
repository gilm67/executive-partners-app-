// lib/insights/related.ts
import { INSIGHTS, type InsightArticle } from "@/app/en/insights/articles";

const yearOf = (iso: string) => (iso || "").slice(0, 4);

const toIsoMs = (iso: string) => {
  const ms = Date.parse(iso);
  return Number.isNaN(ms) ? 0 : ms;
};

const overlapCount = (a: readonly string[], b: readonly string[]) => {
  const setB = new Set(b);
  let n = 0;
  for (const x of a) if (setB.has(x)) n++;
  return n;
};

export function getRelatedInsights(current: InsightArticle, limit = 4) {
  const currentYear = yearOf(current.date);
  const currentPillar = current.pillar;
  const currentSub = current.subTheme;

  // If you want strict "pillar/subTheme first", we compute a tiered score.
  return INSIGHTS
    .filter((a) => a.slug !== current.slug)
    .map((a) => {
      const samePillar =
        !!currentPillar && !!a.pillar && a.pillar === currentPillar ? 1 : 0;

      const sameSubTheme =
        samePillar &&
        !!currentSub &&
        !!a.subTheme &&
        a.subTheme === currentSub
          ? 1
          : 0;

      const sharedMarkets = overlapCount(a.markets, current.markets);
      const sameYear = yearOf(a.date) === currentYear ? 1 : 0;

      const engagement =
        typeof a.engagementScore === "number" ? a.engagementScore : 0;

      const recency = toIsoMs(a.date); // tie-break
      const recencyScore = recency / 1e12; // tiny

      /**
       * Priority tiers:
       * 1) same pillar + subTheme
       * 2) same pillar
       * 3) market overlap
       * 4) same year
       *
       * We keep weights separated so tiering is stable.
       */
      const score =
        sameSubTheme * 1000 +
        samePillar * 300 +
        sharedMarkets * 25 +
        sameYear * 10 +
        engagement / 10 +
        recencyScore;

      return { a, score };
    })
    .sort((x, y) => y.score - x.score)
    .slice(0, limit)
    .map((x) => x.a);
}