// app/en/private-banking-jobs/[city]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type CityConfig = {
  label: string;
  seoTitle: string;
  seoDescription: string;
};

const CITY: Record<string, CityConfig> = {
  geneva: {
    label: "Geneva",
    seoTitle: "Private Banking Jobs in Geneva | Executive Partners",
    seoDescription:
      "Explore confidential Private Banking and Wealth Management jobs in Geneva. Executive search mandates for senior Relationship Managers and Team Heads.",
  },
  zurich: {
    label: "Zurich",
    seoTitle: "Private Banking Jobs in Zurich | Executive Partners",
    seoDescription:
      "Private Banking jobs in Zurich for senior Relationship Managers. Swiss onshore and international mandates.",
  },
  dubai: {
    label: "Dubai",
    seoTitle: "Private Banking Jobs in Dubai | Executive Partners",
    seoDescription:
      "Confidential Private Banking jobs in Dubai covering GCC and international UHNW clients.",
  },
  singapore: {
    label: "Singapore",
    seoTitle: "Private Banking Jobs in Singapore | Executive Partners",
    seoDescription:
      "Senior Private Banking roles in Singapore covering ASEAN and international UHNW markets.",
  },
  london: {
    label: "London",
    seoTitle: "Private Banking Jobs in London | Executive Partners",
    seoDescription:
      "Private Banking and Wealth Management jobs in London for senior advisers and team heads.",
  },
  "new-york": {
    label: "New York",
    seoTitle: "Private Banking Jobs in New York | Executive Partners",
    seoDescription:
      "Private Banking jobs in New York serving US UHNW and complex family structures.",
  },
  miami: {
    label: "Miami",
    seoTitle: "Private Banking Jobs in Miami | Executive Partners",
    seoDescription:
      "Private Banking jobs in Miami covering LatAm and international UHNW clients.",
  },
  paris: {
    label: "Paris",
    seoTitle: "Private Banking Jobs in Paris | Executive Partners",
    seoDescription: "Senior Private Banking roles in Paris for HNW and UHNW clients.",
  },
  madrid: {
    label: "Madrid",
    seoTitle: "Private Banking Jobs in Madrid | Executive Partners",
    seoDescription: "Private Banking jobs in Madrid covering Spanish and international wealth.",
  },
  lisbon: {
    label: "Lisbon",
    seoTitle: "Private Banking Jobs in Lisbon | Executive Partners",
    seoDescription: "Private Banking jobs in Lisbon serving Portuguese and international clients.",
  },
  milano: {
    label: "Milano",
    seoTitle: "Private Banking Jobs in Milan | Executive Partners",
    seoDescription: "Private Banking and Wealth Management jobs in Milan for UHNW Italian clients.",
  },
};

const SITE_URL = "https://www.execpartners.ch";

// Force static generation for this route
export const dynamic = "force-static";

// Prebuild all city pages (SSG)
export function generateStaticParams() {
  return Object.keys(CITY).map((city) => ({ city }));
}

/* ✅ Next 15: params is async */
type Params = Promise<{ city: string }>;
type Props = { params: Params };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const cfg = CITY[city];
  if (!cfg) return {};

  const url = `${SITE_URL}/en/private-banking-jobs/${city}`;

  return {
    title: cfg.seoTitle,
    description: cfg.seoDescription,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: cfg.seoTitle,
      description: cfg.seoDescription,
      url,
      type: "website",
      siteName: "Executive Partners",
    },
  };
}

export default async function CityJobsPage({ params }: Props) {
  const { city } = await params;
  const cfg = CITY[city];
  if (!cfg) notFound();

  return (
    <main className="min-h-screen bg-[#0B0E13] text-white">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-neutral-400">
          Private Banking Jobs
        </p>

        <h1 className="text-4xl font-bold">Private Banking Jobs in {cfg.label}</h1>

        <p className="mt-4 max-w-2xl text-neutral-300">{cfg.seoDescription}</p>
      </section>
    </main>
  );
}