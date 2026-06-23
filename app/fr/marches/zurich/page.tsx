import type { Metadata } from "next";
import Link from "next/link";
const SITE = "https://www.execpartners.ch";
export const metadata: Metadata = {
  title: { absolute: "Banque Privée Zurich — Salaires, Recrutement et Mandats 2026 | Executive Partners" },
  description: "Zurich, premier centre bancaire suisse avec CHF 3 200 milliards sous gestion. Benchmarks de rémunération 2026 pour Relationship Managers seniors à Zurich. Executive Partners place des banquiers privés à Zurich en toute confidentialité.",
  alternates: { canonical: `${SITE}/fr/marches/zurich`, languages: { en: `${SITE}/en/markets/zurich`, "x-default": `${SITE}/en/markets/zurich` } },
  openGraph: { title: "Banque Privée Zurich — Salaires et Recrutement 2026", description: "Benchmarks de rémunération 2026 et mandats actifs en banque privée à Zurich.", url: `${SITE}/fr/marches/zurich`, images: [{ url: `${SITE}/og.webp` }] },
  robots: { index: true, follow: true },
};
const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Quel est le salaire d’un Relationship Manager senior à Zurich en 2026 ?", acceptedAnswer: { "@type": "Answer", text: "Un Relationship Manager senior à Zurich perçoit un package total de CHF 180 000 à 350 000 selon les AUM et la séniorité. Zurich affiche généralement des rémunérations inférieures de 10 à 15 % à Genève pour une séniorité équivalente." } },
    { "@type": "Question", name: "Quelle est la différence entre Zurich et Genève pour une carrière en banque privée ?", acceptedAnswer: { "@type": "Answer", text: "Zurich gère davantage de patrimoine onshore DACH avec des relations clients stables. Genève est davantage axée sur la gestion offshore internationale. Zurich offre plus de stabilité, Genève plus de potentiel de développement commercial avec un variable plus élevé." } },
    { "@type": "Question", name: "Faut-il parler allemand pour travailler en banque privée à Zurich ?", acceptedAnswer: { "@type": "Answer", text: "L’allemand est essentiel pour les postes onshore DACH. L’anglais est universel. Pour les desks internationaux, les langues du marché cible priment sur l’allemand." } },
  ],
};
const salaryData = [
  { role: "RM / Conseiller Senior", base: "CHF 140–190K", bonus: "35–70 %", note: "—" },
  { role: "Senior RM / Director", base: "CHF 170–240K", bonus: "50–90 %", note: "Mandats UHNWI internationaux proches des niveaux de Genève." },
  { role: "Chef de desk / Market Head", base: "CHF 210–290K", bonus: "60–110 %", note: "—" },
  { role: "MD / Directeur régional", base: "CHF 260–380K+", bonus: "75–140 %", note: "Structures de participation possibles dans les boutiques." },
];
export default function FrMarchesZurichPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="min-h-screen bg-[#0B0E13] text-white py-20 px-4">
        <div className="mx-auto max-w-3xl space-y-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#C9A14A] mb-4">Banque Privée · Zurich · Suisse</p>
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight mb-6">Banque Privée à Zurich — Salaires, Marchés et Recrutement 2026</h1>
            <p className="text-white/80 text-lg leading-relaxed">Zurich est le premier centre bancaire de Suisse avec CHF 3 200 milliards d&apos;actifs sous gestion dans un seul canton. La place zurichoise concentre les grandes banques universelles, les boutiques privées et un écosystème EAM dense centré sur le marché DACH et les segments UHNWI internationaux.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/en/apply" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-[#C9A14A] text-black hover:opacity-90 transition">Postuler confidentiellement</Link>
            <Link href="/en/jobs" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold border border-white/20 text-white hover:bg-white/10 transition">Voir les mandats actifs</Link>
          </div>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Benchmarks de rémunération — Banque privée Zurich 2026</h2>
            <p className="text-white/60 text-sm mb-5">Zurich affiche des packages inférieurs de 10 à 15 % à Genève pour une séniorité équivalente. Les mandats UHNWI internationaux et cross-border comblent partiellement cet écart.</p>
            <div className="overflow-x-auto rounded-xl ring-1 ring-white/10">
              <table className="min-w-full text-sm">
                <thead className="bg-white/5"><tr><th className="px-4 py-3 text-left font-medium">Niveau</th><th className="px-4 py-3 text-left font-medium">Fixe</th><th className="px-4 py-3 text-left font-medium">Bonus typique</th><th className="px-4 py-3 text-left font-medium">Note</th></tr></thead>
                <tbody className="divide-y divide-white/10">
                  {salaryData.map((row) => (<tr key={row.role} className="hover:bg-white/5"><td className="px-4 py-3 font-medium">{row.role}</td><td className="px-4 py-3">{row.base}</td><td className="px-4 py-3">{row.bonus}</td><td className="px-4 py-3 text-white/50 text-xs">{row.note}</td></tr>))}
                </tbody>
              </table>
            </div>
            <p className="text-white/40 text-xs mt-3">Benchmarks directionnels 2025–2026. Données indicatives uniquement.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Zurich vs Genève — quelles différences ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[{ city: "Zurich", points: ["Marché onshore DACH dominant", "Relations clients stables, moins mobiles", "Variable plus modéré, sécurité plus grande", "UBS, Julius Baer, Vontobel, ZKB", "Allemand requis (postes onshore)"] }, { city: "Genève", points: ["Premier marché offshore mondial", "AUM cross-border et UHNWI international", "Variable élevé, book plus portable", "UBP, Pictet, Lombard Odier, Julius Baer", "Français et anglais essentiels"] }].map(({ city, points }) => (
                <div key={city} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <p className="text-[#C9A14A] font-semibold mb-3">{city}</p>
                  <ul className="space-y-1.5">{points.map((p) => (<li key={p} className="text-white/60 text-sm flex gap-2"><span className="text-[#C9A14A] shrink-0">→</span><span>{p}</span></li>))}</ul>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-5">Questions fréquentes</h2>
            <div className="space-y-4">
              {[{ q: "Quel salaire pour un RM senior à Zurich en 2026 ?", a: "Entre CHF 180 000 et 350 000 en package total selon les AUM et la séniorité. Zurich affiche 10-15 % de moins que Genève à séniorité équivalente." }, { q: "Faut-il parler allemand ?", a: "Essentiel pour les postes onshore DACH. L’anglais est universel. Pour les desks internationaux, la langue du marché cible prime." }, { q: "Zurich ou Genève pour un banquier privé ?", a: "Zurich pour la stabilité et le marché DACH. Genève pour le potentiel commercial offshore et les packages variables plus élevés. Votre choix dépend de votre profil et de votre book." }].map(({ q, a }) => (
                <div key={q} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <p className="font-semibold text-white mb-2">{q}</p>
                  <p className="text-white/60 text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>
          <hr className="border-white/10" />
          <div className="flex flex-wrap gap-4">
            <Link href="/en/markets/zurich" className="text-sm text-white/60 hover:text-white underline underline-offset-4">Version anglaise</Link>
            <Link href="/fr/marches/geneve" className="text-sm text-white/60 hover:text-white underline underline-offset-4">Marché de Genève</Link>
            <Link href="/fr/candidats" className="text-sm text-white/60 hover:text-white underline underline-offset-4">Pour les candidats</Link>
            <Link href="/en/jobs" className="text-sm text-white/60 hover:text-white underline underline-offset-4">Mandats actifs Zurich</Link>
            <Link href="/fr" className="text-sm text-white/60 hover:text-white underline underline-offset-4">Accueil</Link>
          </div>
        </div>
      </main>
    </>
  );
}
