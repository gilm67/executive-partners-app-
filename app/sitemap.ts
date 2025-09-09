// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllJobsPublic } from "@/lib/jobs-public";

/** Build a clean absolute base URL */
function siteBase() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/$/, "");
  }
  return "https://www.execpartners.ch";
}

/** Normalize URL (avoid double slashes, remove trailing slash except root) */
function normalize(url: string) {
  const cleaned = url.replace(/([^:]\/)\/+/g, "$1");
  if (cleaned === "https://www.execpartners.ch/") return cleaned;
  return cleaned.replace(/\/$/, "");
}

type PublicJob = {
  slug?: string;
  active?: boolean;
  updatedAt?: string;
  createdAt?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteBase();
  const now = new Date();

  // --- Static pages you want indexed ---
  const staticPages = [
    "/", // home
    "/jobs",
    "/candidates",
    "/hiring-managers",
    "/insights",
    "/about",
    "/contact",
  ];

  // Start with static entries
  const entries: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: normalize(`${base}${p}`),
    lastModified: now,
    changeFrequency: p === "/" ? "daily" : "weekly",
    priority: p === "/" ? 1 : 0.7,
  }));

  // --- Dynamic job pages ---
  let jobs: PublicJob[] = [];
  try {
    const data = await getAllJobsPublic();
    jobs = Array.isArray(data) ? (data as PublicJob[]) : [];
  } catch {
    jobs = [];
  }

  for (const j of jobs) {
    if (!j?.slug) continue;
    if (j.active === false) continue; // skip inactive

    // prefer updatedAt, then createdAt, else now
    const ts =
      (j.updatedAt && new Date(j.updatedAt)) ||
      (j.createdAt && new Date(j.createdAt)) ||
      now;

    entries.push({
      url: normalize(`${base}/jobs/${j.slug}`),
      lastModified: ts,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // De-duplicate (just in case)
  const seen = new Set<string>();
  const deduped = entries.filter((e) => {
    const key = e.url;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return deduped;
}