// app/markets/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  markets,
  marketSlugs,
  getMarket,
  type Market,
} from "../../../lib/markets";

/* ------- Static params (SSG) ------- */
export function generateStaticParams(): Array<{ slug: string }> {
  return marketSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

/* ------- Metadata ------- */
export function generateMetadata(
  { params }: { params: { slug: string } }
): Metadata {
  const m = getMarket(params.slug);
  const title = m
    ? `${m.name} — Private Banking market notes & roles`
    : `${params.slug} — Private Banking market notes`;

  const description =
    m?.headline ??
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

/* ------- Page ------- */
export default function MarketSlugPage(
  { params }: { params: { slug: string } }
) {
  const m: Market | undefined = getMarket(params.slug);
  if (!m) notFound();

  return (
    <main className="container-max py-10 text-white">
      {/* Breadcrumb / kicker */}
      <p className="text-xs text-white/60">Markets</p>

      {/* H1 */}
      <h1 className="mt-1 text-3xl font-bold">
        {m.name} <span className="text-white/60">— {m.country}</span>
      </h1>

      {/* Headline */}
      {m.headline && (
        <p className="mt-3 max-w-3xl text-white/80">{m.headline}</p>
      )}

      {/* Hiring pulse */}
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

      {/* Regulatory */}
      {Array.isArray(m.regulatory) && m.regulatory.length > 0 && (
        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-lg font-semibold">Regulatory notes</h2>
          <ul className="mt-3 list-disc pl-5 text-sm text-white/80">
            {m.regulatory.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Compensation bands */}
      {m.comp?.bands?.length ? (
        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-lg font-semibold">Compensation (currency: {m.comp.currency})</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {m.comp.bands.map((b, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="text-sm text-white/70">{b.level}</div>
                <div className="mt-1 text-xl font-semibold">
                  Base {b.base}
                </div>
                <div className="text-sm text-white/80">Bonus {b.bonus}</div>
                {b.note && (
                  <div className="mt-1 text-xs text-white/60">{b.note}</div>
                )}
              </div>
            ))}
          </div>
          {m.comp.netNote && (
            <p className="mt-3 text-xs text-white/60">{m.comp.netNote}</p>
          )}
        </section>
      ) : null}

      {/* Ecosystem */}
      {m.ecosystem && (
        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-lg font-semibold">{m.ecosystem.title}</h2>
          <ul className="mt-3 list-disc pl-5 text-sm text-white/80">
            {m.ecosystem.items.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
          {m.ecosystem.trends?.length ? (
            <>
              <h3 className="mt-4 text-sm font-semibold text-white">Trends</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-white/80">
                {m.ecosystem.trends.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </>
          ) : null}
        </section>
      )}

      {/* CTAs */}
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