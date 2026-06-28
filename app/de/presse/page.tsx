import { Metadata } from "next";

export const metadata: Metadata = {
  title: "In den Medien | Executive Partners",
  description: "Executive Partners wird 2026 viermal in Finews.ch zitiert — zu Talentmobilitaet, Konsolidierung und der Zukunft des Relationship Managers.",
  alternates: { canonical: "https://execpartners.ch/de/presse", languages: { de: "https://execpartners.ch/de/presse", en: "https://execpartners.ch/en/press" } },
  openGraph: { title: "In den Medien | Executive Partners", description: "Vier Finews-Artikel 2026 zum Schweizer Private Banking.", url: "https://execpartners.ch/de/presse" },
};

const items = [
  { date: "23. Juni 2026", headline: "Weshalb Banker nur einen Bruchteil ihrer Kunden mitnehmen", quote: "Ein noch so gutes Kundenbuch ist kein Vermoegenswert, sondern eine Hypothese. Wer diese wie eine Tatsache behandelt, bezahlt den Preis.", url: "https://www.finews.ch/news/banken/72635-swiss-banking-relationship-manager-kunden-wechsel-bluff-gil-m-chalem-executive-partners-finanzplatz-schweiz-credit-suisse" },
  { date: "20. Mai 2026",  headline: "Privatbanken: Das muessen Berater inskuenftig bieten", quote: "Der Relationship Manager von 2030 ist nicht derjenige mit dem groessten Kundenbuch. Am meisten zaehlen wird der fachlich Vielseitigste.", url: "https://www.finews.ch/news/banken/72277-privatbanken-kundenberater-empathie-ki-ai-swissbanking-finanzplatz-schweiz-privatebanking-switzerland" },
  { date: "12. Mai 2026",  headline: "Private Banking: Weshalb die 10 Milliarden-Frage nur die halbe Wahrheit ist", quote: "Groesse ist nicht die bindende Einschraenkung. Wenn eine Bank sich klar committet, ist nicht die Groesse, sondern deren Identitaet entscheidend.", url: "https://www.finews.ch/news/banken/72188-swissbanking-privatebanking-gil-m-chalem-headhunter-assetsundermanagement-finanzplatz-schweiz-max-fischer" },
  { date: "7. Mai 2026",   headline: "Kommt es zum Ausverkauf bei den Schweizer Privatbanken?", quote: "Die Konsolidierungszahlen sind real. Die Schlagzeilen stimmen. Aber die Interpretation nicht.", url: "https://www.finews.ch/news/banken/72130-swiss-private-banking-swissbanking-kleinbanken-finanzplatz-schweiz-m-a-eigenkapitalrendite-konsolidierung-gil-m-chalem" },
];

export default function PresseDePage() {
  return (
    <main className="min-h-screen bg-[#0B0F1A] text-white">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(900px 500px at 50% -10%, rgba(201,161,74,.18) 0%, transparent 65%)" }} />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-500">Bekannt aus</p>
          <div className="mb-5 inline-flex items-baseline">
            <span className="text-6xl font-black tracking-tight text-white">finews</span>
            <span className="text-6xl font-black tracking-tight text-amber-400">.ch</span>
          </div>
          <p className="mx-auto max-w-lg text-base leading-relaxed text-slate-400">Das Leitmedium des Schweizer Finanzplatzes. Wenn Finews einen Bodenblick auf Talentbewegungen in Genf und Zuerich braucht, wenden sie sich an Executive Partners.</p>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/8 px-5 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-medium text-amber-300">4 Artikel &nbsp;·&nbsp; Mai – Juni 2026</span>
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
              &bdquo;{item.quote}&ldquo;
            </blockquote>
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-500 hover:text-amber-300 transition-colors">
              Ganzen Artikel auf Finews lesen <span aria-hidden="true">&#8594;</span>
            </a>
          </article>
        ))}
      </section>

      {/* SUBSCRIBE */}
      <section className="mx-auto max-w-3xl px-6 pb-24">
        <div className="rounded-2xl border border-white/10 bg-white/4 p-8 sm:p-12">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-500">Private Wealth Pulse</p>
          <h2 className="mb-3 font-serif text-2xl font-semibold text-white sm:text-3xl">Analysen, die die Branche liest.</h2>
          <p className="mb-7 max-w-md text-sm leading-relaxed text-slate-400">Unsere Marktanalysen erscheinen in Finews und werden von fuehrenden Praktikern zitiert. Schliessen Sie sich 2.300+ Abonnenten an — kostenlos, jede Woche.</p>
          <a href="https://execpartners.ch/subscribe" className="inline-block rounded-full bg-[#F5D778] px-7 py-3 text-sm font-semibold text-[#050814] hover:opacity-90 transition-opacity">
            Private Wealth Pulse abonnieren
          </a>
        </div>
      </section>

    </main>
  );
}