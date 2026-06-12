import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CompareMarkets from "@/components/markets/CompareMarkets";

export const metadata: Metadata = {
  title: "Compare Private Banking Markets | Executive Partners",
  description:
    "Compare compensation benchmarks, licensing, hiring pulse and ecosystem across Geneva, Zurich, Dubai, Singapore, London and other private banking hubs side by side.",
  alternates: { canonical: "https://www.execpartners.ch/en/markets/compare" },
  openGraph: {
    title: "Compare Private Banking Markets | Executive Partners",
    description:
      "Side-by-side comparison of compensation, licensing and hiring pulse across 12 global private banking hubs.",
    type: "website",
    url: "https://www.execpartners.ch/en/markets/compare",
    images: [{ url: "/og.webp", width: 1200, height: 630 }],
    siteName: "Executive Partners",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Private Banking Markets | Executive Partners",
    description: "Side-by-side comparison across 12 global private banking hubs.",
    images: ["/og.webp"],
  },
  robots: { index: true, follow: true },
};

export default function CompareMarketsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Link
        href="/en/markets"
        className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All markets
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold">Compare Markets</h1>
        <p className="mt-2 max-w-2xl text-neutral-300">
          Compensation benchmarks, licensing, hiring pulse and ecosystem, side by side. Select up to three private banking hubs to compare.
        </p>
      </header>

      <CompareMarkets />
    </main>
  );
}
