// lib/mdx.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * The fields you can use in your MDX frontmatter
 */
export type InsightFrontmatter = {
  title: string;
  description?: string;
  date?: string;          // ISO date string, e.g. "2025-09-08"
  author?: string;
  tags?: string[];
  ogTitle?: string;       // optional: custom OG title
  ogDescription?: string; // optional: custom OG description
};

/** Path to your content folder */
const CONTENT_DIR = path.join(process.cwd(), "content/insights");

/**
 * List all slugs (filenames without .mdx extension)
 */
export function listInsightSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/**
 * Get one article by slug
 */
export function getInsightBySlug(slug: string): {
  frontmatter: InsightFrontmatter;
  content: string;
} | null {
  const file = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");

  // Parse frontmatter with gray-matter
  const { data, content } = matter(raw);

  return {
    frontmatter: (data || {}) as InsightFrontmatter,
    content,
  };
}