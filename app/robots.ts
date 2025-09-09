// app/robots.ts
import type { MetadataRoute } from "next";

function siteBase() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "https://www.execpartners.ch";
  const url = raw.startsWith("http") ? raw : `https://${raw}`;
  return url.replace(/\/+$/, "");
}

export default function robots(): MetadataRoute.Robots {
  const SITE = siteBase();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [`${SITE}/sitemap.xml`, `${SITE}/rss.xml`],
  };
}