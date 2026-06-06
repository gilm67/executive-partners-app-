import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Private Banker Jobs in Hong Kong",
  description:
    "Senior private banker and wealth manager roles in Hong Kong. Advisory for RMs covering Greater China, UHNW Asian families and international offshore clients.",
  alternates: { canonical: "https://www.execpartners.ch/en/private-banker-jobs-hong-kong" },
  twitter: {
    card: "summary_large_image",
    title: "Private Banker Jobs in Hong Kong",
    description: "Senior private banker and wealth manager roles in Hong Kong. Advisory for RMs covering Greater China, UHNW Asian families and international offshore clients.",
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
          <span>Private Banker Jobs in Hong Kong</span>
        </nav>

        <header className="space-y-4">
          <p className="uppercase tracking-[0.2em] text-[11px] text-white/60">
            PRIVATE BANKING · HONG KONG
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Private Banker Jobs in <span className="gold">Hong Kong</span>
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-3xl">
            Hong Kong remains Asia's premier booking centre for Greater China
            and UHNW Asian wealth. We support Senior RMs and Private Bankers
            serving mainland Chinese, Hong Kong and international clients across
            global and regional platforms.
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
                Typical Mandates in Hong Kong
              </h2>
              <p className="mt-3 text-white/75">
                Our clients include global private banks, regional champions and
                specialist platforms. Mandates often focus on:
              </p>
              <ul className="mt-3 space-y-1 text-white/80 list-disc list-inside">
                <li>UHNW / HNW desks covering Greater China and mainland Chinese clients</li>
                <li>Cross-border Asian and international offshore wealth</li>
                <li>Team leaders and segment heads</li>
                <li>Senior advisers connecting Hong Kong with Swiss and European booking centres</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold">
                Hong Kong as a Global Wealth Hub
              </h2>
              <p className="mt-3 text-white/75">
                Hong Kong recently overtook Switzerland as the world's largest
                offshore wealth centre per BCG data. Demand for senior
                relationship managers with established Greater China networks
                and clean compliance profiles has never been higher.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold">
                Long-Term Career Positioning
              </h2>
              <p className="mt-3 text-white/75">
                We help senior bankers evaluate moves between Hong Kong,
                Singapore and Swiss booking centres, assessing licensing,
                compensation structures, platform offering and client
                relationship portability.
              </p>
            </div>
          </div>

          <aside className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur space-y-4">
            <h3 className="text-lg font-semibold">
              Hong Kong Private Banking Snapshot
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>• World's largest offshore wealth centre per BCG 2025</li>
              <li>• Dominant hub for Greater China UHNW clients</li>
              <li>• Strong presence of global and regional PB platforms</li>
              <li>• Increasing connectivity with Swiss and Singapore booking centres</li>
            </ul>
            <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-white/60">
              <p>
                We benchmark Hong Kong opportunities against your current
                platform and markets, identifying where your franchise is best
                positioned.
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
              introduce you to Hong Kong institutions aligned with your strategy.
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
              We support selective growth in Hong Kong with senior bankers
              who bring real portability and cultural fit, not just headcount.
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
