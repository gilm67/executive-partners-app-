import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MarketPage from "@/components/MarketPage";
import { MARKETS, type MarketSlug } from "@/data/markets";
import { getOgImage } from "@/lib/og";

type Params = { slug: string };

/* ---------------- SEO ---------------- */
export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params; // ✅ fixed
  const market = MARKETS[slug as MarketSlug];
  if (!market) return { title: "Market not found | Executive Partners" };

  const site =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.execpartners.ch";
  const url = `${site}/markets/${slug}`;

  return {
    title: `${market.title} | Executive Partners`,
    description: market.intro,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: "Executive Partners",
      url,
      title: market.title,
      description: market.intro,
      images: [{ url: getOgImage("/markets"), width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: market.title,
      description: market.intro,
      images: [getOgImage("/markets")],
    },
    robots: { index: true, follow: true },
  };
}

/* ---------------- Page ---------------- */
export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params; // ✅ fixed
  const market = MARKETS[slug as MarketSlug];
  if (!market) return notFound();

  return <MarketPage market={market} />;
}
