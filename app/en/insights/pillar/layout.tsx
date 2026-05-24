import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Banking Strategy & Market Intelligence | Pillar I | Executive Partners",
  description:
    "Deep-dive analysis on private banking strategy, competitive positioning, ROA pressure, M&A and boutique vs scale dynamics. Written from Geneva by Gil M. Chalem.",
  alternates: { canonical: "https://www.execpartners.ch/en/insights/pillar/p1" },
  openGraph: {
    title: "Private Banking Strategy & Market Intelligence | Executive Partners",
    description: "Analysis on competitive positioning, ROA pressure, M&A and scale vs boutique dynamics in private banking.",
    type: "website",
    url: "https://www.execpartners.ch/en/insights/pillar/p1",
    images: [{ url: "/og.webp", width: 1200, height: 630 }],
    siteName: "Executive Partners",
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Banking Strategy & Market Intelligence | Executive Partners",
    description: "Analysis on competitive positioning, ROA pressure, M&A and scale vs boutique dynamics in private banking.",
    images: ["/og.webp"],
  },
  robots: { index: true, follow: true },
};

export default function PillarLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
