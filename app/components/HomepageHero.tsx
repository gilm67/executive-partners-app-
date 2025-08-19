// app/components/HomepageHero.tsx
import Image from "next/image";
import Link from "next/link";

export default function HomepageHero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="home-hero-heading">
      {/* Subtle depth gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-black" />

      {/* Optional skyline (put /public/hero-city.jpg if you have one) */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-35"
        style={{ backgroundImage: "url('/hero-city.jpg')" }}
        aria-hidden="true"
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20 lg:py-24">
        {/* Logo with soft glow */}
        <div className="flex justify-center">
          <Image
            src="/transparent-ep-logo.png"
            alt="Executive Partners"
            width={360}
            height={120}
            priority
            className="h-auto w-[240px] sm:w-[300px] md:w-[360px] drop-shadow-[0_0_18px_rgba(255,255,255,0.35)]"
          />
        </div>

        {/* Tagline badge */}
        <div className="mx-auto mt-6 w-fit rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-neutral-200">
          International & Swiss Private Banking — HNW/UHNWI
        </div>

        {/* Title */}
        <h1
          id="home-hero-heading"
          className="mt-4 text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl"
        >
          Executive Partners
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-3 max-w-3xl text-center text-neutral-300">
          Where Private Bankers and Opportunities Meet.
        </p>

        {/* CTA row */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/candidates"
            className="rounded-xl px-5 py-2.5 text-sm font-medium text-white shadow-lg ring-1 ring-white/10
                       bg-gradient-to-r from-emerald-700 to-emerald-600
                       hover:from-emerald-600 hover:to-emerald-500 transition-colors"
          >
            I’m a Candidate
          </Link>

          <Link
            href="/hiring-managers"
            className="rounded-xl px-5 py-2.5 text-sm font-medium text-white/90
                       bg-white/5 hover:bg-white/10 ring-1 ring-white/10
                       backdrop-blur-sm transition-colors"
          >
            I’m Hiring
          </Link>

          <Link
            href="/jobs"
            className="rounded-xl px-5 py-2.5 text-sm font-medium text-white/90
                       bg-white/5 hover:bg-white/10 ring-1 ring-white/10
                       backdrop-blur-sm transition-colors"
          >
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
