import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Private Banker Jobs Paris 2026 | Senior RM & Wealth Management Roles",
  description:
    "Senior private banker and wealth manager roles in Paris. Advisory for RMs covering French UHNW families, entrepreneurs and cross-border EU clients.",
  alternates: { canonical: "https://www.execpartners.ch/en/private-banker-jobs-paris" },
  twitter: {
    card: "summary_large_image",
    title: "Private Banker Jobs Paris 2026 | Senior RM & Wealth Management Roles",
    description: "Senior private banker and wealth manager roles in Paris. Advisory for RMs covering French UHNW families, entrepreneurs and cross-border EU clients.",
    images: ["/og.webp"],
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B0E13] text-white py-16 px-4">
     <div className="container-max mx-auto max-w-5xl space-y-10">
        <nav className="text-xs text-white/60">
          <Link href="/en/markets" className="hover:text-[#D4AF37]">
            Markets
          </Link>
          <span className="mx-1">/</span>
          <span>Private Banker Jobs in Paris</span>
        </nav>

        <header className="space-y-4">
          <p className="uppercase tracking-[0.2em] text-[11px] text-white/60">
            PRIVATE BANKING · PARIS
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Private Banker Jobs in <span className="gold">Paris</span>
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-3xl">
            Paris is a strategic hub for French UHNW families, listed-company
            executives and tech and private equity entrepreneurs. We support
            Senior RMs and Private Bankers serving French domestic and
            cross-border EU clients across global and regional platforms.
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

        <section className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1.25fr)] items-start">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold">
                Typical Mandates in Paris
              </h2>
              <p className="mt-3 text-white/75">
                Our clients include global private banks, French wealth managers
                and specialist platforms. Mandates often focus on:
              </p>
              <ul className="mt-3 space-y-1 text-white/80 list-disc list-inside">
                <li>UHNW and HNW desks covering French domestic and EU clients</li>
                <li>Tech, PE and mid-market entrepreneur segments</li>
                <li>Cross-border French clients booked in Geneva, Luxembourg or London</li>
                <li>Team leaders and market heads</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold">
                Paris and the Swiss Booking Centre Connection
              </h2>
              <p className="mt-3 text-white/75">
                Many senior French-market bankers split their activity between
                Paris onshore and Geneva or Luxembourg booking centres. We advise
                on the full picture: compensation, compliance constraints,
                non-solicit clauses and realistic AUM portability.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold">
                Long-Term Career Positioning
              </h2>
              <p className="mt-3 text-white/75">
                Paris offers access to one of Europe's deepest domestic wealth
                pools. We help you choose platforms that match your client
                strategy, not just the highest short-term package.
              </p>
            </div>
          </div>

          <aside className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur space-y-4">
            <h3 className="text-lg font-semibold">
              Paris Private Banking Snapshot
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>• Deep domestic UHNW and HNW wealth pool</li>
              <li>• Growing tech, PE and entrepreneur segment</li>
              <li>• Strong cross-border connectivity with Geneva and Luxembourg</li>
              <li>• Competitive environment for senior relationship managers</li>
            </ul>
            <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-white/60">
              <p>
                We benchmark Paris opportunities against your current platform
                and markets, identifying where your franchise is best positioned.
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

        <section className="grid gap-6 md:grid-cols-2 border-t border-white/10 pt-10">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-lg font-semibold">For Private Bankers</h3>
            <p className="mt-2 text-sm text-white/75">
              Share your core markets, AUM and platform constraints. We will only
              introduce you to Paris institutions aligned with your strategy.
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
              We support selective growth in Paris with senior bankers who bring
              real portability and cultural fit, not just headcount.
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
