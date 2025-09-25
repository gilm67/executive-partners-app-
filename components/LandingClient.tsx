'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

type Job = { title: string; location?: string; slug: string; summary?: string };

/* Reusable pill buttons */
function Btn({
  href,
  children,
  variant = 'primary',
  size = 'xl',
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'lg' | 'xl';
}) {
  const sizeCls =
    size === 'xl' ? 'h-12 px-6 text-[15px] rounded-2xl' : 'h-11 px-5 text-sm rounded-xl';

  const base =
    'inline-flex items-center justify-center font-semibold transition will-change-transform shadow-[0_6px_20px_rgba(0,0,0,.10)]';

  const variantCls =
    variant === 'primary'
      ? 'bg-[#1E64F0] text-white hover:bg-[#1a57d1] shadow-[0_10px_32px_rgba(30,100,240,.45)]'
      : variant === 'outline'
      ? 'border border-white/15 bg-white/5 text-white hover:bg-white/10'
      : 'border border-white/10 bg-white/5 text-white hover:bg-white/10';

  // 👇 Full-width on mobile, auto on larger screens
  return (
    <Link href={href} className={`${base} ${sizeCls} ${variantCls} w-full sm:w-auto text-center`}>
      {children}
    </Link>
  );
}

/* Panel / card */
function Panel({
  title,
  eyebrow,
  children,
  actions,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 p-4 sm:p-6 bg-white/[0.035]">
      {eyebrow && <div className="mb-2 text-xs font-medium text-emerald-400">{eyebrow}</div>}
      <div className="text-white text-[17px] font-semibold">{title}</div>
      <div className="mt-2 text-[13.5px] leading-6 text-white/80">{children}</div>
      {actions && <div className="mt-5 flex gap-3">{actions}</div>}
    </div>
  );
}

export default function LandingClient() {
  const pathname = usePathname();
  const base = useMemo(() => (pathname?.startsWith('/en') ? '/en' : ''), [pathname]);

  // ---------- (Optional) splash wiring ----------
  const SPLASH_MS = 5200;
  const HIDE_DELAY_MS = 400;

  const [showSplash, setShowSplash] = useState(false);
  const [splashHide, setSplashHide] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const seen = sessionStorage.getItem('ep:splash') === 'done';
    if (seen || prefersReduced) {
      setSplashDone(true);
      setShowSplash(false);
      return;
    }
    setShowSplash(true);
    const tReveal = setTimeout(() => setSplashDone(true), SPLASH_MS - 250);
    const tHide = setTimeout(() => setSplashHide(true), SPLASH_MS);
    const tDone = setTimeout(() => {
      setShowSplash(false);
      sessionStorage.setItem('ep:splash', 'done');
    }, SPLASH_MS + HIDE_DELAY_MS);
    return () => {
      clearTimeout(tReveal);
      clearTimeout(tHide);
      clearTimeout(tDone);
    };
  }, []);

  const [featured, setFeatured] = useState<Job[] | null>(null);
  useEffect(() => {
    let abort = false;
    (async () => {
      try {
        const r = await fetch(`/api/jobs?limit=3&featured=1`, { cache: 'no-store' });
        const raw = r.ok ? await r.json() : {};
        const list: Job[] = Array.isArray(raw?.jobs) ? raw.jobs : [];
        if (!abort) setFeatured(list.slice(0, 3));
      } catch {
        if (!abort) setFeatured([]);
      }
    })();
    return () => {
      abort = true;
    };
  }, []);

  return (
    <>
      {showSplash && <div className={`ep-splash ${splashHide ? 'ep-splash--hide' : ''}`} aria-hidden />}

      {/* Single, global background gradient here */}
      <div className="bg-gradient-to-b from-neutral-950 via-neutral-900 to-black">
        <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 space-y-14 ${splashDone ? 'ep-hero--show' : ''}`}>
          {/* HERO */}
          <section className="pt-2 text-center">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] tracking-wide text-white/75">
              International &amp; Swiss Private Banking — HNW/UHNW
            </div>

            {/* 👇 Friendlier mobile sizes */}
            <h1 className="mx-auto mt-5 max-w-[1000px] text-[32px] sm:text-[44px] md:text-[56px] leading-[1.15] font-extrabold text-white">
              <span className="block sm:whitespace-nowrap">Private Banking &amp; Wealth Management</span>
              <span className="block">Search</span>
            </h1>

            <p className="mx-auto mt-3 max-w-3xl text-[14.5px] sm:text-[15px] leading-7 text-white/80">
              Executive Partners is Switzerland’s leading financial recruiter for private banking and
              wealth management. From our base in Geneva, we connect seasoned Relationship Managers and
              senior leaders with confidential opportunities in Zurich, Dubai, Singapore, London, and
              New York.
            </p>

            {/* 👇 Full-width CTAs on mobile */}
            <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-3">
              <Btn href={`${base}/candidates`} variant="primary" size="xl">I’m a Candidate</Btn>
              <Btn href={`${base}/hiring-managers`} variant="outline" size="xl">I’m Hiring</Btn>
              <Btn href={`${base}/jobs`} variant="ghost" size="xl">View Private Banking Jobs</Btn>
            </div>

            <div className="mt-3 text-[12px] text-white/65">
              Focus market{' '}
              <Link className="underline underline-offset-2 hover:text-white" href={`${base}/private-banking-jobs-switzerland`}>
                Private Banking jobs in Switzerland
              </Link>
            </div>
          </section>

          {/* CANDIDATES / HIRING MANAGERS */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Panel
              eyebrow="For Candidates"
              title="Confidential career moves"
              actions={
                <>
                  <Btn href={`${base}/jobs`} variant="primary" size="xl">Browse Jobs</Btn>
                  <Btn href={`${base}/candidates`} variant="outline" size="lg">Candidate Hub</Btn>
                </>
              }
            >
              We work discreetly with UHNW/HNW talent. Explore live mandates or register to be matched
              with roles that fit your market, seniority, and portability.
            </Panel>

            <Panel
              eyebrow="For Hiring Managers"
              title="Targeted shortlists, fast"
              actions={
                <>
                  <Btn href={`${base}/hiring-managers`} variant="primary" size="xl">Hire Talent</Btn>
                  <Btn href={`${base}/contact`} variant="outline" size="lg">Talk to Us</Btn>
                </>
              }
            >
              We map markets and deliver vetted shortlists with real portability. Post a new role or ask
              us to discreetly approach specific bankers.
            </Panel>
          </section>

          {/* FEATURED ROLES */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-white">Featured Roles</h2>
              <Link href={`${base}/jobs`} className="text-sm text-white/80 hover:text-white underline">
                View all jobs →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {(featured === null ? [null, null, null] : featured).map((job, i) => (
                <div key={job ? job.slug : `skeleton-${i}`} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                  {job ? (
                    <>
                      <div className="text-white font-medium">{job.title}</div>
                      <div className="mt-1 text-sm text-white/70">{job.location ?? 'Switzerland'}</div>
                      <div className="mt-3 flex gap-2">
                        <Btn href={`${base}/jobs/${job.slug}`} variant="outline" size="lg">View role</Btn>
                        <Btn href={`${base}/apply`} variant="ghost" size="lg">Apply</Btn>
                      </div>
                    </>
                  ) : (
                    <div className="animate-pulse">
                      <div className="h-4 w-2/3 rounded bg-white/12" />
                      <div className="mt-2 h-3 w-1/3 rounded bg-white/8" />
                      <div className="mt-4 h-8 w-24 rounded bg-white/8" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* QUICK LINKS */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <Panel title="Markets" actions={<Btn href={`${base}/markets`} variant="outline" size="lg">Explore →</Btn>}>
              Geneva, Zurich, London, Dubai, Singapore, New York.
            </Panel>
            <Panel title="Insights" actions={<Btn href={`${base}/insights`} variant="outline" size="lg">Explore →</Btn>}>
              Private Wealth Pulse — hiring trends &amp; market notes.
            </Panel>
            <Panel title="Contact" actions={<Btn href={`${base}/contact`} variant="outline" size="lg">Explore →</Btn>}>
              Contact Executive Partners — confidentially.
            </Panel>
          </section>
        </div>
      </div>
    </>
  );
}