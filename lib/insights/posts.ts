// lib/insights/posts.ts
import rawArticles from "../../data/articles.json";

export type Insight = {
  title: string;
  linkedin: string;
  date: string;          // always a string (can be ISO or just a label)
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

/**
 * If the JSON date is empty, infer a coarse date (year) from the text.
 * This is just to have something displayable on the cards.
 */
function coerceDate(raw: Raw): string {
  const d = (raw.date ?? "").trim();
  if (d) return d; // already provided in JSON

  const text = `${raw.title} ${raw.excerpt ?? ""}`;

  if (text.includes("2025")) return "2025-01-01";
  if (text.includes("2024")) return "2024-01-01";
  if (text.includes("2023")) return "2023-01-01";

  // fallback: no date
  return "";
}

/** Turn data/articles.json into usable insights */
export function getAllInsights(): Insight[] {
  const arr = (rawArticles as Raw[]) || [];

  const mapped = arr
    .filter((item) => item && item.title && item.linkedin)
    .map((item) => {
      const title = String(item.title).trim();
      const date = coerceDate(item);
      const excerpt = String(item.excerpt ?? "").trim();
      const linkedin = String(item.linkedin ?? "").trim();

      return {
        title,
        linkedin,
        date,
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

  // exact
  const exact = all.find((x) => slugify(x.title) === norm);
  if (exact) return exact;

  // tolerant: slug is prefix of generated slug
  const loose = all.find((x) => slugify(x.title).startsWith(norm));
  return loose ?? null;
}