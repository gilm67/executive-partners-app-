import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Private Banker Jobs in Miami | Executive Partners",
  description:
    "Private banker and wealth manager roles in Miami, focused on Latin American and international offshore clients. Discreet advisory for Senior Relationship Managers and UHNW advisers.",
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
          <span>Private Banker Jobs in Miami</span>
        </nav>

        {/* HERO / INTRO */}
        <header className="space-y-4">
          <p className="uppercase tracking-[0.2em] text-[11px] text-white/60">
            PRIVATE BANKING · MIAMI
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Private Banker Jobs in <span className="gold">Miami</span>
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-3xl">
            Executive Partners supports private bankers and wealth managers
            based in or relocating to Miami, with a strong focus on Latin
            American and international offshore client coverage through
            international and regional platforms.
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
                Mandates in the Miami Wealth Hub
              </h2>
              <p className="mt-3 text-white/75">
                Our Miami mandates are typically focused on UHNW and upper-HNW
                clients across Latin America and international offshore books.
                Roles often include:
              </p>
              <ul className="mt-3 space-y-1 text-white/80 list-disc list-inside">
                <li>Senior Relationship Managers with LATAM offshore portfolios</li>
                <li>Team leaders and desk heads for key Latin American markets</li>
                <li>
                  Senior advisers covering entrepreneurs, family offices and
                  multi-jurisdictional families
                </li>
                <li>
                  Moves between Swiss, US and Caribbean booking centres with Miami
                  as the client hub
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold">
                Supporting Your Move or Step-Up in Miami
              </h2>
              <p className="mt-3 text-white/75">
                Whether you are already in Miami or considering relocating from
                Switzerland, Europe or LATAM, we compare platforms on
                compensation, product access, booking-centre architecture and
                long-term support for your client base.
              </p>
              <p className="mt-3 text-white/75">
                We only introduce your profile to a short list of franchises
                that genuinely add value to your existing relationships.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold">
                Discreet, Long-Term Relationship
              </h2>
              <p className="mt-3 text-white/75">
                Many of the Miami bankers we advise speak with us well before
                any concrete move. Our role is to help you understand timing,
                platform positioning and market dynamics, not to push you into
                a transaction.
              </p>
            </div>
          </div>

          {/* SNAPSHOT CARD */}
          <aside className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur space-y-4">
            <h3 className="text-lg font-semibold">Miami Wealth Snapshot</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>• Key hub for Latin American UHNW &amp; HNW offshore wealth</li>
              <li>• Mix of global private banks, broker-dealers and boutiques</li>
              <li>• Platforms often linked to Swiss, New York or Caribbean booking</li>
              <li>• Increasing demand for sophisticated advisory &amp; wealth planning</li>
            </ul>
            <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-white/60">
              <p>
                If you manage a portable LATAM or offshore book, we can map
                which Miami platforms best match your client profile and risk
                appetite.
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
              Share a high-level overview of your LATAM/offshore franchise and
              current platform. We will only approach institutions where your
              book and profile are genuinely strategic.
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
              Looking to hire senior Miami-based bankers with real portable
              LATAM books? We can calibrate the market, approach specific
              profiles and provide documented business cases.
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