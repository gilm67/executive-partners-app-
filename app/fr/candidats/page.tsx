import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://www.execpartners.ch";

export const metadata: Metadata = {
  title: { absolute: "Banquiers Privés — Placement Confidentiel | Executive Partners Genève" },
  description:
    "Executive Partners accompagne les Relationship Managers seniors, Chefs de desk et Conseillers en investissement dans leurs transitions de carrière en banque privée. Évaluation de la portabilité AUM, business plan et placement confidentiel à Genève, Zurich, Dubaï et Singapour.",
  alternates: {
    canonical: `${SITE}/fr/candidats`,
    languages: { en: `${SITE}/en/candidates`, de: `${SITE}/de` },
  },
  openGraph: {
    title: "Banquiers Privés — Placement Confidentiel",
    description: "Accompagnement confidentiel pour Relationship Managers seniors et Chefs de desk. Évaluation portabilité AUM, business plan et négociation. Geneva, Zurich, Dubaï, Singapour.",
    url: `${SITE}/fr/candidats`,
    images: [{ url: `${SITE}/og.webp` }],
  },
  robots: { index: true, follow: true },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Les candidats paient-ils des honoraires à Executive Partners ?", acceptedAnswer: { "@type": "Answer", text: "Non. Nos honoraires sont intégralement pris en charge par les banques mandataires. Vous ne payez jamais rien pour travailler avec Executive Partners. C'est la norme dans le recrutement de cadres dirigeants — les institutions valorisent les meilleurs talents et investissent en conséquence." } },
    { "@type": "Question", name: "Comment fonctionne la confidentialité du processus ?", acceptedAnswer: { "@type": "Answer", text: "Confidentialité totale. Nous ne contactons jamais votre employeur actuel et ne divulguons pas votre intérêt pour une mobilité sans votre autorisation explicite. La plupart de nos échanges ont lieu en dehors des heures de bureau, sur votre messagerie personnelle." } },
    { "@type": "Question", name: "Je ne cherche pas activement mais je veux comprendre ma valeur marché. Puis-je vous contacter ?", acceptedAnswer: { "@type": "Answer", text: "Absolument. La majorité de nos meilleurs placements proviennent de candidats passifs — des professionnels ouverts à la bonne opportunité, sans être en recherche active. Un premier entretien est entièrement confidentiel et sans engagement." } },
    { "@type": "Question", name: "Quels marchés couvrez-vous ?", acceptedAnswer: { "@type": "Answer", text: "Nos mandats couvrent Genève, Zurich, Londres, Dubaï DIFC, Riyad, Singapour, Hong Kong, New York et Miami. Pour les marchés où nous n'avons pas de mandat actif correspondant à votre profil, nous conservons votre dossier et vous recontactons dès qu'une opportunité se présente." } },
    { "@type": "Question", name: "Mon AUM n'est pas entièrement portable. Est-ce rédhibitoire ?", acceptedAnswer: { "@type": "Answer", text: "Non. La portabilité est rarement totale. La plupart des Relationship Managers transfèrent entre 30 et 80 % de leur portefeuille lors d'une mobilité. Les banques comprennent cette réalité et structurent leurs offres en conséquence. Notre outil Score de Portabilité permet d'estimer un taux réaliste avant toute démarche." } },
    { "@type": "Question", name: "Quel niveau de rémunération dois-je attendre ?", acceptedAnswer: { "@type": "Answer", text: "La rémunération varie fortement selon la banque, le marché géographique, la taille du portefeuille et la séniorité. La Suisse, le Royaume-Uni et le Moyen-Orient offrent généralement les packages les plus compétitifs. Nous fournissons une estimation réaliste basée sur votre profil et l'établissement ciblé." } },
  ],
};

export default function FrCandidatsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="min-h-screen bg-[#0B0E13] text-white py-20 px-4">
        <div className="mx-auto max-w-3xl space-y-10">

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#C9A14A] mb-4">
              Placement confidentiel · Banque privée · Gestion de patrimoine
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight mb-6">
              Placement de Banquiers Privés Seniors à Genève et à l&apos;International
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Executive Partners accompagne des Relationship Managers seniors, des Conseillers en
              investissement et des Chefs de desk dans leurs transitions de carrière en banque
              privée. Chaque démarche est confidentielle, sans engagement initial, et ne vous coûte rien.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/en/apply" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-[#C9A14A] text-black hover:opacity-90 transition">
              Postuler confidentiellement
            </Link>
            <Link href="/en/portability" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold border border-white/20 text-white hover:bg-white/10 transition">
              Évaluer ma portabilité AUM
            </Link>
          </div>

          <hr className="border-white/10" />

          <section>
            <h2 className="text-2xl font-semibold mb-4">Pourquoi travailler avec Executive Partners ?</h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                Nous opérons exclusivement en banque privée et gestion de patrimoine. Nous ne sommes
                pas un cabinet généraliste. Chaque mandat que nous gérons concerne un professionnel
                senior en front-office — un Relationship Manager disposant d&apos;un portefeuille
                portable, un Conseiller en investissement couvrant un segment de marché spécifique,
                ou un Chef de desk avec un historique de construction d&apos;équipe.
              </p>
              <p>
                Notre processus repose sur l&apos;analyse de la portabilité, la revue du business
                plan et le profilage compliance. Avant toute présentation à un établissement, nous
                avons évalué la composition des AUM, la concentration clients, les licences
                transfrontalières et la probabilité réaliste de transfert. Les banques reçoivent
                des dossiers structurés, pas des CV.
              </p>
              <p>
                200+ placements réalisés. Taux de rétention à 12 mois de 98 %. Un seul interlocuteur
                dédié du premier entretien à l&apos;intégration.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Nos outils pour banquiers privés</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/en/portability" className="block rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition">
                <p className="text-[#C9A14A] font-semibold text-sm uppercase tracking-wider mb-2">Score de Portabilité™</p>
                <p className="text-white/70 text-sm leading-relaxed">Évaluez le potentiel de transfert réaliste de votre portefeuille avant toute démarche.</p>
              </Link>
              <Link href="/en/bp-simulator" className="block rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition">
                <p className="text-[#C9A14A] font-semibold text-sm uppercase tracking-wider mb-2">Simulateur de Business Plan</p>
                <p className="text-white/70 text-sm leading-relaxed">Modélisez votre chiffre d&apos;affaires sur 3 ans, le break-even AUM et la contribution NPC.</p>
              </Link>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-5">Questions fréquentes</h2>
            <div className="space-y-4">
              {[
                { q: "Les candidats paient-ils des honoraires ?", a: "Non. Nos honoraires sont intégralement pris en charge par les banques mandataires. Vous ne payez jamais rien." },
                { q: "Quel est le niveau de confidentialité ?", a: "Total. Nous ne contactons jamais votre employeur actuel sans votre autorisation explicite. Les échanges ont lieu en dehors des heures de bureau, sur votre messagerie personnelle." },
                { q: "Je ne suis pas en recherche active. Puis-je quand même vous contacter ?", a: "Absolument. La majorité de nos placements concernent des candidats passifs. Un premier entretien est sans engagement et entièrement confidentiel." },
                { q: "Mon AUM n'est pas totalement portable. Est-ce bloquant ?", a: "Non. La plupart des banquiers transfèrent 30 à 80 % de leur portefeuille. Les banques structurent leurs offres en conséquence. Notre Score de Portabilité aide à calibrer les hypothèses." },
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
            <Link href="/en/jobs" className="text-sm text-white/60 hover:text-white underline underline-offset-4">Mandats actifs</Link>
            <Link href="/en/markets" className="text-sm text-white/60 hover:text-white underline underline-offset-4">Explorer les marchés</Link>
            <Link href="/fr" className="text-sm text-white/60 hover:text-white underline underline-offset-4">Accueil</Link>
          </div>
        </div>
      </main>
    </>
  );
}
