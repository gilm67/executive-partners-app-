// app/en/insights/articles.ts

export type InsightArticle = {
  slug: string;
  title: string;
  date: string; // ISO: YYYY-MM-DD
  markets: readonly string[];
  summary: string;
  linkedinUrl: string;

  // ✅ New
  featured?: boolean; // shown on /insights
  engagementScore?: number; // used to rank "Popular"
};

export const INSIGHTS: readonly InsightArticle[] = [
  {
    slug: "investment-advisor-replacing-rm",
    title:
      "The Investment Advisor Is Quietly Replacing the Relationship Manager — And Most Banks Are Not Ready",
    date: "2026-02-03",
    markets: ["CH", "UK", "US", "UAE", "Asia"],
    summary:
      "Private banking is shifting: portfolios and performance are now the centre of gravity. Investment Advisors are increasingly driving client retention, while many RM models remain misaligned with what clients value most.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/investment-advisor-quietly-replacing-relationship-gil-m-chalem--rdtoe/",
    featured: true,
    engagementScore: 92,
  },
  {
    slug: "family-office-revolution",
    title:
      "The Family Office Revolution: From Privilege to Power — And the Reckoning That Comes With It",
    date: "2026-01-27",
    markets: ["CH", "UK", "US", "UAE", "Asia"],
    summary:
      "Family offices are no longer discreet satellites of private banks — they are becoming competing ecosystems. The growth is structural, and it is reshaping mandates, talent, and how UHNW clients allocate capital globally.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/family-office-revolution-from-privilege-power-comes-gil-m-chalem--1o96e/",
    featured: true,
    engagementScore: 80,
  },
  {
    slug: "ubs-unbeatable",
    title: "UBS Just Became Unbeatable",
    date: "2026-01-20",
    markets: ["CH", "UK", "US", "UAE", "Asia"],
    summary:
      "Scale, capital, and platform depth are redefining competitive advantage. UBS is consolidating a position that changes hiring patterns, client expectations, and the strategic options available to other private banking players.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/ubs-just-became-unbeatable-gil-m-chalem--pchae/",
    featured: true,
    engagementScore: 74,
  },

  // ✅ Add your older articles below (recommended format)
  // {
  //   slug: "your-older-article-slug",
  //   title: "Title…",
  //   date: "2025-10-14",
  //   markets: ["CH", "UK"],
  //   summary: "2–3 lines…",
  //   linkedinUrl: "https://www.linkedin.com/pulse/…",
  //   featured: false,
  //   engagementScore: 55,
  // },
] as const;