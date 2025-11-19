"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type UiLocale = "en" | "fr" | "de" | "it";

const FOOTER_COPY: Record<
  UiLocale,
  {
    intro: string;
    applyCta: string;
    marketsTitle: string;
    viewAllMarkets: string;
    companyTitle: string;
    navJobs: string;
    navInsights: string;
    navCandidates: string;
    navHiringManagers: string;
    navContact: string;
    copyright: string;
    linkedin: string;
  }
> = {
  en: {
    intro:
      "Geneva-based executive search focused on Private Banking & Wealth Management.",
    applyCta: "Apply confidentially",
    marketsTitle: "Markets we serve",
    viewAllMarkets: "View all markets →",
    companyTitle: "Company",
    navJobs: "Jobs",
    navInsights: "Insights",
    navCandidates: "Candidates",
    navHiringManagers: "Hiring Managers",
    navContact: "Contact",
    copyright: "All rights reserved.",
    linkedin: "LinkedIn",
  },
  fr: {
    intro:
      "Cabinet de recrutement basé à Genève, dédié à la Banque Privée & à la Gestion de Fortune.",
    applyCta: "Postuler en toute confidentialité",
    marketsTitle: "Marchés couverts",
    viewAllMarkets: "Voir tous les marchés →",
    companyTitle: "Entreprise",
    navJobs: "Jobs",
    navInsights: "Insights",
    navCandidates: "Candidats",
    navHiringManagers: "Employeurs",
    navContact: "Contact",
    copyright: "Tous droits réservés.",
    linkedin: "LinkedIn",
  },
  de: {
    intro:
      "Executive-Search-Boutique mit Sitz in Genf, fokussiert auf Private Banking & Wealth Management.",
    applyCta: "Vertraulich bewerben",
    marketsTitle: "Märkte, die wir abdecken",
    viewAllMarkets: "Alle Märkte anzeigen →",
    companyTitle: "Unternehmen",
    navJobs: "Jobs",
    navInsights: "Insights",
    navCandidates: "Kandidaten",
    navHiringManagers: "Auftraggeber",
    navContact: "Kontakt",
    copyright: "Alle Rechte vorbehalten.",
    linkedin: "LinkedIn",
  },
  // 🇮🇹 currently falls back to EN copy, layout identical
  it: {
    intro:
      "Geneva-based executive search focused on Private Banking & Wealth Management.",
    applyCta: "Apply confidentially",
    marketsTitle: "Markets we serve",
    viewAllMarkets: "View all markets →",
    companyTitle: "Company",
    navJobs: "Jobs",
    navInsights: "Insights",
    navCandidates: "Candidates",
    navHiringManagers: "Hiring Managers",
    navContact: "Contact",
    copyright: "All rights reserved.",
    linkedin: "LinkedIn",
  },
};

export default function Footer() {
  const pathname = usePathname() || "/";
  const firstSeg = pathname.split("/").filter(Boolean)[0] || "";
  const supported = new Set<UiLocale>(["en", "fr", "de", "it"]);
  const locale: UiLocale = supported.has(firstSeg as UiLocale)
    ? (firstSeg as UiLocale)
    : "en";
  const t = FOOTER_COPY[locale];

  const base = supported.has(firstSeg as UiLocale) ? `/${firstSeg}` : "";
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
            <p className="mt-2 text-sm text-white/70">{t.intro}</p>

            {/* ✅ this one must NOT be locale-prefixed */}
            <div className="mt-4">
              <Link
                href="/apply"
                className="inline-flex items-center gap-1 rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-medium text-black hover:bg-emerald-400"
              >
                {t.applyCta}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          {/* ─────────── Markets ─────────── */}
          <nav aria-label="Markets we serve" className="text-sm">
            <h3 className="text-sm font-semibold text-white/90">
              {t.marketsTitle}
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
                className="text-emerald-400 hover:text-emerald-300"
                href={href("/markets")}
              >
                {t.viewAllMarkets}
              </Link>
            </div>
          </nav>

          {/* ─────────── Company Links ─────────── */}
          <nav aria-label="Company" className="text-sm">
            <h3 className="text-sm font-semibold text-white/90">
              {t.companyTitle}
            </h3>
            <ul className="mt-2 space-y-2 text-white/80">
              <li>
                <Link className="hover:underline" href={href("/jobs")}>
                  {t.navJobs}
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href={href("/insights")}>
                  {t.navInsights}
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href={href("/candidates")}>
                  {t.navCandidates}
                </Link>
              </li>
              <li>
                <Link
                  className="hover:underline"
                  href={href("/hiring-managers")}
                >
                  {t.navHiringManagers}
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href={href("/contact")}>
                  {t.navContact}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* ─────────── Bottom bar ─────────── */}
        <div className="mt-8 border-t border-white/10 pt-6 text-xs text-white/50 flex flex-wrap items-center justify-between gap-3">
          <span>
            © {new Date().getFullYear()} Executive Partners. {t.copyright}
          </span>
          <a
            className="hover:underline"
            href="https://www.linkedin.com/company/executive-partners/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.linkedin}
          </a>
        </div>
      </div>
    </footer>
  );
}