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
  return collapsed === `${base}/` ? `${base}/` : collapsed.replace(/\/+$/, "");
}

type PublicJob = {
  slug?: string;
  active?: boolean;
  updatedAt?: string;
  createdAt?: string;
};

/** If /api/jobs is empty/unavailable, keep these in the sitemap so Jobs stays visible. */
const FALLBACK_JOB_SLUGS = [
  "senior-relationship-manager-mea-dubai",
  "senior-relationship-manager-brazil-ch",
  "senior-relationship-manager-ch-onshore-zurich",
  "senior-relationship-manager-ch-onshore-lausanne",
  "senior-relationship-manager-portugal-geneva",
];

/** Curate on-site Insights you’ve published */
const INSIGHTS_POSTS: Array<{ slug: string; dateISO?: string; priority?: number }> = [
  { slug: "swiss-private-banking-weekly-update-sep-2025", dateISO: "2025-09-08", priority: 0.75 },
  // ✅ New article
  // Set dateISO to the article’s publish date in YYYY-MM-DD (or omit to default to now)
  { slug: "agility-small-bankers-win", dateISO: "2025-09-09", priority: 0.80 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteBase();
  const nowISO = new Date().toISOString();

  // --- Static pages ---
  const staticPages = [
    "/", // home
    "/jobs",
    "/apply",
    "/candidates",
    "/hiring-managers",
    "/insights", // insights hub
    "/about",
    "/contact",
    // Regional landing pages (SEO)
    "/private-banking-jobs-switzerland",
    "/private-banking-jobs-dubai",
    "/private-banking-jobs-singapore",
    "/private-banking-jobs-london",
    "/private-banking-jobs-new-york",
    "/private-banking-jobs-geneva",
    "/private-banking-jobs-zurich",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: normalize(base, p),
    lastModified: nowISO,
    changeFrequency: p === "/" || p === "/insights" ? "daily" : "weekly",
    priority: p === "/" ? 1 : p === "/insights" ? 0.8 : 0.7,
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

  // --- Insights posts (your long-form articles) ---
  const insightsEntries: MetadataRoute.Sitemap = INSIGHTS_POSTS.map((p) => ({
    url: normalize(base, `/insights/${p.slug}`),
    lastModified: p.dateISO ? new Date(p.dateISO).toISOString() : nowISO,
    changeFrequency: "weekly",
    priority: (p.priority ?? 0.75) as 0.75 | 0.8 | 0.7 | 1,
  }));

  // De-duplicate by URL
  const seen = new Set<string>();
  const entries = [...staticEntries, ...jobEntries, ...insightsEntries].filter((e) => {
    if (seen.has(e.url)) return false;
    seen.add(e.url);
    return true;
  });

  return entries;
}