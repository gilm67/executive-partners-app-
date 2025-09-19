'use client';
import Link from "next/link";

export default function Footer() {
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

          {/* Col 2 */}
          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-3">
            <div>
              <h4 className="text-sm font-semibold">Markets we serve</h4>
              <ul className="mt-2 space-y-1 text-sm text-white/80">
                <li>Switzerland</li>
                <li>Zurich</li>
                <li>Singapore</li>
                <li>New York</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold invisible md:visible"> </h4>
              <ul className="mt-2 space-y-1 text-sm text-white/80">
                <li>Geneva</li>
                <li>Dubai</li>
                <li>London</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold">Company</h4>
              <ul className="mt-2 space-y-1 text-sm text-white/80">
                <li><Link href="/jobs" className="hover:underline">Jobs</Link></li>
                <li><Link href="/insights" className="hover:underline">Insights</Link></li>
                <li><Link href="/apply" className="hover:underline">Apply</Link></li>
                <li><Link href="/hiring-managers" className="hover:underline">Hiring Managers</Link></li>
                <li><Link href="/contact" className="hover:underline">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-8 border-white/10" />

        <div className="flex items-center justify-between text-sm text-white/60">
          <span>© {new Date().getFullYear()} Executive Partners. All rights reserved.</span>
          <Link href="https://www.linkedin.com/company/executive-partners" className="hover:text-white" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
}
