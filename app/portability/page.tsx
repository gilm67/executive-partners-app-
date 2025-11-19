// app/portability/page.tsx
import type { Metadata } from "next";
import { redirect } from "next/navigation";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://www.execpartners.ch");

export const metadata: Metadata = {
  title: "AUM Portability & Market Access | Executive Partners",
  description:
    "Assess AUM portability across booking centres and markets. Tools and advisory for Private Bankers planning a move.",
  alternates: {
    canonical: `${SITE}/portability`,
    languages: {
      en: `${SITE}/en/portability`,
      fr: `${SITE}/fr/portability`,
      de: `${SITE}/de/portability`,
    },
  },
  openGraph: {
    title: "AUM Portability & Market Access | Executive Partners",
    description:
      "Discover which parts of your book are portable across Geneva, Zurich, Dubai, Singapore, London and other hubs.",
    url: `${SITE}/portability`,
    images: [{ url: "/og.png" }],
  },
};

export default function PortabilityIndexPage() {
  // Fallback redirect – middleware will usually handle this first
  redirect("/en/portability");
  return null;
}