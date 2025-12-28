// app/jobs/[slug]/page.tsx
import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

function siteBase() {
  const env =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "https://www.execpartners.ch";
  const url = env.startsWith("http") ? env : `https://${env}`;
  return url.replace(/\/$/, "");
}

export const dynamic = "force-dynamic";

// ✅ Optional: keep this route out of Google (it will redirect anyway)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const base = siteBase();
  const canonical = `${base}/en/jobs/${encodeURIComponent(slug)}`;

  return {
    title: "Redirecting… | Executive Partners",
    alternates: { canonical },
    robots: { index: false, follow: true }, // legacy URL
  };
}

export default async function LegacyJobDetailRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // ✅ Permanent redirect: /jobs/:slug -> /en/jobs/:slug
  permanentRedirect(`/en/jobs/${slug}`);
}