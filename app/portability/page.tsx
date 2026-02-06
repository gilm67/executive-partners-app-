// app/portability/page.tsx
import type { Metadata } from "next";
import dynamic from 'next/dynamic';

const PortabilityClient = dynamic(
  () => import('./portability-client'),
  { ssr: false }
);

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://www.execpartners.ch");

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Portability Score Calculator | Executive Partners",
  description:
    "Calculate your AUM portability score in minutes. Free tool for private bankers planning a strategic move.",
  alternates: { canonical: `${SITE}/portability` },
  openGraph: {
    title: "Portability Score Calculator | Executive Partners",
    description:
      "Assess your book's portability potential across markets in 5 minutes.",
    url: `${SITE}/portability`,
    images: [{ url: "/og.png" }],
  },
};

export default function PortabilityPage() {
  return <PortabilityClient />;
}