import type { Metadata } from "next";
import Link from "next/link";
const SITE = "https://www.execpartners.ch";
export const metadata: Metadata = {
  title: { absolute: "Privatbank Zürich — Gehälter, Recruitment und Mandate 2026 | Executive Partners" },
  description: "Zürich ist der grösste Finanzplatz der Schweiz mit über CHF 3200 Milliarden verwaltetem Vermögen. Gehalts-Benchmarks 2026 für Senior Relationship Manager in Zürich. Executive Partners vermittelt Private Banker in Zürich vertraulich und auf Senior-Niveau.",
  alternates: {
    canonical: `${SITE}/de/privatbanken-zuerich`,
    languages: {
      en: `${SITE}/en/markets/zurich`,
      fr: `${SITE}/fr/marches/zurich`,
      "x-default": `${SITE}/en/markets/zurich`,
    },
  },
  openGraph: {
    title: "Privatbank Zürich — Gehälter und Recruitment 2026",
    description: "Gehalts-Benchmarks 2026 und aktive Mandate in der Zürcher Privatbank.",
    url: `${SITE}/de/privatbanken-zuerich`,
    images: [{ url: `${SITE}/og.webp` }],
  },
  robots: { index: true, follow: true },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was verdient ein Senior Relationship Manager in Zürich 2026?",
      acceptedAnswer: { "@type": "Answer", text: "Ein Senior Relationship Manager in Zürich erhält ein Gesamtpaket von CHF 180000 bis CHF 350000, abhängig von AUM und Seniorität. Zürich liegt typischerweise 10-15% unter Genf bei vergleichbarer Seniorität." },
    },
    {
      "@type": "Question",
      name: "Was ist der Unterschied zwischen Zürich und Genf für eine Karriere in der Privatbank?",
      acceptedAnswer: { "@type": "Answer", text: "Zürich dominiert das DACH-Onshore-Geschäft mit stabilen Kundenbeziehungen. Genf ist stärker auf internationales Cross-Border-Geschäft ausgerichtet. Zürich bietet mehr Stabilität, Genf höheres variables Einkommenspotenzial." },
    },
    {
      "@type": "Question",
      name: "Ist Deutsch zwingend für eine Stelle in der Zürcher Privatbank?",
      acceptedAnswer: { "@type": "Answer", text: "Deutsch ist für DACH-Onshore-Positionen unerlässlich. Englisch ist universell. Für internationale Desks hat die Sprache des Zielmarktes Vorrang." },
    },
    {
      "@type": "Question",
      name: "Welche Banken rekrutieren Senior Relationship Manager in Zürich?",
      acceptedAnswer: { "@type": "Answer", text: "Die wichtigsten Arbeitgeber sind UBS, Julius Baer, Vontobel, EFG International, Zürcher Kantonalbank (ZKB), Lombard Odier, Pictet, LGT Bank und J. Safra Sarasin." },
    },
  ],
};

const salaryData = [
  { role: "RM / Senior Berater", base: "CHF 140-190K", bonus: "35-70 %", note: "-" },
  { role: "Senior RM / Director", base: "CHF 190-260K", bonus: "50-100 %", note: "Internationale UHNWI-Mandate nahe Genfer Niveau." },
  { role: "Team Head / Market Head", base: "CHF 230-320K", bonus: "60-120 %", note: "-" },
  { role: "MD / Regional Head", base: "CHF 300-480K+", bonus: "75-140 %", note: "Beteiligungsstrukturen bei Boutiquen möglich." },
];

export default function DePrivatbankenZuerichPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="min-h-screen bg-[#0B0E13] text-white py-20 px-4">
        <div className="mx-auto max-w-3xl space-y-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#C9A14A] mb-4">Privatbank · Zürich · Schweiz</p>
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight mb-6">Privatbank Zürich — Gehälter, Markt und Recruitment 2026</h1>
            <p className="text-white/80 text-lg leading-relaxed">Zürich ist der grösste Finanzplatz der Schweiz mit über CHF 3200 Milliarden verwaltetem Vermögen in einem einzigen Kanton. Der Zürcher Markt konzentriert Universalbanken, unabhängige Privatbanken und ein dichtes EAM-Ökosystem, das sich auf das DACH-Onshore-Geschäft und internationale UHNWI-Segmente ausrichtet.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/en/apply" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-[#C9A14A] text-black hover:opacity-90 transition">Vertraulich bewerben</Link>
            <Link href="/en/jobs" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold border border-white/20 text-white hover:bg-white/10 transition">Aktive Mandate ansehen</Link>
          </div>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Gehalts-Benchmarks — Privatbank Zürich 2026</h2>
            <p className="text-white/60 text-sm mb-5">Zürich liegt typischerweise 10-15% unter Genf bei vergleichbarer Seniorität. Internationale UHNWI-Mandate und Cross-Border-Geschäft gleichen diesen Unterschied teilweise aus.</p>
            <div className="overflow-x-auto rounded-xl ring-1 ring-white/10">
              <table className="min-w-full text-sm">
                <thead className="bg-white/5"><tr><th className="px-4 py-3 text-left font-medium">Stufe</th><th className="px-4 py-3 text-left font-medium">Fixgehalt</th><th className="px-4 py-3 text-left font-medium">Typischer Bonus</th><th className="px-4 py-3 text-left font-medium">Hinweis</th></tr></thead>
                <tbody className="divide-y divide-white/10">
                  {salaryData.map((row) => (<tr key={row.role} className="hover:bg-white/5"><td className="px-4 py-3 font-medium">{row.role}</td><td className="px-4 py-3">{row.base}</td><td className="px-4 py-3">{row.bonus}</td><td className="px-4 py-3 text-white/50 text-xs">{row.note}</td></tr>))}
                </tbody>
              </table>
            </div>
            <p className="text-white/40 text-xs mt-3">Richtungsweisende Benchmarks 2025-2026. Nur zur Orientierung.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Zürich vs. Genf — die wichtigsten Unterschiede</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[{ city: "Zürich", points: ["Dominierender DACH-Onshore-Markt", "Stabile Kundenbeziehungen, geringere Mobilität", "Moderateres Variables, höhere Jobsicherheit", "UBS, Julius Baer, Vontobel, ZKB", "Deutsch für Onshore-Positionen erforderlich"] }, { city: "Genf", points: ["Grösster internationaler Offshore-Markt", "Cross-Border AUM und internationale UHNWI", "Höheres Variables, portableres Buch", "UBP, Pictet, Lombard Odier, Julius Baer", "Französisch und Englisch unerlässlich"] }].map(({ city, points }) => (
                <div key={city} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <p className="text-[#C9A14A] font-semibold mb-3">{city}</p>
                  <ul className="space-y-1.5">{points.map((p) => (<li key={p} className="text-white/60 text-sm flex gap-2"><span className="text-[#C9A14A] shrink-0">→</span><span>{p}</span></li>))}</ul>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Wichtigste Privatbanken in Zürich</h2>
            <div className="flex flex-wrap gap-2">
              {["UBS", "Julius Baer", "Vontobel", "EFG International", "Zürcher Kantonalbank (ZKB)", "Lombard Odier (Zürich)", "Pictet (Zürich)", "LGT Bank", "J. Safra Sarasin", "Liechtensteinische Landesbank", "Mirabaud (Zürich)"].map((bank) => (
                <span key={bank} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">{bank}</span>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Marktlage 2026 — Was gesucht wird</h2>
            <ul className="space-y-3">
              {["Starke Nachfrage nach Senior RMs mit deutschsprachigen europäischen Kundenbüchern", "UBS-Integration nach Credit Suisse schafft laterale Bewegung im gesamten Markt", "Julius Baer, Vontobel und EFG rekrutieren selektiv auf Director- und MD-Ebene", "Grosse Nachfrage nach Bankern mit Osteuropa-, Nahost- und APAC-Abdeckung", "Unabhängige Asset Manager absorbieren verdrängtes Credit-Suisse-Talent", "Verschärfte Compliance- und Onboarding-Anforderungen verlängern Einstellungsfristen"].map((item) => (
                <li key={item} className="flex gap-3 text-white/70 text-sm"><span className="text-[#C9A14A] shrink-0 mt-0.5">→</span><span>{item}</span></li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-5">Häufig gestellte Fragen</h2>
            <div className="space-y-4">
              {[{ q: "Was verdient ein Senior RM in Zürich 2026?", a: "Zwischen CHF 180000 und CHF 350000 im Gesamtpaket, abhängig von AUM und Seniorität. Zürich liegt 10-15% unter Genf bei vergleichbarer Senioritätsstufe." }, { q: "Ist Deutsch zwingend erforderlich?", a: "Für DACH-Onshore-Positionen unbedingt. Englisch ist universell. Für internationale Desks hat die Sprache des Zielmarktes Vorrang vor Deutsch." }, { q: "Zürich oder Genf für einen Private Banker?", a: "Zürich für Stabilität und den DACH-Markt. Genf für internationales Cross-Border-Potenzial und höhere variable Pakete. Die Wahl hängt von Ihrem Profil und Ihrer Kundschaft ab." }, { q: "Wie läuft die Rekrutierung in der Zürcher Privatbank ab?", a: "Executive Partners arbeitet ausschliesslich auf Senior-Ebene, vertraulich und auf Named-Mandate-Basis. Wir analysieren die Portabilität Ihres Buchs, benchmarken Ihren Marktwert und begleiten Sie durch den gesamten Prozess bis zur Unterschrift." }].map(({ q, a }) => (
                <div key={q} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <p className="font-semibold text-white mb-2">{q}</p>
                  <p className="text-white/60 text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>
          <hr className="border-white/10" />
          <div className="flex flex-wrap gap-4">
            <Link href="/en/markets/zurich" className="text-sm text-white/60 hover:text-white underline underline-offset-4">English version</Link>
            <Link href="/fr/marches/zurich" className="text-sm text-white/60 hover:text-white underline underline-offset-4">Version française</Link>
            <Link href="/en/markets/geneva" className="text-sm text-white/60 hover:text-white underline underline-offset-4">Genfer Markt</Link>
            <Link href="/en/jobs" className="text-sm text-white/60 hover:text-white underline underline-offset-4">Aktive Mandate Zürich</Link>
            <Link href="/en/candidates" className="text-sm text-white/60 hover:text-white underline underline-offset-4">Für Kandidaten</Link>
          </div>
        </div>
      </main>
    </>
  );
}
