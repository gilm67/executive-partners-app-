'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const base = pathname?.startsWith('/en') ? '/en' : '';

  const markets = [
    { label: 'Geneva', href: '/private-banking-recruiter-geneva' },
    { label: 'Zurich', href: '/private-banking-recruiter-zurich' },
    { label: 'Paris', href: '/private-banking-recruiter-paris' },
    { label: 'Madrid', href: '/private-banking-recruiter-madrid' },
    { label: 'Lisbon', href: '/private-banking-recruiter-lisbon' },
    { label: 'Dubai', href: '/private-banking-recruiter-dubai' },
    { label: 'Singapore', href: '/private-banking-recruiter-singapore' },
    { label: 'Hong Kong', href: '/private-banking-recruiter-hong-kong' },
    { label: 'London', href: '/private-banking-recruiter-london' },
    { label: 'New York', href: '/private-banking-recruiter-new-york' },
    { label: 'Miami', href: '/private-banking-recruiter-miami' },
  ];

  return (
    <footer className="mt-20 border-t border-white/10 bg-[#0B0E13] text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Col 1 */}
          <div>
            <h3 className="text-sm font-semibold">Executive Partners</h3>
            <p className="mt-2 text-sm text-white/70">
              Geneva-based executive search focused on Private Banking &amp; Wealth Management.
            </p>
          </div>

          {/* Col 2 (Markets + Company) */}
          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-3">
            {/* Markets */}
            <div>
              <h4 className="text-sm font-semibold">Markets we serve</h4>
              <ul className="mt-2 space-y-1 text-sm text-white/80">
                {markets.map((m) => (
                  <li key={m.href}>
                    <Link href={`${base}${m.href}`} className="hover:text-white">
                      {m.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-3">
                <Link
                  href={`${base}/markets`}
                  className="text-white/80 hover:text-white"
                >
                  View all markets →
                </Link>
              </div>
            </div>

            {/* Spacer */}
            <div className="hidden md:block" aria-hidden />

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold">Company</h4>
              <ul className="mt-2 space-y-1 text-sm text-white/80">
                <li>
                  <Link href={`${base}/jobs`} className="hover:underline">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link href={`${base}/insights`} className="hover:underline">
                    Insights
                  </Link>
                </li>
                <li>
                  <Link href={`${base}/candidates`} className="hover:underline">
                    Candidates
                  </Link>
                </li>
                <li>
                  <Link
                    href={`${base}/hiring-managers`}
                    className="hover:underline"
                  >
                    Hiring Managers
                  </Link>
                </li>
                <li>
                  <Link href={`${base}/contact`} className="hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-8 border-white/10" />

        <div className="flex flex-col items-start justify-between gap-3 text-sm text-white/60 sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} Executive Partners. All rights reserved.
          </span>
          <a
            href="https://www.linkedin.com/company/executive-partners"
            className="hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}