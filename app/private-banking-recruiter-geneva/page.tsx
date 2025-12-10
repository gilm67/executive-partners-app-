// app/private-banking-recruiter-geneva/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    absolute: "Private Banking Recruiter in Geneva – Executive Partners",
  },
  description:
    "Executive search for senior Private Bankers, Relationship Managers and Team Heads in Geneva. Compensation benchmarks, portability assessment and confidential career guidance.",
  alternates: {
    canonical: "/private-banking-recruiter-geneva",
  },
  openGraph: {
    type: "website",
    url: "/private-banking-recruiter-geneva",
    siteName: "Executive Partners",
    title: "Private Banking Recruiter in Geneva – Executive Partners",
    description:
      "Geneva-based executive search boutique focused on senior Private Bankers, RMs and Team Heads with portable UHNW/HNW books.",
  },
  robots: { index: true, follow: true },
};

export const revalidate = 1800;

export default function PrivateBankingRecruiterGenevaPage() {
  return (
    <main className="relative min-h-screen bg-[#0B0F1A] text-white">
      {/* Gold ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 360px at 15% -10%, rgba(201,161,74,.22) 0%, rgba(201,161,74,0) 55%), radial-gradient(900px 360px at 110% 0%, rgba(245,231,192,.18) 0%, rgba(245,231,192,0) 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-12">
        {/* Hero */}
        <header className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brandGoldSoft/90">
            Geneva · Private Banking · Executive Search
          </p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
            Private Banking Recruiter in Geneva
          </h1>
          <p className="mt-4 text-sm text-neutral-300 md:text-[0.95rem] leading-relaxed">
            Executive Partners is a Geneva-based boutique focused exclusively on{" "}
            <span className="font-semibold text-neutral-100">
              Private Banking &amp; Wealth Management
            </span>
            . We work with Senior Relationship Managers, Team Heads and Market
            Leaders across Switzerland and the major global hubs, with a
            specific focus on{" "}
            <span className="font-semibold text-neutral-100">
              validated AUM portability, booking-centre relevance and
              P&amp;L contribution
            </span>
            .
          </p>

          {/* Hero CTAs */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary btn-xl">
              Discuss a mandate or move
            </Link>
            <Link
              href="/pdfs/private-banking-career-intelligence-2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Download Career Intelligence 2025 (PDF)
            </Link>
          </div>
        </header>

        {/* Section: Why Geneva */}
        <section className="mt-12 grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]">
          <div className="space-y-4 text-sm text-neutral-200 md:text-[0.95rem] leading-relaxed">
            <h2 className="text-xl font-semibold text-white">
              Why Geneva is still a strategic private banking hub
            </h2>
            <p>
              Geneva remains one of Europe&apos;s most internationally connected
              wealth centres, hosting a dense network of Swiss private banks,
              foreign platforms, EAMs and family offices. The city combines{" "}
              <span className="font-semibold">
                FINMA-regulated booking stability
              </span>{" "}
              with access to UHNW families across MEA, Southern Europe, LATAM
              and selected offshore markets.
            </p>
            <p>
              Over the last 24 months, hiring demand has concentrated on:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-neutral-200">
              <li>
                Senior RMs with{" "}
                <span className="font-semibold">proven portable UHNW/HNW books</span>
              </li>
              <li>
                Team Heads with 200–500m+ CHF client mobility and clean track
                records
              </li>
              <li>
                Cross-border specialists (MEA, Portugal, Spain, France, Italy)
              </li>
              <li>
                Advisors with strong{" "}
                <span className="font-semibold">
                  recurring advisory and DPM penetration
                </span>
              </li>
            </ul>
            <p>
              Banks in Geneva are increasingly focused on{" "}
              <span className="font-semibold">
                real revenue contribution, pricing discipline and onboarding
                quality
              </span>{" "}
              rather than headline AUM alone.
            </p>
          </div>

          {/* Side card: What we do */}
          <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="text-base font-semibold text-white">
              How Executive Partners supports Geneva hiring
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-200">
              <li>• Senior RM, Team Head &amp; Market Leader search</li>
              <li>• AUM portability and booking-centre mapping</li>
              <li>• Revenue &amp; ROA analysis by client segment</li>
              <li>• Compliance and cross-border risk screening</li>
              <li>• 12–24 month NNM projection and business plan support</li>
            </ul>
            <div className="mt-5">
              <Link
                href="/apply"
                className="btn btn-secondary w-full text-sm font-medium"
              >
                Senior RM? Submit your profile
              </Link>
            </div>
          </aside>
        </section>

        {/* Section: Compensation table */}
        <section className="mt-14 rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.75)] backdrop-blur md:p-8">
          <h2 className="text-xl font-semibold text-white">
            2024–2025 Geneva compensation benchmarks
          </h2>
          <p className="mt-3 text-sm text-neutral-300 md:text-[0.95rem]">
            The ranges below reflect typical packages observed across leading
            Geneva-based private banks. Exact levels depend on platform,
            booking-centre mix, product penetration and individual performance.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm text-neutral-100">
              <thead className="border-b border-white/10 text-xs uppercase tracking-wide text-neutral-400">
                <tr>
                  <th className="py-2 pr-4">Role</th>
                  <th className="py-2 pr-4">Base salary (CHF)</th>
                  <th className="py-2 pr-4">Bonus range</th>
                  <th className="py-2 pr-4">Typical total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="py-2 pr-4">RM (5–10 years)</td>
                  <td className="py-2 pr-4">140k – 180k</td>
                  <td className="py-2 pr-4">20% – 60%</td>
                  <td className="py-2 pr-4">170k – 280k</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Senior RM (10–20 years)</td>
                  <td className="py-2 pr-4">180k – 250k</td>
                  <td className="py-2 pr-4">40% – 120%</td>
                  <td className="py-2 pr-4">250k – 550k</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Ultra UHNW RM</td>
                  <td className="py-2 pr-4">250k – 320k</td>
                  <td className="py-2 pr-4">80% – 200%</td>
                  <td className="py-2 pr-4">450k – 900k+</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Team Head</td>
                  <td className="py-2 pr-4">250k – 350k</td>
                  <td className="py-2 pr-4">100% – 250%</td>
                  <td className="py-2 pr-4">550k – 1.1m+</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-neutral-500">
            These ranges are indicative and based on observed market levels in
            Geneva across 2024–2025. Individual offers depend on platform,
            seniority, compliance history and proven, portable AUM.
          </p>
        </section>

        {/* Section: Internal links & insights */}
        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-base font-semibold text-white">
              Deep-dive insights for Geneva-based bankers
            </h3>
            <p className="mt-2 text-sm text-neutral-300">
              Explore our market commentary on Swiss private banking, UBS, AI
              and global wealth-management dynamics.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-brandGoldSoft">
              <li>
                <Link href="/insights" className="hover:underline">
                  This Week Changed Everything: Four Events Reshaping Wealth
                  Management
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:underline">
                  The Swiss Banking Earthquake: Credit Suisse &amp; the UBS
                  opportunity
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:underline">
                  The Great UBS Paradox
                </Link>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-base font-semibold text-white">
              Work with Executive Partners
            </h3>
            <p className="mt-2 text-sm text-neutral-300">
              Whether you are a Geneva-based bank or a Senior RM considering a
              move, we provide factual, confidential guidance on platforms,
              compensation and portability.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary btn-sm">
                Talk to us about a mandate
              </Link>
              <Link href="/apply" className="btn btn-ghost btn-sm">
                Submit your profile
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <p className="mt-10 text-center text-sm text-neutral-400">
          Prefer to start with a discreet email?{" "}
          <a
            href="mailto:info@execpartners.ch"
            className="underline decoration-brandGold/70 underline-offset-4 hover:text-white"
          >
            info@execpartners.ch
          </a>
        </p>
      </div>
    </main>
  );
}