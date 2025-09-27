'use client';

import Link from 'next/link';
import { useEffect, useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import HeroFrame from '@/components/HeroFrame';

type Job = { title: string; location?: string; slug: string };

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="chip">{children}</span>;
}

function CTA({
  href,
  children,
  variant = 'primary',
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  ariaLabel?: string;
}) {
  const base = 'btn';
  const v =
    variant === 'primary'
      ? 'btn-primary'
      : variant === 'outline'
      ? 'btn-outline'
      : 'btn-ghost';

  return (
    <Link href={href} className={`${base} ${v}`} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={['card', className].filter(Boolean).join(' ')}>{children}</div>;
}

function Testimonial({
  quote,
  author,
  role,
}: {
  quote: string;
  author: string;
  role: string;
}) {
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
  const base = useMemo(() => (pathname?.startsWith('/en') ? '/en' : ''), [pathname]);

  const MARKETS = useMemo(
    () => ['Geneva', 'Zürich', 'London', 'Dubai', 'Singapore', 'Hong Kong', 'New York', 'Miami'],
    []
  );

  // Staggered hero reveal – ultra light, hydration-safe
  const [showHero, setShowHero] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShowHero(true), 30);
    return () => clearTimeout(t);
  }, []);

  // Featured jobs (demo)
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
    <div className="ep-container page-glow">
      {/* HERO */}
      <HeroFrame>
        <section className="text-center" aria-labelledby="hero-title">
          <div className="hero-reveal-wrapper">
            <Chip>International &amp; Swiss Private Banking — HNW/UHNW</Chip>

            <h1
              id="hero-title"
              className={`mt-5 page-title hero-reveal ${showHero ? 'is-in' : ''}`}
              style={{ transitionDelay: '0.10s' }}
            >
              Private Banking &amp; Wealth Management Search
            </h1>

            <p
              className={`mx-auto mt-3 max-w-2xl text-white/80 hero-reveal ${showHero ? 'is-in' : ''}`}
              style={{ transitionDelay: '0.25s' }}
            >
              Geneva-based. We connect seasoned Relationship Managers and senior leaders with confidential
              opportunities across Switzerland, UK, MENA, APAC, and the US.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className={`hero-reveal ${showHero ? 'is-in' : ''}`} style={{ transitionDelay: '0.40s' }}>
                <CTA href={`${base}/candidates`} ariaLabel="For candidates">
                  I’m a Candidate
                </CTA>
              </span>
              <span className={`hero-reveal ${showHero ? 'is-in' : ''}`} style={{ transitionDelay: '0.55s' }}>
                <CTA href={`${base}/hiring-managers`} variant="outline" ariaLabel="For hiring managers">
                  I’m Hiring
                </CTA>
              </span>
              <span className={`hero-reveal ${showHero ? 'is-in' : ''}`} style={{ transitionDelay: '0.70s' }}>
                <CTA href={`${base}/jobs`} variant="ghost" ariaLabel="Browse jobs">
                  View Jobs
                </CTA>
              </span>
            </div>
          </div>
        </section>
      </HeroFrame>

      {/* METRICS */}
      <section className="grid-responsive grid-3-md" aria-label="Key metrics">
        <Card>
          <div className="text-2xl font-extrabold">200+</div>
          <div className="text-sm text-white/70">Senior placements</div>
        </Card>
        <Card>
          <div className="text-2xl font-extrabold">92%</div>
          <div className="text-sm text-white/70">12-month retention</div>
        </Card>
        <Card className="hidden md:block">
          <div className="text-2xl font-extrabold">{MARKETS.length}</div>
          <div className="text-sm text-white/70">Core markets</div>
        </Card>
      </section>

      {/* MARKETS */}
      <section aria-labelledby="markets-title">
        <h2 id="markets-title" className="text-xl md:text-2xl font-bold">
          Markets
        </h2>
        <div className="mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {MARKETS.map((m) => (
            <Link
              key={m}
              aria-label={`View market: ${m}`}
              href={`${base}/markets/${m.toLowerCase().replace(/\s+/g, '-')}`}
              className="chip whitespace-nowrap"
            >
              {m}
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED ROLES */}
      <section aria-labelledby="featured-roles-title">
        <div className="flex items-center justify-between">
          <h2 id="featured-roles-title" className="text-xl md:text-2xl font-bold">
            Featured Roles
          </h2>
          <Link href={`${base}/jobs`} className="text-sm text-white/80 hover:text-white underline">
            View all →
          </Link>
        </div>

        <div className="mt-3 grid-responsive grid-3-md">
          {(jobs ?? [null, null, null]).map((j, i) => (
            <Card key={j ? j.slug : `skeleton-${i}`}>
              {j ? (
                <>
                  <div className="text-base font-semibold">{j.title}</div>
                  <div className="mt-1 text-sm text-white/70">{j.location}</div>
                  <div className="mt-4 flex gap-2">
                    <CTA href={`${base}/jobs/${j.slug}`} variant="outline" ariaLabel={`View role ${j.title}`}>
                      View role
                    </CTA>
                    <CTA href={`${base}/apply`} variant="ghost" ariaLabel="Apply now">
                      Apply
                    </CTA>
                  </div>
                </>
              ) : (
                <div className="animate-pulse" role="status" aria-label="Loading role">
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
      <section className="grid-responsive md:grid-cols-[1.4fr_.6fr]" aria-labelledby="portability-title">
        <Card>
          <div id="portability-title" className="text-lg font-semibold">
            Portability Score™
          </div>
          <p className="mt-2 text-sm text-white/80">
            Get a banker-friendly read on booking-centre coverage, product fit and documentation readiness.
            Export a PDF dossier you can share with hiring managers.
          </p>
          <div className="mt-4">
            <CTA href={`${base}/portability`} ariaLabel="Run the diagnostic">
              Run the diagnostic
            </CTA>
          </div>
        </Card>
        <Card>
          <div className="text-sm text-white/70">
            Tip: Candidates with diversified custody, clear AUM mix and pre-scrubbed CRS/FATCA packs move faster.
          </div>
        </Card>
      </section>

      {/* TESTIMONIALS */}
      <section aria-labelledby="testimonials-title">
        <h2 id="testimonials-title" className="text-xl md:text-2xl font-bold text-center">
          What clients say
        </h2>
        <div className="mt-4 grid-responsive grid-3-md">
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
            <Testimonial
              quote="Thanks to your support, I secured a CEO position in Dubai."
              author="CEO"
              role="Dubai"
            />
          </Card>
        </div>
      </section>
    </div>
  );
}