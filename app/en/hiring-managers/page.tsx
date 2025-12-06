import type { Metadata } from "next";
import Link from "next/link";

/* ----------------- SEO metadata (EN) ----------------- */
export const metadata: Metadata = {
  title: "Hiring Managers – Executive Partners",
  description:
    "Discreet, targeted senior hires in Private Banking & Wealth Management. Geneva-based with mandates across Switzerland, the UK, US, Dubai, Singapore and Hong Kong.",
};

/* ----------------- Page ----------------- */
export default function HiringManagersPageEn() {
  return (
    <main className="min-h-[70vh] px-4 py-12 md:px-6 md:py-16 lg:px-10">
      {/* TOP HERO CARD */}
      <section className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-white/10 bg-white/5 bg-gradient-to-br from-white/5 via-white/0 to-emerald-500/5 px-6 py-8 shadow-[0_22px_60px_rgba(0,0,0,0.65)] backdrop-blur md:px-10 md:py-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-300/80">
            For Hiring Managers
          </p>

          <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl lg:text-[2.6rem]">
            Targeted senior hires in Private Banking &amp; Wealth Management
          </h1>

          <p className="mt-4 max-w-3xl text-sm text-slate-200/80 md:text-base">
            We work with Desk Heads, Market Leaders and COOs across Switzerland,
            the UK, US, Dubai, Singapore and Hong Kong to build and strengthen
            front-office teams with real AUM portability and long-term
            retention.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/en/hiring-managers/brief"
              className="btn-primary btn-xl w-full md:w-auto"
            >
              Brief a mandate
            </Link>

            <Link
              href="/en/private-banker-jobs"
              className="btn-ghost w-full md:w-auto"
            >
              View private banker pipeline
            </Link>
          </div>

          <div className="mt-6 grid gap-4 text-xs text-slate-200/75 md:grid-cols-3 md:text-[13px]">
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
        <div className="rounded-3xl border border-emerald-400/40 bg-black/40 px-6 py-7 shadow-[0_18px_50px_rgba(0,0,0,0.8)] backdrop-blur md:px-10 md:py-9">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-2xl font-semibold md:text-[1.65rem]">
                Test a 3-year business plan before you hire
              </h2>
              <p className="text-sm text-slate-200/85 md:text-base">
                Use our{" "}
                <span className="font-semibold text-emerald-300">
                  Business Plan Simulator
                </span>{" "}
                to model NNM, ROA and net margin for a specific RM or team
                before you open a mandate.
              </p>

              <ul className="mt-1 space-y-1.5 list-disc pl-5 text-sm text-slate-200/85 md:text-[15px]">
                <li>3-year view on NNM, revenue, fixed cost and net margin</li>
                <li>Scenario analysis with conservative vs ambitious targets</li>
                <li>Exportable PDF to share internally with COOs / HR / ExCo</li>
              </ul>
            </div>

            <div className="mt-3 flex flex-col gap-3 md:mt-0 md:min-w-[230px]">
              <Link
                href="/en/bp-simulator"
                className="btn-primary btn-xl w-full md:w-auto"
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
        <div className="rounded-3xl border border-white/10 bg-black/40 px-6 py-7 shadow-[0_18px_50px_rgba(0,0,0,0.75)] backdrop-blur md:px-10 md:py-9">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-2xl font-semibold md:text-[1.65rem]">
                Share a brief (no portals, no admin token)
              </h2>
              <p className="text-sm text-slate-200/80 md:text-base">
                Send us a short description of the mandate – booking centre,
                market focus, seniority, regulatory requirements and product
                scope – and we will revert the same business day with clarifying
                questions or a proposed call slot.
              </p>

              <ul className="mt-1 space-y-1.5 list-disc pl-5 text-sm text-slate-200/85 md:text-[15px]">
                <li>Director / MD RMs, Team Heads and Market Leaders</li>
                <li>Swiss onshore, international desks and booking centres</li>
                <li>Coverage across CH, UK, US, MEA, LATAM and APAC</li>
              </ul>
            </div>

            <div className="mt-4 flex flex-col gap-3 md:mt-0 md:min-w-[220px]">
              <Link
                href="/en/hiring-managers/brief"
                className="btn-primary w-full md:w-auto"
              >
                Send us your brief
              </Link>

              <Link
                href="/en/portability"
                className="btn-outline-emerald w-full md:w-auto"
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