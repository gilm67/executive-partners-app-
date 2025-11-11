// lib/insights/posts.ts
import articlesJson from "../../data/articles.json";

export type Insight = {
  title: string;
  linkedin: string;
  date: string;
  excerpt: string;
  href: string;
  tag: "Article" | "Private Wealth Pulse";
};

export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getAllInsights(): Insight[] {
  const arr = (articlesJson as any[]) || [];

  return arr.map((item) => {
    const title = String(item.title || "").trim();
    const linkedin = String(item.linkedin || "").trim();
    const date = String(item.date || "").trim();
    const excerpt = String(item.excerpt || "").trim();

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

export function getInsightBySlug(slug: string): Insight | null {
  const all = getAllInsights();
  const norm = slug.toLowerCase();

  // exact
  const exact = all.find((x) => slugify(x.title) === norm);
  if (exact) return exact;

  // tolerant
  const loose = all.find((x) => slugify(x.title).startsWith(norm));
  return loose ?? null;
}