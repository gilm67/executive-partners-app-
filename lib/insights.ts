// lib/insights.ts
import fs from "fs";
import path from "path";

export type Insight = {
  title: string;
  linkedin: string;
  date?: string;
  excerpt?: string;
  href: string; // internal link
  tag: "Article" | "Private Wealth Pulse";
};

// generate slug safely from title
export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getInsights(): Insight[] {
  try {
    const filePath = path.join(process.cwd(), "articles.json");
    const raw = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(raw) as any[];

    // normalize + filter bad rows
    const cleaned = data
      .filter((item) => item && item.title) // must have title
      .filter((item) => item.linkedin) // must have original link
      .map((item) => {
        const title = String(item.title).trim();
        const href = "/insights/" + slugify(title);

        return {
          title,
          linkedin: String(item.linkedin).trim(),
          date: item.date ? String(item.date).trim() : "",
          excerpt: item.excerpt ? String(item.excerpt).trim() : "",
          href,
          tag: "Article" as const,
        };
      });

    // dedupe by href (LinkedIn sometimes produces close duplicates)
    const seen = new Set<string>();
    const unique: Insight[] = [];
    for (const it of cleaned) {
      if (seen.has(it.href)) continue;
      seen.add(it.href);
      unique.push(it);
    }

    return unique;
  } catch (err) {
    console.error("Error reading articles.json:", err);
    return [];
  }
}