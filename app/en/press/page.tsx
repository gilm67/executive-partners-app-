import { Metadata } from "next";

export const metadata: Metadata = {
  title: "In the Press | Executive Partners",
  description: "Executive Partners is cited by Finews.ch, Switzerland's leading financial media, four times in 2026 — on talent mobility, consolidation, and the future of private banking.",
  alternates: { canonical: "https://execpartners.ch/en/press", languages: { en: "https://execpartners.ch/en/press", de: "https://execpartners.ch/de/presse" } },
  openGraph: { title: "In the Press | Executive Partners", description: "Four Finews features in 2026 on Swiss private banking talent and markets.", url: "https://execpartners.ch/en/press" },
};

const items = [
  { date: "23 June 2026", headline: "Why Bankers Take Only a Fraction of Their Clients When They Move", quote: "A client book, however impressive, is not an asset — it is a hypothesis. Whoever treats it as a fact pays the price.", url: "https://www.finews.ch/news/banken/72635-swiss-banking-relationship-manager-kunden-wechsel-bluff-gil-m-chalem-executive-partners-finanzplatz-schweiz-credit-suisse" },
  { date: "20 May 2026",  headline: "The Relationship Manager of 2030: Empathy, AI and the New Bar for Private Bankers", quote: "The RM of 2030 is not the one with the biggest book. What will count most is the one who can orchestrate a client's entire financial situation.", url: "https://www.finews.ch/news/banken/72277-privatbanken-kundenberater-empathie-ki-ai-swissbanking-finanzplatz-schweiz-privatebanking-switzerland" },
  { date: "12 May 2026",  headline: "Private Banking: Why the CHF 10 Billion Question Is Only Half the Truth", quote: "Size is not the binding constraint. When a bank commits clearly to an identity, it is that identity, not its AUM, that determines survival.", url: "https://www.finews.ch/news/banken/72188-swissbanking-privatebanking-gil-m-chalem-headhunter-assetsundermanagement-finanzplatz-schweiz-max-fischer" },
  { date: "7 May 2026",   headline: "Is a Sell-Off Coming for Swiss Private Banks?", quote: "The consolidation numbers are real. The headlines are accurate. But the interpretation is not.", url: "https://www.finews.ch/news/banken/72130-swiss-private-banking-swissbanking-kleinbanken-finanzplatz-schweiz-m-a-eigenkapitalrendite-konsolidierung-gil-m-chalem" },
];

export default function PressPage() {
  return (
    <main className="min-h-screen bg-[#0B0F1A] text-white">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(900px 500px at 50% -10%, rgba(201,161,74,.18) 0%, transparent 65%)" }} />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-500">As featured in</p>
          <div className="mb-5 inline-flex items-baseline">
            <span className="text-6xl font-black tracking-tight text-white">finews</span>
            <span className="text-6xl font-black tracking-tight text-amber-400">.ch</span>
          </div>
          <p className="mx-auto max-w-lg text-base leading-relaxed text-slate-400">Switzerland's paper of record for private banking. When Finews needs ground-level intelligence on talent and markets in Geneva and Zurich, they call Executive Partners.</p>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/8 px-5 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-medium text-amber-300">4 articles &nbsp;·&nbsp; May – June 2026</span>
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        {items.map((item, i) => (
          <article key={i} className="flex flex-col gap-5 border-b border-white/8 py-12 last:border-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold text-amber-400">{item.date}</span>
              <span className="text-[11px] font-medium uppercase tracking-widest text-slate-600">Finews.ch</span>
            </div>
            <h2 className="text-xl font-semibold leading-snug text-white sm:text-2xl">
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors duration-150">
                {item.headline}
              </a>
            </h2>
            <blockquote className="border-l-2 border-amber-500/40 pl-5 text-sm italic leading-relaxed text-slate-400">
              &ldquo;{item.quote}&rdquo;
            </blockquote>
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-500 hover:text-amber-300 transition-colors">
              Read full article on Finews <span aria-hidden="true">&#8594;</span>
            </a>
          </article>
        ))}
      </section>

      {/* SUBSCRIBE */}
      <section className="mx-auto max-w-3xl px-6 pb-24">
        <div className="rounded-2xl border border-white/10 bg-white/4 p-8 sm:p-12">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-500">Private Wealth Pulse</p>
          <h2 className="mb-3 font-serif text-2xl font-semibold text-white sm:text-3xl">Intelligence the industry reads.</h2>
          <p className="mb-7 max-w-md text-sm leading-relaxed text-slate-400">Our analysis is cited in Finews and read by senior practitioners across Swiss private banking. Join 2,300+ subscribers — free, every week.</p>
          <a href="https://execpartners.ch/subscribe" className="inline-block rounded-full bg-[#F5D778] px-7 py-3 text-sm font-semibold text-[#050814] hover:opacity-90 transition-opacity">
            Subscribe to Private Wealth Pulse
          </a>
        </div>
      </section>

    </main>
  );
}