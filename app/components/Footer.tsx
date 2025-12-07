"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname() || "/";
  const firstSeg = pathname.split("/").filter(Boolean)[0] || "";
  const supported = new Set(["en", "fr", "de", "it"]);
  const base = supported.has(firstSeg) ? `/${firstSeg}` : "";
  const href = (p: string) => `${base}${p.startsWith("/") ? p : `/${p}`}`;

  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* ─────────── Company Intro ─────────── */}
          <div>
            <h3 className="text-sm font-semibold text-white/90">
              Executive Partners
            </h3>
            <p className="mt-2 text-sm text-white/70">
              Geneva-based executive search focused on Private Banking &amp;
              Wealth Management.
            </p>

            {/* ✅ this one must NOT be locale-prefixed */}
            <div className="mt-4">
              <Link
                href="/apply"
                className="btn-primary gap-1"
              >
                Apply confidentially
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          {/* ─────────── Markets ─────────── */}
          <nav aria-label="Markets we serve" className="text-sm">
            <h3 className="text-sm font-semibold text-white/90">
              Markets we serve
            </h3>
            <ul className="mt-2 grid grid-cols-2 gap-2 text-white/80">
              <li>
                <Link className="hover:underline" href={href("/markets/geneva")}>
                  Geneva
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href={href("/markets/zurich")}>
                  Zürich
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href={href("/markets/london")}>
                  London
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href={href("/markets/dubai")}>
                  Dubai
                </Link>
              </li>
              <li>
                <Link
                  className="hover:underline"
                  href={href("/markets/singapore")}
                >
                  Singapore
                </Link>
              </li>
              <li>
                <Link
                  className="hover:underline"
                  href={href("/markets/hong-kong")}
                >
                  Hong Kong
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href={href("/markets/miami")}>
                  Miami
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href={href("/markets/paris")}>
                  Paris
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href={href("/markets/madrid")}>
                  Madrid
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href={href("/markets/milano")}>
                  Milano
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href={href("/markets/lisbon")}>
                  Lisbon
                </Link>
              </li>
            </ul>
            <div className="mt-3">
              <Link
                className="text-brand-gold hover:text-brand-gold-soft"
                href={href("/markets")}
              >
                View all markets →
              </Link>
            </div>
          </nav>

          {/* ─────────── Company Links ─────────── */}
          <nav aria-label="Company" className="text-sm">
            <h3 className="text-sm font-semibold text-white/90">Company</h3>
            <ul className="mt-2 space-y-2 text-white/80">
              <li>
                <Link className="hover:underline" href={href("/jobs")}>
                  Jobs
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href={href("/insights")}>
                  Insights
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href={href("/candidates")}>
                  Candidates
                </Link>
              </li>
              <li>
                <Link
                  className="hover:underline"
                  href={href("/hiring-managers")}
                >
                  Hiring Managers
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href={href("/contact")}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* ─────────── Bottom bar ─────────── */}
        <div className="mt-8 border-t border-white/10 pt-6 text-xs text-white/50 flex flex-wrap items-center justify-between gap-3">
          <span>
            © {new Date().getFullYear()} Executive Partners. All rights
            reserved.
          </span>
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