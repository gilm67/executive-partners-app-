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
    absolute: "Apply Confidentially | Private Banking & Wealth Management",
  },
  description:
    "Submit your profile securely for Private Banking & Wealth Management roles (Relationship Managers, Team Heads, Market Leaders). Geneva-based, with mandates across Switzerland, the UK, the US, Dubai, Singapore and Hong Kong.",
  alternates: { canonical: "https://www.execpartners.ch/apply" },
  openGraph: {
    type: "website",
    url: "/apply",
    title: "Apply Confidentially — Executive Partners",
    description:
      "Confidential submission for Private Banking & Wealth Management roles across Switzerland, the UK, the US, Dubai, Singapore and Hong Kong.",
    images: [{ url: "/og.webp" }],
    siteName: "Executive Partners",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply Confidentially — Executive Partners",
    description:
      "Private Banking & Wealth Management executive search — submit your profile discreetly.",
    images: ["/og.webp"],
  },
  robots: { index: false, follow: false },
};

/* ---------------- page ---------------- */
// ✅ Next.js 15: searchParams can be async -> MUST await before reading keys
type SearchParams = Record<string, string | string[] | undefined>;

async function resolveSearchParams(
  searchParams?: Promise<SearchParams> | SearchParams
): Promise<SearchParams> {
  if (!searchParams) return {};
  return typeof (searchParams as any)?.then === "function"
    ? await (searchParams as Promise<SearchParams>)
    : (searchParams as SearchParams);
}

export default async function ApplyPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams> | SearchParams;
}) {
  const sp = await resolveSearchParams(searchParams);

  const get = (k: string): string => {
    const v = sp[k];
    if (Array.isArray(v)) return v[0] ?? "";
    return typeof v === "string" ? v : "";
  };

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
      "Submit your profile securely for Private Banking roles (Relationship Managers, Team Heads, Market Leaders).",
    publisher: {
      "@type": "Organization",
      name: "Executive Partners",
      url: SITE,
    },
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Apply Confidentially",
    totalTime: "PT5M",
    step: [
      {
        "@type": "HowToStep",
        name: "Share profile",
        text: "Provide your name, email, markets covered and current location.",
      },
      {
        "@type": "HowToStep",
        name: "Attach CV",
        text: "Upload a PDF résumé. We do not approach any institution without your prior consent.",
      },
      {
        "@type": "HowToStep",
        name: "Optional details",
        text: "Add AUM portability, booking centres, mobility and language capabilities.",
      },
      {
        "@type": "HowToStep",
        name: "Submit",
        text: "We review your profile and revert with a view on realistic platforms and markets.",
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
    <main className="apply-page mx-auto max-w-5xl px-4 py-12 text-white md:py-16">
      {/* JSON-LD */}
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

      {/* HERO */}
      <header className="mb-8 mx-auto max-w-2xl text-center md:mb-10">
        <p className="eyebrow text-[#F5D778]">
          Private Banking &amp; Wealth Management
        </p>
        <h1 className="mt-3">Apply Confidentially</h1>
        <p className="mt-3 text-sm text-neutral-300 md:text-[0.95rem]">
          For experienced Relationship Managers, Team Heads and Market Leaders in
          private banking and wealth management. Geneva-based, with mandates across
          Switzerland (Geneva &amp; Zurich), London, Dubai, Singapore, Hong Kong and
          select US locations. We review every submission and only move forward with
          your consent.
        </p>
      </header>

      {/* SOCIAL PROOF */}
      <section className="mx-auto max-w-3xl mb-8">
        <div className="grid grid-cols-3 gap-4 text-center mb-6">
          <div>
            <div className="text-2xl font-bold text-[#D4AF37]">200+</div>
            <div className="text-[11px] text-white/50 mt-0.5">Placements</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#D4AF37]">98%</div>
            <div className="text-[11px] text-white/50 mt-0.5">12-month retention</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#D4AF37]">17d</div>
            <div className="text-[11px] text-white/50 mt-0.5">Avg. mandate-to-offer</div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 mb-2">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center gap-2 text-xs text-white/60 mb-1.5">
              <span>🇮🇹</span><span className="font-semibold">Italian desk · Geneva</span>
            </div>
            <p className="text-xs text-white/45">CHF 280M portable book · Still at the bank, 22 months</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center gap-2 text-xs text-white/60 mb-1.5">
              <span>🇷🇺</span><span className="font-semibold">CIS/CEE desk · Zurich</span>
            </div>
            <p className="text-xs text-white/45">USD 140M book · Still at the bank, 14 months</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center gap-2 text-xs text-white/60 mb-1.5">
              <span>🇨🇭</span><span className="font-semibold">Swiss onshore · Geneva</span>
            </div>
            <p className="text-xs text-white/45">CHF 190M portable book · Still at the bank, 31 months</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3">What happens after you apply</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-white/60">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">1. Confidential review</span>
            <span className="text-white/20">→</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">2. Portability assessment</span>
            <span className="text-white/20">→</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">3. Single discreet introduction</span>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.75)] backdrop-blur md:p-7">
        <ApplyForm
          defaultRole={prefillRole}
          defaultMarket={prefillMarket}
          defaultJobId={prefillJobId}
        />

        {/* Centered disclaimers */}
        <p className="mt-4 text-xs text-neutral-400 text-center">
          We will review your profile confidentially and only introduce you to a
          bank with your consent.
        </p>

        <p className="mt-2 text-[11px] text-neutral-500 text-center">
          We never send your CV or business case to any institution without your
          explicit consent for that specific platform.
        </p>
      </section>
    </main>
  );
}