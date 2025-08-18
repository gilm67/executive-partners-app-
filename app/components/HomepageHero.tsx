// app/components/HomepageHero.tsx
import Image from "next/image";
import Link from "next/link";

export default function HomepageHero() {
  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="home-hero-heading"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-black" />

      {/* Optional skyline image (put a file like /hero-city.jpg in /public) */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-35"
        style={{ backgroundImage: "url('/hero-city.jpg')" }}
        aria-hidden="true"
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24 lg:py-28">
        {/* Logo + glow */}
        <div className="flex justify-center">
          <Image
            src="/transparent-ep-logo.png" // already added to /public
            alt="Executive Partners"
            width={360}
            height={120}
            priority
            className="h-auto w-[240px] sm:w-[300px] md:w-[360px] 
                       drop-shadow-[0_0_18px_rgba(255,255,255,0.35)]"
          />
        </div>

        <h1
          id="home-hero-heading"
          className="mt-6 text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Business & Talent — Perfectly Matched
        </h1>

        <p className="mx-auto mt-4 max-w-3xl text-center text-neutral-300">
          International & Swiss Private Banking — HNW/UHNW. We connect elite
          bankers and executives with leading platforms. Discreet, fast,
          outcome-driven.
        </p>

        {/* CTA row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/bp-simulator"
            className="rounded-xl px-5 py-3 text-sm font-medium text-white 
                       shadow-lg ring-1 ring-white/15
                       bg-gradient-to-r from-emerald-700 to-emerald-600
                       hover:from-emerald-600 hover:to-emerald-500
                       transition-colors"
          >
            🚀 Open BP Simulator
          </Link>

          <Link
            href="/candidates"
            className="rounded-xl px-5 py-3 text-sm font-medium text-white/90
                       bg-white/5 hover:bg-white/10
                       ring-1 ring-white/15
                       backdrop-blur-sm transition-colors"
          >
            I’m a Candidate
          </Link>

          <Link
            href="/hiring-managers"
            className="rounded-xl px-5 py-3 text-sm font-medium text-white/90
                       bg-white/5 hover:bg-white/10
                       ring-1 ring-white/15
                       backdrop-blur-sm transition-colors"
          >
            For Hiring Managers
          </Link>

          <Link
            href="/jobs"
            className="rounded-xl px-5 py-3 text-sm font-medium text-white/90
                       bg-white/5 hover:bg-white/10
                       ring-1 ring-white/15
                       backdrop-blur-sm transition-colors"
          >
            View Jobs
          </Link>
        </div>
      </div>

      {/* Subtle top/bottom vignette rings */}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
      <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_-120px_160px_-60px_rgba(0,0,0,0.55)]" />
    </section>
  );
}

