// lib/insights/posts.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Insight = {
  title: string;
  linkedin?: string;
  date?: string;          // simple display string
  excerpt?: string;
  href: string;
  tag?: "Article" | "Private Wealth Pulse" | string;
};

// same slug logic everywhere
export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const INSIGHTS_DIR = path.join(process.cwd(), "content", "insights");

export function getAllInsights(): Insight[] {
  const files = fs
    .readdirSync(INSIGHTS_DIR)
    .filter((file) => file.endsWith(".mdx"));

  const mapped: Insight[] = files.map((file) => {
    const fullPath = path.join(INSIGHTS_DIR, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    const fm = data as any;

    const title: string = (fm.title ?? file.replace(/\.mdx$/, "")).trim();
    const date: string = (fm.date ?? "").trim();
    const excerpt: string =
      (fm.excerpt ?? fm.ogDescription ?? fm.description ?? "").trim();
    const linkedin: string | undefined = fm.linkedin?.toString().trim();

    // slug comes from filename so URLs stay stable
    const slug = file.replace(/\.mdx$/, "");

    // tag: prefer explicit `tag`, then first of `tags[]`, default to "Article"
    let tag: string | undefined = fm.tag;
    if (!tag && Array.isArray(fm.tags) && fm.tags.length > 0) {
      tag = fm.tags[0];
    }
    if (!tag) tag = "Article";

    return {
      title,
      linkedin,
      date,
      excerpt,
      href: `/insights/${slug}`,
      tag,
    };
  });

  // sort newest first by date (if present)
  mapped.sort((a, b) => {
    const ad = (a.date || "").trim();
    const bd = (b.date || "").trim();

    if (!ad && !bd) return 0;
    if (!ad) return 1;
    if (!bd) return -1;

    const da = Date.parse(ad);
    const db = Date.parse(bd);

    if (Number.isNaN(da) || Number.isNaN(db)) return 0;
    return db - da;
  });

  return mapped;
}

/** Find one insight by slug (tolerant) */
export function getInsightBySlug(slug: string): Insight | null {
  const all = getAllInsights();
  const norm = slug.toLowerCase();

  // 1) try filename-based match (since href uses slug from filename)
  const exactFile = all.find((x) => x.href.endsWith("/" + norm));
  if (exactFile) return exactFile;

  // 2) fall back to title-based slug
  const exact = all.find((x) => slugify(x.title) === norm);
  if (exact) return exact;

  const loose = all.find((x) => slugify(x.title).startsWith(norm));
  return loose ?? null;
}