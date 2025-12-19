// components/Footer.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#070A10] text-white">
      {/* Subtle luxe glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 380px at 18% 0%, rgba(201,161,74,.14) 0%, rgba(201,161,74,0) 62%), radial-gradient(800px 340px at 92% 20%, rgba(158,203,255,.10) 0%, rgba(158,203,255,0) 55%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Top grid */}
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="text-lg font-semibold tracking-tight">
              Executive Partners
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Geneva-based executive search for{" "}
              <span className="text-white/85">Private Banking</span> &{" "}
              <span className="text-white/85">Wealth Management</span>.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center rounded-full bg-white/5 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10 transition"
            >
              Speak with us <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {/* For Candidates */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-white">
              For Candidates
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>
                <Link href="/jobs" className="hover:text-white transition">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/candidates" className="hover:text-white transition">
                  Career Guidance
                </Link>
              </li>
              <li>
                <Link href="/portability" className="hover:text-white transition">
                  Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-white">
              For Employers
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>
                <Link
                  href="/hiring-managers/brief"
                  className="hover:text-white transition"
                >
                  Brief a Role
                </Link>
              </li>
              <li>
                <Link
                  href="/hiring-managers"
                  className="hover:text-white transition"
                >
                  Our Process
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-white">
              Company
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-white transition">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-xs text-white/55">
          <div>
            © {new Date().getFullYear()} Executive Partners. All rights reserved.
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-white transition">
              GDPR Compliant
            </Link>
            <span className="hidden md:inline">•</span>
            <span>Confidentiality Guaranteed</span>
          </div>
        </div>
      </div>
    </footer>
  );
}