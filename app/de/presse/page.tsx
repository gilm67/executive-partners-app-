import { Metadata } from "next";

export const metadata: Metadata = {
  title: "In den Medien | Executive Partners",
  description:
    "Executive Partners wird in Finews, dem fuehrenden Schweizer Finanzmedium, und weiteren Fachpublikationen zitiert. Unabhaengige Bestaetigung unserer Private-Banking-Expertise.",
  alternates: {
    canonical: "https://execpartners.ch/de/presse",
    languages: {
      "en": "https://execpartners.ch/en/press",
      "de": "https://execpartners.ch/de/presse",
    },
  },
  openGraph: {
    title: "In den Medien | Executive Partners",
    description:
      "Unsere Marktanalysen werden in Finews und fuehrenden Schweizer Finanzmedien zitiert.",
    url: "https://execpartners.ch/de/presse",
  },
};

const pressItems = [
  {
    outlet: "Finews.ch",
    outletUrl: "https://www.finews.ch",
    headline: "Privatbanken: Das muessen Berater iskuenftig bieten",
    url: "https://www.finews.ch/news/banken/72277-privatbanken-kundenberater-empathie-ki-ai-swissbanking-finanzplatz-schweiz-privatebanking-switzerland",
    date: "20. Mai 2026",
    quote:
      "Der Relationship Manager von 2030 ist nicht derjenige mit dem groessten Kundenbuch. Am meisten zaehlen wird der fachlich Vielseitigste.",
  },
  {
    outlet: "Finews.ch",
    outletUrl: "https://www.finews.ch",
    headline: "Private Banking: Weshalb die 10 Milliarden-Frage nur die halbe Wahrheit ist",
    url: "https://www.finews.ch/news/banken/72188-swissbanking-privatebanking-gil-m-chalem-headhunter-assetsundermanagement-finanzplatz-schweiz-max-fischer",
    date: "12. Mai 2026",
    quote:
      "Groesse ist nicht die bindende Einschraenkung. Wenn eine Bank sich klar committet, ist nicht die Groesse, sondern deren Identitaet entscheidend.",
  },
  {
    outlet: "Finews.ch",
    outletUrl: "https://www.finews.ch",
    headline: "Kommt es zum Ausverkauf bei den Schweizer Privatbanken?",
    url: "https://www.finews.ch/news/banken/72130-swiss-private-banking-swissbanking-kleinbanken-finanzplatz-schweiz-m-a-eigenkapitalrendite-konsolidierung-gil-m-chalem",
    date: "7. Mai 2026",
    quote:
      "Die Konsolidierungszahlen sind real. Die Schlagzeilen stimmen. Aber die Interpretation nicht.",
  },
];

export default function PresseDePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Executive Partners - Medienpraesenz",
    url: "https://execpartners.ch/de/presse",
    inLanguage: "de",
    publisher: {
      "@type": "Organization",
      name: "Executive Partners",
      url: "https://execpartners.ch",
    },
    hasPart: pressItems.map((item) => ({
      "@type": "Article",
      name: item.headline,
      url: item.url,
      datePublished: item.date,
      inLanguage: "de",
      publisher: {
        "@type": "Organization",
        name: item.outlet,
        url: item.outletUrl,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-700 mb-4">
            Medienpraesenz
          </p>
          <h1 className="text-4xl font-serif font-semibold text-slate-900 mb-4">
            Bekannt aus
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Unsere Markteinschaetzungen zum Schweizer Private Banking werden vom
            fuehrenden Finanzmedium der Branche genutzt. Wenn Finews einen
            Bodenblick auf die Talentbewegungen in Genf und Zuerich braucht,
            wenden sie sich an Executive Partners.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {pressItems.map((item, i) => (
            <article key={i} className="py-8 flex gap-6 items-start">
              <div className="flex-shrink-0 w-24 text-right">
                <span className="text-xs text-slate-400 font-medium">{item.outlet}</span>
                <span className="block text-xs text-slate-300 mt-1">{item.date}</span>
              </div>
              <div className="flex-1">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-slate-800 hover:text-amber-700 transition-colors"
                >
                  {item.headline}
                </a>
                {item.quote && (
                  <blockquote className="mt-3 pl-4 border-l-2 border-amber-600 text-slate-500 text-sm italic">
                    {item.quote}
                  </blockquote>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 p-8 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-700 mb-2">
            Private Wealth Pulse
          </p>
          <h2 className="text-2xl font-serif text-slate-800 mb-3">
            Analysen, die die Branche liest.
          </h2>
          <p className="text-slate-600 mb-5 text-sm">
            Unsere Marktanalysen erscheinen in Finews und werden von fuehrenden
            Praktikern des Schweizer Private Banking zitiert. Schliessen Sie sich
            2.300+ Abonnenten an, die sie als Erste erhalten.
          </p>
          <a
            href="https://execpartners.ch/subscribe"
            className="inline-block bg-amber-700 text-white text-sm font-semibold px-6 py-3 rounded hover:bg-amber-800 transition-colors"
          >
            Private Wealth Pulse abonnieren
          </a>
        </div>
      </main>
    </>
  );
}
