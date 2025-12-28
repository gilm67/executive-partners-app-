// app/jobs/page.tsx
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

export const metadata: Metadata = {
  title: "Redirecting… | Executive Partners",
  alternates: { canonical: `${siteBase()}/en/jobs` },
  robots: { index: false, follow: true }, // legacy URL
};

export default function LegacyJobsRedirect() {
  permanentRedirect("/en/jobs");
}