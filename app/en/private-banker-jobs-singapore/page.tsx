import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Private Banker Jobs in Singapore | Executive Partners",
  description:
    "Senior private banker and wealth manager roles in Singapore. Advisory for RMs covering SEA, Greater China, NRI and international offshore clients.",
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
          <span>Private Banker Jobs in Singapore</span>
        </nav>

        <header className="space-y-4">
          <p className="uppercase tracking-[0.2em] text-[11px] text-white/60">
            PRIVATE BANKING · SINGAPORE
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Private Banker Jobs in <span className="gold">Singapore</span>
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-3xl">
            Singapore is a global hub for Asian and international wealth. We
            support Senior RMs and Private Bankers serving SEA, Greater China,
            NRI and international offshore clients across global and regional
            platforms.
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
                Typical Mandates in Singapore
              </h2>
              <p className="mt-3 text-white/75">
                Our clients include global private banks, regional champions and
                specialist platforms. Mandates often focus on:
              </p>
              <ul className="mt-3 space-y-1 text-white/80 list-disc list-inside">
                <li>UHNW / HNW desks covering SEA, Greater China and NRI</li>
                <li>Cross-border Asian &amp; international offshore wealth</li>
                <li>Team leaders and segment heads</li>
                <li>
                  Senior advisers connecting Singapore with Swiss and European
                  booking centres
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold">
                Moves Between Singapore &amp; Switzerland
              </h2>
              <p className="mt-3 text-white/75">
                We frequently advise bankers comparing moves between Singapore
                and Swiss booking centres. We help you understand licensing,
                compensation, platform offering and impact on your client
                relationships.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold">
                Long-Term Career Positioning
              </h2>
              <p className="mt-3 text-white/75">
                Singapore offers strong long-term potential for UHNW families and
                entrepreneurs. We help you choose platforms that support your
                strategy rather than only filling short-term headcount.
              </p>
            </div>
          </div>

          <aside className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur space-y-4">
            <h3 className="text-lg font-semibold">
              Singapore Private Banking Snapshot
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>• Leading hub for Asian UHNW and HNW clients</li>
              <li>• Strong presence of global and regional PB platforms</li>
              <li>• Increasing connectivity with Swiss booking centres</li>
              <li>• Competitive environment for top producers</li>
            </ul>
            <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-white/60">
              <p>
                We can benchmark Singapore opportunities against your current
                platform and markets, and identify where your franchise is best
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
              introduce you to Singapore institutions aligned with your strategy.
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
              We can support selective growth in Singapore with senior bankers
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