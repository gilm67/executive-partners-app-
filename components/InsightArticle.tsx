// components/InsightArticle.tsx
import Image from "next/image";

type Props = {
  title: string;
  subtitle?: string;
  author?: { name: string; url?: string };
  publishedISO: string;
  updatedISO?: string;
  readMinutes?: number;
  heroSrc?: string;
  heroAlt?: string;
  children: React.ReactNode;
  cta?: { text: string; href: string };
};

export default function InsightArticle({
  title,
  subtitle,
  author = { name: "Executive Partners" },
  publishedISO,
  updatedISO,
  readMinutes,
  heroSrc,
  heroAlt = "",
  children,
  cta = { text: "Talk to us", href: "/contact" },
}: Props) {
  const pubDate = new Date(publishedISO);
  const updDate = updatedISO ? new Date(updatedISO) : undefined;

  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white">
      {/* soft ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 420px at 18% -10%, rgba(59,130,246,.16) 0%, rgba(59,130,246,0) 60%), radial-gradient(1000px 380px at 110% 0%, rgba(16,185,129,.15) 0%, rgba(16,185,129,0) 60%)",
        }}
      />

      <article className="relative mx-auto w-full max-w-3xl px-4 py-10">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold leading-tight md:text-4xl">{title}</h1>
          {subtitle ? <p className="mt-2 text-lg text-neutral-300">{subtitle}</p> : null}

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/80">
            <span>
              By{" "}
              {author.url ? (
                <a href={author.url} className="underline">
                  {author.name}
                </a>
              ) : (
                author.name
              )}
            </span>
            <span>•</span>
            <time dateTime={publishedISO}>
              {pubDate.toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
            {updDate ? (
              <>
                <span>•</span>
                <span>
                  Updated{" "}
                  {updDate.toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </>
            ) : null}
            {typeof readMinutes === "number" ? (
              <>
                <span>•</span>
                <span>{readMinutes} min read</span>
              </>
            ) : null}
          </div>
        </header>

        {/* Hero image */}
        {heroSrc ? (
          <div className="mb-8 overflow-hidden rounded-2xl border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroSrc} alt={heroAlt} className="h-auto w-full" />
          </div>
        ) : null}

        {/* Body */}
        <div className="prose prose-invert max-w-none">{children}</div>

        {/* CTA */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <p className="text-neutral-300">
              Looking to hire senior private bankers or explore discreet moves?
            </p>
            <a
              href={cta.href}
              className="inline-flex items-center rounded-xl bg-[#1D4ED8] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1E40AF]"
            >
              {cta.text}
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}