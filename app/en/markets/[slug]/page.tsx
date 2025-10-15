// app/en/markets/[slug]/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { getMarket, MARKET_SLUGS, fmt } from "@/lib/markets/data";

// Next 15: params is async in server components
type Params = Promise<{ slug: string }>;
type Props = { params: Params };

export async function generateStaticParams() {
  return MARKET_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; // ✅ await params
  const m = getMarket(slug);
  if (!m) return { title: "Markets — Executive Partners" };
  return {
    title: `${m.city} — Private Banking Market | Executive Partners`,
    description: `${m.city}: compensation benchmarks, licensing, client base, relocation & tax, hiring pulse, and local ecosystem for Private Banking / Wealth Management.`,
    openGraph: {
      title: `${m.city} — Private Banking Market | Executive Partners`,
      description: m.summary,
      images: [{ url: m.heroImage }],
    },
  };
}

export default async function MarketPage({ params }: Props) {
  const { slug } = await params; // ✅ await params
  const m = getMarket(slug);

  if (!m) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-2xl font-semibold">Market not found</h1>
        <p className="mt-4 text-neutral-300">
          The market you’re looking for doesn’t exist.{" "}
          <Link href="/en/markets" className="underline">
            See all markets
          </Link>
          .
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh]">
      {/* Hero */}
      <section className="relative h-[44vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${m.heroImage})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-end px-6 pb-10">
          <div className="rounded-2xl bg-black/40 backdrop-blur-md p-6 md:p-8 shadow-xl ring-1 ring-white/10">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
              Move your book to <span className="text-white/90">{m.city}</span> with confidence.
            </h1>
            <p className="mt-3 max-w-3xl text-neutral-200">{m.summary}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 gap-6 md:gap-8">

          {/* NEW: Hiring Pulse */}
          {m.hiringPulse && (
            <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 md:p-8 shadow-xl">
              <header className="mb-5">
                <h2 className="text-xl md:text-2xl font-semibold">Hiring Pulse</h2>
                {m.hiringPulse.notes && (
                  <p className="mt-2 text-neutral-300">{m.hiringPulse.notes}</p>
                )}
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl bg-black/30 p-4 ring-1 ring-white/10">
                  <div className="text-sm uppercase tracking-wide text-neutral-400">Hot roles</div>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {m.hiringPulse.hotRoles.map((r) => (
                      <li key={r} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm">
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl bg-black/30 p-4 ring-1 ring-white/10">
                  <div className="text-sm uppercase tracking-wide text-neutral-400">Hot skills</div>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {m.hiringPulse.hotSkills.map((s) => (
                      <li key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          )}

          {/* NEW: At a Glance */}
          {!!m.atAGlance?.length && (
            <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 md:p-8 shadow-xl">
              <header className="mb-5">
                <h2 className="text-xl md:text-2xl font-semibold">At a Glance</h2>
                <p className="mt-2 text-neutral-300">High-signal facts for fast decisions.</p>
              </header>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {m.atAGlance.map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-black/30 p-4 ring-1 ring-white/10">
                    <div className="text-sm uppercase tracking-wide text-neutral-400">{stat.label}</div>
                    <div className="mt-1 text-lg font-semibold">{stat.value}</div>
                    {stat.hint && <div className="mt-1 text-xs text-neutral-400">{stat.hint}</div>}
                  </div>
                ))}
              </div>
            </article>
          )}

          {/* Compensation Table */}
          <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 md:p-8 shadow-xl">
            <header className="mb-5">
              <h2 className="text-xl md:text-2xl font-semibold">Compensation & Bonus Benchmarks</h2>
              <p className="mt-2 text-neutral-300">
                Directional ranges for mid-senior RM through team lead. Actual offers vary by portable book, ROA,
                lending/Alts penetration, and firm performance.
              </p>
            </header>
            <div className="overflow-x-auto rounded-xl ring-1 ring-white/10">
              <table className="min-w-full text-sm">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Role</th>
                    <th className="px-4 py-3 text-left font-medium">Base (low)</th>
                    <th className="px-4 py-3 text-left font-medium">Base (high)</th>
                    <th className="px-4 py-3 text-left font-medium">Typical bonus</th>
                    <th className="px-4 py-3 text-left font-medium">Top-quartile note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {m.compensation.map((row) => (
                    <tr key={row.role} className="hover:bg-white/5">
                      <td className="px-4 py-3">{row.role}</td>
                      <td className="px-4 py-3">{fmt(row.baseMin, m)}</td>
                      <td className="px-4 py-3">{fmt(row.baseMax, m)}</td>
                      <td className="px-4 py-3">{row.bonusPct}</td>
                      <td className="px-4 py-3 text-neutral-300">{row.topQuartileNote ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          {/* Licensing & Compliance */}
          <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 md:p-8 shadow-xl">
            <header className="mb-4">
              <h2 className="text-xl md:text-2xl font-semibold">Licensing & Compliance</h2>
              <p className="mt-2 text-neutral-300">Regulator, certifications, and key compliance expectations.</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl bg-black/40 p-4 ring-1 ring-white/10">
                <div className="text-sm uppercase tracking-wide text-neutral-400">Regulator</div>
                <div className="mt-1 text-base">{m.licensing.regulator}</div>
              </div>
              <div className="rounded-xl bg-black/40 p-4 ring-1 ring-white/10">
                <div className="text-sm uppercase tracking-wide text-neutral-400">Must-have certs</div>
                <ul className="mt-2 list-disc pl-4 space-y-1">
                  {m.licensing.mustHaveCerts.map((c) => (
                    <li key={c} className="text-base">{c}</li>
                  ))}
                </ul>
              </div>
            </div>
            {m.licensing.notes && (
              <p className="mt-4 text-neutral-300">{m.licensing.notes}</p>
            )}
          </article>

          {/* Client Base & Sourcing */}
          <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 md:p-8 shadow-xl">
            <header className="mb-4">
              <h2 className="text-xl md:text-2xl font-semibold">Client Base & Sourcing</h2>
              <p className="mt-2 text-neutral-300">Where growth comes from and what matters on the ground.</p>
            </header>
            <ul className="list-disc pl-5 space-y-2">
              {m.clientBase.sourcing.map((s) => (
                <li key={s} className="text-base">{s}</li>
              ))}
            </ul>
          </article>

          {/* NEW: Banking Ecosystem */}
          {m.ecosystem && (
            <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 md:p-8 shadow-xl">
              <header className="mb-4">
                <h2 className="text-xl md:text-2xl font-semibold">Banking Ecosystem</h2>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-xl bg-black/30 p-4 ring-1 ring-white/10">
                  <div className="text-sm uppercase tracking-wide text-neutral-400">Booking / Execution</div>
                  <ul className="mt-2 space-y-1">
                    {m.ecosystem.bookingCentres.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </div>
                <div className="rounded-xl bg-black/30 p-4 ring-1 ring-white/10">
                  <div className="text-sm uppercase tracking-wide text-neutral-400">Key Banks</div>
                  <ul className="mt-2 space-y-1">
                    {m.ecosystem.keyBanks.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </div>
                <div className="rounded-xl bg-black/30 p-4 ring-1 ring-white/10">
                  <div className="text-sm uppercase tracking-wide text-neutral-400">EAMs / Family Offices</div>
                  <ul className="mt-2 space-y-1">
                    {m.ecosystem.eamsAndFOs.map((e) => <li key={e}>{e}</li>)}
                  </ul>
                  <div className="mt-4 text-sm text-neutral-400">
                    Regulators: {m.ecosystem.regulators.join(" • ")}
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* Relocation & Tax */}
          <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 md:p-8 shadow-xl">
            <header className="mb-4">
              <h2 className="text-xl md:text-2xl font-semibold">Relocation & Tax</h2>
            </header>
            <p className="text-base text-neutral-200">{m.relocation.oneParagraph}</p>
            <div className="mt-4">
              <a
                href={m.relocation.officialLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm ring-1 ring-white/20 hover:bg-white/20"
              >
                {m.relocation.officialLinkLabel} ↗
              </a>
            </div>
          </article>

          {/* CTAs */}
          <article className="rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-700/30 via-fuchsia-700/20 to-emerald-700/20 p-6 md:p-8 shadow-2xl ring-1 ring-white/10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg md:text-xl font-semibold">Next steps</h3>
                <p className="mt-1 text-neutral-200">
                  Book a confidential strategy call or upload your 3-year business plan for a fast, data-driven review.
                </p>
              </div>
              <div className="flex gap-3">
                <a
                  href={m.cta.confidentialCallHref}
                  className="inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90"
                >
                  Confidential Strategy Call
                </a>
                <a
                  href={m.cta.uploadPlanHref}
                  className="inline-flex items-center rounded-xl bg-black px-4 py-2 text-sm font-medium text-white ring-1 ring-white/20 hover:bg-black/80"
                >
                  Upload Your Business Plan
                </a>
              </div>
            </div>
          </article>

          {/* Legal Disclaimer */}
          {m.legalDisclaimer && (
            <p className="rounded-2xl border border-white/10 bg-black/30 p-4 text-xs text-neutral-400">
              {m.legalDisclaimer}
            </p>
          )}

          {/* Back link */}
          <div className="pt-2">
            <Link href="/en/markets" className="text-sm underline text-neutral-300 hover:text-white">
              ← All markets
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}