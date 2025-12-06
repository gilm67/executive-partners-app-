import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Private Banker Jobs in Madrid | Executive Partners",
  description:
    "Private banking and wealth management roles in Madrid, including Iberian and Latin American client coverage with strong links to Switzerland and Europe.",
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
          <span>Private Banker Jobs in Madrid</span>
        </nav>

        {/* HERO / INTRO */}
        <header className="space-y-4">
          <p className="uppercase tracking-[0.2em] text-[11px] text-white/60">
            PRIVATE BANKING · MADRID
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Private Banker Jobs in <span className="gold">Madrid</span>
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-3xl">
            Executive Partners advises private bankers and wealth managers in
            Madrid, particularly those covering Iberian and Latin American
            client franchises, often in collaboration with Swiss and European
            booking centres.
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
                Mandates in Madrid &amp; Iberian Wealth
              </h2>
              <p className="mt-3 text-white/75">
                Madrid hosts both domestic wealth managers and international
                platforms with strong Iberian and LATAM connectivity. Typical
                mandates include:
              </p>
              <ul className="mt-3 space-y-1 text-white/80 list-disc list-inside">
                <li>
                  Senior RMs serving Spanish UHNW and HNW families and
                  entrepreneurs
                </li>
                <li>
                  Iberia–LATAM desks within European or Swiss private banks
                </li>
                <li>
                  Roles linking Madrid coverage with Swiss or Luxembourg booking
                  centres
                </li>
                <li>
                  Team leaders consolidating Iberian or Spanish-speaking
                  franchises
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold">
                Cross-Border Options with Switzerland &amp; Europe
              </h2>
              <p className="mt-3 text-white/75">
                Many Madrid-based bankers consider dual options between remaining
                in Spain and moving to a Swiss or other European booking centre
                while keeping a Spanish or LATAM-focused client base.
              </p>
              <p className="mt-3 text-white/75">
                We help you compare platform strength, pricing, regulatory
                frameworks and long-term impact on your franchise before
                progressing any move.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold">
                Discreet Market Intelligence
              </h2>
              <p className="mt-3 text-white/75">
                Our work in Madrid is highly confidential and relationship
                driven. We share calibrated market intelligence so you can time
                your next move around both your book and the platform cycle.
              </p>
            </div>
          </div>

          {/* SNAPSHOT CARD */}
          <aside className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur space-y-4">
            <h3 className="text-lg font-semibold">Madrid Wealth Snapshot</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>• Growing hub for Iberian UHNW &amp; HNW clients</li>
              <li>• Strong links with LATAM and Spanish-speaking markets</li>
              <li>• Combination of domestic banks and international platforms</li>
              <li>• Increasing coordination with Swiss and EU booking centres</li>
            </ul>
            <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-white/60">
              <p>
                If you cover Iberian and/or LATAM clients from Madrid, we can
                map which platforms are currently best positioned for your book.
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
              Share a high-level overview of your Iberian and/or LATAM
              franchise, revenue and current platform. We will only approach
              institutions where your profile is strategic.
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
              If you are building an Iberian or Spanish-speaking wealth
              franchise, we can help you identify Madrid-based bankers with
              real client depth and proven revenue.
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