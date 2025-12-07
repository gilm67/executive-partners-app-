// app/en/private-banker-jobs/[slug]/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { MARKET_SLUGS, getMarket } from "@/lib/markets/data";

// Next 15: params is async in server components
type Params = Promise<{ slug: string }>;
type Props = { params: Params };

// Pre-render all job pages
export async function generateStaticParams() {
  return MARKET_SLUGS.map((slug) => ({ slug }));
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const m = getMarket(slug);

  if (!m) {
    return {
      title: "Private Banker Jobs – Executive Partners",
      description:
        "Senior private banker and team head roles with documented AUM portability and realistic business plans.",
    };
  }

  return {
    title: `Private Banker Jobs – ${m.city} | Executive Partners`,
    description: `Director / MD private banker and team lead roles in ${m.city}. Discreet moves with documented AUM portability, cross-border fit and realistic business plans.`,
    openGraph: {
      title: `Private Banker Jobs – ${m.city}`,
      description: `Confidential private banking roles in ${m.city} with documented AUM portability and realistic business plans.`,
      images: m.heroImage ? [{ url: m.heroImage }] : undefined,
    },
  };
}

export default async function PrivateBankerJobsMarketPage({ params }: Props) {
  const { slug } = await params;
  const m = getMarket(slug);

  if (!m) {
    return (
      <main className="min-h-screen bg-[#0B0E13] px-6 py-20 text-white">
        <section className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-semibold">Market not found</h1>
          <p className="mt-4 text-neutral-300">
            The page you’re looking for doesn’t exist.{" "}
            <Link href="/en/private-banker-jobs" className="underline">
              View all private banker job markets
            </Link>
            .
          </p>
        </section>
      </main>
    );
  }

  const hotRoles = m.hiringPulse?.hotRoles ?? [];
  const hotSkills = m.hiringPulse?.hotSkills ?? [];

  return (
    <main className="min-h-screen bg-[#0B0E13] px-4 py-12 text-white md:px-6 md:py-16 lg:px-10">
      {/* ================= HERO / POSITIONING ================= */}
      <section className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-[#D4AF37]/10 px-6 py-8 shadow-[0_22px_60px_rgba(0,0,0,0.7)] backdrop-blur md:px-10 md:py-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
            Private Banker Jobs · {m.city.toUpperCase()}
          </p>

          <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl lg:text-[2.6rem]">
            Discreet senior moves in {m.city} private banking
          </h1>

          <p className="mt-4 max-w-3xl text-sm text-slate-200/85 md:text-base">
            We work on Director / MD{" "}
            <span className="font-semibold">Relationship Manager</span> and{" "}
            <span className="font-semibold">Team Head</span> mandates in{" "}
            {m.city}, focusing on documented AUM portability, cross-border fit
            and platforms where your franchise is genuinely strategic.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/en/apply"
              className="btn-primary btn-xl w-full md:w-auto"
            >
              Share your profile confidentially
            </Link>
            <Link
              href={`/en/markets/${slug}`}
              className="btn-ghost w-full md:w-auto"
            >
              View the {m.city} market sheet
            </Link>
          </div>

          <div className="mt-6 grid gap-4 text-xs text-slate-200/75 md:grid-cols-3 md:text-[13px]">
            <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
              <p className="font-semibold text-white">
                Portability-first screening
              </p>
              <p className="mt-1">
                We quantify AUM, ROA and lending behaviour before we ever send
                your CV.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
              <p className="font-semibold text-white">Calibrated shortlists</p>
              <p className="mt-1">
                Only platforms where your book, segment and cross-border profile
                make sense.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
              <p className="font-semibold text-white">
                3-year business plan support
              </p>
              <p className="mt-1">
                We help shape a realistic, defendable business plan per
                platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TYPICAL MANDATES / HIRING PULSE ================= */}
      <section className="mx-auto mt-10 max-w-5xl">
        <div className="rounded-3xl border border-white/10 bg-black/40 px-6 py-7 shadow-[0_18px_50px_rgba(0,0,0,0.8)] backdrop-blur md:px-10 md:py-9">
          <header className="space-y-2">
            <h2 className="text-2xl font-semibold md:text-[1.65rem]">
              Typical mandates we run in {m.city}
            </h2>
            <p className="text-sm text-slate-200/85 md:text-base">
              We don’t advertise most senior roles. Below is indicative of the
              type of searches we handle in {m.city}.
            </p>
          </header>

          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
                Hot roles
              </p>
              <ul className="mt-2 flex flex-wrap gap-2 text-sm text-slate-100">
                {hotRoles.length > 0 ? (
                  hotRoles.map((role) => (
                    <li
                      key={role}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1"
                    >
                      {role}
                    </li>
                  ))
                ) : (
                  <li className="text-slate-300/80">
                    Senior RMs, Team Leads and Market Heads.
                  </li>
                )}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
                What clients look for
              </p>
              <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm text-slate-100">
                <li>Portable AUM with clear, documented revenue history</li>
                <li>
                  Regulatory fit (onshore vs cross-border) and clean profile
                </li>
                <li>
                  Demonstrated ability to grow NNM beyond your current platform
                </li>
                <li>
                  Alignment with their product architecture (DPM, Alts, credit)
                </li>
              </ul>
            </div>
          </div>

          {hotSkills.length > 0 && (
            <div className="mt-5 rounded-2xl border border-dashed border-[#D4AF37]/50 bg-[#D4AF37]/5 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
                Skills that move the needle
              </p>
              <ul className="mt-2 flex flex-wrap gap-2 text-xs text-slate-100 md:text-sm">
                {hotSkills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-[#D4AF37]/60 bg-[#D4AF37]/10 px-3 py-1"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* ================= WHAT WE SCREEN BEFORE SENDING A CV ================= */}
      <section className="mx-auto mt-10 max-w-5xl">
        <div className="rounded-3xl border border-white/10 bg-black/40 px-6 py-7 shadow-[0_18px_50px_rgba(0,0,0,0.8)] backdrop-blur md:px-10 md:py-9">
          <header className="space-y-2">
            <h2 className="text-2xl font-semibold md:text-[1.65rem]">
              What we screen before sharing a CV
            </h2>
            <p className="text-sm text-slate-200/85 md:text-base">
              We act as an internal filter for hiring managers, so the shortlist
              they see already anticipates typical risk, business and HR
              questions.
            </p>
          </header>

          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-white md:text-base">
                Portability &amp; book behaviour
              </h3>
              <ul className="list-disc space-y-1.5 pl-4 text-sm text-slate-100 md:text-[15px]">
                <li>Headline AUM vs realistic portable AUM bands</li>
                <li>ROA, mandate penetration and lending behaviour</li>
                <li>Wallet share and key relationship anchors</li>
                <li>
                  Cross-border mapping vs booking centres (current and target)
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-white md:text-base">
                Platform fit &amp; business case
              </h3>
              <ul className="list-disc space-y-1.5 pl-4 text-sm text-slate-100 md:text-[15px]">
                <li>Regulator / licensing fit for the target booking centre</li>
                <li>
                  How the new platform improves product, credit or succession
                  for clients
                </li>
                <li>
                  3-year NNM, revenue and margin scenarios using our{" "}
                  <Link
                    href="/en/bp-simulator"
                    className="underline underline-offset-2"
                  >
                    Business Plan Simulator
                  </Link>
                </li>
                <li>
                  Narrative that can stand up in risk, HR and ExCo approvals
                </li>
              </ul>
            </div>
          </div>

          <p className="mt-5 text-xs text-slate-300/75">
            If you lead a desk in {m.city} and would like a calibrated view of
            the senior banker market, you can{" "}
            <Link
              href="/en/hiring-managers"
              className="underline underline-offset-2"
            >
              visit the Hiring Managers page
            </Link>{" "}
            or{" "}
            <Link
              href="/en/contact"
              className="underline underline-offset-2"
            >
              contact us
            </Link>{" "}
            directly.
          </p>
        </div>
      </section>

      {/* ================= APPLY CTA + MINI BUSINESS-CASE INTAKE ================= */}
      <section className="mx-auto mt-10 max-w-5xl">
        <article className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#1b1b1f] via-[#1b222b] to-[#111317] p-6 shadow-2xl md:p-8">
          <h2 className="text-xl font-semibold md:text-2xl">
            Apply confidentially for roles in {m.city}
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-neutral-200 md:text-base">
            Share a high-level overview of your book, your ROA and the type of
            platform you are targeting. We only approach institutions for which
            your franchise is strategically relevant.
          </p>

          {/* Primary CTAs */}
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/en/apply"
              className="inline-flex items-center rounded-full bg-[#D4AF37] px-5 py-2.5 text-sm font-medium text-black transition hover:bg-[#f5d778]"
            >
              Apply confidentially
            </Link>

            <Link
              href="/en/contact"
              className="inline-flex items-center rounded-full border border-white/40 px-5 py-2.5 text-sm font-medium text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              Contact Executive Partners
            </Link>
          </div>

          {/* Mini business-case intake */}
          <form
            action="/en/apply"
            method="get"
            className="mt-6 grid gap-4 md:grid-cols-3"
          >
            <input type="hidden" name="city" value={m.city} />

            <label className="text-xs font-medium text-white/80">
              Approx. total AUM (CHF / USD)
              <input
                type="text"
                name="totalAum"
                className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                placeholder="e.g. 300m"
              />
            </label>

            <label className="text-xs font-medium text-white/80">
              Estimated portable AUM
              <input
                type="text"
                name="portableAum"
                className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                placeholder="e.g. 40–60%"
              />
            </label>

            <label className="text-xs font-medium text-white/80">
              Main client base
              <select
                name="clientBase"
                className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                defaultValue=""
              >
                <option value="" disabled>
                  Select segment
                </option>
                <option value="swiss-onshore">Swiss onshore</option>
                <option value="nns">Non-resident Swiss (NNS)</option>
                <option value="mena">MENA</option>
                <option value="latam">LATAM</option>
                <option value="uk-domiciled">UK-domiciled</option>
                <option value="eu-onshore">EU onshore</option>
                <option value="offshore-mixed">Offshore mixed</option>
              </select>
            </label>

            <button
              type="submit"
              className="md:col-span-3 mt-2 inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#f5d778]"
            >
              Send these numbers with my application
            </button>
          </form>

          <p className="mt-4 text-xs text-neutral-400">
            We never send your profile to any institution without your explicit
            consent for that specific platform.
          </p>
        </article>

        {/* BACK LINK */}
        <div className="pt-4">
          <Link
            href="/en/private-banker-jobs"
            className="text-sm text-neutral-300 underline hover:text-white"
          >
            ← All job markets
          </Link>
        </div>
      </section>
    </main>
  );
}