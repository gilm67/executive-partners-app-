import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Private Banker Jobs in Riyadh, Saudi Arabia",
  description:
    "Confidential private banker and wealth manager roles covering Saudi Arabia, based in Riyadh or from Gulf-hub coverage centres (Dubai, Geneva, Zurich). Saudization guidance for senior RMs.",
  alternates: { canonical: "https://www.execpartners.ch/en/private-banker-jobs-riyadh" },
  twitter: {
    card: "summary_large_image",
    title: "Private Banker Jobs in Riyadh, Saudi Arabia",
    description: "Confidential private banker and wealth manager roles covering Saudi Arabia, based in Riyadh or from Gulf-hub coverage centres. Saudization guidance for senior RMs.",
    images: ["/og.webp"],
  },
  robots: { index: true, follow: true },
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
          <span>Private Banker Jobs in Riyadh</span>
        </nav>

        {/* HERO / INTRO */}
        <header className="space-y-4">
          <p className="uppercase tracking-[0.2em] text-[11px] text-white/60">
            PRIVATE BANKING · RIYADH / SAUDI ARABIA
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Private Banker Jobs in <span className="gold">Riyadh</span>
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-3xl">
            Riyadh is at the centre of Saudi Arabia&apos;s onshore wealth
            management build-out under Vision 2030. We advise senior private
            bankers covering Saudi onshore UHNW and HNW clients, family
            offices and Vision 2030-linked wealth, whether based in Riyadh or
            covering the Saudi market from Dubai, Geneva or Zurich.
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
                Live Mandate: Senior RM, Saudi/GCC Clients
              </h2>
              <p className="mt-3 text-white/75">
                We are currently running a confidential mandate for a Senior
                Relationship Manager with a personally owned book of Saudi and
                wider GCC HNW/UHNW clients, based in either Riyadh or Geneva.
                The role sits on an established platform with existing Saudi
                regulatory approvals and booking capability, not a greenfield
                build.
              </p>
              <div className="mt-4">
                <Link
                  href="/en/jobs/rm-saudi-riyadh-geneva"
                  className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium bg-[#D4AF37] text-black hover:bg-[#f5d778] transition"
                >
                  View this mandate
                </Link>
              </div>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold">
                Saudi Onshore &amp; Gulf-Hub Coverage Mandates
              </h2>
              <p className="mt-3 text-white/75">
                Saudi Arabia is a fast-growing market for private banking and
                wealth management, but hiring is shaped by Saudization rules.
                Mandates linked to Saudi Arabia typically fall into one of two
                categories:
              </p>
              <ul className="mt-3 space-y-1 text-white/80 list-disc list-inside">
                <li>
                  Onshore Riyadh roles, where Director-level and above
                  positions are increasingly reserved for Saudi nationals
                </li>
                <li>
                  Gulf-hub coverage roles based in Dubai, Geneva or Zurich,
                  serving Saudi and wider GCC clients with assets booked
                  offshore
                </li>
                <li>
                  Senior RMs and Team Heads with personally owned, portable
                  Saudi/GCC books and a multi-year revenue track record
                </li>
                <li>
                  Bankers fluent in Shariah-compliant structures and
                  comfortable discussing succession and family business
                  governance with onshore clients
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold">
                Considering a Move Into or Around the Saudi Market
              </h2>
              <p className="mt-3 text-white/75">
                We help you assess whether your profile is better suited to an
                onshore Riyadh role or a Gulf-hub coverage role, based on your
                nationality, language coverage, and where your client
                relationships are best served.
              </p>
              <p className="mt-3 text-white/75">
                Discussions cover SAMA/CMA licensing, Arabic-language
                requirements, Shariah-compliant product fluency, relocation
                packages, and long-term positioning for your client franchise.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold">
                Discreet Advisory for Senior Bankers
              </h2>
              <p className="mt-3 text-white/75">
                Our approach is low-volume and fully confidential. We work
                with a small number of experienced private bankers at any time
                and help them navigate strategic moves instead of reacting to
                short-term offers.
              </p>
            </div>
          </div>

          {/* SNAPSHOT CARD */}
          <aside className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur space-y-4">
            <h3 className="text-lg font-semibold">Riyadh Wealth Snapshot</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>• Core hub for Saudi onshore UHNW/HNW &amp; family offices</li>
              <li>• Vision 2030-linked wealth and CMA-licensed CMI growth</li>
              <li>• Saudization drives senior hiring rules</li>
              <li>• Strong cooperation with Dubai, Geneva &amp; Zurich booking centres</li>
              <li>• Shariah-compliant products are a baseline expectation</li>
            </ul>
            <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-white/60">
              <p>
                If you manage a portable Saudi or wider GCC client base, we can
                map whether an onshore Riyadh role or a Gulf-hub coverage role
                is the better fit for your profile.
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
              Share a high-level overview of your Saudi or wider GCC book. We
              will only approach platforms where your franchise is genuinely
              strategic, whether onshore in Riyadh or from a Gulf-hub coverage
              seat.
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
              If you are building or expanding Saudi coverage, we can identify
              senior bankers with real client depth and portable portfolios,
              and advise on Saudization-compliant hiring structures.
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
