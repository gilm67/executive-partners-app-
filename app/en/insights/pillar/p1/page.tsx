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

function safeMs(iso?: string) {
  const t = Date.parse((iso || "").trim());
  return Number.isNaN(t) ? 0 : t;
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

const TOC = [
  { id: "chapters", label: "Browse by Sub-Theme" },
  { id: "positioning", label: "Positioning" },
  { id: "scale-vs-boutique", label: "Scale vs Boutique" },
  { id: "roa-platform", label: "ROA & Platform" },
  { id: "m-a-restructuring", label: "M&A & Restructuring" },
  { id: "all-articles", label: "All articles" },
] as const;

function sectionIdForSubTheme(key: (typeof SUBTHEME_ORDER)[number]) {
  if (key === "Positioning") return "positioning";
  if (key === "ScaleVsBoutique") return "scale-vs-boutique";
  if (key === "ROAPlatform") return "roa-platform";
  return "m-a-restructuring";
}

export default function PillarP1Page() {
  const p1 = INSIGHTS.filter((a) => a.pillar === "P1").slice();

  // group by subTheme
  const groups = p1.reduce<Record<string, typeof p1>>((acc, a) => {
    const key = a.subTheme || "Unclassified";
    (acc[key] ||= []).push(a);
    return acc;
  }, {});

  // sort each group by date desc (stable UI)
  for (const k of Object.keys(groups)) {
    groups[k] = groups[k].slice().sort((a, b) => safeMs(b.date) - safeMs(a.date));
  }

  // meta for the 4 official sub-themes (count + lastUpdated)
  const subThemeMeta = Object.fromEntries(
    SUBTHEME_ORDER.map((key) => {
      const items = groups[key] || [];
      const lastUpdated = items[0]?.date;
      return [
        key,
        {
          count: items.length,
          lastUpdated,
          href: `/en/insights/subtheme/${subThemeToSlug(key as any)}`,
        },
      ];
    })
  ) as Record<
    (typeof SUBTHEME_ORDER)[number],
    { count: number; lastUpdated?: string; href: string }
  >;

  const orderedKeys = [...SUBTHEME_ORDER, "Unclassified"].filter((k) => groups[k]?.length);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-14">
      <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
        {/* LEFT: content */}
        <div>
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
              Strategy-focused analysis on who is winning, who is losing, and why — across
              Switzerland and major booking centres (UK, US, UAE, Asia).
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

          {/* ✅ Browse by Sub-Theme (chapters) */}
          <section id="chapters" className="mt-10 scroll-mt-28">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
                  Browse by Sub-Theme
                </p>
                <h2 className="mt-2 text-lg font-semibold text-white">Choose a chapter</h2>
                <p className="mt-1 text-sm text-white/60">
                  Four strategic clusters — each one has its own dedicated hub.
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {SUBTHEME_ORDER.map((key) => {
                const meta = subThemeMeta[key];
                const label = SUBTHEME_LABEL[key];
                if (!meta.count) return null;

                const anchorId = sectionIdForSubTheme(key);

                return (
                  <Link
                    key={key}
                    id={anchorId}
                    href={meta.href}
                    className="group scroll-mt-28 rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-base font-semibold text-white">{label.title}</h3>
                        <p className="mt-1 text-sm text-white/60">{label.desc}</p>
                      </div>

                      <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] text-white/70">
                        {meta.count} {meta.count === 1 ? "insight" : "insights"}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3 text-xs text-white/60">
                      <div>
                        Last updated:{" "}
                        <span className="text-white/75">
                          {meta.lastUpdated ? formatDate(meta.lastUpdated) : "—"}
                        </span>
                      </div>
                      <div className="font-semibold text-[#D4AF37]">Open hub →</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Existing grouped sections */}
          <section id="all-articles" className="mt-10 grid gap-6 scroll-mt-28">
            {orderedKeys.map((key) => {
              const meta = SUBTHEME_LABEL[key] || {
                title: key,
                desc: "Articles in this sub-theme.",
              };
              const items = groups[key] || [];

              const hubHref =
                key !== "Unclassified"
                  ? `/en/insights/subtheme/${subThemeToSlug(key as any)}`
                  : null;

              return (
                <div key={key} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <h2 className="text-lg font-semibold text-white">{meta.title}</h2>
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
                        <div className="text-xs text-white/60">{formatDate(a.date)}</div>

                        <h3 className="mt-2 text-base font-semibold text-white leading-snug">
                          <Link href={`/en/insights/${a.slug}`} className="hover:underline">
                            {a.title}
                          </Link>
                        </h3>

                        <p className="mt-2 line-clamp-2 text-sm text-white/75">{a.summary}</p>

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
        </div>

        {/* RIGHT: sticky TOC (desktop only) */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
              Table of contents
            </div>

            <nav className="mt-4 flex flex-col gap-2">
              {TOC.map((it) => (
                <a
                  key={it.id}
                  href={`#${it.id}`}
                  className="rounded-lg px-2 py-1.5 text-sm text-white/70 hover:bg-white/10 hover:text-white"
                >
                  {it.label}
                </a>
              ))}
            </nav>

            <div className="mt-5 border-t border-white/10 pt-4">
              <Link
                href="/en/insights"
                className="text-sm font-semibold text-white/70 hover:text-white underline underline-offset-4"
              >
                Back to Insights →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}