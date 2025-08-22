import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://execpartners.ch";
  const now = new Date().toISOString();

  return [
    { url: `${base}/`,                 lastModified: now, changeFrequency: "daily",   priority: 1.0 },
    { url: `${base}/about`,            lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/business-model`,   lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/business-simulator`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/hiring-managers`,  lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/candidates`,       lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`,          lastModified: now, changeFrequency: "yearly",  priority: 0.7 },
  ];
}
