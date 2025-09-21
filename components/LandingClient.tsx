'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';

type Job = {
  slug: string;
  title: string;
  city?: string;
  active?: boolean;
};

export default function LandingClient() {
  const [jobs, setJobs] = useState<Job[] | null>(null);

  // Client-side fetch for featured jobs
  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const qs = new URLSearchParams({ limit: '3', featured: '1' }).toString();
        const r = await fetch(`/api/jobs?${qs}`, { cache: 'no-store', signal: controller.signal });
        if (!r.ok) throw new Error('Bad response');
        const list = await r.json();
        const filtered = (Array.isArray(list) ? list : [])
          .filter(j => j?.active !== false)
          .slice(0, 3);
        setJobs(filtered);
      } catch {
        setJobs([]);
      }
    };
    load();
    return () => controller.abort();
  }, []);

  return (
    <main className="min-h-[70vh]">
      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            'radial-gradient(1200px 400px at 10% -10%, rgba(29,78,216,.25), transparent 60%), ' +
            'radial-gradient(800px 300px at 110% 10%, rgba(16,185,129,.25), transparent 60%), ' +
            '#0B0E13',
          color: 'white',
        }}
      >
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">Executive Partners</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Switzerland’s leading recruiter for Private Banking &amp; Wealth Management.
            Geneva · Zürich · Dubai · Singapore · London · New York
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <PrimaryBtn href="/en/jobs" variant="blue">Browse Jobs</PrimaryBtn>
            <PrimaryBtn href="/en/candidates" variant="outline">Candidates</PrimaryBtn>
            <PrimaryBtn href="/en/hiring-managers" variant="ghost">Hiring Managers</PrimaryBtn>
          </div>
        </div>
      </section>

      {/* FEATURED ROLES */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex items-end justify-between">
          <h2 className="text-xl sm:text-2xl font-semibold">Featured Roles</h2>
          <Link className="text-sm underline" href="/en/jobs">View all jobs</Link>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(jobs ?? [null, null, null]).map((job, i) => (
            <div
              key={job?.slug ?? i}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white shadow-sm backdrop-blur"
            >
              <div className="text-sm uppercase tracking-wide text-white/60">
                {job?.city || '—'}
              </div>
              <div className="mt-2 text-lg font-semibold min-h-12">
                {job ? job.title : 'Loading…'}
              </div>
              <div className="mt-6">
                {job ? (
                  <CardBtn href={`/jobs/${job.slug}`} tone="blue">View role</CardBtn>
                ) : (
                  <div className="h-9 rounded-lg bg-white/10" />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="flex flex-wrap gap-3">
          <Link className="underline" href="/en/portability">Relationship Manager Portability</Link>
          <Link className="underline" href="/en/markets">Markets</Link>
          <Link className="underline" href="/en/insights">Insights</Link>
          <Link className="underline" href="/en/contact">Contact</Link>
        </div>
      </section>
    </main>
  );
}

/* ------------ Buttons (local) ------------ */
function PrimaryBtn({
  href,
  children,
  variant = 'blue',
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'blue' | 'outline' | 'ghost';
}) {
  const cls =
    variant === 'blue'
      ? 'bg-[#1D4ED8] text-white hover:bg-[#1E40AF] shadow-[0_8px_30px_rgba(29,78,216,.35)] font-semibold'
      : variant === 'outline'
      ? 'border border-white/15 bg-white/5 hover:bg-white/10 text-white'
      : 'border border-white/10 bg-transparent hover:bg-white/5 text-white';

  return (
    <Link
      href={href}
      className={`w-full rounded-xl px-4 py-3 text-center text-sm font-semibold transition ${cls}`}
    >
      {children}
    </Link>
  );
}

/** Inline CardBtn so there’s no missing import */
function CardBtn({
  href,
  tone = 'blue',
  children,
}: {
  href: string;
  tone?: 'blue' | 'green' | 'neutral';
  children: React.ReactNode;
}) {
  const toneClass =
    tone === 'blue'
      ? 'bg-blue-600 hover:bg-blue-700'
      : tone === 'green'
      ? 'bg-emerald-600 hover:bg-emerald-700'
      : 'bg-white/10 hover:bg-white/20';

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${toneClass}`}
    >
      {children}
    </Link>
  );
}
