// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllJobsPublic } from "@/lib/jobs-public";
import { MARKET_SLUGS } from "@/lib/markets/data";

type PublicJob = {
  slug?: string;
  active?: boolean;
  updatedAt?: string;
  createdAt?: string;
};

/** 🔐 Canonical base — NEVER use env or Vercel here */
const CANONICAL_BASE = "https://www.execpartners.ch";

/** If /api/jobs is empty/unavailable, keep these in the sitemap so Jobs stays visible. */
const FALLBACK_JOB_SLUGS: string[] = [
  "senior-relationship-manager-mea-dubai",
  "senior-relationship-manager-brazil-ch",
  "senior-relationship-manager-ch-onshore-zurich",
  "senior-relationship-manager-ch-onshore-lausanne",
  "senior-relationship-manager-portugal-geneva",
];

/** Curated Insights */
const INSIGHTS_POSTS: Array<{ slug: string; dateISO?: string; priority?: number }> = [
  { slug: "swiss-private-banking-weekly-update-sep-2025", dateISO: "2025-09-08", priority: 0.75 },
  { slug: "agility-small-bankers-win", dateISO: "2025-09-09", priority: 0.8 },
];

/** Normalize URL against canonical base */
function normalize(base: string, path: string): string {
  const raw = `${base}${path.startsWith("/") ? path : `/${path}`}`;
  const collapsed = raw.replace(/([^:]\/)\/+/g, "$1");
  return collapsed === `${base}/` ? `${base}/` : collapsed.replace(/\/+$/, "");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = CANONICAL_BASE;
  const now = new Date();
  const nowISO = now.toISOString();

  // --- Static pages ---
  const staticPages: string[] = [
    "/", "/en",

    "/jobs",
    "/apply",
    "/candidates",
    "/hiring-managers",
    "/insights",
    "/about",
    "/contact",

    "/private-banking-jobs-switzerland",
    "/private-banking-jobs-dubai",
    "/private-banking-jobs-singapore",
    "/private-banking-jobs-london",
    "/private-banking-jobs-new-york",
    "/private-banking-jobs-geneva",
    "/private-banking-jobs-zurich",

    "/en/jobs",
    "/en/apply",
    "/en/candidates",
    "/en/hiring-managers",
    "/en/insights",
    "/en/about",
    "/en/contact",
    "/en/markets",
    "/en/private-banker-jobs",
    "/en/portability",
    "/en/bp-simulator",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: normalize(base, p),
    lastModified: now,
    changeFrequency:
      p === "/" || p === "/en" || p === "/insights" || p === "/en/insights"
        ? "daily"
        : "weekly",
    priority:
      p === "/" || p === "/en"
        ? 1
        : p === "/insights" || p === "/en/insights"
        ? 0.8
        : 0.7,
  }));

  // --- Dynamic job pages ---
  let jobs: PublicJob[] = [];
  try {
    const data = await getAllJobsPublic();
    jobs = Array.isArray(data) ? data : [];
  } catch {
    // silent fail in production
  }

  if (!jobs.length) {
    jobs = FALLBACK_JOB_SLUGS.map((slug) => ({
      slug,
      active: true,
      createdAt: nowISO,
    }));
  }

  const jobEntries: MetadataRoute.Sitemap = jobs
    .filter((j) => j?.slug && j?.active !== false)
    .map((j) => {
      const last =
        (j.updatedAt && new Date(j.updatedAt)) ||
        (j.createdAt && new Date(j.createdAt)) ||
        now;

      return {
        url: normalize(base, `/jobs/${j.slug!}`),
        lastModified: last,
        changeFrequency: "weekly",
        priority: 0.8,
      };
    });

  // --- Markets ---
  const marketEntries: MetadataRoute.Sitemap = MARKET_SLUGS.flatMap((slug) => [
    {
      url: normalize(base, `/en/markets/${slug}`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: normalize(base, `/en/private-banker-jobs/${slug}`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
  ]);

  // --- Insights ---
  const insightsEntries: MetadataRoute.Sitemap = INSIGHTS_POSTS.map((p) => ({
    url: normalize(base, `/insights/${p.slug}`),
    lastModified: p.dateISO ? new Date(p.dateISO) : now,
    changeFrequency: "weekly",
    priority: p.priority ?? 0.75,
  }));

  // --- De-duplicate ---
  const seen = new Set<string>();
  return [
    ...staticEntries,
    ...jobEntries,
    ...marketEntries,
    ...insightsEntries,
  ].filter((e) => {
    if (seen.has(e.url)) return false;
    seen.add(e.url);
    return true;
  });
}