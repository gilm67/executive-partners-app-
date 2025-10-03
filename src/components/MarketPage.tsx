"use client";

import Link from "next/link";
// Use your shim or import directly from lib/markets
import type { Market as MarketData } from "../../lib/markets";

/* UI helpers */
const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

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
        <h2 className="text-lg font-semibold tracking-tight text-white">{title}</h2>
      ) : null}
      <div className={title ? "mt-3" : ""}>{children}</div>
      {footnote ? (
        <p className="mt-3 text-xs text-neutral-500">{footnote}</p>
      ) : null}
    </section>
  );
}

export default function MarketPage({ market }: { market: MarketData }) {
  return (
    <main className="relative mx-auto max-w-6xl px-4 py-10 text-white">
      {/* subtle site glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1100px 420px at 12% -10%, rgba(59,130,246,.16) 0%, rgba(59,130,246,0) 60%), radial-gradient(950px 380px at 110% 0%, rgba(16,185,129,.15) 0%, rgba(16,185,129,0) 60%)",
        }}
      />

      {/* Eyebrow */}
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">
        Market insight
      </div>

      {/* Header */}
      <header>
        <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
          {market.name}
        </h1>
        <p className="mt-3 max-w-3xl text-neutral-300">{market.headline}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Pill>
            {cap(market.slug)}
            {market.country ? `, ${market.country}` : ""}
          </Pill>
          {market.comp?.currency ? (
            <Pill>Currency: {market.comp.currency}</Pill>
          ) : null}
        </div>
      </header>

      {/* Row 1: Hiring Pulse + Compensation */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Hiring Pulse */}
        {market.hiringPulse?.length ? (
          <Card title="Hiring Pulse">
            <ul className="grid list-disc gap-2 pl-5 text-sm text-neutral-300">
              {market.hiringPulse.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </Card>
        ) : (
          <div />
        )}

        {/* Compensation */}
        {market.comp?.bands?.length ? (
          <Card
            title={`Typical Senior PB Compensation (${market.comp.currency || ""})`}
            footnote={
              market.comp.netNote ||
              "Indicative only; varies by platform, coverage, portability, and revenue model."
            }
          >
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-white/[0.06] text-left text-white/90">
                    <th className="px-4 py-2">Level</th>
                    <th className="px-4 py-2">Base</th>
                    <th className="px-4 py-2">Bonus</th>
                    <th className="px-4 py-2">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {market.comp.bands.map((row, i) => (
                    <tr
                      key={i}
                      className="border-t border-white/10 text-neutral-300 hover:bg-white/[0.04]"
                    >
                      <td className="px-4 py-2">{row.level}</td>
                      <td className="px-4 py-2">{row.base}</td>
                      <td className="px-4 py-2">{row.bonus}</td>
                      <td className="px-4 py-2">{row.note ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ) : (
          <div />
        )}
      </div>

      {/* Row 2: Regulatory full width */}
      {market.regulatory?.length ? (
        <div className="mt-6">
          <Card title="Regulatory Must-Haves">
            <ul className="grid list-disc gap-2 pl-5 text-sm text-neutral-300">
              {market.regulatory.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </Card>
        </div>
      ) : null}

      {/* Row 3: Ecosystem full width */}
      {market.ecosystem ? (
        <div className="mt-6">
          <Card title={market.ecosystem.title || `${cap(market.slug)} ecosystem`}>
            {/* Institutions / items */}
            {market.ecosystem.items?.length ? (
              <>
                <div className="mb-2 text-xs font-semibold text-white/70">Institutions</div>
                <div className="mb-4 flex flex-wrap gap-2">
                  {market.ecosystem.items.map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            ) : null}

            {/* Trends */}
            {market.ecosystem.trends?.length ? (
              <>
                <div className="mb-2 text-xs font-semibold text-white/70">Trends</div>
                <div className="flex flex-wrap gap-2">
                  {market.ecosystem.trends.map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            ) : null}
          </Card>
        </div>
      ) : null}

      {/* Row 4: Explore other markets */}
      <div className="mt-6">
        <Card title="Explore other markets">
          <div className="flex flex-wrap gap-2">
            {(["geneva", "zurich", "dubai", "london", "singapore", "miami", "hong-kong", "new-york"] as const)
              .filter((s) => s !== market.slug)
              .map((s) => (
                <Link
                  key={s}
                  href={`/markets/${s}`}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/90 transition hover:bg-white/10"
                >
                  {cap(s.replace("-", " "))}
                </Link>
              ))}
          </div>
        </Card>
      </div>
    </main>
  );
}