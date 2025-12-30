import Link from "next/link";
import { getLinkedInArticlesSorted } from "@/lib/insights/linkedin";
import ExternalBadge from "@/app/components/ui/ExternalBadge";

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function cleanLinkedInUrl(url: string) {
  try {
    const u = new URL(url);
    u.search = ""; // strips trackingId etc.
    return u.toString();
  } catch {
    return url;
  }
}

export default function LinkedInInsights() {
  const items = getLinkedInArticlesSorted().map((a) => ({
    ...a,
    url: cleanLinkedInUrl(a.url),
  }));

  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm tracking-widest uppercase text-white/60">
              Insights
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-white">
              Private Wealth Pulse — Latest LinkedIn Articles
            </h2>
            <p className="mt-2 max-w-2xl text-white/70">
              Curated market intelligence on Swiss private banking, global wealth
              management, and recruitment signals.
            </p>
          </div>

          <Link
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex rounded-2xl border border-white/15 px-4 py-2 text-sm text-white/80 hover:text-white hover:border-white/25"
          >
            View on LinkedIn →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {items.map((a) => (
            <article
              key={a.url}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm hover:border-white/20 transition"
            >
              <div className="flex items-center justify-between gap-4">
                <time className="text-sm text-white/60">
                  {formatDate(a.dateISO)}
                </time>
                <div className="flex flex-wrap gap-2">
                  {a.tags?.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/15 bg-black/10 px-3 py-1 text-xs text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <h3 className="mt-4 text-lg font-semibold text-white leading-snug">
                {a.title}
              </h3>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">
                {a.summary}
              </p>

              <div className="mt-5 flex items-center justify-between">
                <Link
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white hover:underline"
                >
                  Read on LinkedIn <span aria-hidden>→</span>
                </Link>

                <ExternalBadge label="External • LinkedIn" className="text-white/50" />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 sm:hidden">
          <Link
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-2xl border border-white/15 px-4 py-2 text-sm text-white/80 hover:text-white hover:border-white/25"
          >
            View on LinkedIn →
          </Link>
        </div>
      </div>
    </section>
  );
}