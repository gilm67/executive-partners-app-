import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://www.execpartners.ch";

export const metadata: Metadata = {
  title: { absolute: "Banque Privée Zurich — Salaires, Recrutement et Mandats 2026 | Executive Partners" },
  description:
    "Zurich, premier centre de gestion de fortune suisse avec CHF 3 200 milliards sous gestion. Benchmarks de rémunération 2026 pour Relationship Managers seniors, Chefs de desk et Directeurs de marché. Executive Partners place des banquiers privés à Zurich en toute confidentialité.",
  alternates: {
    canonical: `${SITE}/fr/marches/zurich`,
    languages: { en: `${SITE}/en/markets/zurich`, "x-default": `${SITE}/en/markets/zurich` },
  },
  openGraph: {
    title: "Banque Privée Zurich — Salaires et Recrutement 2026",
    description: "Benchmarks de rémunération 2026 et mandats actifs en banque privée à Zurich. Executive Partners recrute des Relationship Managers seniors à Zurich.",
    url: `${SITE}/fr/marches/zurich`,
    images: [{ url: `${SITE}/og.webp` }],
  },
  robots: { index: true, follow: true },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Quel est le salaire d'un Relationship Manager senior à Zurich en 2026 ?", acceptedAnswer: { "@type": "Answer", text: "Un Relationship Manager senior à Zurich perçoit un package total de CHF 180 000 à 350 000 selon les AUM, le marché cible et la séniorité. Zurich affiche généralement des rémunérations inférieures de 10 à 15 % à Genève pour une séniorité équivalente, reflétant la nature plus stable du marché onshore DACH." } },
    { "@type": "Question", name: "Quelle est la différence entre Zurich et Genève pour une carrière en banque privée ?", acceptedAnswer: { "@type": "Answer", text: "Zurich gère davantage de patrimoine onshore DACH et institutionnel, avec des relations clients plus stables et moins mobiles. Genève est davantage axée sur la gestion de fortune offshore internationale et cross-border. Zurich offre plus de stabilité, Genève plus de potentiel de développement commercial avec un variable plus élevé." } },
    { "@type": "Question", name: "Comment fonctionne le recrutement en banque privée à Zurich ?", acceptedAnswer: { "@type": "Answer", text: "Les postes seniors à Zurich sont pourvus de façon confidentielle via des cabinets de recherche spécialisés. Executive Partners place des Relationship Managers seniors et des Chefs de desk auprès des principales banques privées zurichoises incluant UBS, Julius Baer, Vontobel et Zürcher Kantonalbank." } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    { "@type": "ListItem", position: 2, name: "Marchés", item: `${SITE}/en/markets` },
    { "@type": "ListItem", position: 3, name: "Zurich — Banque Privée", item: `${SITE}/fr/marches/zurich` },
  ],
};

const salaryData = [
  { role: "RM / Conseiller Senior", baseMin: "CHF 140 000", baseMax: "CHF 190 000", bonus: "35–70 %", note: "—" },
  { role: "Senior RM / Director", baseMin: "CHF 170 000", baseMax: "CHF 240 000", bonus: "50–90 %", note: "Les mandats UHNW internationaux à Zurich se rapprochent des niveaux de rémunération de Genève." },
  { role: "Chef de desk / Market Head", baseMin: "CHF 210 000", baseMax: "CHF 290 000", bonus: "60–110 %", note: "—" },
  { role: "Directeur régional / MD", baseMin: "CHF 260 000", baseMax: "CHF 380 000+", bonus: "75–140 %", note: "Variable lié aux performances collectives. Structures de participation possibles dans les boutiques." },
];

export default function FrMarchesZurichPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="min-h-screen bg-[#0B0E13] text-white py-20 px-4">
        <div className="mx-auto max-w-3xl space-y-10">

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#C9A14A] mb-4">
              Banque Privée · Zurich · Suisse
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight mb-6">
              Banque Privée à Zurich — Salaires, Marchés et Recrutement 2026
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Zurich est le premier centre de gestion de fortune de Suisse avec CHF 3 200 milliards
              d&apos;actifs sous gestion dans un seul canton, représentant 41 % des actifs bancaires
              suisses. La place zurichoise concentre les grandes banques universelles, les boutiques
              privées et un écosystème EAM dense centré sur le marché DACH et les segments UHNWI
              internationaux.
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
            <h2 className="text-2xl font-semibold mb-2">Benchmarks de rémunération — Banque privée Zurich 2026</h2>
            <p className="text-white/60 text-sm mb-5">
              Zurich affiche des packages inférieurs de 10 à 15 % à Genève pour une séniorité équivalente,
              reflétant la stabilité plus grande du marché onshore DACH. Les mandats UHNWI internationaux
              et cross-border comblent partiellement cet écart.
            </p>
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
            <h2 className="text-2xl font-semibold mb-4">Zurich vs Genève — quelles différences pour votre carrière ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { city: "Zurich", points: ["Marché onshore DACH dominant", "Relations clients plus stables et moins mobiles", "Moins de variable, plus de sécurité", "UBS, Julius Baer, Vontobel, ZKB", "Allemand requis pour les postes onshore"] },
                { city: "Genève", points: ["Premier marché offshore mondial", "AUM cross-border et international UHNWI", "Variable plus élevé, book plus portable", "UBP, Pictet, Lombard Odier, Julius Baer", "Français et anglais essentiels"] },
              ].map(({ city, points }) => (
                <div key={city} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <p className="text-[#C9A14A] font-semibold mb-3">{city}</p>
                  <ul className="space-y-1.5">
                    {points.map((p) => (
                      <li key={p} className="text-white/60 text-sm flex gap-2">
                        <span className="text-[#C9A14A] shrink-0">→</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Principaux établissements à Zurich</h2>
            <p className="text-white/70 leading-relaxed">
              La place zurichoise concentre les mastodontes du secteur : UBS, Julius Baer (siège mondial),
              Vontobel, Zürcher Kantonalbank (ZKB), Bank J. Safra Sarasin, EFG International, Notenstein
              La Roche et plusieurs dizaines de boutiques privées spécialisées sur les marchés DACH,
              Eastern European et Asian cross-border. L&apos;écosystème EAM zurichois est particulièrement
              fort sur la gestion d&apos;actifs institutionnels et les family offices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-5">Questions fréquentes</h2>
            <div className="space-y-4">
              {[
                { q: "Quel salaire pour un RM senior à Zurich en 2026 ?", a: "Entre CHF 180 000 et 350 000 en package total selon les AUM et la séniorité. Zurich affiche 10-15 % de moins que Genève à séniorité équivalente." },
                { q: "Faut-il parler allemand pour travailler en banque privée à Zurich ?", a: "L'allemand est essentiel pour les postes onshore DACH. L'anglais est universel. Le français est un atout. Pour les desks internationaux, les langues du marché cible (arabe, mandarin, russe) priment sur l'allemand." },
                { q: "Comment Zurich se compare à Genève pour un banquier privé ?", a: "Zurich offre plus de stabilité et moins de mobilité des clients. Genève offre plus de potentiel de développement commercial avec des packages variables plus élevés. Le choix dépend de votre profil — book stable DACH vs book cross-border portable." },
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
