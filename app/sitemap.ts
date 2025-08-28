// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getRedis } from "@/lib/redis";

type JobHash = {
  slug?: string;
  active?: string; // "true" | "false" | undefined
  updatedAt?: string;
  createdAt?: string;
};

const CANON = process.env.SITEMAP_CANON || "https://execpartners.ch";

/**
 * Collect slugs from Redis. We try two strategies:
 * 1) scan jobs:* hashes and read slug/active/updatedAt
 * 2) fallback to the slug index keys jobs:by-slug:*
 */
async function getJobEntries(): Promise<
  { slug: string; lastMod?: Date }[]
> {
  const redis = await getRedis();
  const out = new Map<string, Date | undefined>();

  // 1) Scan job hashes like jobs:<id>
  try {
    // @ts-ignore Upstash supports scanIterator
    const it = redis.scanIterator({ match: "jobs:*" });
    for await (const key of it as AsyncIterable<string>) {
      if (!/^jobs:\d+/i.test(key)) continue;
      const h = (await redis.hGetAll(key)) as unknown as JobHash;
      if (!h?.slug) continue;
      // include only if not explicitly inactive
      if (h.active === "false") continue;

      const last =
        (h.updatedAt && new Date(h.updatedAt)) ||
        (h.createdAt && new Date(h.createdAt)) ||
        undefined;
      out.set(h.slug, last);
    }
  } catch {
    // ignore and try fallback
  }

  // 2) Fallback: slug index keys
  if (out.size === 0) {
    try {
      // @ts-ignore
      const it = redis.scanIterator({ match: "jobs:by-slug:*" });
      for await (const bySlugKey of it as AsyncIterable<string>) {
        const slug = bySlugKey.replace(/^jobs:by-slug:/, "");
        if (slug) out.set(slug, undefined);
      }
    } catch {
      // ignore
    }
  }

  return Array.from(out.entries()).map(([slug, lastMod]) => ({
    slug,
    lastMod,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${CANON}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${CANON}/jobs`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${CANON}/candidates`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${CANON}/hiring-managers`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${CANON}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${CANON}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const jobs = await getJobEntries();
  const jobPages: MetadataRoute.Sitemap = jobs.map(({ slug, lastMod }) => ({
    url: `${CANON}/jobs/${slug}`,
    lastModified: lastMod ?? now,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [...staticPages, ...jobPages];
}

// Rebuild sitemap frequently to pick up new roles
export const revalidate = 60; // seconds