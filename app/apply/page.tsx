// app/apply/page.tsx
import type { Metadata } from "next";
import ApplyForm from "./ApplyForm";

/* ---------------- helpers ---------------- */
function siteBase() {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL ||
    "https://www.execpartners.ch";
  const url = fromEnv.startsWith("http") ? fromEnv : `https://${fromEnv}`;
  return url.replace(/\/$/, "");
}

const SITE = siteBase();
const PAGE_URL = `${SITE}/apply`;

export const revalidate = 60;

/* ---------------- SEO metadata ---------------- */
export const metadata: Metadata = {
  title: {
    absolute:
      "Apply Confidentially | Private Banking & Wealth Management Recruitment",
  },
  description:
    "Submit your profile confidentially for senior Private Banking & Wealth Management roles (Relationship Managers, Team Heads, Market Leaders). Geneva-based, with mandates across Switzerland, the UK, the US, Dubai, Singapore and Hong Kong.",
  alternates: { canonical: "/apply" },
  openGraph: {
    type: "website",
    url: "/apply",
    title: "Apply Confidentially — Executive Partners",
    description:
      "Confidential submission for senior Private Banking & Wealth Management roles across Switzerland, the UK, the US, Dubai, Singapore and Hong Kong. We review every profile before making any approach.",
    images: [{ url: "/og.png" }],
    siteName: "Executive Partners",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply Confidentially — Executive Partners",
    description:
      "Geneva-based executive search boutique focused on Private Banking & Wealth Management. Submit your profile discreetly for senior roles.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

/* ---------------- page ---------------- */
export default function ApplyPage({
  searchParams,
}: {
  // Next gives a plain object here, not a Promise
  searchParams?: Record<string, string | string[]>;
}) {
  const sp = searchParams ?? {};
  const get = (k: string): string => {
    const v = sp[k];
    return Array.isArray(v) ? v[0] ?? "" : (v as string) ?? "";
  };

  // Support ?job= or ?role=
  const prefillRole = get("job") || get("role");
  const prefillMarket = get("market");
  const prefillJobId = get("jobId");

  // JSON-LD
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Apply Confidentially",
    url: PAGE_URL,
    description:
      "Submit your CV securely for senior Private Banking & Wealth Management roles (Relationship Managers, Team Heads, Market Leaders). Geneva-based with international mandates.",
    publisher: {
      "@type": "Organization",
      name: "Executive Partners",
      url: SITE,
    },
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Apply Confidentially as a Private Banker",
    totalTime: "PT5M",
    step: [
      {
        "@type": "HowToStep",
        name: "Share your profile",
        text: "Provide your name, contact details, current institution, booking centre and markets covered.",
      },
      {
        "@type": "HowToStep",
        name: "Attach your CV",
        text: "Upload a recent CV in PDF format. No contact is made with any institution without your prior consent.",
      },
      {
        "@type": "HowToStep",
        name: "Add optional book details",
        text: "Optionally add AUM portability, key booking centres, client segments and mobility constraints.",
      },
      {
        "@type": "HowToStep",
        name: "Submit for review",
        text: "We review your profile and revert with next steps. Typical response time is within the same business day.",
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Apply", item: PAGE_URL },
    ],
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <header className="mb-8 space-y-3">
        <p className="eyebrow">Private Banking &amp; Wealth Management</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Apply confidentially for senior private banking roles
        </h1>
        <p className="max-w-3xl text-sm text-neutral-300 md:text-base">
          We focus on Director / MD{" "}
          <span className="font-semibold">Relationship Managers</span>,{" "}
          <span className="font-semibold">Team Heads</span> and{" "}
          <span className="font-semibold">Market Leaders</span> with documented
          AUM, realistic portability and a defendable business plan.
        </p>
        <p className="text-xs text-neutral-500 md:text-[13px]">
          Based in Geneva, we run mandates across Switzerland (Geneva &amp;
          Zurich), the UK, the US, Dubai, Singapore and Hong Kong. We review
          every submission and only move forward with your explicit consent for
          each institution.
        </p>
        <p className="text-[11px] text-neutral-500">
          Typical response time: same business day.
        </p>
      </header>

      <ApplyForm
        defaultRole={prefillRole}
        defaultMarket={prefillMarket}
        defaultJobId={prefillJobId}
      />
    </main>
  );
}