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
  title: { absolute: "Apply Confidentially | Private Banking & Wealth Management" },
  description:
    "Submit your CV securely for Private Banking roles (Relationship Managers, Team Heads, Market Leaders). Geneva-based, global mandates. Discretion guaranteed.",
  alternates: { canonical: "/apply" },
  openGraph: {
    type: "website",
    url: "/apply",
    title: "Apply Confidentially — Executive Partners",
    description:
      "Confidential submission for Private Banking & Wealth Management roles across Switzerland, UK, US, Dubai, Singapore & Hong Kong.",
    images: [{ url: "/og.png" }],
    siteName: "Executive Partners",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply Confidentially — Executive Partners",
    description:
      "Private Banking & Wealth Management executive search — submit your profile discreetly.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

/* ---------------- page ---------------- */
export default async function ApplyPage({
  // ✅ Next 15 expects a Promise here
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[]>>;
}) {
  // ✅ Await it before use
  const sp = (await searchParams) ?? {};
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
      "Submit your CV securely for Private Banking roles (Relationship Managers, Team Heads, Market Leaders).",
    publisher: { "@type": "Organization", name: "Executive Partners", url: SITE },
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Apply Confidentially",
    totalTime: "PT5M",
    step: [
      { "@type": "HowToStep", name: "Share profile", text: "Provide name, email, markets covered, and current location." },
      { "@type": "HowToStep", name: "Attach CV", text: "Upload a PDF résumé (no contact is made without your consent)." },
      { "@type": "HowToStep", name: "Optional details", text: "Add AUM portability, booking centres, mobility, and languages." },
      { "@type": "HowToStep", name: "Submit", text: "We review and respond—typically the same business day." },
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
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-white">Apply Confidentially</h1>
        <p className="mt-2 text-sm text-neutral-400">
          Private Banking &amp; Wealth Management. We review every submission and only move
          forward with your consent. Typical response: same business day.
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