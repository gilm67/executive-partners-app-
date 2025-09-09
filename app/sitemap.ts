// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllJobsPublic } from "@/lib/jobs-public";

/** Build a clean absolute base URL */
function siteBase(): string {
  const env =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "https://www.execpartners.ch";
  const url = env.startsWith("http") ? env : `https://${env}`;
  return url.replace(/\/+$/, "");
}

/** Normalize URL against base: collapse double slashes & drop trailing slash (except root) */
function normalize(base: string, path: string): string {
  const raw = `${base}${path.startsWith("/") ? path : `/${path}`}`;
  const collapsed = raw.replace(/([^:]\/)\/+/g, "$1");
  return collapsed === base + "/" ? base + "/" : collapsed.replace(/\/+$/, "");
}

type PublicJob = {
  slug?: string;
  active?: boolean;
  updatedAt?: string;
  createdAt?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteBase();
  const nowISO = new Date().toISOString();

  // --- Static pages ---
  const staticPages = [
    "/",              // home
    "/jobs",
    "/apply",
    "/candidates",
    "/hiring-managers",
    "/insights",
    "/about",
    "/contact",
    // ✅ New CH landing
    "/private-banking-jobs-switzerland",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: normalize(base, p),
    lastModified: nowISO,
    changeFrequency: p === "/" ? "daily" : "weekly",
    priority: p === "/" ? 1 : 0.7,
  }));

  // --- Dynamic job pages ---
  let jobs: PublicJob[] = [];
  try {
    const data = await getAllJobsPublic();
    jobs = Array.isArray(data) ? (data as PublicJob[]) : [];
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("sitemap getAllJobsPublic error:", err);
    }
    jobs = [];
  }

  const jobEntries: MetadataRoute.Sitemap = jobs
    .filter((j) => j?.slug && j?.active !== false)
    .map((j) => {
      const last =
        (j.updatedAt && new Date(j.updatedAt).toISOString()) ||
        (j.createdAt && new Date(j.createdAt).toISOString()) ||
        nowISO;

      return {
        url: normalize(base, `/jobs/${j.slug!}`),
        lastModified: last,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      };
    });

  // De-duplicate by URL
  const seen = new Set<string>();
  const entries = [...staticEntries, ...jobEntries].filter((e) => {
    if (seen.has(e.url)) return false;
    seen.add(e.url);
    return true;
  });

  return entries;
}