import type { MetadataRoute } from "next";
import { getIndexableJobs } from "@/lib/jobs";

// Ensure Node APIs available during metadata generation
export const runtime = "nodejs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

  const now = new Date();
  const jobs = await getIndexableJobs();

  return [
    { url: `${base}/`,     lastModified: now },
    { url: `${base}/jobs`, lastModified: now },
    ...jobs.map(j => ({
      url: `${base}/jobs/${j.slug}`,
      lastModified: j.updatedAt ? new Date(j.updatedAt) : now,
    })),
  ];
}
