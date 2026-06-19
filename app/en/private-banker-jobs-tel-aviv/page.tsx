import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Private Banker Jobs Tel Aviv | Israeli Market Roles | Executive Partners",
  description:
    "Senior private banker and Relationship Manager jobs in Tel Aviv and the Israeli market. Cross-border and onshore roles with Swiss private banks, EAMs and family offices.",
  alternates: {
    canonical: "https://www.execpartners.ch/en/private-banker-jobs-tel-aviv",
  },
  openGraph: {
    title: "Private Banker Jobs Tel Aviv | Israeli Market Roles",
    description:
      "Senior RM and private banker jobs for the Israeli market — Geneva, Zurich and Tel Aviv based. Hebrew-language and cross-border coverage mandates.",
    url: "https://www.execpartners.ch/en/private-banker-jobs-tel-aviv",
    siteName: "Executive Partners",
    type: "website",
    images: [{ url: "https://www.execpartners.ch/images/markets/tel-aviv-hero.webp", width: 1200, height: 630 }],
  },
};

export default function TelAvivPrivateBankerJobsPage() {
  return (
    <main id="main" className="min-h-[70vh] px-6 py-20 md:px-16 max-w-4xl mx-auto">
      <p className="text-xs uppercase tracking-widest text-brand-gold mb-4">
        Private Banking Jobs · Tel Aviv · Israeli Market
      </p>

      <h1 className="text-3xl md:text-4xl font-light text-white mb-6">
        Private Banker Jobs — Tel Aviv &amp; Israeli Market
      </h1>

      <p className="text-white/70 leading-relaxed mb-6 max-w-2xl">
        Executive Partners places senior private bankers and Relationship Managers in roles
        covering the Israeli market. Most mandates are based in Geneva or Zurich with
        dedicated Israeli-client coverage; a smaller number are onshore Tel Aviv positions
        at representative offices of international Swiss private banks.
      </p>

      <h2 className="text-xl font-semibold text-white mb-4 mt-10">
        Current mandate types
      </h2>
      <ul className="text-white/70 space-y-2 mb-10 list-disc list-inside">
        <li>Senior RM — Israeli Market (Geneva or Zurich, CHF 280K–420K base)</li>
        <li>Desk Head — Israeli Coverage Build-Out</li>
        <li>Private Banker — Tech-Entrepreneur UHNW Segment</li>
        <li>Onshore RM — Tel Aviv Representative Office (ISA licence required)</li>
      </ul>

      <h2 className="text-xl font-semibold text-white mb-4">
        What strong Israeli-market bankers look like
      </h2>
      <ul className="text-white/70 space-y-2 mb-10 list-disc list-inside">
        <li>Referenceable UHNW/HNW Israeli client relationships, onshore or cross-border</li>
        <li>Hebrew fluency — non-negotiable for onshore; strong advantage for offshore desk</li>
        <li>Experience booking Israeli assets in Geneva, Zurich or Luxembourg</li>
        <li>Tech-sector literacy: founders, cap tables, liquidity events, lock-up structures</li>
        <li>FATCA/CRS cross-border expertise</li>
        <li>Clean compliance record and credible portable wallet share</li>
      </ul>

      <div className="flex flex-wrap gap-4 mt-10">
        <Link
          href="/en/jobs"
          className="rounded-full bg-brand-gold px-6 py-2.5 text-sm font-semibold text-brand-bg hover:opacity-90 transition"
        >
          View live mandates →
        </Link>
        <Link
          href="/en/markets/tel-aviv"
          className="rounded-full border border-white/20 px-6 py-2.5 text-sm text-white/70 hover:text-white hover:border-white/40 transition"
        >
          Tel Aviv market overview
        </Link>
        <Link
          href="/en/candidates"
          className="rounded-full border border-white/20 px-6 py-2.5 text-sm text-white/70 hover:text-white hover:border-white/40 transition"
        >
          Submit profile confidentially
        </Link>
      </div>
    </main>
  );
}
