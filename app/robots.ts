import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const isVercelPreview =
    process.env.VERCEL_ENV !== "production";

  return {
    rules: isVercelPreview
      ? {
          userAgent: "*",
          disallow: "/",
        }
      : {
          userAgent: "*",
          allow: "/",
        },
    sitemap: "https://www.execpartners.ch/sitemap.xml",
  };
}