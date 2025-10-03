/* app/portability/page.tsx */
import type { Metadata } from "next";
import PortabilityClient from "./portability-client";
import { getOgImage } from "@/lib/og"; // 👈 NEW

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.execpartners.ch";
const PAGE_URL = `${SITE}/portability`;

/* ---------------- SEO ---------------- */
export const metadata: Metadata = {
  title: "Portability Readiness Score™ | Executive Partners",
  description:
    "Answer 6 quick questions to estimate your client portability readiness (AUM mix, booking centres, cross-border licenses, product scope, and client concentration).",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    siteName: "Executive Partners",
    url: PAGE_URL,
    title: "Portability Readiness Score™",
    description:
      "6-question widget for RMs. Instant score + confidential CTA. No data stored without consent.",
    images: [{ url: getOgImage("/portability"), width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portability Readiness Score™",
    description:
      "Confidential client portability assessment. 6 quick questions, instant score.",
    images: [getOgImage("/portability")],
  },
  robots: { index: true, follow: true },
};

/* ---------------- Page ---------------- */
export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">
        Portability Readiness Score™
      </h1>
      <p className="mt-2 text-sm text-neutral-500">
        6 quick questions. Instant score. Confidential — no data stored without
        your consent.
      </p>
      <div className="mt-8">
        <PortabilityClient />
      </div>
    </div>
  );
}