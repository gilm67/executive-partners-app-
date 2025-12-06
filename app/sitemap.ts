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

/** If /api/jobs is empty/unavailable, keep these in the sitemap so Jobs stays visible. */
const FALLBACK_JOB_SLUGS: string[] = [
  "senior-relationship-manager-mea-dubai",
  "senior-relationship-manager-brazil-ch",
  "senior-relationship-manager-ch-onshore-zurich",
  "senior-relationship-manager-ch-onshore-lausanne",
  "senior-relationship-manager-portugal-geneva",
];

/** Curate on-site Insights you’ve published */
const INSIGHTS_POSTS: Array<{ slug: string; dateISO?: string; priority?: number }> = [
  { slug: "swiss-private-banking-weekly-update-sep-2025", dateISO: "2025-09-08", priority: 0.75 },
  { slug: "agility-small-bankers-win", dateISO: "2025-09-09", priority: 0.8 },
];

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
  return collapsed === `${base}/` ? `${base}/` : collapsed.replace(/\/+$/, "");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteBase();
  const now = new Date();
  const nowISO = now.toISOString();

  // --- Static pages (legacy + /en structure) ---
  const staticPages: string[] = [
    "/",          // main home
    "/en",        // EN home

    // Legacy / root pages
    "/jobs",
    "/apply",
    "/candidates",
    "/hiring-managers",
    "/insights",
    "/about",
    "/contact",

    // Regional SEO landings you already had
    "/private-banking-jobs-switzerland",
    "/private-banking-jobs-dubai",
    "/private-banking-jobs-singapore",
    "/private-banking-jobs-london",
    "/private-banking-jobs-new-york",
    "/private-banking-jobs-geneva",
    "/private-banking-jobs-zurich",

    // New EN information architecture
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

  // --- Dynamic job pages from API (legacy /jobs/[slug]) ---
  let jobs: PublicJob[] = [];
  try {
    const data = await getAllJobsPublic();
    jobs = Array.isArray(data) ? (data as PublicJob[]) : [];
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("sitemap getAllJobsPublic error:", err);
    }
  }

  // If jobs API returns nothing, fall back to evergreen slugs
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

  // --- Dynamic market sheets & job-market pages from MARKET_SLUGS ---
  const marketEntries: MetadataRoute.Sitemap = MARKET_SLUGS.flatMap((slug) => {
    const marketUrl = normalize(base, `/en/markets/${slug}`);
    const jobMarketUrl = normalize(base, `/en/private-banker-jobs/${slug}`);

    return [
      {
        url: marketUrl,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.75,
      },
      {
        url: jobMarketUrl,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.75,
      },
    ];
  });

  // --- Insights posts (long-form articles) ---
  const insightsEntries: MetadataRoute.Sitemap = INSIGHTS_POSTS.map((p) => ({
    url: normalize(base, `/insights/${p.slug}`),
    lastModified: p.dateISO ? new Date(p.dateISO) : now,
    changeFrequency: "weekly",
    priority: p.priority ?? 0.75,
  }));

  // --- De-duplicate by URL ---
  const seen = new Set<string>();
  const entries = [
    ...staticEntries,
    ...jobEntries,
    ...marketEntries,
    ...insightsEntries,
  ].filter((e) => {
    if (seen.has(e.url)) return false;
    seen.add(e.url);
    return true;
  });

  return entries;
}