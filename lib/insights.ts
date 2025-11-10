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
function slugify(title: string) {
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

    return data.map((item) => ({
      title: item.title,
      linkedin: item.linkedin,
      date: item.date || "",
      excerpt: item.excerpt || "",
      href: "/insights/" + slugify(item.title),
      tag: "Article",
    }));
  } catch (err) {
    console.error("Error reading articles.json:", err);
    return [];
  }
}