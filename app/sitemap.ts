import type { MetadataRoute } from "next";
import { getAllJobsPublic } from "@/lib/jobs-public";

function siteBase() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // Fallback to prod hostname; adjust if you prefer localhost in dev
  return "https://www.execpartners.ch";
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteBase();
  const now = new Date();

  let jobs: { slug?: string }[] = [];
  try {
    jobs = await getAllJobsPublic();
  } catch {
    jobs = [];
  }

  const entries: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/jobs`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
  ];

  for (const j of jobs) {
    if (!j?.slug) continue;
    entries.push({
      url: `${base}/jobs/${j.slug}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    });
  }

  return entries;
}
