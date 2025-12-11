// app/components/HomepageHero.tsx
import Image from "next/image";
import Link from "next/link";

export default function HomepageHero() {
  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="home-hero-heading"
    >
      {/* Subtle depth gradient (no photo) */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-black" />

      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20 lg:py-24">
        {/* Logo with soft glow */}
        <div className="flex justify-center">
          <Image
            src="/transparent-ep-logo.png"
            alt="Executive Partners – Private Banking & Wealth Management Executive Search"
            width={360}
            height={120}
            priority
            className="h-auto w-[240px] sm:w-[300px] md:w-[360px] drop-shadow-[0_0_18px_rgba(255,255,255,0.35)]"
          />
        </div>

        {/* Tagline badge */}
        <div className="mx-auto mt-6 w-fit rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-neutral-200">
          Executive Search · Private Banking &amp; Wealth Management
        </div>

        {/* H1 – SEO-focused */}
        <h1
          id="home-hero-heading"
          className="mt-4 text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl"
        >
          Executive Search for Private Banking &amp; Wealth Management Professionals
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-3 max-w-3xl text-center text-neutral-300">
          Geneva-based boutique connecting Senior Relationship Managers, Team Heads
          and Market Leaders with leading private banks in Switzerland, the UK, US,
          Dubai, Singapore and Hong Kong.
        </p>

        {/* CTA row */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link href="/candidates" className="btn btn-primary btn-xl">
            I’m a Candidate
          </Link>

          <Link href="/hiring-managers" className="btn btn-ghost">
            I’m Hiring
          </Link>

          <Link href="/jobs" className="btn btn-ghost">
            View All Jobs
          </Link>
        </div>
      </div>

      {/* Subtle frame/vignette */}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
      <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_-120px_160px_-60px_rgba(0,0,0,0.55)]" />
    </section>
  );
}