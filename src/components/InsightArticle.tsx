"use client";
import React from "react";
import Link from "next/link";

type Author = string | { name: string; url?: string };
type Cta = { text: string; href: string };

export default function InsightArticle({
  title,
  subtitle,
  author,
  publishedISO,
  readMinutes,
  heroSrc,
  cta,
  children,
}: {
  title: string;
  subtitle?: string;
  author?: Author;
  publishedISO?: string;   // e.g. "2025-09-09"
  readMinutes?: number;    // e.g. 6
  heroSrc?: string;
  cta?: Cta;
  children?: React.ReactNode;
}) {
  const authorNode =
    typeof author === "string"
      ? author
      : author?.name
      ? author.url
        ? <a href={author.url} className="underline hover:opacity-90">{author.name}</a>
        : author.name
      : null;

  const metaBits = [
    authorNode ? <>By {authorNode}</> : null,
    publishedISO ? new Date(publishedISO).toLocaleDateString() : null,
    readMinutes ? `${readMinutes} min read` : null,
  ].filter(Boolean).map((node, i) => <span key={i}>{i > 0 ? " • " : ""}{node}</span>);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 text-white">
      {heroSrc ? (
        <div className="mb-6 overflow-hidden rounded-2xl border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroSrc} alt="" className="w-full object-cover" />
        </div>
      ) : null}

      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {subtitle ? (
        <p className="mt-2 text-lg text-white/80">{subtitle}</p>
      ) : null}

      {metaBits.length ? (
        <p className="mt-2 text-sm text-neutral-400">{metaBits}</p>
      ) : null}

      <div className="prose prose-invert mt-6 max-w-none">{children}</div>

      {cta ? (
        <div className="mt-8">
          <Link
            href={cta.href}
            className="inline-flex items-center rounded-xl bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]"
          >
            {cta.text}
          </Link>
        </div>
      ) : null}
    </article>
  );
}
