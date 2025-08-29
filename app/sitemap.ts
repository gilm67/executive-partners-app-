// app/sitemap.ts
import type { MetadataRoute } from "next";
import { fetchJobs } from "@/lib/jobs-public";

function siteUrl() {
  // Prefer explicit public URL if set
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  // Fallback to Vercel runtime URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const now = new Date();

  // Static core pages (adjust if you want more/less)
  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/candidates`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/hiring-managers`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/jobs`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
  ];

  let jobEntries: MetadataRoute.Sitemap = [];
  try {
    const jobs = await fetchJobs(); // pulls from https://jobs.execpartners.ch/api/jobs/list
    jobEntries = jobs
      .filter(j => j?.slug)
      .map(j => ({
        url: `${base}/jobs/${j.slug}`,
        lastModified: j.updatedAt ? new Date(j.updatedAt) : now,
        changeFrequency: "daily" as const,
        priority: 0.8,
      }));
  } catch {
    // Swallow errors: sitemap should never 500 due to jobs feed
    jobEntries = [];
  }

  return [...staticEntries, ...jobEntries];
}
