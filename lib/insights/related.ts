// lib/insights/related.ts
import { INSIGHTS, type InsightArticle } from "@/app/en/insights/articles";

const yearOf = (iso: string) => (iso || "").slice(0, 4);

function overlapCount(a: readonly string[], b: readonly string[]) {
  const set = new Set(a);
  let n = 0;
  for (const x of b) if (set.has(x)) n++;
  return n;
}

function safeTime(iso: string) {
  const t = Date.parse(iso);
  return Number.isNaN(t) ? 0 : t;
}

function engagementOf(a: InsightArticle) {
  return typeof a.engagementScore === "number" ? a.engagementScore : 0;
}

/**
 * ✅ Main "Related Insights" ranking
 * Priority order:
 * 1) same pillar + subTheme
 * 2) same pillar
 * 3) markets overlap
 * 4) same year
 * (+ engagement + recency as tie-breakers)
 */
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

      const engagement = engagementOf(a);

      const recencyScore = safeTime(a.date) / 1e12; // tiny tie-break

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

/**
 * ✅ Strict "More from this sub-theme" helper
 * - No fallback, no scoring
 * - Only returns same pillar + same subTheme
 * - Sorted by date desc, then engagement desc
 */
export function getInsightsBySubTheme(current: InsightArticle, limit = 3) {
  if (!current.pillar || !current.subTheme) return [];

  return INSIGHTS
    .filter(
      (a) =>
        a.slug !== current.slug &&
        a.pillar === current.pillar &&
        a.subTheme === current.subTheme
    )
    .sort((a, b) => {
      const dt = safeTime(b.date) - safeTime(a.date);
      if (dt !== 0) return dt;
      return engagementOf(b) - engagementOf(a);
    })
    .slice(0, limit);
}