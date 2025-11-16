import Link from "next/link";

// Reuse existing SEO metadata from the base page
export { metadata } from "../../hiring-managers/page";

export default function HiringManagersPageEn() {
  return (
    <main className="min-h-[70vh] px-4 md:px-6 lg:px-10 py-12 md:py-16">
      {/* TOP HERO CARD */}
      <section className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-white/10 bg-white/5/40 bg-gradient-to-br from-white/5 via-white/0 to-emerald-500/5 px-6 py-8 md:px-10 md:py-10 shadow-[0_22px_60px_rgba(0,0,0,0.65)] backdrop-blur">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-300/80">
            For Hiring Managers
          </p>

          <h1 className="mt-4 text-3xl md:text-4xl lg:text-[2.6rem] font-semibold leading-tight">
            Targeted senior hires in Private Banking &amp; Wealth Management
          </h1>

          <p className="mt-4 max-w-3xl text-sm md:text-base text-slate-200/80">
            We work with Desk Heads, Market Leaders and COOs across Switzerland,
            the UK, US, Dubai, Singapore and Hong Kong to build and strengthen
            front-office teams with real AUM portability and long-term
            retention.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/en/contact"
              className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium
                         bg-emerald-500 text-white shadow-lg shadow-emerald-500/30
                         hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2
                         focus-visible:ring-emerald-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
                         transition"
            >
              Contact us about a hire
            </Link>

            <Link
              href="/en/jobs"
              className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium
                         border border-white/15 bg-black/10 text-slate-100
                         hover:border-white/35 hover:bg-white/5
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60
                         transition"
            >
              View live mandates
            </Link>
          </div>

          <div className="mt-6 grid gap-4 text-xs md:text-[13px] text-slate-200/75 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <p className="font-semibold text-white">200+ senior placements</p>
              <p className="mt-1 text-slate-300/75">
                Director / MD RMs, Team Heads and Market Leaders.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <p className="font-semibold text-white">Real AUM portability</p>
              <p className="mt-1 text-slate-300/75">
                We screen for book composition, cross-border and platform fit.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <p className="font-semibold text-white">12+ booking centres</p>
              <p className="mt-1 text-slate-300/75">
                CH, UK, US, MEA, LATAM and APAC private-banking hubs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BP SIMULATOR – HIRING MANAGERS FOCUS */}
      <section className="mx-auto mt-10 max-w-5xl">
        <div className="rounded-3xl border border-emerald-400/40 bg-black/40 px-6 py-7 md:px-10 md:py-9 shadow-[0_18px_50px_rgba(0,0,0,0.8)] backdrop-blur">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-2xl md:text-[1.65rem] font-semibold">
                Test a 3-year business plan before you hire
              </h2>
              <p className="text-sm md:text-base text-slate-200/85">
                Use our{" "}
                <span className="font-semibold text-emerald-300">
                  Business Plan Simulator
                </span>{" "}
                to model NNM, ROA and net margin for a specific RM or team
                before you open a mandate.
              </p>

              <ul className="mt-1 list-disc pl-5 text-sm md:text-[15px] text-slate-200/85 space-y-1.5">
                <li>3-year view on NNM, revenue, fixed cost and net margin</li>
                <li>Scenario analysis with conservative vs ambitious targets</li>
                <li>Exportable PDF to share internally with COOs / HR / ExCo</li>
              </ul>
            </div>

            <div className="mt-3 flex flex-col gap-3 md:mt-0 md:min-w-[230px]">
              <Link
                href="/en/bp-simulator"
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium
                           bg-emerald-500 text-white shadow-lg shadow-emerald-500/30
                           hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2
                           focus-visible:ring-emerald-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
                           transition"
              >
                Open the Business Plan Simulator
              </Link>
              <p className="text-[11px] text-slate-300/75">
                No login required. Use anonymised data (AUM, NNM, ROA, fixed
                costs) for pre-mandate calibration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SHARE A BRIEF – GLASS CARD */}
      <section className="mx-auto mt-10 max-w-5xl">
        <div className="rounded-3xl border border-white/10 bg-black/40 px-6 py-7 md:px-10 md:py-9 shadow-[0_18px_50px_rgba(0,0,0,0.75)] backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-2xl md:text-[1.65rem] font-semibold">
                Share a brief (no portals, no admin token)
              </h2>
              <p className="text-sm md:text-base text-slate-200/80">
                Send us a short description of the mandate – booking centre,
                market focus, seniority, regulatory requirements and product
                scope – and we will revert the same business day with clarifying
                questions or a proposed call slot.
              </p>

              <ul className="mt-1 list-disc pl-5 text-sm md:text-[15px] text-slate-200/85 space-y-1.5">
                <li>Director / MD RMs, Team Heads and Market Leaders</li>
                <li>Swiss onshore, international desks and booking centres</li>
                <li>Coverage across CH, UK, US, MEA, LATAM and APAC</li>
              </ul>
            </div>

            <div className="mt-4 flex flex-col gap-3 md:mt-0 md:min-w-[220px]">
              <Link
                href="/en/contact"
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium
                           bg-emerald-500 text-white shadow-lg shadow-emerald-500/30
                           hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2
                           focus-visible:ring-emerald-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
                           transition"
              >
                Send us your brief
              </Link>

              <Link
                href="/en/portability"
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium
                           border border-emerald-400/60 bg-black/20 text-emerald-200
                           hover:border-emerald-300 hover:bg-emerald-500/10
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/80
                           transition"
              >
                Explore AUM portability
              </Link>
            </div>
          </div>

          <p className="mt-6 text-[11px] text-slate-300/70">
            Existing clients with a secure posting link can continue to use
            their private URL to create or update roles. If you need your secure
            link resent, please{" "}
            <Link href="/en/contact" className="underline underline-offset-2">
              contact us
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}