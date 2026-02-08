import Link from "next/link";
import { INSIGHTS } from "@/app/en/insights/articles";
import { subThemeToSlug } from "@/lib/insights/subTheme";

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

const SUBTHEME_LABEL: Record<string, { title: string; desc: string }> = {
  Positioning: {
    title: "Positioning",
    desc: "Who is winning, who is losing, and why (banks, competitive moves).",
  },
  ScaleVsBoutique: {
    title: "Scale vs Boutique",
    desc: "Economics of scale vs boutique private banking models.",
  },
  ROAPlatform: {
    title: "ROA & Platform Dependency",
    desc: "ROA pressure, platform dependency, cost of compliance.",
  },
  "M&ARestructuring": {
    title: "M&A & Restructuring",
    desc: "M&A, integration failures, silent restructurings.",
  },
};

const SUBTHEME_ORDER = [
  "Positioning",
  "ScaleVsBoutique",
  "ROAPlatform",
  "M&ARestructuring",
] as const;

export default function PillarP1Page() {
  const p1 = INSIGHTS.filter((a) => a.pillar === "P1").sort(
    (a, b) => Date.parse(b.date) - Date.parse(a.date)
  );

  const groups = p1.reduce<Record<string, typeof p1>>((acc, a) => {
    const key = a.subTheme || "Unclassified";
    (acc[key] ||= []).push(a);
    return acc;
  }, {});

  const orderedKeys = [
    ...SUBTHEME_ORDER,
    "Unclassified",
  ].filter((k) => groups[k]?.length);

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-14">
      <nav className="text-xs text-white/60">
        <Link href="/en" className="hover:text-white">
          Home
        </Link>{" "}
        <span className="mx-1">/</span>
        <Link href="/en/insights" className="hover:text-white">
          Insights
        </Link>{" "}
        <span className="mx-1">/</span>
        <span className="text-white/80">Pillar I</span>
      </nav>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
          Private Wealth Pulse
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-white">
          Pillar I — Private Banking Strategy & Power Structures
        </h1>
        <p className="mt-3 max-w-3xl text-white/75">
          Strategy-focused analysis on who is winning, who is losing, and why —
          across Switzerland and major booking centres (UK, US, UAE, Asia).
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/en/insights"
            className="inline-flex rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            Browse all insights
          </Link>
          <Link
            href="/en/insights/archive"
            className="inline-flex rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            Browse archive
          </Link>
        </div>
      </div>

      {/* ✅ NEW: Browse by Sub-Theme (chapters) */}
      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
              Browse by Sub-Theme
            </p>
            <h2 className="mt-2 text-lg font-semibold text-white">
              Choose a chapter
            </h2>
            <p className="mt-1 text-sm text-white/60">
              Explore Pillar I by strategic angle — each sub-theme is its own hub.
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {SUBTHEME_ORDER.map((key) => {
            if (!groups[key]?.length) return null;
            const meta = SUBTHEME_LABEL[key];
            const href = `/en/insights/subtheme/${subThemeToSlug(key as any)}`;

            return (
              <Link
                key={key}
                href={href}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-base font-semibold text-white">
                    {meta.title}
                  </h3>
                  <span className="text-sm font-semibold text-white/70 group-hover:text-white">
                    Explore →
                  </span>
                </div>

                <p className="mt-2 text-sm text-white/60">{meta.desc}</p>

                <div className="mt-4 flex items-center gap-2 text-[11px] text-white/60">
                  <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5">
                    {groups[key].length} insight{groups[key].length === 1 ? "" : "s"}
                  </span>
                  <span className="text-white/40">•</span>
                  <span>Open hub</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Existing grouped sections */}
      <section className="mt-10 grid gap-6">
        {orderedKeys.map((key) => {
          const meta = SUBTHEME_LABEL[key] || {
            title: key,
            desc: "Articles in this sub-theme.",
          };
          const items = groups[key];

          const hubHref =
            key !== "Unclassified"
              ? `/en/insights/subtheme/${subThemeToSlug(key as any)}`
              : null;

          return (
            <div
              key={key}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg font-semibold text-white">
                    {meta.title}
                  </h2>
                  <p className="text-sm text-white/60">{meta.desc}</p>
                </div>

                {hubHref ? (
                  <Link
                    href={hubHref}
                    className="shrink-0 text-sm font-semibold text-white/70 hover:text-white underline underline-offset-4"
                  >
                    View all →
                  </Link>
                ) : null}
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {items.map((a) => (
                  <article
                    key={a.slug}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="text-xs text-white/60">
                      {formatDate(a.date)}
                    </div>

                    <h3 className="mt-2 text-base font-semibold text-white leading-snug">
                      <Link
                        href={`/en/insights/${a.slug}`}
                        className="hover:underline"
                      >
                        {a.title}
                      </Link>
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm text-white/75">
                      {a.summary}
                    </p>

                    <div className="mt-4">
                      <Link
                        href={`/en/insights/${a.slug}`}
                        className="text-sm font-semibold text-white/80 hover:text-white underline underline-offset-4"
                      >
                        Read →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}