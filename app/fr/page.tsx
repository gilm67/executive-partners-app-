import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://www.execpartners.ch";

export const metadata: Metadata = {
  title: "Recruteur Banque Privée Genève | Executive Partners Suisse",
  description:
    "Executive Partners est un chasseur de têtes spécialisé en banque privée et gestion de patrimoine à Genève. Placement de Relationship Managers seniors, Chefs de desk et Directeurs de marché en Suisse, Londres, Dubaï et Singapour.",
  alternates: {
    canonical: `${SITE}/fr`,
    languages: { "en": `${SITE}/en` },
  },
  openGraph: {
    title: "Recruteur Banque Privée Genève | Executive Partners",
    description:
      "Chasseur de têtes spécialisé en banque privée à Genève. 200+ placements. Confidentialité totale.",
    url: `${SITE}/fr`,
    images: [{ url: `${SITE}/og.webp` }],
  },
  robots: { index: true, follow: true },
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "EmploymentAgency"],
  name: "Executive Partners",
  legalName: "Executive Partners Sàrl",
  description:
    "Cabinet de recrutement spécialisé en banque privée et gestion de patrimoine, basé à Genève. Placement de banquiers seniors dans les principales places financières mondiales.",
  url: SITE,
  inLanguage: "fr",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Genève",
    addressCountry: "CH",
  },
  areaServed: [
    { "@type": "City", name: "Genève" },
    { "@type": "City", name: "Zurich" },
    { "@type": "City", name: "Londres" },
    { "@type": "City", name: "Dubaï" },
    { "@type": "City", name: "Singapour" },
  ],
};

export default function FrenchHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <main className="min-h-screen bg-[#0B0E13] text-white py-20 px-4">
        <div className="mx-auto max-w-3xl space-y-8">

          <p className="text-sm font-semibold uppercase tracking-widest text-[#C9A14A]">
            Genève · Zurich · Londres · Dubaï · Singapour
          </p>

          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Recruteur en Banque Privée à Genève
          </h1>

          <p className="text-white/80 text-lg leading-relaxed">
            Executive Partners est un cabinet de recrutement exécutif basé à Genève, spécialisé
            exclusivement en banque privée et gestion de patrimoine. Nous plaçons des Relationship
            Managers seniors, des Conseillers en investissement, des Chefs de desk et des
            Directeurs de marché auprès des principales banques privées suisses et internationales.
            Plus de 200 placements réalisés. Taux de rétention à 12 mois de 98%.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/en/apply"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-[#C9A14A] text-black hover:opacity-90 transition"
            >
              Postuler en toute confidentialité
            </Link>
            <Link
              href="/en/contact"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold border border-white/20 text-white hover:bg-white/10 transition"
            >
              Nous contacter
            </Link>
          </div>

          <hr className="border-white/10" />

          <h2 className="text-2xl font-semibold">
            Chasseur de têtes en banque privée — Notre approche
          </h2>
          <p className="text-white/70 leading-relaxed">
            Nous opérons exclusivement en banque privée et gestion de patrimoine. Chaque mandat
            que nous gérons concerne un professionnel senior en front-office — typiquement un
            Relationship Manager disposant d'un portefeuille portable, un Conseiller en
            investissement couvrant un segment de marché spécifique, ou un Chef de desk avec un
            historique de construction d'une équipe. Nous ne généralisons pas à l'ensemble des
            services financiers. La banque privée est notre seul marché.
          </p>
          <p className="text-white/70 leading-relaxed">
            Notre processus de recrutement est fondé sur l'analyse de la portabilité, la revue
            du business plan et le profilage compliance. Avant toute présentation d'un candidat
            à un établissement, nous avons évalué la composition des AUM, la part de portefeuille,
            les licences transfrontalières, la concentration clients et la probabilité réaliste
            de transfert. Les responsables du recrutement reçoivent des dossiers candidats
            structurés, pas des CV.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            Recrutement en banque privée à Genève et Zurich
          </h2>
          <p className="text-white/70 leading-relaxed">
            Nos mandats en Suisse se concentrent sur Genève et Zurich, couvrant les marchés
            suisse onshore, UHNW international, LATAM, CIS/CEE, offshore italien, MEA, asiatique
            et britannique. Les postes typiques incluent Relationship Manager senior, Conseiller
            en investissement, Assistant RM, Responsable de marché, Chef de desk et Directeur
            régional. Nous conseillons également sur les transitions vers le modèle EAM pour les
            banquiers seniors envisageant la voie du gestionnaire de fortune indépendant.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            Pour les banquiers privés
          </h2>
          <p className="text-white/70 leading-relaxed">
            La plupart des banquiers seniors qui nous contactent ne sont pas en recherche active.
            Ils souhaitent comprendre leur valeur de marché, évaluer la portabilité de leur
            clientèle et identifier quelles plateformes constitueraient le meilleur positionnement
            stratégique. Un premier entretien avec Executive Partners est entièrement confidentiel
            et sans engagement. Nous ne facturons jamais les candidats.
          </p>
          <p className="text-white/70 leading-relaxed">
            Utilisez notre{" "}
            <Link href="/en/portability" className="text-[#C9A14A] hover:underline">
              Score de Portabilité
            </Link>{" "}
            pour évaluer votre potentiel de transfert d'AUM, ou simulez votre{" "}
            <Link href="/en/bp-simulator" className="text-[#C9A14A] hover:underline">
              Business Plan
            </Link>{" "}
            pour modéliser votre chiffre d'affaires, le seuil de rentabilité et la préparation
            à l'intégration avant d'approcher une nouvelle plateforme.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            Pour les responsables du recrutement
          </h2>
          <p className="text-white/70 leading-relaxed">
            Nous travaillons avec un nombre limité de clients sur une base retenue et engagée.
            Nous n'opérons pas sur un modèle contingent. Chaque mandat bénéficie d'une
            recherche dédiée, d'une cartographie structurée du marché et d'une évaluation
            des candidats. Nos clients vont des plus grandes banques privées mondiales aux
            gestionnaires de fortune boutique basés à Genève et aux plateformes EAM qui
            développent leurs équipes front-office.
          </p>
          <p className="text-white/70 leading-relaxed">
            Pour discuter d'un mandat de recrutement en banque privée, utilisez notre{" "}
            <Link href="/en/hiring-managers/brief" className="text-[#C9A14A] hover:underline">
              formulaire de mandat confidentiel
            </Link>{" "}
            ou{" "}
            <Link href="/en/contact" className="text-[#C9A14A] hover:underline">
              contactez-nous directement
            </Link>
            . Nous répondons le jour même.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            Mandats actifs en banque privée
          </h2>
          <p className="text-white/70 leading-relaxed">
            Nous gérons actuellement des mandats actifs couvrant les marchés LATAM (Brésil,
            Argentine), suisse onshore, CIS/CEE, offshore italien, grec et chypriote,
            Hong Kong, Singapour, britannique et sud-africain. Consultez nos{" "}
            <Link href="/en/jobs" className="text-[#C9A14A] hover:underline">
              postes actifs
            </Link>{" "}
            pour une vue complète des opportunités en cours.
          </p>

          <hr className="border-white/10" />

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/en/jobs"
              className="text-sm text-white/60 hover:text-white underline underline-offset-4"
            >
              Voir les mandats actifs
            </Link>
            <Link
              href="/en/markets"
              className="text-sm text-white/60 hover:text-white underline underline-offset-4"
            >
              Explorer les marchés
            </Link>
            <Link
              href="/en/about"
              className="text-sm text-white/60 hover:text-white underline underline-offset-4"
            >
              À propos d'Executive Partners
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}
