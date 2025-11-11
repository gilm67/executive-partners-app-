// lib/insights/posts.ts

export type InsightPost = {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  linkedinUrl: string;
};

export const INSIGHTS: InsightPost[] = [
  {
    title: "What Netflix Knows and Your Wealth Firm Doesn’t",
    slug: "what-netflix-knows-your-wealth-firm-doesnt",
    date: "2025-11-05",
    excerpt:
      "Client experience in wealth is still years behind streaming. Here’s what private banks can copy from Netflix.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/what-netflix-knows-your-wealth-firm-doesnt-gil-m-chalem--ffyye/",
  },
  {
    title: "Swiss Private Banking: Thriving Against the Odds",
    slug: "swiss-private-banking-thriving-against-odds",
    date: "2025-10-29",
    excerpt:
      "Despite consolidation and regulation, Swiss private banking is expanding again in key UHNW segments.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/swiss-private-banking-thriving-against-odds-gil-m-chalem--ztl5e/",
  },
  {
    title: "La Dolce Vita Returns: Why Italy Has Become Europe’s New Wealth Magnet",
    slug: "la-dolce-vita-returns-italy-wealth-magnet",
    date: "2025-10-21",
    excerpt:
      "Italy’s tax regime is attracting UHNW families, bankers and asset managers. Here’s what it means for hiring.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/la-dolce-vita-returns-why-italy-has-become-europes-gil-m-chalem--xfrre/",
  },
  {
    title:
      "What Do Gen Z Want from Wealth Managers — and How Fast Is the Industry Shifting?",
    slug: "what-gen-z-want-from-wealth-managers",
    date: "2025-10-14",
    excerpt:
      "Next-gen clients don’t just want returns. They want access, transparency and digital-first advisory.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/what-do-gen-z-want-from-wealth-managers-how-fast-gil-m-chalem--akpre/",
  },
];