import { Metadata } from "next";

export const metadata: Metadata = {
  title: "In the Press | Executive Partners",
  description:
    "Executive Partners features in Finews, the leading Swiss financial media. Independent validation of our private banking intelligence.",
  alternates: {
    canonical: "https://execpartners.ch/en/press",
  },
  openGraph: {
    title: "In the Press | Executive Partners",
    description:
      "Our recruitment intelligence cited in Finews and leading Swiss financial media.",
    url: "https://execpartners.ch/en/press",
  },
};

const pressItems = [
  {
    outlet: "Finews.ch",
    outletUrl: "https://www.finews.ch",
    headline: "The Relationship Manager of 2030: Empathy, AI and the New Bar for Private Bankers",
    url: "https://www.finews.ch/news/banken/72277-privatbanken-kundenberater-empathie-ki-ai-swissbanking-finanzplatz-schweiz-privatebanking-switzerland",
    date: "20 May 2026",
    quote: "The RM of 2030 is not the one with the biggest book. What will count most is the one who can orchestrate a client's entire financial situation.",
  },
  {
    outlet: "Finews.ch",
    outletUrl: "https://www.finews.ch",
    headline: "Private Banking: Why the CHF 10 Billion Question Is Only Half the Truth",
    url: "https://www.finews.ch/news/banken/72188-swissbanking-privatebanking-gil-m-chalem-headhunter-assetsundermanagement-finanzplatz-schweiz-max-fischer",
    date: "12 May 2026",
    quote: "Size is not the binding constraint. When a bank commits clearly to an identity, it is that identity, not its AUM, that determines survival.",
  },
  {
    outlet: "Finews.ch",
    outletUrl: "https://www.finews.ch",
    headline: "Is a Sell-Off Coming for Swiss Private Banks?",
    url: "https://www.finews.ch/news/banken/72130-swiss-private-banking-swissbanking-kleinbanken-finanzplatz-schweiz-m-a-eigenkapitalrendite-konsolidierung-gil-m-chalem",
    date: "7 May 2026",
    quote: "The consolidation numbers are real. The headlines are accurate. But the interpretation is not.",
  },
];

export default function PressPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Executive Partners — Press Coverage",
    url: "https://execpartners.ch/en/press",
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
            Media Coverage
          </p>
          <h1 className="text-4xl font-serif font-semibold text-slate-900 mb-4">
            As Seen In
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Our market intelligence on Swiss private banking is relied upon by the
            industry leading financial media. When Finews needs a ground-level view
            of talent movement in Geneva and Zurich, they call Executive Partners.
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
            Intelligence the industry reads.
          </h2>
          <p className="text-slate-600 mb-5 text-sm">
            Our market analysis is featured in Finews and cited by senior
            practitioners across Swiss private banking. Join 2,300+ subscribers
            who receive it first.
          </p>
          <a
            href="https://execpartners.ch/subscribe"
            className="inline-block bg-amber-700 text-white text-sm font-semibold px-6 py-3 rounded hover:bg-amber-800 transition-colors"
          >
            Subscribe to Private Wealth Pulse
          </a>
        </div>
      </main>
    </>
  );
}
