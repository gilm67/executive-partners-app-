"use client";

import Link from "next/link";
import {useTranslations} from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold text-white/90">Executive Partners</h3>
            <p className="mt-2 text-sm text-white/70">
              Geneva-based executive search focused on Private Banking &amp; Wealth Management.
            </p>
          </div>

          <nav aria-label="Markets" className="text-sm">
            <h3 className="text-sm font-semibold text-white/90">{t("marketsWeServe")}</h3>
            <ul className="mt-2 grid grid-cols-2 gap-2 text-white/80">
              <li><Link href="/markets/geneva">Geneva</Link></li>
              <li><Link href="/markets/zurich">Zürich</Link></li>
              <li><Link href="/markets/dubai">Dubai</Link></li>
              <li><Link href="/markets/singapore">Singapore</Link></li>
              <li><Link href="/markets/hong-kong">Hong Kong</Link></li>
              <li><Link href="/markets/london">London</Link></li>
              <li><Link href="/markets/new-york">New York</Link></li>
              <li><Link href="/markets/miami">Miami</Link></li>
            </ul>
            <div className="mt-3">
              <Link href="/markets" className="text-emerald-400 hover:text-emerald-300">
                {t("viewAllMarkets")}
              </Link>
            </div>
          </nav>

          <nav aria-label="Company" className="text-sm">
            <h3 className="text-sm font-semibold text-white/90">{t("company")}</h3>
            <ul className="mt-2 space-y-2 text-white/80">
              <li><Link href="/jobs">{t("jobs")}</Link></li>
              <li><Link href="/insights">{t("insights")}</Link></li>
              <li><Link href="/candidates">{t("candidates")}</Link></li>
              <li><Link href="/hiring-managers">{t("hiringManagers")}</Link></li>
              <li><Link href="/contact">{t("contact")}</Link></li>
            </ul>
          </nav>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-xs text-white/50 flex flex-wrap items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} Executive Partners. {t("copyright")}</span>
          <Link
            href="https://www.linkedin.com/company/executive-partners/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
}
