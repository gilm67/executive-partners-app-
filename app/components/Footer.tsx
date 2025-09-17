"use client";

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold text-white/90">Executive Partners</h3>
            <p className="mt-2 text-sm text-white/70">
              Geneva-based executive search focused on Private Banking & Wealth Management.
            </p>
          </div>

          <nav aria-label="Markets we serve" className="text-sm">
            <h3 className="text-sm font-semibold text-white/90">Markets we serve</h3>
            <ul className="mt-2 grid grid-cols-2 gap-2 text-white/80">
              <li><a className="hover:underline" href="/markets/geneva">Geneva</a></li>
              <li><a className="hover:underline" href="/markets/zurich">Zürich</a></li>
              <li><a className="hover:underline" href="/markets/dubai">Dubai</a></li>
              <li><a className="hover:underline" href="/markets/singapore">Singapore</a></li>
              <li><a className="hover:underline" href="/markets/hong-kong">Hong Kong</a></li>
              <li><a className="hover:underline" href="/markets/london">London</a></li>
              <li><a className="hover:underline" href="/markets/new-york">New York</a></li>
              <li><a className="hover:underline" href="/markets/miami">Miami</a></li>
            </ul>
            <div className="mt-3">
              <a className="text-emerald-400 hover:text-emerald-300" href="/markets">
                View all markets →
              </a>
            </div>
          </nav>

          <nav aria-label="Company" className="text-sm">
            <h3 className="text-sm font-semibold text-white/90">Company</h3>
            <ul className="mt-2 space-y-2 text-white/80">
              <li><a className="hover:underline" href="/jobs">Jobs</a></li>
              <li><a className="hover:underline" href="/insights">Insights</a></li>
              <li><a className="hover:underline" href="/candidates">Candidates</a></li>
              <li><a className="hover:underline" href="/hiring-managers">Hiring Managers</a></li>
              <li><a className="hover:underline" href="/contact">Contact</a></li>
            </ul>
          </nav>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-xs text-white/50 flex flex-wrap items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} Executive Partners. All rights reserved.</span>
          <a
            className="hover:underline"
            href="https://www.linkedin.com/company/executive-partners/"
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
