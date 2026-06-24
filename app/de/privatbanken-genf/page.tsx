import type { Metadata } from "next";
import Link from "next/link";
const SITE = "https://www.execpartners.ch";
export const metadata: Metadata = {
  title: { absolute: "Privatbank Genf — Gehälter, Recruitment und Mandate 2026 | Executive Partners" },
  description: "Genf ist das wichtigste internationale Privatbankzentrum der Welt. Gehalts-Benchmarks 2026 für Senior Relationship Manager in Genf. Executive Partners vermittelt Private Banker in Genf vertraulich und auf Senior-Niveau.",
  alternates: {
    canonical: `${SITE}/de/privatbanken-genf`,
    languages: {
      en: `${SITE}/en/markets/geneva`,
      fr: `${SITE}/fr/marches/geneve`,
      "x-default": `${SITE}/en/markets/geneva`,
    },
  },
  openGraph: {
    title: "Privatbank Genf — Gehälter und Recruitment 2026",
    description: "Gehalts-Benchmarks 2026 und aktive Mandate in der Genfer Privatbank.",
    url: `${SITE}/de/privatbanken-genf`,
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
      name: "Was verdient ein Senior Relationship Manager in Genf 2026?",
      acceptedAnswer: { "@type": "Answer", text: "Ein Senior Relationship Manager in Genf erhält ein Gesamtpaket von CHF 200000 bis CHF 400000, abhängig von AUM, Portabilität und Seniorität. Genf liegt typischerweise 10-15% über Zürich bei vergleichbarer Seniorität." },
    },
    {
      "@type": "Question",
      name: "Welche Sprachen sind für eine Stelle in der Genfer Privatbank erforderlich?",
      acceptedAnswer: { "@type": "Answer", text: "Französisch und Englisch sind unerlässlich. Deutsch ist ein Vorteil für DACH-Kundenabdeckung. Für internationale Desks hat die Sprache des Zielmarktes Vorrang." },
    },
    {
      "@type": "Question",
      name: "Was ist der Unterschied zwischen Genf und Zürich für einen Private Banker?",
      acceptedAnswer: { "@type": "Answer", text: "Genf dominiert das internationale Cross-Border-Geschäft mit UHNWI-Kunden. Zürich ist stärker auf das DACH-Onshore-Geschäft ausgerichtet. Genf bietet höheres variables Einkommenspotenzial, Zürich mehr Stabilität." },
    },
    {
      "@type": "Question",
      name: "Welche Banken rekrutieren Senior Relationship Manager in Genf?",
      acceptedAnswer: { "@type": "Answer", text: "Die wichtigsten Arbeitgeber sind UBP, Pictet, Lombard Odier, Edmond de Rothschild, Mirabaud, Julius Baer (Genf), UBS (Genf), SYZ Group, Reyl & Cie, BCGE und Piguet Galland." },
    },
  ],
};

const salaryData = [
  { role: "RM / Senior Berater", base: "CHF 160-220K", bonus: "40-80 %", note: "Min. CHF 250M AUM typisch erwartet." },
  { role: "Senior RM / Director", base: "CHF 220-320K", bonus: "50-100 %", note: "Umsatzziel CHF 1.5M+" },
  { role: "Team Head / Market Head", base: "CHF 300-420K", bonus: "60-120 %", note: "Buch CHF 500M+ für Tier-1-Plattformen." },
  { role: "EAM / Unabhängiger Berater", base: "CHF 120-200K", bonus: "Umsatzbeteiligungsmodell", note: "Retrozessions- und AUM-basierte Strukturen üblich." },
];

export default function DePrivatbankenGenfPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="min-h-screen bg-[#0B0E13] text-white py-20 px-4">
        <div className="mx-auto max-w-3xl space-y-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#C9A14A] mb-4">Privatbank · Genf · Schweiz</p>
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight mb-6">Privatbank Genf — Gehälter, Markt und Recruitment 2026</h1>
            <p className="text-white/80 text-lg leading-relaxed">Genf ist das internationalste Privatbankzentrum der Welt gemessen am verwalteten Vermögen pro Kopf und der operative Standort von Executive Partners. Der Genfer Markt konzentriert über 100 Banken sowie ein schnell wachsendes EAM-Ökosystem, das sich auf internationale UHNWI-Kunden, Cross-Border-Franchises und die anspruchsvollsten Regulierungs- und Kundenanforderungen der Schweiz ausrichtet.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/en/apply" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-[#C9A14A] text-black hover:opacity-90 transition">Vertraulich bewerben</Link>
            <Link href="/en/jobs" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold border border-white/20 text-white hover:bg-white/10 transition">Aktive Mandate ansehen</Link>
          </div>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Gehalts-Benchmarks — Privatbank Genf 2026</h2>
            <p className="text-white/60 text-sm mb-5">Genf liegt typischerweise 10-15% über Zürich bei vergleichbarer Seniorität. Das höhere variable Einkommen spiegelt die Portabilität der Kundenbücher und das Cross-Border-Potenzial wider.</p>
            <div className="overflow-x-auto rounded-xl ring-1 ring-white/10">
              <table className="min-w-full text-sm">
                <thead className="bg-white/5">
                  <tr><th className="px-4 py-3 text-left font-medium">Stufe</th><th className="px-4 py-3 text-left font-medium">Fixgehalt</th><th className="px-4 py-3 text-left font-medium">Typischer Bonus</th><th className="px-4 py-3 text-left font-medium">Hinweis</th></tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {salaryData.map((row) => (
                    <tr key={row.role} className="hover:bg-white/5">
                      <td className="px-4 py-3 font-medium">{row.role}</td>
                      <td className="px-4 py-3">{row.base}</td>
                      <td className="px-4 py-3">{row.bonus}</td>
                      <td className="px-4 py-3 text-white/50 text-xs">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-white/40 text-xs mt-3">Richtungsweisende Benchmarks 2025-2026. Nur zur Orientierung.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Genf vs. Zürich — die wichtigsten Unterschiede</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { city: "Genf", points: ["Grösster internationaler Offshore-Markt", "Cross-Border AUM und internationale UHNWI", "Höheres Variables, portableres Buch", "UBP, Pictet, Lombard Odier, Julius Baer", "Französisch und Englisch unerlässlich"] },
                { city: "Zürich", points: ["Dominierender DACH-Onshore-Markt", "Stabile Kundenbeziehungen, geringere Mobilität", "Moderateres Variables, höhere Jobsicherheit", "UBS, Julius Baer, Vontobel, ZKB", "Deutsch für Onshore-Positionen erforderlich"] },
              ].map(({ city, points }) => (
                <div key={city} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <p className="text-[#C9A14A] font-semibold mb-3">{city}</p>
                  <ul className="space-y-1.5">
                    {points.map((p) => (<li key={p} className="text-white/60 text-sm flex gap-2"><span className="text-[#C9A14A] shrink-0">→</span><span>{p}</span></li>))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Wichtigste Privatbanken in Genf</h2>
            <div className="flex flex-wrap gap-2">
              {["UBP (Union Bancaire Privée)", "Pictet", "Lombard Odier", "Edmond de Rothschild", "Mirabaud", "Julius Baer (Genf)", "UBS (Genf)", "SYZ Group", "Reyl & Cie", "BCGE", "Piguet Galland", "Notz Stucki", "BNP Paribas Wealth Management"].map((bank) => (
                <span key={bank} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">{bank}</span>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Marktlage 2026 — Was gesucht wird</h2>
            <ul className="space-y-3">
              {["Starke Nachfrage nach französischsprachigen Senior RMs mit europäischen und MENA-Kundenbüchern", "EAM-Sektor wächst schnell — unabhängige Asset Manager stellen erfahrene Banker aktiv ein", "UBP, Lombard Odier, Pictet und Mirabaud führen selektive Senior-Mandate durch", "Grosse Nachfrage nach Bankern mit UHNWI-Büchern über CHF 300M und nachgewiesener Portabilität", "Family-Office-Strukturierung und Vermögensübergabe an die nächste Generation treiben neue Beratungsmandate", "Compliance-Fristen verlängern sich; 3-6 Monate Onboarding-Standard bei grossen Plattformen"].map((item) => (
                <li key={item} className="flex gap-3 text-white/70 text-sm"><span className="text-[#C9A14A] shrink-0 mt-0.5">→</span><span>{item}</span></li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-5">Häufig gestellte Fragen</h2>
            <div className="space-y-4">
              {[
                { q: "Was verdient ein Senior RM in Genf 2026?", a: "Zwischen CHF 200000 und CHF 400000 im Gesamtpaket, abhängig von AUM, Portabilität und Seniorität. Genf liegt 10-15% über Zürich bei vergleichbarer Senioritätsstufe." },
                { q: "Welche Sprachen sind erforderlich?", a: "Französisch und Englisch sind unerlässlich. Deutsch ist ein Vorteil für DACH-Kundenabdeckung. Für internationale Desks hat die Sprache des Zielmarktes Vorrang." },
                { q: "Genf oder Zürich für einen Private Banker?", a: "Genf für internationales Cross-Border-Potenzial und höhere variable Pakete. Zürich für Stabilität und den DACH-Markt. Die Wahl hängt von Ihrem Profil und Ihrer Kundschaft ab." },
                { q: "Wie läuft die Rekrutierung in der Genfer Privatbank ab?", a: "Executive Partners ist in Genf ansässig und arbeitet ausschliesslich auf Senior-Ebene, vertraulich und auf Named-Mandate-Basis. Wir analysieren die Portabilität Ihres Buchs, benchmarken Ihren Marktwert und begleiten Sie durch den gesamten Prozess bis zur Unterschrift." },
              ].map(({ q, a }) => (
                <div key={q} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <p className="font-semibold text-white mb-2">{q}</p>
                  <p className="text-white/60 text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>
          <hr className="border-white/10" />
          <div className="flex flex-wrap gap-4">
            <Link href="/en/markets/geneva" className="text-sm text-white/60 hover:text-white underline underline-offset-4">English version</Link>
            <Link href="/fr/marches/geneve" className="text-sm text-white/60 hover:text-white underline underline-offset-4">Version française</Link>
            <Link href="/de/privatbanken-zuerich" className="text-sm text-white/60 hover:text-white underline underline-offset-4">Zürcher Markt</Link>
            <Link href="/en/jobs" className="text-sm text-white/60 hover:text-white underline underline-offset-4">Aktive Mandate Genf</Link>
            <Link href="/en/candidates" className="text-sm text-white/60 hover:text-white underline underline-offset-4">Für Kandidaten</Link>
          </div>
        </div>
      </main>
    </>
  );
}
