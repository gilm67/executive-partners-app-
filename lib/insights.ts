// lib/insights.ts
import fs from "fs";
import path from "path";

export type Insight = {
  title: string;
  linkedin: string;
  date?: string;
  excerpt?: string;
  href: string;
  tag: "Article" | "Private Wealth Pulse";
};

export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function fetchRemote(): Promise<Insight[]> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.execpartners.ch";
  const url = `${base.replace(/\/$/, "")}/data/articles.json`;

  const res = await fetch(url, { next: { revalidate: 1800 } });
  if (!res.ok) throw new Error("remote articles.json not found");
  const data = (await res.json()) as any[];
  return normalize(data);
}

function normalize(data: any[]): Insight[] {
  const cleaned = data
    .filter((item) => item && item.title)
    .filter((item) => item.linkedin)
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

  const seen = new Set<string>();
  const unique: Insight[] = [];
  for (const it of cleaned) {
    if (seen.has(it.href)) continue;
    seen.add(it.href);
    unique.push(it);
  }
  return unique;
}

/**
 * First try remote (/public/data/articles.json on Vercel),
 * if it fails, fall back to local file in repo.
 */
export async function getInsights(): Promise<Insight[]> {
  try {
    return await fetchRemote();
  } catch (err) {
    // fallback: local file
    try {
      const filePath = path.join(process.cwd(), "public", "data", "articles.json");
      const raw = fs.readFileSync(filePath, "utf8");
      const data = JSON.parse(raw) as any[];
      return normalize(data);
    } catch (err2) {
      console.error("Error reading articles.json (both remote and local):", err2);
      return [];
    }
  }
}