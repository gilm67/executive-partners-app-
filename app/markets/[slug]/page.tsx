// app/markets/[slug]/page.tsx
import { notFound } from "next/navigation";

/**
 * Supports both:
 *   export const markets = {...}
 *   OR   export default {...}
 * inside lib/markets.ts
 */
import * as Markets from "../../../lib/markets";

const markets: Record<string, any> =
  ((Markets as any).markets as Record<string, any>) ||
  ((Markets as any).default as Record<string, any>) ||
  {};

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  return Object.keys(markets).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: Params) {
  const m = markets[params.slug];
  const title =
    m?.seoTitle ||
    `${m?.name ?? params.slug} — Private Banking jobs & market notes`;
  const description =
    m?.seoDescription ||
    m?.summary ||
    "Executive Partners — Geneva-based executive search for Private Banking & Wealth Management.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        { url: "/og.png", width: 1200, height: 630, alt: "Executive Partners" },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}

export default function MarketSlugPage({ params }: Params) {
  const m = markets[params.slug];
  if (!m) notFound();

  return (
    <main className="container-max py-10 text-white">
      <p className="text-xs text-white/60">Markets</p>
      <h1 className="mt-1 text-3xl font-bold">{m.name ?? params.slug}</h1>
      {m.summary && <p className="mt-2 max-w-3xl text-white/80">{m.summary}</p>}

      {Array.isArray(m.highlights) && m.highlights.length > 0 && (
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-lg font-semibold">Highlights</h2>
          <ul className="mt-3 list-disc pl-5 text-sm text-white/80">
            {m.highlights.map((t: string, i: number) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </section>
      )}

      {(m.compLow || m.compHigh || m.netNote) && (
        <section className="mt-6 grid gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:grid-cols-3">
          <div>
            <div className="text-xs text-white/60">Comp (low)</div>
            <div className="text-xl font-semibold">{m.compLow ?? "—"}</div>
          </div>
          <div>
            <div className="text-xs text-white/60">Comp (high)</div>
            <div className="text-xl font-semibold">{m.compHigh ?? "—"}</div>
          </div>
          <div>
            <div className="text-xs text-white/60">Note</div>
            <div className="text-sm text-white/80">{m.netNote ?? "—"}</div>
          </div>
        </section>
      )}

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