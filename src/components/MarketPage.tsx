"use client";

import Link from "next/link";
import type { MarketData } from "@/data/markets";

/* helpers */
const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">
      {children}
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

function Card({
  title,
  children,
  footnote,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  footnote?: string;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 shadow-[0_1px_3px_rgba(0,0,0,.25)] ${className}`}
    >
      {title ? (
        <h2 className="text-lg font-semibold tracking-tight text-white">
          {title}
        </h2>
      ) : null}
      <div className={title ? "mt-3" : ""}>{children}</div>
      {footnote ? (
        <p className="mt-3 text-xs text-neutral-500">{footnote}</p>
      ) : null}
    </section>
  );
}

/* CTA card exactly like your reference */
function CtaCard({
  city,
  country,
}: {
  city: string;
  country?: string;
}) {
  return (
    <Card className="md:sticky md:top-20 md:h-fit">
      {/* location row */}
      <div className="flex items-center gap-2 text-sm text-white/80">
        {/* pin icon */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          className="opacity-80"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7m0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"
          />
        </svg>
        <span>
          {cap(city)}
          {country ? `, ${country}` : ""}
        </span>
      </div>

      {/* copy */}
      <p className="mt-3 text-sm text-neutral-300">
        Need a shortlist in {cap(city)}? We’ll align on coverage, portability, and onboarding — then
        move fast.
      </p>

      {/* buttons */}
      <div className="mt-4 flex gap-2">
        <Link
          href="/hiring-managers"
          className="inline-flex flex-1 items-center justify-center rounded-xl bg-[#2563EB] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]"
        >
          Hire Talent
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Contact
        </Link>
      </div>

      {/* info box */}
      <div className="mt-4 rounded-lg border border-white/15 bg-white/5 p-3 text-xs text-neutral-300">
        <div className="flex items-start gap-2">
          {/* info icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            className="mt-0.5 opacity-80"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M11 7h2v2h-2V7m1-5a10 10 0 1 0 0 20a10 10 0 0 0 0-20m1 16h-2v-6h2v6Z"
            />
          </svg>
          <span>Typical shortlist: 10–15 business days (brief-dependent).</span>
        </div>
      </div>

      {/* bottom link */}
      <Link
        href="/jobs"
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white/90 hover:underline"
      >
        View market jobs <span aria-hidden>›</span>
      </Link>
    </Card>
  );
}

export default function MarketPage({ market }: { market: MarketData }) {
  return (
    <main className="relative mx-auto max-w-6xl px-4 py-10 text-white">
      {/* glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1100px 420px at 12% -10%, rgba(59,130,246,.16) 0%, rgba(59,130,246,0) 60%), radial-gradient(950px 380px at 110% 0%, rgba(16,185,129,.15) 0%, rgba(16,185,129,0) 60%)",
        }}
      />

      <Eyebrow>Market Insight</Eyebrow>

      {/* Header */}
      <header>
        <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
          {market.title}
        </h1>
        <p className="mt-3 max-w-3xl text-neutral-300">{market.intro}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Pill>
            {cap(market.slug)}
            {market.country ? `, ${market.country}` : ""}
          </Pill>
          {market.currency ? <Pill>Currency: {market.currency}</Pill> : null}
        </div>
      </header>

      {/* Main grid: left content (2 cols) + right CTA (1 col) */}
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {/* LEFT (2 cols) */}
        <div className="md:col-span-2 space-y-6">
          {/* Hiring Pulse + Compensation side-by-side on md+ */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card title="Hiring Pulse">
              {market.highlights?.length ? (
                <ul className="grid list-disc gap-2 pl-5 text-sm text-neutral-300">
                  {market.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-neutral-400">No items available.</p>
              )}
            </Card>

            <Card
              title={`Typical Senior PB Compensation (${market.currency || ""})`}
              footnote={
                market.footnote ||
                "Indicative only; varies by platform, coverage, portability, and revenue model."
              }
            >
              {market.compTable?.length ? (
                <div className="overflow-x-auto rounded-xl border border-white/10">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-white/[0.06] text-left text-white/90">
                        <th className="px-4 py-2">Level</th>
                        <th className="px-4 py-2">Base</th>
                        <th className="px-4 py-2">Bonus</th>
                      </tr>
                    </thead>
                    <tbody>
                      {market.compTable.map((row, i) => (
                        <tr
                          key={i}
                          className="border-t border-white/10 text-neutral-300 hover:bg-white/[0.04]"
                        >
                          <td className="px-4 py-2">{row.level}</td>
                          <td className="px-4 py-2">{row.base}</td>
                          <td className="px-4 py-2">{row.bonus}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-neutral-400">No data available.</p>
              )}
            </Card>
          </div>

          {/* Regulatory (full width) */}
          <Card title="Regulatory Must-Haves">
            {market.regulatory?.length ? (
              <ul className="grid list-disc gap-2 pl-5 text-sm text-neutral-300">
                {market.regulatory.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-neutral-400">No items available.</p>
            )}
          </Card>

          {/* Ecosystem (full width) */}
          <Card title={`${cap(market.slug)} ecosystem`}>
            {market.ecosystemTags?.length ? (
              <div className="mt-1 flex flex-wrap gap-2">
                {market.ecosystemTags.map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-400">No tags available.</p>
            )}
          </Card>

          {/* Explore other markets */}
          <Card title="Explore other markets">
            <div className="flex flex-wrap gap-2">
              {(["geneva", "zurich", "dubai", "london", "singapore", "miami"] as const)
                .filter((s) => s !== market.slug)
                .map((s) => (
                  <Link
                    key={s}
                    href={`/markets/${s}`}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/90 transition hover:bg-white/10"
                  >
                    {cap(s)}
                  </Link>
                ))}
            </div>
          </Card>
        </div>

        {/* RIGHT (CTA) */}
        <aside>
          <CtaCard city={market.slug} country={market.country} />
        </aside>
      </div>
    </main>
  );
}