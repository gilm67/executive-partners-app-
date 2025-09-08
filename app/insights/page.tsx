// app/insights/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Insights — Executive Partners | Private Wealth Pulse & Articles",
  description:
    "Private Wealth Pulse newsletter and selected articles by Executive Partners. Insights on private banking moves, markets, portability and book-building.",
  alternates: { canonical: "https://www.execpartners.ch/insights" },
  openGraph: {
    title: "Insights — Executive Partners",
    description:
      "Private Wealth Pulse newsletter and selected articles by Executive Partners.",
    url: "https://www.execpartners.ch/insights",
    images: [{ url: "/og.png" }],
  },
};

type Item = {
  title: string;
  summary: string;
  href: string;      // internal or external
  date?: string;     // ISO
  tag?: string;      // "Newsletter" | "Article"
  source?: string;   // e.g., "LinkedIn"
};

const NEWSLETTERS: Item[] = [
  // 👉 Add each newsletter issue here
  {
    title: "Private Wealth Pulse — September 2025",
    summary:
      "Hiring velocity in CH onshore, Dubai net new money trends, and where portability holds up.",
    href: "https://your-newsletter-link.example",
    date: "2025-09-01",
    tag: "Newsletter",
    source: "Executive Partners",
  },
];

const ARTICLES: Item[] = [
  // 👉 Paste your LinkedIn article links here
  {
    title: "What ‘portable’ really means in 2025",
    summary:
      "A practical framework for assessing portability by market, booking center and grid.",
    href: "https://www.linkedin.com/posts/your-article-link",
    date: "2025-08-22",
    tag: "Article",
    source: "LinkedIn",
  },
  {
    title: "CH Onshore: the realistic bar for MD-level moves",
    summary:
      "Signals banks actually care about: client mix, compliance record, and transfer cadence.",
    href: "https://www.linkedin.com/posts/your-article-link-2",
    date: "2025-07-30",
    tag: "Article",
    source: "LinkedIn",
  },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-white/80">
      {children}
    </span>
  );
}

function Card({ item }: { item: Item }) {
  const isExternal = item.href.startsWith("http");
  const Wrapper: any = isExternal ? "a" : Link;
  const props: any = isExternal
    ? { href: item.href, target: "_blank", rel: "noopener" }
    : { href: item.href };

  return (
    <div className="group relative flex flex-col rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.03))] p-5 shadow-[0_1px_3px_rgba(0,0,0,.25)] transition hover:shadow-[0_12px_50px_rgba(0,0,0,.45)]">
      <div className="absolute inset-0 pointer-events-none opacity-[.12] [background:radial-gradient(110%_60%_at_0%_0%,rgba(59,130,246,.8),transparent_60%),radial-gradient(110%_60%_at_100%_0%,rgba(16,185,129,.7),transparent_60%)]" />
      <div className="relative">
        <div className="mb-2 flex items-center gap-2 text-xs text-white/70">
          {item.tag && <Pill>{item.tag}</Pill>}
          {item.source && <span className="text-white/60">{item.source}</span>}
          {item.date && (
            <span className="text-white/50">
              {new Date(item.date).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-neutral-300">{item.summary}</p>
      </div>
      <div className="mt-4">
        <Wrapper
          {...props}
          className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
        >
          {isExternal ? (
            <>
              Read on LinkedIn <ExternalLink className="h-4 w-4" />
            </>
          ) : (
            <>Read more →</>
          )}
        </Wrapper>
      </div>
    </div>
  );
}

export default function InsightsPage() {
  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white">
      {/* background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 420px at 18% -10%, rgba(59,130,246,.16) 0%, rgba(59,130,246,0) 60%), radial-gradient(1000px 380px at 110% 0%, rgba(16,185,129,.15) 0%, rgba(16,185,129,0) 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-14">
        <div className="text-center">
          <div className="mx-auto w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
            Private Wealth Pulse &amp; Articles
          </div>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
            Insights
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-neutral-300">
            Signals that matter in private banking—hiring moves, portability, and
            market shifts. Subscribe to get updates.
          </p>
        </div>

        {/* Subscribe */}
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-6">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                Subscribe to Private Wealth Pulse
              </h2>
              <p className="mt-1 text-sm text-neutral-300">Monthly, concise, zero spam.</p>
            </div>
            <form
              action={process.env.NEWSLETTER_WEBHOOK_URL || "/contact"}
              method="post"
              className="flex w-full max-w-md gap-2"
            >
              <input
                required
                name="email"
                type="email"
                placeholder="you@firm.com"
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/20"
              />
              <button className="rounded-xl bg-[#1D4ED8] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1E40AF]">
                Subscribe
              </button>
            </form>
          </div>
        </section>

        {/* Newsletter grid */}
        <section className="mt-10">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl font-bold">Latest Newsletter</h2>
            <Link
              href="/contact"
              className="text-sm text-blue-400 hover:underline"
            >
              Pitch a topic →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {NEWSLETTERS.map((n) => (
              <Card key={n.title} item={n} />
            ))}
          </div>
        </section>

        {/* Articles grid */}
        <section className="mt-10">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl font-bold">Articles &amp; Commentary</h2>
            <a
              href="https://www.linkedin.com/in/your-handle/posts/"
              target="_blank"
              rel="noopener"
              className="text-sm text-blue-400 hover:underline"
            >
              Follow on LinkedIn →
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {ARTICLES.map((a) => (
              <Card key={a.title} item={a} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
