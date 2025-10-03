// app/markets/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { markets, marketSlugs, getMarket, type Market } from "../../../lib/markets";

// Pre-generate paths from the list of slugs
export async function generateStaticParams() {
  return marketSlugs.map((slug) => ({ slug }));
}

// Prevent unknown slugs from becoming dynamic at runtime
export const dynamicParams = false;

type PageProps = { params: { slug: string } };

// Build per-page metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const m = getMarket(params.slug);
  if (!m) return { title: "Market not found" };

  const title =
    `${m.name} — Private Banking jobs & market notes` ||
    "Executive Partners — Private Banking & Wealth Management";
  const description =
    m.headline ||
    "Executive Partners — Geneva-based executive search for Private Banking & Wealth Management.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Executive Partners" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}

export default function MarketSlugPage({ params }: PageProps) {
  const m = getMarket(params.slug);
  if (!m) notFound();

  const compLow = m.comp?.bands?.[0]?.base ?? "—";
  const compHigh = m.comp?.bands?.[m.comp.bands.length - 1]?.base ?? "—";
  const netNote = m.comp?.netNote ?? "—";

  return (
    <main className="container-max py-10 text-white">
      <p className="text-xs text-white/60">Markets</p>
      <h1 className="mt-1 text-3xl font-bold">
        {m.name} <span className="text-white/60">({m.country})</span>
      </h1>

      {m.headline && (
        <p className="mt-2 max-w-3xl text-white/80">{m.headline}</p>
      )}

      {/* Hiring Pulse */}
      {Array.isArray(m.hiringPulse) && m.hiringPulse.length > 0 && (
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-lg font-semibold">Hiring pulse</h2>
          <ul className="mt-3 list-disc pl-5 text-sm text-white/80">
            {m.hiringPulse.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Compensation snapshot */}
      <section className="mt-6 grid gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:grid-cols-3">
        <div>
          <div className="text-xs text-white/60">Comp (low)</div>
          <div className="text-xl font-semibold">{compLow}</div>
        </div>
        <div>
          <div className="text-xs text-white/60">Comp (high)</div>
          <div className="text-xl font-semibold">{compHigh}</div>
        </div>
        <div>
          <div className="text-xs text-white/60">Note</div>
          <div className="text-sm text-white/80">{netNote}</div>
        </div>
      </section>

      {/* Ecosystem */}
      {m.ecosystem && (
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-lg font-semibold">{m.ecosystem.title}</h2>
          {Array.isArray(m.ecosystem.items) && m.ecosystem.items.length > 0 && (
            <>
              <h3 className="mt-3 text-sm font-semibold text-white/80">Key players</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-white/80">
                {m.ecosystem.items.map((t: string, i: number) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </>
          )}
          {Array.isArray(m.ecosystem.trends) && m.ecosystem.trends.length > 0 && (
            <>
              <h3 className="mt-4 text-sm font-semibold text-white/80">Trends</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-white/80">
                {m.ecosystem.trends.map((t: string, i: number) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </>
          )}
        </section>
      )}

      {/* CTA */}
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="/jobs"
          className="rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-black hover:opacity-90"
        >
          View Jobs
        </a>
        <a
          href="/hiring-managers"
          className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-white/10"
        >
          Hire Talent
        </a>
      </div>
    </main>
  );
}