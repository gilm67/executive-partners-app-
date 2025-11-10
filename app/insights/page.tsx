/* app/insights/page.tsx */
import type { Metadata } from "next";
import Link from "next/link";
import { getInsights } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Private Wealth Pulse — Insights | Executive Partners",
  description:
    "Weekly Private Wealth Pulse and articles on Private Banking & Wealth Management hiring. Switzerland, Dubai, Singapore, London & New York coverage.",
  alternates: { canonical: "/insights" },
  openGraph: {
    type: "website",
    url: "/insights",
    siteName: "Executive Partners",
    title: "Private Wealth Pulse — Insights | Executive Partners",
    description:
      "Market pulse and hiring trends across Switzerland, MEA, UK, US and APAC.",
    images: [{ url: "/og.png" }],
  },
  robots: { index: true, follow: true },
};

export default async function InsightsPage() {
  const items = await getInsights(); // 👈 this was missing

  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 420px at 18% -10%, rgba(59,130,246,.16) 0%, rgba(59,130,246,0) 60%), radial-gradient(1000px 380px at 110% 0%, rgba(16,185,129,.15) 0%, rgba(16,185,129,0) 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-12">
        <div className="mx-auto w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 shadow-sm backdrop-blur">
          Weekly market pulse — Private Banking &amp; Wealth Management
        </div>

        <h1 className="mt-3 text-center text-4xl font-extrabold tracking-tight md:text-5xl">
          Private Wealth Pulse — Insights
        </h1>
        <p className="mx-auto mt-3 max-w-3xl text-center text-neutral-300">
          Hiring trends, market notes and portability signals across Switzerland,
          Dubai, Singapore, London &amp; New York.
        </p>

        {items.length === 0 ? (
          <p className="mt-10 text-center text-neutral-500">
            No insights available yet.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it) => (
              <article
                key={it.href}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
              >
                <h2 className="text-lg font-semibold mb-2">
                  <Link href={it.href} className="hover:underline">
                    {it.title}
                  </Link>
                </h2>
                {it.date ? (
                  <p className="text-xs text-neutral-400 mb-2">{it.date}</p>
                ) : null}
                {it.excerpt ? (
                  <p className="text-sm text-neutral-200 line-clamp-4 mb-4">
                    {it.excerpt}
                  </p>
                ) : null}
                <div className="flex justify-between text-sm">
                  <Link
                    href={it.href}
                    className="text-emerald-400 hover:text-emerald-300"
                  >
                    Read on site →
                  </Link>
                  <a
                    href={it.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    LinkedIn ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}