// lib/insights/posts.ts
import rawArticles from "../../data/articles.json";

export type Insight = {
  title: string;
  linkedin: string;
  date: string; // simple display string, no guessing
  excerpt: string;
  href: string;
  tag: "Article" | "Private Wealth Pulse";
};

// same slug logic everywhere
export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type Raw = {
  title: string;
  linkedin: string;
  date?: string;
  excerpt?: string;
};

export function getAllInsights(): Insight[] {
  const arr = (rawArticles as Raw[]) || [];

  const mapped = arr
    .filter((item) => item && item.title && item.linkedin)
    .map((item) => {
      const title = String(item.title).trim();
      const date = String(item.date ?? "").trim();       // 🔹 no guessing
      const excerpt = String(item.excerpt ?? "").trim();
      const linkedin = String(item.linkedin ?? "").trim();

      return {
        title,
        linkedin,
        date,                                           // just pass through
        excerpt,
        href: "/insights/" + slugify(title),
        tag: "Article" as const,
      };
    });

  // de-duplicate by href
  const seen = new Set<string>();
  const out: Insight[] = [];
  for (const it of mapped) {
    if (seen.has(it.href)) continue;
    seen.add(it.href);
    out.push(it);
  }
  return out;
}

/** Find one insight by slug (tolerant) */
export function getInsightBySlug(slug: string): Insight | null {
  const all = getAllInsights();
  const norm = slug.toLowerCase();

  const exact = all.find((x) => slugify(x.title) === norm);
  if (exact) return exact;

  const loose = all.find((x) => slugify(x.title).startsWith(norm));
  return loose ?? null;
}