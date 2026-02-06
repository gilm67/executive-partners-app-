import Link from "next/link";
import { notFound } from "next/navigation";
import { INSIGHTS } from "../articles";
import { marketLabel } from "@/lib/markets/marketLabel";

type Props = { params: { slug: string } };

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(
      new Date(iso)
    );
  } catch {
    return iso;
  }
}

export default function InsightDetailPage({ params }: Props) {
  const article = INSIGHTS.find((a) => a.slug === params.slug);
  if (!article) return notFound();

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-14">
      <Link href="/en/insights" className="text-sm text-white/60 hover:text-white">
        ← Back to Insights
      </Link>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="text-xs text-white/60">{formatDate(article.date)}</div>
        <h1 className="mt-2 text-2xl font-semibold text-white">{article.title}</h1>

        <div className="mt-4 flex flex-wrap gap-2">
          {article.markets.map((m) => (
            <span
              key={m}
              className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-white/75"
            >
              {marketLabel(m)}
            </span>
          ))}
        </div>

        <p className="mt-5 text-white/80">{article.summary}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={article.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5D778] px-5 py-2.5 text-sm font-semibold text-[#0B0E13] hover:opacity-90"
          >
            Read the full article on LinkedIn →
          </a>

          <Link
            href="/en/insights"
            className="inline-flex rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            Browse more insights
          </Link>
        </div>
      </div>
    </main>
  );
}