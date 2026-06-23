// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllJobsPublic, type PublicJob } from "@/lib/jobs-public";
import { MARKET_SLUGS } from "@/lib/markets/data";
import { INSIGHTS } from "@/app/en/insights/articles";

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

/** Normalize URL against canonical base */
function normalize(base: string, path: string): string {
  const raw = `${base}${path.startsWith("/") ? path : `/${path}`}`;
  const collapsed = raw.replace(/([^:]\/)\/+/g, "$1");
  return collapsed === `${base}/` ? `${base}/` : collapsed.replace(/\/+$/, "");
}

/** Coerce active flag (API may return boolean or string) */
function isActive(v: unknown): boolean {
  if (typeof v === "boolean") return v;
  if (typeof v === "string") return v.toLowerCase() === "true";
  return true; // default: include unless explicitly false
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = CANONICAL_BASE;
  const now = new Date();

  // --- Static pages ---
  const staticPages: string[] = [
    "/",

    "/jobs",
    
    "/candidates",
    "/hiring-managers",
    "/insights",
    "/about",
    "/contact",

    "/private-banking-jobs-switzerland",

    "/private-banking-recruiter-switzerland",
    "/private-banking-recruiter-geneva",
    "/private-banking-recruiter-zurich",
    "/private-banking-recruiter-dubai",
    "/private-banking-recruiter-riyadh",
    "/private-banking-recruiter-singapore",
    "/private-banking-recruiter-london",
    "/private-banking-recruiter-hong-kong",
    "/private-banking-recruiter-miami",
    "/private-banking-recruiter-new-york",
    "/private-banking-recruiter-paris",
    "/private-banking-recruiter-madrid",
    "/private-banking-recruiter-lisbon",
    "/private-banking-jobs-dubai",
    "/private-banking-jobs-singapore",
    "/private-banking-jobs-london",
    "/private-banking-jobs-new-york",
    "/private-banking-jobs-geneva",
    "/private-banking-jobs-zurich",

    "/en/jobs",
    
    "/en",
    "/fr",
    "/de",
    "/en/candidates",
    "/en/eam-recruiter-switzerland",
    "/en/wealth-management-recruiter-switzerland",
    "/en/private-banking-headhunter-geneva",
  "/en/private-banking-recruitment-company",
  "/en/latam-private-banking-recruiter-geneva",
  "/en/mea-private-banking-recruiter-geneva",
  "/en/nri-private-banking-recruiter-switzerland",
  "/en/israeli-market-private-banking-switzerland",
    "/en/hiring-managers",
    "/en/insights",
    "/en/about",
    "/en/contact",
    "/en/markets",
    "/en/private-banker-jobs",
    "/en/portability",
    "/en/bp-simulator",
    "/en/subscribe",
    "/de/headhunter-genf",
    "/de/headhunter-zuerich",
    "/en/faq",
    "/en/private-banking-recruiter-geneva",
    "/en/private-banking-recruiter-zurich",
    "/en/private-banking-recruiter-london",
    "/en/private-banking-recruiter-dubai",
    "/en/private-banking-recruiter-riyadh",
    "/en/private-banking-recruiter-singapore",
    "/en/private-banking-recruiter-hong-kong",
    "/en/private-banking-recruiter-new-york",
    "/en/private-banking-recruiter-milan",
    "/en/private-banking-recruiter-miami",
    "/en/private-banking-recruiter-paris",
    "/en/private-banking-recruiter-madrid",
    "/en/private-banking-recruiter-lisbon",
    "/en/private-banker-jobs-riyadh",
    "/en/private-banker-jobs-dubai",
    "/en/private-banker-jobs-geneva",
    "/en/private-banker-jobs-zurich",
    "/en/private-banker-jobs-london",
    "/en/private-banker-jobs-singapore",
    "/en/private-banker-jobs-hong-kong",
    "/en/private-banker-jobs-new-york",
    "/en/private-banker-jobs-miami",
    "/en/private-banker-jobs-paris",
    "/en/private-banker-jobs-madrid",
    "/en/private-banker-jobs-milano",
    "/en/private-banker-jobs-lisbon",

    "/en/executive-search-geneva",
    "/en/private-banking-recruiter-switzerland",
    "/en/private-banking-recruitment-agency",
    "/en/private-banking-recruitment-zurich",
    "/en/private-banking-recruiter-tel-aviv",
    "/en/private-banker-jobs-tel-aviv",
    "/en/markets/tel-aviv",
    "/en/apac-private-banking-recruiter-switzerland",

    // French pages
    "/fr/candidats",
    "/fr/marches/geneve",
    "/fr/marches/zurich",
    "/fr/chasseur-de-tetes-banque-privee-geneve",
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

  // If jobs API returns nothing, fall back to evergreen slugs
  if (!jobs.length) {
    jobs = FALLBACK_JOB_SLUGS.map((slug) => ({ slug, active: true })) as unknown as PublicJob[];
  }

  // IMPORTANT: PublicJob has no createdAt/updatedAt → lastModified = now (safe + valid)
  const jobEntries: MetadataRoute.Sitemap = jobs
    .filter((j) => j?.slug && isActive((j as any).active))
    .map((j) => ({
      url: normalize(base, `/en/jobs/${j.slug!}`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

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
  const insightsEntries: MetadataRoute.Sitemap = INSIGHTS.map((p) => ({
    url: normalize(base, `/en/insights/${p.slug}`),
    lastModified: p.date ? new Date(p.date) : now,
    changeFrequency: "weekly",
    priority: 0.8,
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