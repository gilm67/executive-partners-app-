// lib/insights/posts.ts
// this assumes you have `data/articles.json` in the repo
// and that `resolveJsonModule` is ON in tsconfig
import articlesJson from "../../data/articles.json";

export type Insight = {
  title: string;
  linkedin: string;
  date?: string;
  excerpt?: string;
  href: string;
  tag: "Article" | "Private Wealth Pulse";
};

// -------------- slug helper (use everywhere) --------------
export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// -------------- list --------------
export function getAllInsights(): Insight[] {
  // make it safe in case the JSON is empty or not an array
  const arr = (Array.isArray(articlesJson) ? articlesJson : []) as any[];

  return arr.map((item) => {
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

// -------------- single item --------------
/**
 * Find one insight by slug.
 * We compare using the same slugify() so titles / hyphens / accents
 * don’t break the lookup.
 */
export function getInsightBySlug(slug: string): Insight | null {
  const all = getAllInsights();
  const wanted = slugify(slug);

  // 1) exact slug match
  const exact = all.find((x) => slugify(x.title) === wanted);
  if (exact) return exact;

  // 2) loose match (in case LinkedIn changed the title slightly)
  const loose = all.find((x) => slugify(x.title).startsWith(wanted));
  return loose ?? null;
}