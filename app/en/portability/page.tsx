// app/en/portability/page.tsx
import type { Metadata } from "next";
import ClientWrapper from "@/app/portability/ClientWrapper";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://www.execpartners.ch");

export const runtime = "nodejs";

export const metadata: Metadata = {
  title: { absolute: "AUM Portability Calculator | Private Banking Portability Score™" },
  description:
    "Free AUM portability calculator for senior private bankers. Find out exactly how much of your book is portable before your next move. 30-point framework, 200+ placements tested.",
  alternates: { canonical: "https://www.execpartners.ch/en/portability" },
  twitter: {
    card: "summary_large_image",
    title: "Free AUM Portability Calculator | Portability Score™",
    description: "Assess your book's true portability across markets. 30-point framework, used by 500+ private bankers. Free, confidential, no obligation.",
    images: ["/og.webp"],
  },
  openGraph: {
    title: "Portability Score™ | Assess Your AUM Transferability",
    description: "Assess your book's true portability across markets. Used by 500+ private bankers. Free, confidential, no obligation.",
    url: `${SITE}/en/portability`,
    images: [{ url: "/og.webp" }],
  },
};

export default function PortabilityPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pb-10 pt-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brandGoldSoft/90">
          Portability Score™ · Executive Partners
        </p>
        <h1 className="mt-3 font-[var(--font-playfair)] text-4xl font-semibold leading-tight text-white md:text-5xl">
          Free AUM Portability Calculator | Portability Score™
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-neutral-300">
          Portability, defined as a private banker's ability to transfer client assets when
          changing employer, is the single most important variable in any senior
          career move in wealth management.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-400">
          A relationship manager with CHF 350m AUM does not automatically control
          CHF 350m of portable assets. The actual portable fraction depends on
          where that AUM sits, how deep the personal client relationship runs
          versus the bank brand, whether competitors have already approached those
          clients, and whether non-solicitation obligations create a lock-out window.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-400">
          The Portability Score™ is a six-block, 30-point framework developed by
          Executive Partners across 200+ completed placements. It stress-tests
          each of these dimensions to give you an honest picture of your true
          commercial position — before you start talking to banks.
        </p>
        <div className="mt-6 flex gap-6 border-t border-white/10 pt-6 text-sm text-neutral-500">
          <span>✓ 200+ placements tested</span>
          <span>✓ 6 blocks · 30 points</span>
          <span>✓ 100% confidential</span>
        </div>
      </section>


        {/* SEO H2 sections */}
        <div className="mt-12 space-y-6 border-t border-white/10 pt-10">

          {[
            {
              q: "How much of my AUM is actually portable?",
              a: "Most private bankers overestimate their portable AUM by 20 to 40 percent. The mistake is treating total AUM and portable AUM as the same number. In books where top clients sit below average wallet share concentration, the portable fraction typically represents 30 to 45 percent of headline AUM, not the 60 to 70 percent most bankers assume. Four variables determine the actual figure: how deep the personal client relationship runs versus the bank brand, wallet share concentration in the top 20 relationships, the scope and enforceability of any non-solicit clause under Swiss law, and the compliance and documentation status of cross-border client files. The Portability Score below maps all four dimensions in under ten minutes.",
            },
            {
              q: "What is the average client retention rate when a private banker changes bank?",
              a: "Based on Executive Partners placement data across 200+ senior transactions in Geneva and Zurich, the average AUM transfer rate within 12 months of a move is 45 to 65 percent for UHNW books and 60 to 75 percent for HNW books. Family office relationships where the RM personally owns the primary client contact transfer at 70 to 85 percent. Institutionally-supported relationships transfer at 20 to 40 percent. The single strongest predictor of transfer success is not book size — it is wallet share concentration in the top 20 client relationships.",
            },
            {
              q: "How do banks calculate AUM portability before making an offer?",
              a: "Hiring banks run their own portability model before approving any senior RM offer. They will ask you to walk through your top 10 to 20 client relationships individually — not as an aggregate AUM figure. They want to understand relationship tenure, whether the introduction was personal or institutional, total client wealth and your wallet share, cross-border compliance status, and non-solicit exposure. The banks that move fastest on offers work with candidates who arrive with this analysis pre-built. The Portability Score produces exactly that — formatted for a hiring committee conversation.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
              <h2 className="text-lg font-semibold text-white mb-3 leading-snug">{q}</h2>
              <p className="text-sm leading-relaxed text-neutral-400">{a}</p>
            </div>
          ))}

        </div>
      <ClientWrapper />
    </>
  );
}
