// app/de/headhunter-zuerich/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://www.execpartners.ch";
const PAGE_URL = `${SITE}/de/headhunter-zuerich`;

export const metadata: Metadata = {
  title: "Headhunter Zürich | Private Banking Personalberatung",
  description:
    "Executive Partners ist die spezialisierte Personalberatung für Private Banking in Zürich. Vertrauliche Vermittlung von Senior Relationship Managern, Team Heads und Investment Advisors bei UBS, Julius Bär, Vontobel und weiteren Schweizer Privatbanken.",
  alternates: {
    canonical: PAGE_URL,
    languages: { en: `${SITE}/en/private-banking-recruiter-zurich` },
  },
  openGraph: {
    title: "Headhunter Zürich | Private Banking Personalberatung",
    description:
      "Spezialisierte Personalberatung für Private Banking in Zürich. Senior RMs, Team Heads und UHNW-Banker bei UBS, Julius Bär, Vontobel und führenden Schweizer Privatbanken.",
    locale: "de_CH",
    type: "website",
    url: PAGE_URL,
    siteName: "Executive Partners",
    images: [{ url: `${SITE}/og.webp`, width: 1200, height: 630, alt: "Executive Partners" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Headhunter Zürich | Private Banking Personalberatung",
    description:
      "Spezialisierte Personalberatung für Private Banking in Zürich. Senior RMs, Team Heads und UHNW-Banker bei führenden Schweizer Privatbanken.",
    images: [`${SITE}/og.webp`],
  },
  robots: { index: true, follow: true },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was macht ein Headhunter für Private Banking in Zürich?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ein Headhunter für Private Banking in Zürich spezialisiert sich auf die vertrauliche Vermittlung von Senior Relationship Managern, Team Heads und Investment Advisors bei Privatbanken wie UBS, Julius Bär und Vontobel. Executive Partners arbeitet ausschliesslich auf Senior-Level.",
      },
    },
    {
      "@type": "Question",
      name: "Was verdient ein Senior Relationship Manager in Zürich?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Senior Relationship Manager in Zürich verdienen typischerweise CHF 270.000–590.000 Gesamtpaket, abhängig von AUM, Markt und Seniorität. Ultra-UHNW-Banker und Team Heads können CHF 600.000–1,2 Mio. inkl. Bonus erreichen.",
      },
    },
    {
      "@type": "Question",
      name: "Wie hat sich der Zürcher Private-Banking-Markt nach der UBS-Credit-Suisse-Integration verändert?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Integration hat zu erheblicher Bankerfluktuation in Zürich geführt. Viele erfahrene Relationship Manager mit DACH- und UHNW-Büchern wechseln zu Julius Bär, Vontobel, Pictet und internationalen Plattformen. Banken konkurrieren aktiv um Senior-Banker mit nachweislich portablem AUM.",
      },
    },
    {
      "@type": "Question",
      name: "Welches AUM brauche ich für eine Senior RM Stelle in Zürich?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die meisten Senior RM Mandate in Zürich erfordern ein portables AUM von mindestens CHF 100–200 Mio. für mittlere Positionen und CHF 500 Mio.+ für Team Head-Positionen, abhängig von Onshore- versus Cross-Border-Anteil.",
      },
    },
  ],
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  name: "Executive Partners – Headhunter Zürich",
  url: PAGE_URL,
  image: `${SITE}/og.webp`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "118 rue du Rhône",
    addressLocality: "Genf",
    postalCode: "1204",
    addressCountry: "CH",
  },
  areaServed: ["Zürich", "Schweiz", "DACH"],
  industry: "Private Banking & Wealth Management Personalberatung",
  sameAs: ["https://www.linkedin.com/company/executive-partners", SITE],
};

export default function HeadhunterZuerichPage() {
  return (
    <main className="relative min-h-screen text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />

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
            Personalberatung · Private Banking · Zürich
          </p>
          <h1 className="font-[var(--font-playfair)] text-4xl font-semibold text-white mb-4">
            Headhunter für Private Banking in Zürich
          </h1>
          <p className="text-lg text-white/75 max-w-2xl">
            Executive Partners ist die spezialisierte Personalberatung für Senior Private Banker in Zürich, dem grössten Finanzplatz der Schweiz. Vertrauliche Vermittlung von Relationship Managern, Team Heads und Investment Advisors bei UBS, Julius Bär, Vontobel, Pictet und führenden Boutique-Plattformen.
          </p>
        </div>

        {/* What we do */}
        <section className="mb-12 rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Was wir tun</h2>
          <p className="text-white/75 mb-4">
            Wir arbeiten ausschliesslich auf Senior-Level — Relationship Manager, Team Heads, Managing Directors und Investment Advisors mit nachweislich portablem Schweizer Onshore- oder DACH-Kundenbuch. Unser Ansatz ist vertraulich, diskret und auf die spezifischen Anforderungen des Zürcher Markts ausgerichtet.
          </p>
          <p className="text-white/75 mb-4">
            Die Integration von Credit Suisse in UBS hat den Zürcher Markt grundlegend verändert. Banken konkurrieren aktiv um Senior-Banker mit nachweislich portablem AUM, starker DACH-Abdeckung und solider Kredit- und Lombard-Expertise. Wir kennen diese Dynamik aus erster Hand.
          </p>
          <p className="text-white/75">200+ erfolgreiche Platzierungen. 98% Retention Rate.</p>
        </section>

        {/* Target keywords section */}
        <section className="mb-12 rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Unsere Spezialisierung in Zürich</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-[#C9A14A] mb-2">Schweizer Onshore-Banker</h3>
              <p className="text-white/70 text-sm">Senior RMs mit nachweislich portablem Schweizer Kundenbuch. Fokus auf Beratungsqualität, Lombard- und Kreditnutzung statt reinem AUM-Volumen.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#C9A14A] mb-2">DACH &amp; Cross-Border</h3>
              <p className="text-white/70 text-sm">Banker mit deutschsprachiger Kundenbasis aus Deutschland, Österreich und Osteuropa. Deutsche Sprachkompetenz und Cross-Border-Compliance-Kenntnis vorausgesetzt.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#C9A14A] mb-2">Team Heads &amp; Market Leader</h3>
              <p className="text-white/70 text-sm">Führungspersonen mit CHF 500 Mio.+ portablem AUM, die Teams aufbauen oder bestehende Desks in Zürich verstärken können.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#C9A14A] mb-2">UBS-Credit-Suisse-Integration</h3>
              <p className="text-white/70 text-sm">Wir beraten erfahrene Banker, die nach der Integration ihre nächste Plattform evaluieren — diskret, faktenbasiert und ohne Verpflichtung.</p>
            </div>
          </div>
        </section>

        {/* Comp snapshot */}
        <section className="mb-12 rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Vergütungsrichtwerte Zürich 2025–2026</h2>
          <p className="text-white/70 text-sm mb-4">
            Senior RM (10–20 Jahre Erfahrung): CHF 270.000–590.000 Gesamtpaket. Ultra-UHNW-Banker: CHF 470.000–950.000+. Team Head: CHF 580.000–1,2 Mio.+. Genaue Werte hängen von Plattform, Onshore-/Cross-Border-Mix und nachweislich portablem AUM ab.
          </p>
          <Link href="/en/private-banking-recruiter-zurich" className="text-sm text-[#C9A14A] hover:underline">
            Vollständige Vergütungstabelle (Englisch) →
          </Link>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-[#C9A14A]/20 bg-[#C9A14A]/5 p-8">
          <h2 className="text-2xl font-semibold text-white mb-3">Vertrauliches Gespräch</h2>
          <p className="text-white/75 mb-6">
            Ob Sie einen Senior Banker für Zürich suchen oder Ihren nächsten Karriereschritt planen — sprechen Sie vertraulich mit uns. Keine Verpflichtung.
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
              href="/de/headhunter-genf"
              className="inline-flex rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Headhunter Genf →
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
