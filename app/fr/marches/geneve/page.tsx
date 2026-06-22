import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://www.execpartners.ch";

export const metadata: Metadata = {
  title: { absolute: "Banque Privée Genève — Salaires, Recrutement et Mandats 2026 | Executive Partners" },
  description:
    "Genève, première place de gestion de patrimoine offshore au monde. Benchmarks de rémunération 2026 pour Relationship Managers seniors, Chefs de desk et Directeurs de marché. Executive Partners place des banquiers privés à Genève en toute confidentialité.",
  alternates: {
    canonical: `${SITE}/fr/marches/geneve`,
    languages: { en: `${SITE}/en/markets/geneva` },
  },
  openGraph: {
    title: "Banque Privée Genève — Salaires et Recrutement 2026",
    description: "Benchmarks de rémunération 2026, licences FINMA, écosystème EAM et mandats actifs en banque privée à Genève. Executive Partners recrute des Relationship Managers seniors à Genève.",
    url: `${SITE}/fr/marches/geneve`,
    images: [{ url: `${SITE}/og.webp` }],
  },
  robots: { index: true, follow: true },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Quel est le salaire d'un Relationship Manager senior à Genève en 2026 ?", acceptedAnswer: { "@type": "Answer", text: "Un Relationship Manager senior à Genève perçoit un package total de CHF 200 000 à 400 000 selon les AUM, le marché et la séniorité. Les Chefs de desk et les Directeurs régionaux peuvent dépasser CHF 500 000 en rémunération totale incluant le bonus." } },
    { "@type": "Question", name: "Quel AUM minimum est requis pour un poste senior à Genève ?", acceptedAnswer: { "@type": "Answer", text: "La plupart des mandats seniors à Genève exigent un portefeuille portable minimum de CHF 50 à 100M pour les postes de niveau Director, et CHF 150M+ pour les postes de Team Head. L'apport net nouveau (NNM) et la qualité de la relation client comptent autant que le volume brut." } },
    { "@type": "Question", name: "Comment fonctionne le recrutement en banque privée à Genève ?", acceptedAnswer: { "@type": "Answer", text: "La quasi-totalité des postes seniors en banque privée à Genève sont pourvus de façon confidentielle via des cabinets de recherche spécialisés. Executive Partners place des Relationship Managers seniors et des Chefs de desk auprès des principales banques privées et gestionnaires de patrimoine de la place." } },
  ],
};

const salaryData = [
  { role: "RM / Conseiller Senior", baseMin: "CHF 150 000", baseMax: "CHF 200 000", bonus: "40–80 %", note: "—" },
  { role: "Senior RM / Director", baseMin: "CHF 180 000", baseMax: "CHF 250 000", bonus: "50–100 %", note: "Les top performers avec book UHNW portable et historique revenus multi-années peuvent dépasser 100 %." },
  { role: "Chef de desk / Market Head", baseMin: "CHF 220 000", baseMax: "CHF 300 000", bonus: "60–120 %", note: "—" },
  { role: "Directeur régional / MD", baseMin: "CHF 280 000", baseMax: "CHF 400 000+", bonus: "80–150 %", note: "Variable significatif lié aux performances collectives du desk." },
];

export default function FrMarchesGenevePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="min-h-screen bg-[#0B0E13] text-white py-20 px-4">
        <div className="mx-auto max-w-3xl space-y-10">

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#C9A14A] mb-4">
              Banque Privée · Genève · Suisse
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight mb-6">
              Banque Privée à Genève — Salaires, Marchés et Recrutement 2026
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Genève demeure la première place mondiale de gestion de patrimoine offshore, avec
              environ 2 400 milliards de CHF d&apos;actifs sous gestion répartis entre plus de
              80 établissements bancaires. Le marché a consolidé depuis 2010, mais les plateformes
              survivantes sont plus solides, mieux capitalisées et plus actives que jamais en
              recrutement.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/en/apply" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-[#C9A14A] text-black hover:opacity-90 transition">
              Postuler confidentiellement
            </Link>
            <Link href="/en/jobs" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold border border-white/20 text-white hover:bg-white/10 transition">
              Voir les mandats actifs
            </Link>
          </div>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Benchmarks de rémunération — Banque privée Genève 2026</h2>
            <p className="text-white/60 text-sm mb-5">Fourchettes indicatives pour des postes de Relationship Manager à Chef de desk. Les offres finales dépendent des AUM portables, du ROA, du mix produits et des performances de l&apos;établissement.</p>
            <div className="overflow-x-auto rounded-xl ring-1 ring-white/10">
              <table className="min-w-full text-sm">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Niveau</th>
                    <th className="px-4 py-3 text-left font-medium">Fixe min.</th>
                    <th className="px-4 py-3 text-left font-medium">Fixe max.</th>
                    <th className="px-4 py-3 text-left font-medium">Bonus typique</th>
                    <th className="px-4 py-3 text-left font-medium">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {salaryData.map((row) => (
                    <tr key={row.role} className="hover:bg-white/5">
                      <td className="px-4 py-3 font-medium">{row.role}</td>
                      <td className="px-4 py-3">{row.baseMin}</td>
                      <td className="px-4 py-3">{row.baseMax}</td>
                      <td className="px-4 py-3">{row.bonus}</td>
                      <td className="px-4 py-3 text-white/50 text-xs">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-white/40 text-xs mt-3">Benchmarks directionnels 2025–2026. Ne constituent pas une offre. Données à titre indicatif uniquement.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Principaux établissements à Genève</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              La place genevoise réunit des mastodontes mondiaux et des boutiques de premier rang :
              UBS, Julius Baer, Pictet, Lombard Odier, Union Bancaire Privée (UBP), J. Safra Sarasin,
              Vontobel, Mirabaud, Banque Syz, EFG International, Rothschild &amp; Co. L&apos;écosystème
              EAM (External Asset Managers) est l&apos;un des plus denses au monde, avec des centaines
              de gérants indépendants sous licence FINMA.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Profil recherché à Genève</h2>
            <div className="space-y-3 text-white/70 leading-relaxed">
              <p>Le marché genevois privilégie les banquiers avec un portefeuille personnel portable (pas un book d&apos;équipe), un historique de revenus récurrents (advisory/DPM, lending Lombard), et une expertise transfrontalière dans l&apos;un des marchés prioritaires : MEA, LatAm, Europe du Sud, UK ou UHNW suisse onshore.</p>
              <p>Les licences FINMA outbound, la maîtrise des cadres CDB20 et AML/KYC renforcés, et la capacité à présenter un business plan structuré sont des prérequis dans les mandats seniors.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-5">Questions fréquentes</h2>
            <div className="space-y-4">
              {[
                { q: "Quel salaire pour un RM senior à Genève en 2026 ?", a: "Entre CHF 200 000 et 400 000 en package total selon les AUM et la séniorité. Les postes MD / Team Head peuvent dépasser CHF 500 000." },
                { q: "Quel AUM minimum faut-il pour décrocher un poste senior ?", a: "Entre CHF 50 et 150M selon l'établissement et le marché cible. La qualité de la relation client et le NNM comptent autant que le volume brut." },
                { q: "Le français est-il obligatoire ?", a: "Il est essentiel pour les postes onshore et clients résidents. L'anglais est requis partout. L'arabe, l'espagnol et le portugais sont des atouts significatifs pour les books cross-border." },
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
            <Link href="/en/markets/geneva" className="text-sm text-white/60 hover:text-white underline underline-offset-4">Version anglaise</Link>
            <Link href="/fr/candidats" className="text-sm text-white/60 hover:text-white underline underline-offset-4">Pour les candidats</Link>
            <Link href="/en/jobs" className="text-sm text-white/60 hover:text-white underline underline-offset-4">Mandats actifs Genève</Link>
            <Link href="/fr" className="text-sm text-white/60 hover:text-white underline underline-offset-4">Accueil</Link>
          </div>
        </div>
      </main>
    </>
  );
}
