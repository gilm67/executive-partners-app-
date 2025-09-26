'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

type Job = { title: string; location?: string; slug: string };

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 shadow-sm">
      {children}
    </span>
  );
}

function CTA({
  href,
  children,
  variant = 'primary',
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
}) {
  const base =
    'inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold min-h-[44px]';
  const v =
    variant === 'primary'
      ? 'bg-sky-600 text-white hover:bg-sky-500 shadow-[0_10px_40px_rgba(37,99,235,.35)]'
      : variant === 'outline'
      ? 'border border-white/15 bg-white/5 text-white hover:bg-white/10'
      : 'text-white/90 hover:text-white';
  return (
    <Link href={href} className={`${base} ${v}`}>
      {children}
    </Link>
  );
}

/* allow className on Card */
function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={[
        'rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-5',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}

function Testimonial({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <figure className="text-center">
      <blockquote className="text-white/90 text-lg leading-relaxed">“{quote}”</blockquote>
      <figcaption className="mt-3 text-sm text-white/70">
        <span className="font-semibold text-white">{author}</span> — {role}
      </figcaption>
    </figure>
  );
}

export default function HomeShowcaseMock() {
  const pathname = usePathname();
  const base = pathname?.startsWith('/en') ? '/en' : ''; // locale-aware prefix

  const [jobs, setJobs] = useState<Job[] | null>(null);
  useEffect(() => {
    const t = setTimeout(
      () =>
        setJobs([
          { title: 'Senior Relationship Manager — MEA', location: 'Dubai', slug: 'srm-mea-dubai' },
          { title: 'Senior Relationship Manager — Brazil', location: 'Zurich/Geneva', slug: 'srm-brazil-ch' },
          { title: 'Senior Relationship Manager — CH Onshore', location: 'Zurich', slug: 'srm-ch-onshore' },
        ]),
      400
    );
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="ep-container page-glow space-y-14">
      {/* HERO */}
      <section className="relative pt-8 text-center">
        <div className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(60%_40%_at_50%_-10%,rgba(59,130,246,.2),transparent)]" />
        <Chip>International &amp; Swiss Private Banking — HNW/UHNW</Chip>

        <h1 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight">
          Private Banking &amp; Wealth Management Search
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-neutral-300">
          Geneva-based. We connect seasoned Relationship Managers and senior leaders with confidential
          opportunities across Switzerland, UK, MENA, APAC, and the US.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <CTA href={`${base}/candidates`}>I’m a Candidate</CTA>
          <CTA href={`${base}/hiring-managers`} variant="outline">
            I’m Hiring
          </CTA>
          <CTA href={`${base}/jobs`} variant="ghost">
            View Jobs
          </CTA>
        </div>
      </section>

      {/* METRICS */}
      <section className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <Card>
          <div className="text-2xl font-extrabold">200+</div>
          <div className="text-sm text-white/70">Senior placements</div>
        </Card>
        <Card>
          <div className="text-2xl font-extrabold">92%</div>
          <div className="text-sm text-white/70">12-month retention</div>
        </Card>
        <Card className="hidden md:block">
          <div className="text-2xl font-extrabold">6</div>
          <div className="text-sm text-white/70">Core markets</div>
        </Card>
      </section>

      {/* MARKETS — scrollable chips */}
      <section className="space-y-3">
        <h2 className="text-xl md:text-2xl font-bold">Markets</h2>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {['Geneva', 'Zürich', 'London', 'Dubai', 'Singapore', 'Hong Kong', 'New York', 'Miami'].map((m) => (
            <Link
              key={m}
              href={`${base}/markets/${m.toLowerCase().replace(/\s+/g, '-')}`}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/85 hover:bg-white/10"
            >
              {m}
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED ROLES */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold">Featured Roles</h2>
          <Link href={`${base}/jobs`} className="text-sm text-white/80 hover:text-white underline">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(jobs ?? [null, null, null]).map((j, i) => (
            <Card key={j ? j.slug : `skeleton-${i}`}>
              {j ? (
                <>
                  <div className="text-base font-semibold">{j.title}</div>
                  <div className="mt-1 text-sm text-white/70">{j.location}</div>
                  <div className="mt-4 flex gap-2">
                    <CTA href={`${base}/jobs/${j.slug}`} variant="outline">
                      View role
                    </CTA>
                    <CTA href={`${base}/apply`} variant="ghost">
                      Apply
                    </CTA>
                  </div>
                </>
              ) : (
                <div className="animate-pulse">
                  <div className="h-4 w-2/3 rounded bg-white/12" />
                  <div className="mt-2 h-3 w-1/3 rounded bg-white/8" />
                  <div className="mt-4 h-8 w-24 rounded bg-white/8" />
                </div>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* PORTABILITY TEASER */}
      <section className="grid md:grid-cols-[1.4fr_.6fr] gap-4">
        <Card>
          <div className="text-lg font-semibold">Portability Score™</div>
          <p className="mt-2 text-sm text-white/80">
            Get a banker-friendly read on booking-centre coverage, product fit and documentation readiness.
            Export a PDF dossier you can share with hiring managers.
          </p>
          <div className="mt-4">
            <CTA href={`${base}/portability`}>Run the diagnostic</CTA>
          </div>
        </Card>
        <Card>
          <div className="text-sm text-white/70">
            Tip: Candidates with diversified custody, clear AUM mix and pre-scrubbed CRS/FATCA packs move faster.
          </div>
        </Card>
      </section>

      {/* TESTIMONIALS */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold text-center">What clients say</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <Testimonial
              quote="Shortlist arrived fast and on-point. We closed in under 4 weeks."
              author="Head of Private Banking"
              role="Zurich"
            />
          </Card>
          <Card>
            <Testimonial quote="Discreet, calibrated profiles — saved my time." author="Market Head" role="Dubai" />
          </Card>
          <Card>
            <Testimonial quote="Strong grasp of portability and platform nuances." author="COO Wealth" role="Geneva" />
          </Card>
        </div>
      </section>
    </div>
  );
}