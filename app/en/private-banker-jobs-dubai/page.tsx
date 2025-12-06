import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Private Banker Jobs in Dubai | Executive Partners",
  description:
    "Confidential private banker and wealth manager roles in Dubai and the DIFC. Advisory for Senior RMs relocating from Switzerland, Europe and Asia to the UAE.",
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
          <span>Private Banker Jobs in Dubai</span>
        </nav>

        <header className="space-y-4">
          <p className="uppercase tracking-[0.2em] text-[11px] text-white/60">
            PRIVATE BANKING · DUBAI / DIFC
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Private Banker Jobs in <span className="gold">Dubai</span>
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-3xl">
            Dubai has become a strategic hub for UHNW and HNW clients from the
            GCC, Levant, South Asia, Africa and beyond. We support senior
            private bankers exploring moves into or within the DIFC and wider UAE.
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
                Typical Mandates in Dubai
              </h2>
              <p className="mt-3 text-white/75">
                We work with global and regional platforms in Dubai on roles such
                as:
              </p>
              <ul className="mt-3 space-y-1 text-white/80 list-disc list-inside">
                <li>
                  Senior RMs covering GCC, Levant, Africa, NRI and international
                  offshore clients
                </li>
                <li>Team Heads and Market Leaders building Dubai-based desks</li>
                <li>
                  Senior hires for new licences, booking-centre build-outs and
                  strategic initiatives
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold">
                Relocating to Dubai as a Private Banker
              </h2>
              <p className="mt-3 text-white/75">
                Moving from Switzerland, Europe or Asia to Dubai requires clear
                expectations on client portability, regulatory environment,
                compensation and platform positioning. We help you compare
                opportunities and stress-test your business case.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold">
                Long-Term Outlook in the UAE
              </h2>
              <p className="mt-3 text-white/75">
                Many bankers see Dubai as a long-term base for UHNW families and
                entrepreneurs. We provide realistic perspectives on growth
                potential, competition and how different platforms support senior
                advisors and team heads.
              </p>
            </div>
          </div>

          <aside className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur space-y-4">
            <h3 className="text-lg font-semibold">Dubai Wealth Snapshot</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>• Strong inflows of UHNW and entrepreneur wealth</li>
              <li>• Mix of global private banks and regional champions</li>
              <li>• DIFC regulatory framework with growing sophistication</li>
              <li>• Competitive environment for top-performing RMs</li>
            </ul>
            <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-white/60">
              <p>
                We can help you assess which Dubai platforms best match your book,
                client base and long-term objectives.
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
              Share a high-level overview of your current book and target market
              in the UAE. We can advise on which platforms are realistically
              interested and competitive.
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
              We can help you attract senior international bankers into Dubai,
              with a focus on portability, cultural fit and long-term retention.
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