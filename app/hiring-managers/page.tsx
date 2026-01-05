import type { Metadata } from "next";
import Link from "next/link";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import { BreadcrumbSchema, ServiceSchema } from "@/components/StructuredData";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://www.execpartners.ch");

export const metadata: Metadata = {
  title: "For Hiring Managers | Private Banking Recruitment | Executive Partners",
  description:
    "Executive search for senior private banking hires. Targeted recruitment for Directors, MDs, Team Heads across Switzerland, Dubai, Singapore, London, New York.",
  openGraph: {
    title: "For Hiring Managers | Executive Partners",
    description:
      "Targeted senior hires in Private Banking & Wealth Management. Real AUM portability and long-term retention.",
  },
  twitter: {
    card: "summary_large_image",
    title: "For Hiring Managers | Executive Partners",
    description:
      "Executive search for senior private banking roles. Specialists in AUM portability assessment.",
  },
};

export default function HiringManagersPage() {
  return (
    <>
      {/* Breadcrumb Schema */}
      <BreadcrumbSchema 
        items={[
          { name: "Home", url: SITE },
          { name: "For Hiring Managers", url: `${SITE}/hiring-managers` }
        ]}
      />
      
      {/* Service Schema */}
      <ServiceSchema
        name="Private Banking Executive Search"
        description="Executive search for senior private banking hires. Targeted recruitment for Directors, MDs, Team Heads across Switzerland, Dubai, Singapore, London, New York. Specialists in AUM portability assessment and long-term retention."
      />

      <main className="min-h-[70vh] px-4 md:px-6 lg:px-10 py-12 md:py-16">
        {/* TOP HERO CARD */}
        <section className="mx-auto max-w-5xl">
          <div
            className="rounded-3xl border border-white/10 bg-white/5/40 
                       bg-gradient-to-br from-white/5 via-white/0 to-brandGold/10
                       px-6 py-8 md:px-10 md:py-10
                       shadow-[0_22px_60px_rgba(0,0,0,0.65)] backdrop-blur"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brandGoldSoft/90">
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
              <PrimaryButton href="/contact">
                Contact us about a hire
              </PrimaryButton>

              <SecondaryButton href="/jobs">
                View live mandates
              </SecondaryButton>
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
          <div
            className="rounded-3xl border border-brandGold/60 bg-black/40 
                       px-6 py-7 md:px-10 md:py-9
                       shadow-[0_18px_50px_rgba(0,0,0,0.8)] backdrop-blur"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl space-y-3">
                <h2 className="text-2xl md:text-[1.65rem] font-semibold">
                  Test a 3-year business plan before you hire
                </h2>
                <p className="text-sm md:text-base text-slate-200/85">
                  Use our{" "}
                  <span className="font-semibold text-brandGoldSoft">
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
                <PrimaryButton href="/bp-simulator">
                  Open the Business Plan Simulator
                </PrimaryButton>
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
          <div
            className="rounded-3xl border border-white/10 bg-black/40 
                       px-6 py-7 md:px-10 md:py-9
                       shadow-[0_18px_50px_rgba(0,0,0,0.75)] backdrop-blur"
          >
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
                <PrimaryButton href="/contact">
                  Send us your brief
                </PrimaryButton>

                <SecondaryButton href="/portability">
                  Explore AUM portability
                </SecondaryButton>
              </div>
            </div>

            <p className="mt-6 text-[11px] text-slate-300/70">
              Existing clients with a secure posting link can continue to use
              their private URL to create or update roles. If you need your secure
              link resent, please{" "}
              <Link href="/contact" className="underline underline-offset-2">
                contact us
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
    </>
  );
}