import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    absolute: "Private Banking Career Intelligence 2026 | Executive Partners",
  },
  description:
    "Fact-checked 2026 benchmarks for Private Banking careers across Geneva, Zurich, London, New York, Miami, Singapore, Hong Kong, Dubai and other key hubs. Download the PDF guide prepared by Executive Partners.",
  alternates: {
    canonical: "/insights/private-banking-career-intelligence",
  },
  openGraph: {
    type: "article",
    url: "/insights/private-banking-career-intelligence",
    title: "Private Banking Career Intelligence 2026 — Executive Partners",
    description:
      "Global market benchmarks, AUM portability framework, compensation ranges and readiness scorecard for senior Private Bankers.",
    siteName: "Executive Partners",
  },
  robots: { index: true, follow: true },
};

export default function PrivateBankingCareerIntelligencePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 text-white">
      {/* Eyebrow + title */}
      <header className="mb-10 text-center">
        <p className="eyebrow text-[#F5D778]">
          Private Banking &amp; Wealth Management
        </p>
        <h1 className="mt-3 text-3xl md:text-4xl">
          Private Banking Career Intelligence 2026
        </h1>
        <p className="mt-4 text-sm text-neutral-300 md:text-[0.95rem]">
          Fact-checked benchmarks for senior Relationship Managers, Team Heads
          and Market Leaders across Geneva, Zurich, London, New York, Miami,
          Singapore, Hong Kong, Dubai and other key hubs. Prepared by Executive
          Partners for confidential professional use.
        </p>
      </header>

      {/* Content card */}
      <section className="rounded-3xl border border-white/10 bg-black/40 p-6 text-center shadow-[0_18px_50px_rgba(0,0,0,0.75)] backdrop-blur md:p-8">
        <h2 className="text-lg font-semibold text-neutral-50">
          What&apos;s inside the PDF
        </h2>
        <ul className="mt-4 space-y-2 text-left text-sm text-neutral-300">
          <li>
            • Market benchmarks for{" "}
            <span className="font-medium">
              Switzerland (Geneva &amp; Zurich), London, New York, Miami,
              Singapore, Hong Kong and Dubai
            </span>
            .
          </li>
          <li>
            • AUM portability framework, booking-centre mapping and UHNW / HNW
            segmentation.
          </li>
          <li>
            • Revenue &amp; P&amp;L readiness checklist used by leading private
            banks when evaluating hires.
          </li>
          <li>
            • 2024–2026 compensation ranges and bonus structures by key markets.
          </li>
          <li>
            • Candidate readiness scorecard and list of critical red flags
            banks screen for.
          </li>
        </ul>

        {/* Download + secondary actions */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="/pdfs/private-banking-career-intelligence-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-xl w-full sm:w-auto"
          >
            Download the PDF guide
          </a>

          <Link
            href="/contact"
            className="btn btn-ghost w-full text-sm sm:w-auto"
          >
            Discuss your move with us
          </Link>
        </div>

        <p className="mt-4 text-center text-[11px] text-neutral-500">
          Last updated: 2026. The information is indicative and for professional
          use only. Exact packages and conditions vary by bank and jurisdiction.
        </p>
      </section>
    </main>
  );
}