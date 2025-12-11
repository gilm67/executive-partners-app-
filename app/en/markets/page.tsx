// app/en/markets/page.tsx
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { getAllMarkets } from "@/lib/markets/data";

export const metadata: Metadata = {
  title: "Private Banking Markets | Executive Partners",
  description:
    "Directional compensation benchmarks, licensing frameworks, hiring pulse and local ecosystems for leading private banking hubs.",
};

export default function MarketsIndexPage() {
  const markets = getAllMarkets();

  return (
    <main className="min-h-screen bg-[#0B0E13] text-white">
      {/* HERO */}
      <section className="border-b border-white/10 bg-gradient-to-b from-black/80 via-[#05070B] to-[#0B0E13]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 md:flex-row md:items-end md:justify-between md:py-16">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/50">
              PRIVATE BANKING MARKETS
            </p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Compare private banking hubs before you move your book.
            </h1>
            <p className="text-sm text-neutral-300 md:text-base">
              High-signal market sheets for Geneva, Zurich, London, Dubai,
              Singapore, Hong Kong, New York, Miami and key EU hubs. Built for
              senior private bankers and hiring managers, not graduates.
            </p>
          </div>
          <div className="mt-2 flex flex-col gap-2 text-xs text-neutral-400 md:text-sm">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Updated for 2025 hiring season
            </div>
            <p>
              Benchmarks are directional and focus on mid-senior RMs through
              team leads. For bespoke business cases,{" "}
              <Link
                href="/en/contact"
                className="text-[#F4D270] underline underline-offset-2"
              >
                contact Executive Partners
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* MARKET GRID */}
      <section className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {markets.map((m) => {
            const keyBanksPreview =
              m.ecosystem?.keyBanks?.slice(0, 3).join(" • ") ?? "";
            const statsPreview = m.atAGlance?.slice(0, 2) ?? [];

            return (
              <article
                key={m.slug}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/60 shadow-xl ring-1 ring-white/5 transition hover:-translate-y-1 hover:border-[#D4AF37]/70 hover:ring-[#D4AF37]/60"
              >
                {/* CLICKABLE AREA: IMAGE + CONTENT */}
                <Link
                  href={`/en/markets/${m.slug}`}
                  className="group flex flex-1 flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  {/* IMAGE */}
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image
                      src={m.heroImage}
                      alt={`${m.city} private banking market`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-110"
                      priority={m.slug === "geneva" || m.slug === "zurich"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">
                      {m.city} · {m.country}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="flex flex-1 flex-col gap-4 p-5">
                    <header className="space-y-1.5">
                      <h2 className="text-lg font-semibold">
                        {m.city}{" "}
                        <span className="text-xs font-normal text-white/50">
                          ({m.currency})
                        </span>
                      </h2>
                      <p className="line-clamp-3 text-sm text-neutral-300">
                        {m.summary}
                      </p>
                    </header>

                    {/* MINI STATS */}
                    {statsPreview.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        {statsPreview.map((stat) => (
                          <div
                            key={stat.label}
                            className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10"
                          >
                            <div className="text-[11px] uppercase tracking-wide text-neutral-400">
                              {stat.label}
                            </div>
                            <div className="mt-0.5 text-sm font-medium text-white">
                              {stat.value}
                            </div>
                            {stat.hint && (
                              <div className="mt-0.5 text-[11px] text-neutral-400">
                                {stat.hint}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* KEY BANKS */}
                    {keyBanksPreview && (
                      <div className="rounded-xl bg-black/40 p-3 text-xs ring-1 ring-white/10">
                        <div className="mb-1 text-[11px] uppercase tracking-wide text-neutral-400">
                          Key platforms
                        </div>
                        <p className="text-[12px] text-neutral-200">
                          {keyBanksPreview}
                          {m.ecosystem?.keyBanks &&
                            m.ecosystem.keyBanks.length > 3 &&
                            " …"}
                        </p>
                      </div>
                    )}
                  </div>
                </Link>

                {/* CTAS (BOTTOM ROW) */}
                <div className="flex flex-wrap gap-2 border-t border-white/10 px-5 py-4">
                  <Link
                    href={`/en/markets/${m.slug}`}
                    className="btn-primary inline-flex flex-1 items-center justify-center gap-1 rounded-full px-5 py-2 text-xs font-semibold shadow-md shadow-black/30"
                  >
                    Open market deep dive
                    <span aria-hidden>↗</span>
                  </Link>
                  <Link
                    href={`/en/private-banker-jobs-${m.slug}`}
                    className="btn-ghost inline-flex flex-[0.9] items-center justify-center rounded-full px-5 py-2 text-xs font-semibold text-white/90"
                  >
                    View jobs in {m.city}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* FOOTNOTE */}
        <p className="mt-10 max-w-4xl text-xs text-neutral-500">
          Ranges and market information are directional, based on Executive
          Partners&apos; work with private banks, wealth managers and family
          offices across these hubs. For a calibrated business case or mandate
          briefing, please{" "}
          <Link
            href="/en/contact"
            className="text-[#F4D270] underline underline-offset-2"
          >
            contact us
          </Link>
          .
        </p>
      </section>
    </main>
  );
}