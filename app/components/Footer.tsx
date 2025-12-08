// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-black/40">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        {/* Top row */}
        <div className="grid gap-10 md:grid-cols-4 md:items-start">
          {/* Brand / description */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-xs tracking-[0.3em] uppercase text-[#F5D778]">
              Executive Partners
            </p>
            <p className="text-sm font-semibold text-neutral-100">
              Geneva-based executive search focused on Private Banking &amp; Wealth
              Management.
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We partner with senior Relationship Managers, Team Heads and
              Market Leaders across Switzerland, the UK, Europe, the US,
              Dubai, Singapore and Hong Kong — always with full confidentiality.
            </p>
          </div>

          {/* Markets */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-100">
              Markets we serve
            </h3>
<ul className="mt-3 space-y-1 text-xs text-neutral-400 [&_a]:text-neutral-300 [&_a:hover]:text-neutral-100">              <li>Geneva · Zurich</li>
              <li>London · Luxembourg</li>
              <li>Dubai · Abu Dhabi</li>
              <li>Singapore · Hong Kong</li>
              <li>Monaco · Miami / New York</li>
            </ul>
          </div>

          {/* Quick links / CTA */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-neutral-100">
                Company
              </h3>
              <ul className="mt-3 space-y-1 text-xs text-neutral-400">
                <li>
                  <Link href="/jobs" className="hover:text-neutral-200">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/insights" className="hover:text-neutral-200">
                    Insights
                  </Link>
                </li>
                <li>
                  <Link href="/candidates" className="hover:text-neutral-200">
                    Candidates
                  </Link>
                </li>
                <li>
                  <Link href="/hiring-managers" className="hover:text-neutral-200">
                    Hiring Managers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-neutral-200">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Mini CTA */}
            <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-xs text-neutral-300">
              <p className="font-medium text-neutral-100">
                Thinking about a move?
              </p>
              <p className="mt-1 text-[11px] text-neutral-400">
                Share your profile confidentially and we’ll revert with a view on
                realistic platforms and markets.
              </p>
              <Link
                href="/apply"
                className="mt-3 inline-flex w-full justify-center rounded-full bg-gradient-to-b from-[#FFE8A3] via-[#F6C859] to-[#D6A738] px-3 py-2 text-[11px] font-semibold text-[#1A1300] shadow-[0_10px_24px_rgba(214,167,56,0.4)] hover:shadow-[0_14px_32px_rgba(214,167,56,0.5)]"
              >
                Apply confidentially
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col gap-2 border-t border-white/5 pt-4 text-[11px] text-neutral-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Executive Partners. All rights reserved.
          </p>
          <p className="text-neutral-500">
            Discreet executive search for Private Banking &amp; Wealth Management.
          </p>
        </div>
      </div>
    </footer>
  );
}