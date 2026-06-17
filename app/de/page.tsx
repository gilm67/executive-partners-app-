// app/de/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://www.execpartners.ch";
const PAGE_URL = `${SITE}/de`;

export const metadata: Metadata = {
  title: { absolute: "Executive Partners | Private Banking Personalberatung Schweiz" },
  description:
    "Executive Partners ist eine auf Private Banking und Wealth Management spezialisierte Personalberatung mit Sitz in Genf. Vertrauliche Vermittlung von Senior Relationship Managern, Team Heads und Investment Advisors in der Schweiz und international.",
  alternates: {
    canonical: PAGE_URL,
    languages: { en: `${SITE}/en` },
  },
  openGraph: {
    title: "Executive Partners | Private Banking Personalberatung Schweiz",
    description:
      "Führende Personalberatung für Private Banking in der Schweiz. Senior RMs, Team Heads und UHNW-Banker in Genf, Zürich, Dubai, Riad, Singapur und London.",
    locale: "de_CH",
    type: "website",
    url: PAGE_URL,
    siteName: "Executive Partners",
    images: [{ url: `${SITE}/og.webp`, width: 1200, height: 630, alt: "Executive Partners" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Executive Partners | Private Banking Personalberatung Schweiz",
    description:
      "Führende Personalberatung für Private Banking in der Schweiz. Senior RMs, Team Heads und UHNW-Banker in Genf, Zürich, Dubai, Riad, Singapur und London.",
    images: [`${SITE}/og.webp`],
  },
  robots: { index: true, follow: true },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  name: "Executive Partners",
  url: PAGE_URL,
  image: `${SITE}/og.webp`,
  logo: `${SITE}/icon.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "118 rue du Rhône",
    addressLocality: "Genf",
    postalCode: "1204",
    addressCountry: "CH",
  },
  areaServed: ["Schweiz", "Genf", "Zürich", "Dubai", "Singapur", "London"],
  industry: "Private Banking & Wealth Management Personalberatung",
  sameAs: ["https://www.linkedin.com/company/executive-partners", SITE],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: PAGE_URL },
  ],
};

export default function GermanHomePage() {
  return (
    <main className="relative min-h-screen text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 360px at 15% -10%, rgba(201,161,74,.22) 0%, rgba(201,161,74,0) 55%), radial-gradient(900px 360px at 110% 0%, rgba(245,231,192,.18) 0%, rgba(245,231,192,0) 60%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-6 py-16">

        {/* Hero */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A14A] mb-3">
            Private Banking · Executive Search · Genf
          </p>
          <h1 className="font-[var(--font-playfair)] text-4xl font-semibold text-white mb-4">
            Wo der richtige Banker auf die richtige Bank trifft
          </h1>
          <p className="text-lg text-white/75 max-w-2xl">
            Executive Partners ist eine auf Private Banking und Wealth Management spezialisierte Personalberatung mit Sitz in Genf. Wir vermitteln Senior Relationship Manager, Team Heads und Investment Advisors bei führenden Privatbanken in der Schweiz und an internationalen Wealth-Management-Standorten.
          </p>
        </div>

        {/* What we do */}
        <section className="mb-12 rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Was wir tun</h2>
          <p className="text-white/75 mb-4">
            Wir arbeiten ausschliesslich auf Senior-Level — Relationship Manager, Team Heads, Managing Directors und Investment Advisors mit nachweislich portablem Kundenbuch. Unser Ansatz ist vertraulich, diskret und auf die spezifischen Anforderungen jedes Marktes ausgerichtet.
          </p>
          <p className="text-white/75">
            Wir betreuen Mandate in Genf und Zürich sowie an internationalen Standorten wie Dubai, Riad, Singapur, Hongkong, London und New York. 200+ erfolgreiche Platzierungen. 98% Retention Rate.
          </p>
        </section>

        {/* Markets grid */}
        <section className="mb-12 rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Unsere Märkte</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-[#C9A14A] mb-2">Genf</h3>
              <p className="text-white/70 text-sm">
                Senior RMs, Team Heads und Investment Advisors bei Genfer Privatbanken und internationalen Wealth Managern. UHNW/HNW, Cross-Border und EAM-Mandate.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#C9A14A] mb-2">Zürich</h3>
              <p className="text-white/70 text-sm">
                DACH-fokussierte Senior Banker bei UBS, Julius Bär, ZKB und führenden Schweizer Privatbanken. Onshore und internationale UHNW-Mandate.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#C9A14A] mb-2">Internationale Standorte</h3>
              <p className="text-white/70 text-sm">
                Dubai, Riad, Singapur, Hongkong, London, New York, Miami, Paris, Mailand, Madrid und Lissabon — vertrauliche Senior-Mandate weltweit.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#C9A14A] mb-2">Personalberatung Banken</h3>
              <p className="text-white/70 text-sm">
                Spezialisierte Personalberatung für den Bankensektor. Ausschliesslich Senior-Level — keine Junior- oder Middle-Office-Positionen.
              </p>
            </div>
          </div>
        </section>

        {/* Link out to existing German content */}
        <section className="mb-12 rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Mehr erfahren</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/de/headhunter-genf"
              className="inline-flex rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Headhunter Genf &amp; Zürich →
            </Link>
            <Link
              href="/de/insights"
              className="inline-flex rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Private Wealth Pulse (Insights) →
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-[#C9A14A]/20 bg-[#C9A14A]/5 p-8">
          <h2 className="text-2xl font-semibold text-white mb-3">Vertrauliches Gespräch</h2>
          <p className="text-white/75 mb-6">
            Ob Sie einen Senior Banker suchen oder Ihren nächsten Karriereschritt planen — sprechen Sie vertraulich mit uns. Keine Verpflichtung.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/en/contact"
              className="inline-flex rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5D778] px-6 py-3 text-sm font-semibold text-[#0B0E13] hover:opacity-90"
            >
              Vertraulich Kontakt aufnehmen →
            </Link>
            <Link
              href="/en/jobs"
              className="inline-flex rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Aktuelle Mandate ansehen →
            </Link>
            <Link
              href="/en/apply"
              className="inline-flex rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Vertraulich bewerben →
            </Link>
          </div>
          <p className="mt-6 text-xs text-white/50">
            Unsere Website und Tools sind primär auf Englisch verfügbar. Für ein Gespräch auf Deutsch kontaktieren Sie uns direkt.
          </p>
        </section>

      </div>
    </main>
  );
}
