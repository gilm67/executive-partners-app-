// app/de/headhunter-genf/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://www.execpartners.ch";

export const metadata: Metadata = {
  title: "Headhunter Genf & Zürich | Private Banking | Executive Partners",
  description:
    "Executive Partners ist der führende Headhunter für Private Banking in Genf und Zürich. Personalberatung für Senior Relationship Manager, Team Heads und Investment Advisors. Vertraulich. Senior-Level only.",
  alternates: {
    canonical: `${SITE}/de/headhunter-genf`,
    languages: { en: `${SITE}/en/private-banking-headhunter-geneva` },
  },
  openGraph: {
    title: "Headhunter Genf & Zürich | Private Banking | Executive Partners",
    description: "Führende Personalberatung für Private Banking in der Schweiz. Senior RMs, Team Heads und UHNW-Banker in Genf, Zürich, Dubai und Singapur.",
    locale: "de_CH",
    type: "website",
    siteName: "Executive Partners",
    images: [{ url: `${SITE}/og.webp` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Headhunter Genf & Zürich | Private Banking | Executive Partners",
    description: "Führende Personalberatung für Private Banking in der Schweiz. Senior RMs, Team Heads und UHNW-Banker in Genf, Zürich, Dubai und Singapur.",
    images: ["https://www.execpartners.ch/og.webp"],
  },
  robots: { index: true, follow: true },
};

export default function HeadhunterGenfPage() {
  return (
    <main className="relative min-h-screen text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Was macht ein Headhunter für Private Banking in Genf?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Ein Headhunter für Private Banking in Genf spezialisiert sich auf die vertrauliche Vermittlung von Senior Relationship Managern, Team Heads und Investment Advisors bei Privatbanken und Vermögensverwaltern. Executive Partners arbeitet ausschliesslich auf Senior-Level."
                }
              },
              {
                "@type": "Question",
                name: "Was verdient ein Senior Relationship Manager in Genf?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Senior Relationship Manager in Genf verdienen typischerweise CHF 200.000–400.000+ Gesamtpaket, abhängig von AUM, Markt und Seniorität. Team Heads und Managing Directors können CHF 500.000+ inkl. Bonus erreichen."
                }
              },
              {
                "@type": "Question",
                name: "Wie finde ich vertrauliche Private Banking Stellen in Zürich?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Die meisten Senior-Stellen im Private Banking in Zürich werden vertraulich über spezialisierte Personalberatungen besetzt. Executive Partners vermittelt Senior RMs und Team Heads bei führenden Schweizer Privatbanken wie UBS, Julius Bär und ZKB."
                }
              },
              {
                "@type": "Question",
                name: "Welches AUM brauche ich für eine Senior RM Stelle in der Schweiz?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Die meisten Senior RM Mandate in der Schweiz erfordern ein portables AUM von mindestens CHF 50–100 Mio. für mittlere Positionen und CHF 150 Mio.+ für Director- und Team Head-Positionen."
                }
              },
            ]
          })
        }}
      />

      <div className="mx-auto max-w-4xl px-6 py-16">

        {/* Hero */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A14A] mb-3">
            Personalberatung · Private Banking · Schweiz
          </p>
          <h1 className="font-[var(--font-playfair)] text-4xl font-semibold text-white mb-4">
            Headhunter für Private Banking in Genf & Zürich
          </h1>
          <p className="text-lg text-white/75 max-w-2xl">
            Executive Partners ist die führende Personalberatung für Senior Private Banker in der Schweiz. Vertrauliche Vermittlung von Relationship Managern, Team Heads und Investment Advisors bei Privatbanken in Genf, Zürich, Dubai, Singapur und London.
          </p>
        </div>

        {/* What we do */}
        <section className="mb-12 rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Was wir tun</h2>
          <p className="text-white/75 mb-4">
            Executive Partners ist eine auf Private Banking und Wealth Management spezialisierte Executive-Search-Boutique mit Sitz in Genf. Wir vermitteln ausschliesslich auf Senior-Level — Senior Relationship Manager, Team Heads, Managing Directors und Investment Advisors mit portablem Kundenbuch.
          </p>
          <p className="text-white/75 mb-4">
            Unser Ansatz ist vertraulich, diskret und auf die spezifischen Anforderungen des Schweizer Private-Banking-Markts ausgerichtet. Wir arbeiten mit führenden Privatbanken in Genf und Zürich sowie mit internationalen Wealth-Management-Plattformen in Dubai, Singapur, London und Hongkong.
          </p>
          <p className="text-white/75">
            200+ erfolgreiche Platzierungen. 98% Retention Rate.
          </p>
        </section>

        {/* Target keywords section */}
        <section className="mb-12 rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Unsere Märkte</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-[#C9A14A] mb-2">Headhunter Genf</h3>
              <p className="text-white/70 text-sm">Senior RMs, Team Heads und Investment Advisors bei Genfer Privatbanken und internationalen Wealth Managern. UHNW/HNW, Cross-Border und EAM-Mandate.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#C9A14A] mb-2">Headhunter Zürich</h3>
              <p className="text-white/70 text-sm">DACH-fokussierte Senior Banker bei UBS, Julius Bär, ZKB und führenden Schweizer Privatbanken. Onshore und internationale UHNW-Mandate.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#C9A14A] mb-2">Personalberatung Banken</h3>
              <p className="text-white/70 text-sm">Spezialisierte Personalberatung für den Schweizer Bankensektor. Ausschliesslich Senior-Level — keine Junior- oder Middle-Office-Positionen.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#C9A14A] mb-2">Executive Search Banken Schweiz</h3>
              <p className="text-white/70 text-sm">Vertrauliche Suche und Direktansprache von Top-Talenten im Schweizer Private Banking. Diskret, präzise, Senior-Level only.</p>
            </div>
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
              href="/en/portability"
              className="inline-flex rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Portabilität prüfen →
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
