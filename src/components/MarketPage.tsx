// src/components/MarketPage.tsx
import Link from "next/link";

export type CompRow = { level: string; base: string; bonus: string };
export type MarketData = {
  slug: string;
  country: string;
  currency: string;
  title: string;
  intro: string;
  highlights: string[];
  regulatory: string[];
  ecosystemTags: string[];
  compTable: CompRow[];
  footnote?: string;
};

export default function MarketPage({ data }: { data: MarketData }) {
  return (
    <div className="relative">
      {/* top glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{
        background:
          "radial-gradient(900px 320px at 15% -8%, rgba(59,130,246,.14) 0%, rgba(59,130,246,0) 60%), radial-gradient(800px 300px at 110% 0%, rgba(16,185,129,.10) 0%, rgba(16,185,129,0) 60%)",
      }} />

      {/* breadcrumb */}
      <nav className="mb-4 text-sm text-white/70">
        <Link href="/markets" className="hover:text-white">Markets</Link>
        <span className="mx-2">/</span>
        <span>{capitalize(data.slug)}</span>
      </nav>

      {/* H1 + intro – match site scale */}
      <header className="max-w-3xl">
        <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl">{data.title}</h1>
        <p className="mt-3 text-white/80">{data.intro}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-white/80">
            {capitalize(data.slug)}, {data.country}
          </span>
          <span className="inline-flex items-center rounded-full border border-sky-400/30 bg-sky-500/10 px-2.5 py-1 text-sky-300">
            Currency: {data.currency}
          </span>
        </div>
      </header>

      {/* content grid */}
      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* left column */}
        <div className="space-y-6">
          {/* Hiring pulse */}
          <Card title="Hiring Pulse">
            <ul className="space-y-2 text-sm leading-relaxed text-white/85">
              {data.highlights.map((h, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Regulatory */}
          <Card title="Regulatory Must-Haves">
            <ul className="space-y-2 text-sm leading-relaxed text-white/85">
              {data.regulatory.map((r, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-2 h-[3px] w-[14px] shrink-0 rounded bg-white/40" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Compensation */}
          <Card title={`Typical Senior PB Compensation (${data.currency})`}>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-white/80">
                  <tr>
                    <th className="px-3 py-2 font-semibold">Level</th>
                    <th className="px-3 py-2 font-semibold">Base</th>
                    <th className="px-3 py-2 font-semibold">Bonus</th>
                  </tr>
                </thead>
                <tbody>
                  {data.compTable.map((row) => (
                    <tr key={row.level} className="odd:bg-white/[0.02]">
                      <td className="px-3 py-2">{row.level}</td>
                      <td className="px-3 py-2">{row.base}</td>
                      <td className="px-3 py-2">{row.bonus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {data.footnote && (
              <p className="mt-2 text-xs text-white/60">{data.footnote}</p>
            )}
          </Card>

          {/* Ecosystem */}
          <Card title={`${capitalize(data.slug)} ecosystem`}>
            <div className="flex flex-wrap gap-2">
              {data.ecosystemTags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border border-sky-400/30 bg-sky-500/10 px-2.5 py-1 text-xs font-medium text-sky-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </Card>

          {/* Explore other markets */}
          <Card title="Explore other markets">
            <div className="flex flex-wrap gap-2">
              {["zurich","dubai","singapore","hong-kong","london","new-york","miami","geneva"].filter(s => s!==data.slug).map((s) => (
                <Link
                  key={s}
                  href={`/markets/${s}`}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/85 hover:bg-white/10"
                >
                  {titleCase(s.replace("-", " "))}
                </Link>
              ))}
            </div>
          </Card>
        </div>

        {/* right column – CTA box */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[.06] to-white/[.03] p-5 shadow-[0_1px_3px_rgba(0,0,0,.25)]">
            <div className="text-sm text-white/70">
              {capitalize(data.slug)}, {data.country}
            </div>
            <p className="mt-3 text-[15px] text-white/85">
              Need a shortlist in {capitalize(data.slug)}? We’ll align on coverage, portability, and onboarding — then move fast.
            </p>
            <div className="mt-3 flex gap-2">
              <Link href="/hiring-managers" className="inline-flex w-full justify-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                Hire Talent
              </Link>
              <Link href="/contact" className="inline-flex w-full justify-center rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10">
                Contact
              </Link>
            </div>
            <div className="mt-3 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/70">
              ⓘ Typical shortlist: 10–15 business days (brief-dependent).
            </div>
            <Link href="/jobs" className="mt-3 inline-flex items-center text-sm font-semibold text-sky-300 hover:text-sky-200">
              View market jobs →
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function titleCase(s: string) {
  return s.split(" ").map(w => w.charAt(0).toUpperCase()+w.slice(1)).join(" ");
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[.06] to-white/[.03] p-5 shadow-[0_1px_3px_rgba(0,0,0,.25)]">
      <h2 className="mb-3 text-lg font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}