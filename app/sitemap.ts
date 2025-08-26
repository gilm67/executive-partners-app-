import type { MetadataRoute } from "next";
import { getRedis } from "@/lib/redis";

export const dynamic = "force-dynamic";

const BASE = "https://jobs.execpartners.ch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/jobs`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/candidates`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/hiring-managers`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/bp-simulator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  try {
    const redis = await getRedis();
    const ids = await redis.zRange("jobs:index", 0, 200, { REV: true });
    const jobs = await Promise.all(ids.map((id) => redis.hGetAll(id)));

    const jobUrls: MetadataRoute.Sitemap = jobs
      .filter((j) => j && j.slug && j.active !== "false")
      .map((j) => ({
        url: `${BASE}/jobs/${j.slug}`,
        lastModified: j.createdAt ? new Date(j.createdAt) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));

    return [...staticPages, ...jobUrls];
  } catch {
    // If Redis fails, still return the static pages so the route never 500s.
    return staticPages;
  }
}
