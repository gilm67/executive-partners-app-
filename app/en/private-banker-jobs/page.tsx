// app/en/private-banker-jobs/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { getAllMarkets } from "@/lib/markets/data";

export const metadata: Metadata = {
  title: "Private Banker Jobs — Executive Partners",
  description:
    "Explore confidential Private Banking and Wealth Management opportunities across key markets: Switzerland, UK, US, UAE, Singapore, Hong Kong and EU hubs.",
  openGraph: {
    title: "Private Banker Jobs — Executive Partners",
    description:
      "Market-specific Private Banker roles with a focus on portable books, ROA and strategic fit.",
  },
};

const HUBS = [
  { city: "Geneva", href: "/en/private-banker-jobs/geneva" },
  { city: "Zurich", href: "/en/private-banker-jobs/zurich" },
  { city: "Dubai", href: "/en/private-banker-jobs/dubai" },
  { city: "Singapore", href: "/en/private-banker-jobs/singapore" },
  { city: "London", href: "/en/private-banker-jobs/london" },
  { city: "New York", href: "/en/private-banker-jobs/new-york" },
  { city: "Miami", href: "/en/private-banker-jobs/miami" },
  { city: "Milano", href: "/en/private-banker-jobs/milan" },
  { city: "Lisbon", href: "/en/private-banker-jobs/lisbon" },
];

export default function PrivateBankerJobsIndexPage() {
  const allMarkets = getAllMarkets();

  // Optional: control display order instead of pure data order
  const ORDER = [
    "geneva",
    "zurich",
    "london",
    "dubai",
    "singapore",
    "hong-kong",
    "new-york",
    "miami",
    "paris",
    "milan",
    "lisbon",
  ];

  const markets = [...allMarkets].sort((a, b) => {
    const ia = ORDER.indexOf(a.slug);
    const ib = ORDER.indexOf(b.slug);
    // Unknown slugs go to the end
    const sa = ia === -1 ? Number.POSITIVE_INFINITY : ia;
    const sb = ib === -1 ? Number.POSITIVE_INFINITY : ib;
    return sa - sb;
  });

  return (
    <main className="min-h-screen bg-[#0B0E13] text-white">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="h-full w-full bg-[radial-gradient(900px_400px_at_10%_-10%,rgba(212,175,55,0.25),transparent_60%),radial-gradient(900px_400px_at_100%_0%,rgba(15,118,110,0.32),transparent_60%),linear-gradient(to_bottom,#020617,#020617)]" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-6 py-14 md:flex-row md:items-end md:py-16 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">
              PRIVATE BANKING · GLOBAL HUBS
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Private Banker Jobs —{" "}
              <span className="text-[#D4AF37]">Confidential Market Hubs</span>
            </h1>
            <p className="mt-4 text-sm text-neutral-200 md:text-base">
              Browse our core booking centres and onshore hubs. Each city page
              outlines compensation benchmarks, licensing expectations, client
              base dynamics and how we position your book with hiring
              committees.
            </p>
          </div>

          <div className="max-w-md rounded-2xl border border-white/15 bg-black/40 p-5 text-sm text-neutral-200 shadow-xl backdrop-blur">
            <p>
              We focus on senior Private Bankers, Team Leads and Market Heads
              with portable, well-documented revenue and a credible new-money
              story. Start from your target hub and then share your book
              profile confidentially.
            </p>
          </div>
        </div>
      </section>

      {/* ================= KEY HUBS PANEL (replaces ugly green list) ================= */}
      <section className="mx-auto max-w-6xl px-6 pt-10 md:pt-12">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#050814] via-[#050814] to-[#020617] p-6 shadow-2xl md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-300/80">
                Key global hubs
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                Explore confidential Private Banker roles by hub
              </h2>
              <p className="mt-2 max-w-xl text-sm text-neutral-300 md:text-base">
                Start from the city where your franchise is strongest. Each hub
                page focuses on compensation, portability and the platforms that
                are actually hiring.
              </p>
            </div>

            <div className="md:text-right">
              <p className="inline-flex max-w-xs items-center rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-200">
                Geneva · Zurich · London · Dubai · Singapore · Hong Kong · New
                York · Miami · Paris · Milan · Lisbon
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {HUBS.map((hub) => (
              <Link
                key={hub.city}
                href={hub.href}
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 transition duration-150 hover:border-emerald-300/80 hover:bg-white/10"
              >
                <span className="font-medium">
                  Private Banker Jobs in {hub.city}
                </span>
                <span className="text-xs text-neutral-300 group-hover:text-emerald-300">
                  View hub →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MARKETS GRID ================= */}
      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold md:text-xl">
            Active Private Banker Job Markets
          </h2>
          <Link
            href="/en/markets"
            className="text-sm text-neutral-300 underline hover:text-white"
          >
            View all market sheets →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {markets.map((m) => {
            const firstStat = m.atAGlance?.[0];
            const firstHotRole = m.hiringPulse?.hotRoles?.[0];

            return (
              <article
                key={m.slug}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-neutral-900/40 p-5 shadow-xl transition hover:-translate-y-1 hover:border-[#D4AF37] hover:bg-neutral-900/70"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-semibold md:text-lg">
                      {m.city}
                    </h3>
                    <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs uppercase tracking-wide text-neutral-300">
                      {m.country}
                    </span>
                  </div>

                  <p className="mt-2 line-clamp-3 text-xs text-neutral-300 md:text-sm">
                    {m.summary}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-neutral-300">
                    <span className="rounded-full bg-black/50 px-2.5 py-1">
                      Currency: {m.currency}
                    </span>
                    {firstStat && (
                      <span className="rounded-full bg-black/50 px-2.5 py-1">
                        Focus: {firstStat.value}
                      </span>
                    )}
                    {firstHotRole && (
                      <span className="rounded-full bg-black/50 px-2.5 py-1">
                        Hot role: {firstHotRole}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={`/en/private-banker-jobs/${m.slug}`}
                    className="inline-flex flex-1 items-center justify-center rounded-full bg-[#D4AF37] px-4 py-2 text-xs font-medium text-black transition hover:bg-[#f5d778]"
                  >
                    View {m.city} Private Banker jobs
                  </Link>
                  <Link
                    href={`/en/markets/${m.slug}`}
                    className="inline-flex items-center justify-center rounded-full border border-white/30 px-4 py-2 text-xs font-medium text-neutral-100 transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  >
                    Market sheet
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* ================= CTA BLOCK ================= */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-gradient-to-r from-[#111827] via-[#020617] to-[#111827] p-6 shadow-2xl md:p-8">
          <div className="grid gap-6 md:grid-cols-3 md:items-center">
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold md:text-xl">
                Already clear on your next hub?
              </h3>
              <p className="mt-2 text-sm text-neutral-200 md:text-base">
                If you already know where you want to book your clients next
                (Geneva, Zurich, London, Dubai, Singapore, Hong Kong, New York,
                Miami, Paris, Milan, Lisbon), you can skip straight to a
                confidential conversation. We will calibrate your portability
                and business case before approaching any platform.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/en/apply"
                className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-4 py-2.5 text-sm font-medium text-black transition hover:bg-[#f5d778]"
              >
                Apply confidentially
              </Link>
              <Link
                href="/en/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-4 py-2.5 text-sm font-medium text-neutral-100 transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                Contact Executive Partners
              </Link>
            </div>
          </div>
        </div>

        {/* ================= BACK LINK ================= */}
        <div className="mt-6 pt-2">
          <Link
            href="/en"
            className="text-sm underline text-neutral-300 hover:text-white"
          >
            ← Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}