// app/en/private-banker-jobs/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { getAllMarkets } from "@/lib/markets/data";

export const metadata: Metadata = {
  title: "Private Banker Jobs by Market",
  description:
    "Director / MD private banker and team head roles across Geneva, Zurich, London, Dubai, Singapore, Hong Kong and other key wealth hubs.",
};

export default function PrivateBankerJobsIndexPage() {
  const markets = getAllMarkets();

  return (
    <main className="min-h-screen bg-[#0B0E13] px-4 py-12 text-white md:px-6 md:py-16 lg:px-10">
      {/* ================= HERO ================= */}
      <section className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-[#D4AF37]/10 px-6 py-8 shadow-[0_22px_60px_rgba(0,0,0,0.7)] backdrop-blur md:px-10 md:py-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
            Private Banker Jobs · Global Wealth Hubs
          </p>

          <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl lg:text-[2.6rem]">
            Director &amp; MD private banker roles by booking centre
          </h1>

          <p className="mt-4 max-w-3xl text-sm text-slate-200/85 md:text-base">
            We focus on discreet senior moves for{" "}
            <span className="font-semibold">Relationship Managers</span>,{" "}
            <span className="font-semibold">Team Heads</span> and{" "}
            <span className="font-semibold">Market Heads</span> with documented AUM
            portability and a realistic, defendable business plan for each
            platform.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/en/apply"
              className="btn-primary btn-xl w-full md:w-auto"
            >
              Share your profile confidentially
            </Link>
            <Link
              href="/en/markets"
              className="btn-ghost w-full md:w-auto"
            >
              View all market sheets
            </Link>
          </div>

          <p className="mt-4 text-xs text-slate-300/80">
            We never send your CV or business plan to any institution without
            your explicit consent for that specific platform.
          </p>
        </div>
      </section>

      {/* ================= MARKET CARDS ================= */}
      <section className="mx-auto mt-10 max-w-5xl">
        <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold md:text-[1.65rem]">
              Private banker job markets
            </h2>
            <p className="text-sm text-slate-200/85 md:text-base">
              Choose your main booking centre to see how we structure mandates,
              approvals and realistic business plans in that hub.
            </p>
          </div>
        </header>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {markets.map((m) => (
            <Link
              key={m.slug}
              href={`/en/private-banker-jobs/${m.slug}`}
              className="group flex items-stretch justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 transition duration-150 hover:border-[#D4AF37]/80 hover:bg-white/10"
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 group-hover:text-[#D4AF37]">
                  Booking centre
                </span>
                <span className="text-base font-semibold">{m.city}</span>
                {m.region && (
                  <span className="text-xs text-slate-300">
                    {m.region}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 group-hover:text-[#D4AF37]">
                View roles
                <span aria-hidden className="text-lg">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-6 text-xs text-slate-400">
          If your current booking centre is not listed, you can still{" "}
          <Link href="/en/apply" className="underline underline-offset-2">
            share your profile confidentially
          </Link>{" "}
          and we&apos;ll advise you which platforms and locations are realistic
          given your client base, licensing and AUM portability.
        </p>
      </section>
    </main>
  );
}