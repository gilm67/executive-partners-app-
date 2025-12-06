import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Private Banker Jobs in Milano | Executive Partners",
  description:
    "Private banker and wealth manager opportunities in Milano, serving Italian entrepreneurs and families as well as cross-border clients via Swiss platforms.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B0E13] text-white py-16 px-4">
      <div className="container-max max-w-5xl space-y-10">
        {/* BREADCRUMB */}
        <nav className="text-xs text-white/60">
          <Link href="/en/markets" className="hover:text-[#D4AF37]">
            Markets
          </Link>
          <span className="mx-1">/</span>
          <span>Private Banker Jobs in Milano</span>
        </nav>

        {/* HERO / INTRO */}
        <header className="space-y-4">
          <p className="uppercase tracking-[0.2em] text-[11px] text-white/60">
            PRIVATE BANKING · MILANO
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Private Banker Jobs in <span className="gold">Milano</span>
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-3xl">
            Executive Partners advises private bankers and wealth managers in
            Milano who cover Italian entrepreneurs, family businesses and
            affluent families, often in close connection with Swiss booking
            centres such as Lugano, Zurich and Geneva.
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
                Italian &amp; Cross-Border Mandates
              </h2>
              <p className="mt-3 text-white/75">
                Milano is a key hub for Italian private wealth, with strong
                connectivity to Swiss and international platforms. Mandates
                often involve:
              </p>
              <ul className="mt-3 space-y-1 text-white/80 list-disc list-inside">
                <li>
                  Private bankers serving Italian entrepreneurs, business
                  owners and family groups
                </li>
                <li>
                  Roles with Italian banks, European platforms and Swiss
                  institutions
                </li>
                <li>
                  Cross-border structures where Milano fronts the relationship
                  and Switzerland hosts the booking centre
                </li>
                <li>
                  Senior hires to strengthen coverage of Italy-focused UHNW
                  clients
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold">
                Considering a Move Between Milano &amp; Switzerland
              </h2>
              <p className="mt-3 text-white/75">
                We help you evaluate the benefits and trade-offs of staying in
                Milano versus moving to a Swiss booking centre while continuing
                to cover Italian clients.
              </p>
              <p className="mt-3 text-white/75">
                Discussions cover platform strength, custody options,
                cross-border rules, remuneration and long-term positioning for
                your client franchise.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold">
                Discreet Advisory for Senior Bankers
              </h2>
              <p className="mt-3 text-white/75">
                Our approach is low-volume and fully confidential. We work with
                a small number of experienced private bankers at any time and
                help them navigate strategic moves instead of reacting to
                short-term offers.
              </p>
            </div>
          </div>

          {/* SNAPSHOT CARD */}
          <aside className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur space-y-4">
            <h3 className="text-lg font-semibold">Milano Wealth Snapshot</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>• Core hub for Italian entrepreneur &amp; family wealth</li>
              <li>• Strong cooperation with Swiss booking centres</li>
              <li>• Mix of domestic banks and international platforms</li>
              <li>• Growing interest in alternatives and private markets</li>
            </ul>
            <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-white/60">
              <p>
                If you manage a portable Italian or cross-border client base, we
                can map which Milano and Swiss platforms are best aligned with
                your strategy.
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
              Share a high-level overview of your Italian and cross-border book.
              We will only approach platforms where your franchise is genuinely
              strategic.
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
              If you are building an Italy-focused team, we can identify senior
              Milano bankers with real client depth and portable portfolios.
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