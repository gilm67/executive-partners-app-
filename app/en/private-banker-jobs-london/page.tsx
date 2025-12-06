import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Private Banker Jobs in London | Executive Partners",
  description:
    "Confidential private banker and wealth manager roles in London. Advisory for Senior Relationship Managers comparing Swiss and UK platforms.",
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
          <span>Private Banker Jobs in London</span>
        </nav>

        {/* HERO / INTRO */}
        <header className="space-y-4">
          <p className="uppercase tracking-[0.2em] text-[11px] text-white/60">
            PRIVATE BANKING · LONDON
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Private Banker Jobs in <span className="gold">London</span>
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-3xl">
            Executive Partners works with leading private banks, wealth managers
            and family offices in London. We advise Senior RMs and Wealth
            Advisers on confidential moves within the UK market and between
            London and Swiss booking centres.
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
                Mandates in the London Private Banking Market
              </h2>
              <p className="mt-3 text-white/75">
                London offers a broad spectrum of roles across onshore UK, 
                international offshore and global UHNW coverage. Typical
                mandates include:
              </p>
              <ul className="mt-3 space-y-1 text-white/80 list-disc list-inside">
                <li>Senior RMs covering UK-domiciled UHNW and HNW clients</li>
                <li>
                  International desks with strong connectivity to Switzerland
                  and Europe
                </li>
                <li>Multi-family office and boutique advisory platforms</li>
                <li>Team leaders and desk heads for priority markets</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold">
                Comparing London &amp; Swiss Platforms
              </h2>
              <p className="mt-3 text-white/75">
                Many candidates we advise weigh options between London-based
                roles and Swiss booking centres. We help you evaluate culture,
                risk appetite, booking architecture, remuneration and long-term
                impact on your franchise.
              </p>
              <p className="mt-3 text-white/75">
                Our recommendations are tailored to your market focus, 
                client type and growth objectives.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold">
                A Long-Term Advisory Relationship
              </h2>
              <p className="mt-3 text-white/75">
                We position ourselves as a long-term advisor in your career, not
                a transactional intermediary. Many London bankers speak with us
                periodically to understand how the market and platform landscape
                is evolving before making a move.
              </p>
            </div>
          </div>

          {/* SNAPSHOT CARD */}
          <aside className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur space-y-4">
            <h3 className="text-lg font-semibold">London Wealth Snapshot</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>• Global centre for UHNW and institutional-level advisory</li>
              <li>• Strong mix of UK onshore and international offshore platforms</li>
              <li>• Close connectivity with Swiss and Channel Islands booking</li>
              <li>• Growing multi-family office and boutique advisory ecosystem</li>
            </ul>
            <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-white/60">
              <p>
                Considering a move within London or between London and
                Switzerland? We can help you map the most accretive platform
                options.
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
              Share a high-level overview of your book and target client
              segment. We will only approach London platforms aligned with your
              strategy and risk appetite.
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
              If you are building or strengthening a London desk, we can help
              you identify senior bankers with real portability and sophisticated
              client franchises.
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