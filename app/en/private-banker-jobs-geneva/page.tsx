import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Private Banker Jobs in Geneva | Executive Partners",
  description:
    "Confidential opportunities for Senior Relationship Managers and Private Bankers in Geneva. Executive Partners is a Geneva-based executive search firm specialised in Private Banking and Wealth Management.",
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
          <span>Private Banker Jobs in Geneva</span>
        </nav>

        {/* HERO / INTRO */}
        <header className="space-y-4">
          <p className="uppercase tracking-[0.2em] text-[11px] text-white/60">
            PRIVATE BANKING · GENEVA
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Private Banker Jobs in <span className="gold">Geneva</span>
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-3xl">
            Executive Partners is an executive search firm based in Geneva and
            specialised in Private Banking &amp; Wealth Management. We work on
            confidential mandates for Senior Relationship Managers, Private
            Bankers, Desk Heads and Market Leaders serving UHNW and HNW clients.
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
                Typical Mandates in Geneva
              </h2>
              <p className="mt-3 text-white/75">
                Our clients include Swiss pure-play private banks, global
                institutions, boutiques and EAM-focused platforms. Mandates
                often involve:
              </p>
              <ul className="mt-3 space-y-1 text-white/80 list-disc list-inside">
                <li>
                  Senior Relationship Managers with portable UHNW / HNW
                  portfolios
                </li>
                <li>
                  Desk Heads and Market Leaders across core Swiss &amp;
                  international markets
                </li>
                <li>
                  Wealth Planners and investment-focused advisers for complex
                  client cases
                </li>
                <li>
                  Senior hires supporting international booking centres
                  connected to Geneva
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold">
                How We Work with Private Bankers
              </h2>
              <p className="mt-3 text-white/75">
                We do not run a volume model. Many of our Geneva mandates are
                completely confidential and never advertised. We assess your
                portability, revenue contribution, team fit and long-term
                objectives before introducing you to a short list of calibrated
                platforms.
              </p>
              <p className="mt-3 text-white/75">
                You remain fully in control of where and when your profile is
                presented. We only share your details with explicit consent.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold">
                Long-Term Advisory, Not Just a Single Move
              </h2>
              <p className="mt-3 text-white/75">
                Many senior bankers speak with us 12–24 months before making a
                change. We help you understand how different platforms in Geneva
                compare on culture, risk appetite, booking centres, pricing and
                support for UHNW families, entrepreneurs and family offices.
              </p>
            </div>
          </div>

          {/* SNAPSHOT CARD */}
          <aside className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur space-y-4">
            <h3 className="text-lg font-semibold">Geneva Private Banking Snapshot</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>• Swiss pure-play and global platforms with strong UHNW focus</li>
              <li>• Mix of onshore Swiss and international offshore desks</li>
              <li>• Competitive platforms for LATAM, MEA, CEE, UK &amp; Europe</li>
              <li>• Strong ecosystem of EAMs, family offices and boutiques</li>
            </ul>
            <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-white/60">
              <p>
                If you manage a portable UHNW / HNW portfolio, we can map which
                Geneva platforms are currently most accretive for your
                franchise.
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
              Share a high-level overview of your book, markets and current
              platform. We will only approach Geneva institutions aligned with
              your strategy.
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
              Looking to hire senior Geneva-based bankers with real
              portability? We can calibrate the market and provide a vetted
              shortlist with documented business cases.
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