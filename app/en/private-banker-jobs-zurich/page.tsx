import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Private Banker Jobs in Zurich | Executive Partners",
  description:
    "Confidential opportunities for Senior Relationship Managers and Private Bankers in Zurich. Executive Partners advises senior bankers across Swiss and international platforms.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B0E13] text-white py-16 px-4">
<div className="container-max mx-auto max-w-5xl space-y-10">
        {/* BREADCRUMB */}
        <nav className="text-xs text-white/60">
          <Link href="/en/markets" className="hover:text-[#D4AF37]">
            Markets
          </Link>
          <span className="mx-1">/</span>
          <span>Private Banker Jobs in Zurich</span>
        </nav>

        {/* HERO / INTRO */}
        <header className="space-y-4">
          <p className="uppercase tracking-[0.2em] text-[11px] text-white/60">
            PRIVATE BANKING · ZURICH
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Private Banker Jobs in <span className="gold">Zurich</span>
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-3xl">
            Zurich is a core hub for Swiss onshore and international private banking.
            We work with leading platforms seeking Senior Relationship Managers,
            Private Bankers, Desk Heads and Wealth Planners with strong UHNW / HNW
            franchises.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/en/apply"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium bg-[#D4AF37] text-black hover:bg-[#f5d778] transition"
            >
              Apply confidentially
            </Link>
            <Link
              href="/en/jobs"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium border border-white/40 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
            >
              View open roles
            </Link>
          </div>
        </header>

        {/* MAIN CONTENT + SIDE CARD */}
        <section className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1.25fr)] items-start">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold">
                Typical Mandates in Zurich
              </h2>
              <p className="mt-3 text-white/75">
                We support Swiss and international platforms looking for senior
                bankers in Zurich, including:
              </p>
              <ul className="mt-3 space-y-1 text-white/80 list-disc list-inside">
                <li>Onshore Swiss UHNW / HNW coverage</li>
                <li>International desks (Europe, CEE, Latam, MEA, NRI and more)</li>
                <li>Desk Heads &amp; Market Leaders building multi-banker teams</li>
                <li>Wealth planners and senior investment advisers</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold">
                Platform Comparison &amp; Portability
              </h2>
              <p className="mt-3 text-white/75">
                Many Zurich roles require documented AUM portability and a clear
                business case. We help you understand which platforms are most
                aligned with your pricing, risk appetite, booking-centre
                capabilities and long-term franchise.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold">
                Long-Term Career Advisory
              </h2>
              <p className="mt-3 text-white/75">
                Even if you are not planning an immediate move, we can map the
                Zurich market with you and identify when a change would be most
                accretive for you and your clients.
              </p>
            </div>
          </div>

          {/* SNAPSHOT CARD */}
          <aside className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur space-y-4">
            <h3 className="text-lg font-semibold">
              Zurich Private Banking Snapshot
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>• Swiss onshore &amp; international booking capabilities</li>
              <li>• Strong competition for top-performing senior bankers</li>
              <li>• Broad mix of universal banks, pure-play PBs and boutiques</li>
              <li>• Key gateway for European and global client coverage</li>
            </ul>
            <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-white/60">
              <p>
                We can benchmark your current platform against opportunities in
                Zurich and suggest where your franchise would be strongest.
              </p>
              <Link
                href="/en/apply"
                className="inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-medium bg-[#D4AF37] text-black hover:bg-[#f5d778] transition"
              >
                Start a confidential discussion
              </Link>
            </div>
          </aside>
        </section>

        {/* CANDIDATES / HIRING MANAGERS STRIP */}
        <section className="grid gap-6 md:grid-cols-2 border-t border-white/10 pt-10">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-lg font-semibold">For Private Bankers</h3>
            <p className="mt-2 text-sm text-white/75">
              Share an overview of your book, revenue and core markets. We will
              only introduce you to Zurich platforms that make strategic sense.
            </p>
            <div className="mt-4">
              <Link
                href="/en/apply"
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium bg-[#D4AF37] text-black hover:bg-[#f5d778] transition"
              >
                Apply confidentially
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-lg font-semibold">For Hiring Managers</h3>
            <p className="mt-2 text-sm text-white/75">
              We can approach specific bankers, provide market mapping and
              deliver a vetted shortlist with documented business cases for Zurich.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/en/hiring-managers"
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium border border-white/40 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
              >
                Brief a mandate
              </Link>
              <Link
                href="/en/contact"
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-white/70 hover:text-[#D4AF37] transition"
              >
                Contact Executive Partners
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}