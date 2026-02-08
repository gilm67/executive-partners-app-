import { INSIGHTS, type InsightArticle } from "@/app/en/insights/articles";

export function getPopularInsights(limit = 6): InsightArticle[] {
  return [...INSIGHTS]
    .filter((a) => typeof a.engagementScore === "number")
    .sort((a, b) => (b.engagementScore ?? 0) - (a.engagementScore ?? 0))
    .slice(0, limit);
}

export function getFeaturedInsights(limit = 6): InsightArticle[] {
  return [...INSIGHTS]
    .filter((a) => a.featured === true)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .slice(0, limit);
}