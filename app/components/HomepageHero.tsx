// app/components/HomepageHero.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { usePathname } from 'next/navigation';

export default function HomepageHero() {
  const pathname = usePathname();
  const base = useMemo(() => (pathname?.startsWith('/en') ? '/en' : ''), [pathname]);

  return (
    <section className="relative overflow-hidden" aria-labelledby="home-hero-heading">
      {/* ✅ Controlled hero height (prevents “image too big / too tall” feeling) */}
      <div className="relative h-[68vh] min-h-[560px] max-h-[820px] md:h-[72vh]">
        {/* Background photo (premium feel) */}
        <Image
          src="/hero-skyline-hq.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-55"
          sizes="100vw"
        />

        {/* Base gradient under photo */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/70 to-black" />

        {/* Contrast overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Subtle vignette / depth */}
        <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_-160px_220px_-90px_rgba(0,0,0,0.75)]" />
        <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_120px_180px_-120px_rgba(0,0,0,0.75)]" />

        {/* Content */}
        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-center px-6 py-10 sm:py-12">
          {/* Logo with soft glow */}
          <div className="flex justify-center">
            <Image
              src="/transparent-ep-logo.png"
              alt="Executive Partners – Private Banking & Wealth Management Executive Search"
              width={360}
              height={120}
              priority
              className="h-auto w-[220px] sm:w-[280px] md:w-[340px] drop-shadow-[0_0_18px_rgba(255,255,255,0.32)]"
            />
          </div>

          {/* Tagline badge */}
          <div className="mx-auto mt-5 w-fit rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-neutral-200">
            Executive Search · Private Banking &amp; Wealth Management
          </div>

          {/* H1 */}
          <h1
            id="home-hero-heading"
            className="mx-auto mt-4 max-w-4xl text-center text-3xl font-semibold tracking-tight text-white sm:text-5xl"
          >
            Executive Search for Private Banking &amp; Wealth Management Professionals
          </h1>

          {/* Subheading */}
          <p className="mx-auto mt-3 max-w-3xl text-center text-sm text-neutral-300 sm:text-base">
            Geneva-based boutique connecting Senior Relationship Managers, Team Heads and Market Leaders with leading
            private banks in Switzerland, the UK, US, Dubai, Singapore and Hong Kong.
          </p>

          {/* CTA row */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link href={`${base}/candidates`} className="btn btn-primary btn-xl">
              I’m a Candidate
            </Link>

            <Link href={`${base}/hiring-managers`} className="btn btn-ghost">
              I’m Hiring
            </Link>

            <Link href={`${base}/jobs`} className="btn btn-ghost">
              View All Jobs
            </Link>
          </div>
        </div>

        {/* Subtle frame */}
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
      </div>
    </section>
  );
}