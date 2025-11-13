// lib/insights/posts.ts

import rawArticles from "../../data/articles.json";

export type Insight = {
  title: string;
  linkedin: string;
  date: string;
  excerpt: string;
  href: string; // internal link
  tag: "Article" | "Private Wealth Pulse";
};

// same slug logic everywhere
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// normalise the JSON into our internal shape
export function getAllInsights(): Insight[] {
  const arr = (rawArticles as any[]) || [];

  return arr
    .filter((item) => item && item.title && item.linkedin)
    .map((item) => {
      const title = String(item.title || "").trim();
      const date = String(item.date || "").trim();
      const excerpt = String(item.excerpt || "").trim();
      const linkedin = String(item.linkedin || "").trim();

      return {
        title,
        linkedin,
        date,
        excerpt,
        href: "/insights/" + slugify(title),
        tag: "Article",
      };
    });
}

/** Find one insight by slug. */
export function getInsightBySlug(slug: string): Insight | null {
  const all = getAllInsights();
  const norm = slug.toLowerCase();

  // exact slug match first
  const exact = all.find((x) => slugify(x.title) === norm);
  if (exact) return exact;

  // fallback: startsWith (tolerant if you later tweak titles)
  const loose = all.find((x) => slugify(x.title).startsWith(norm));
  return loose ?? null;
}