// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getRedis } from "@/lib/redis";

type JobHash = {
  slug?: string;
  title?: string;
  updatedAt?: string;
  createdAt?: string;
  active?: string; // "true" | "false"
};

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://execpartners.ch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/jobs`, changeFrequency: "hourly", priority: 0.8 },
    { url: `${BASE}/candidates`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/hiring-managers`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/bp-simulator`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${BASE}/contact`, changeFrequency: "monthly", priority: 0.5 },
  ];

  try {
    const redis = await getRedis();

    // Prefer the index you maintain when creating/updating jobs
    const ids: string[] = (await redis.smembers("jobs:index")) || [];

    const jobRoutes: MetadataRoute.Sitemap = [];
    for (const id of ids) {
      const h = (await redis.hgetall(id)) as unknown as JobHash;
      if (!h?.slug) continue;
      // include only if not explicitly inactive
      if (h.active === "false") continue;

      const lastmod =
        h.updatedAt || h.createdAt || new Date().toISOString();

      jobRoutes.push({
        url: `${BASE}/jobs/${h.slug}`,
        lastModified: lastmod,
        changeFrequency: "daily",
        priority: 0.8,
      });
    }

    return [...staticRoutes, ...jobRoutes];
  } catch {
    // On any Redis error, at least return the static pages
    return staticRoutes;
  }
}