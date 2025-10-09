// components/StunningLanding.tsx
"use client";

import Link from "next/link";
import Skyline from "@/components/Skyline";

export default function StunningLanding() {
  return (
    <div className="relative bg-[#0B0E13]">
      {/* top band */}
      <section className="relative overflow-hidden">
        {/* star/skyline background */}
        <div className="absolute inset-0 pointer-events-none">
          <Skyline />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          {/* pill */}
          <div className="mx-auto w-full max-w-xl text-center">
            <span className="inline-block rounded-full border border-white/15 bg-white/[0.03] px-4 py-1 text-[11px] tracking-[0.18em] text-white/70">
              International &amp; Swiss Private Banking — HNW/UHNW
            </span>
          </div>

          {/* headline */}
          <h1 className="mx-auto mt-6 w-full max-w-4xl text-center font-[var(--font-playfair)] text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Exclusive Talent. Global <span className="text-[var(--sky-300,#77B6FF)]">Private Banking.</span>
          </h1>

          {/* subheadline */}
          <p className="mx-auto mt-4 w-full max-w-3xl text-center text-white/80">
            Geneva-based executive search. We connect seasoned Relationship Managers and senior leaders with
            confidential opportunities across Switzerland, UK, US, MENA &amp; Asia.
          </p>

          {/* 3 buttons */}
          <div className="mx-auto mt-6 flex w-full max-w-xl flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/candidates"
              className="btn-primary h-10 rounded-md bg-gradient-to-b from-[#3da2ff] to-[#1f6ddc] px-5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(52,136,255,0.35)] hover:opacity-95"
            >
              I’m a Candidate
            </Link>
            <Link
              href="/hiring-managers"
              className="btn-ghost h-10 rounded-md border border-white/20 px-5 text-sm font-semibold text-white/90 hover:bg-white/10"
            >
              I’m Hiring
            </Link>
            <Link
              href="/jobs"
              className="btn-primary h-10 rounded-md bg-gradient-to-b from-[#3da2ff] to-[#1f6ddc] px-5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(52,136,255,0.35)] hover:opacity-95"
            >
              View Jobs
            </Link>
          </div>

          {/* focus market link */}
          <p className="mt-6 text-center text-xs text-white/60">
            Focus market:{" "}
            <Link href="/private-banking-jobs-in-switzerland" className="underline decoration-white/30 hover:text-white">
              Private Banking jobs in Switzerland
            </Link>
          </p>
        </div>
      </section>

      {/* two dark cards row */}
      <section className="relative mx-auto mt-6 max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Candidates card */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 shadow-sm backdrop-blur">
            <p className="text-xs font-semibold text-emerald-300/80">For Candidates</p>
            <h3 className="mt-2 text-lg font-semibold text-white/90">Confidential career moves</h3>
            <p className="mt-2 text-sm text-white/70">
              We work discreetly with UHNW/HNW talent. Explore live mandates or register to be matched with roles
              that fit your market, seniority, and portability.
            </p>
            <div className="mt-4 flex gap-3">
              <Link
                href="/jobs"
                className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90"
              >
                Browse Jobs
              </Link>
              <Link
                href="/candidates"
                className="rounded-md border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                Candidate Hub
              </Link>
            </div>
          </div>

          {/* Hiring Managers card */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 shadow-sm backdrop-blur">
            <p className="text-xs font-semibold text-sky-300/80">For Hiring Managers</p>
            <h3 className="mt-2 text-lg font-semibold text-white/90">Targeted shortlists, fast</h3>
            <p className="mt-2 text-sm text-white/70">
              We map markets and deliver vetted shortlists with real portability. Post a new role or ask us to
              discreetly approach specific bankers.
            </p>
            <div className="mt-4 flex gap-3">
              <Link
                href="/hiring-managers"
                className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
              >
                Hire Talent
              </Link>
              <Link
                href="/contact"
                className="rounded-md border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}