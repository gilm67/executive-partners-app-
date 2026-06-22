import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://www.execpartners.ch";

export const metadata: Metadata = {
  title: { absolute: "Chasseur de Têtes Banque Privée Genève | Executive Partners" },
  description:
    "Executive Partners est le cabinet chasseur de têtes spécialisé en banque privée à Genève. Placement confidentiel de Relationship Managers seniors, Chefs de desk et Directeurs de marché auprès des principales banques privées suisses et internationales. 200+ placements. 98 % de rétention.",
  alternates: {
    canonical: `${SITE}/fr/chasseur-de-tetes-banque-privee-geneve`,
    languages: { en: `${SITE}/en/private-banking-recruiter-geneva` },
  },
  openGraph: {
    title: "Chasseur de Têtes Banque Privée Genève | Executive Partners",
    description: "Cabinet de recrutement exclusivement spécialisé en banque privée à Genève. Placement confidentiel de banquiers privés seniors en Suisse et à l'international.",
    url: `${SITE}/fr/chasseur-de-tetes-banque-privee-geneve`,
    images: [{ url: `${SITE}/og.webp` }],
  },
  robots: { index: true, follow: true },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "EmploymentAgency"],
  name: "Executive Partners",
  legalName: "Executive Partners Sàrl",
  description: "Cabinet chasseur de têtes spécialisé en banque privée et gestion de patrimoine, basé à Genève. Placement de banquiers privés seniors dans les principales places financières mondiales.",
  url: SITE,
  inLanguage: "fr",
  address: { "@type": "PostalAddress", addressLocality: "Genève", addressCountry: "CH" },
  areaServed: [
    { "@type": "City", name: "Genève" },
    { "@type": "City", name: "Zurich" },
    { "@type": "City", name: "Dubaï" },
    { "@type": "City", name: "Singapour" },
  ],
  sameAs: ["https://www.linkedin.com/company/executive-partners-sarl", SITE],
};

export default function ChasseurDeTetesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <main className="min-h-screen bg-[#0B0E13] text-white py-20 px-4">
        <div className="mx-auto max-w-3xl space-y-10">

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#C9A14A] mb-4">
              Genève · Exclusivement banque privée
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight mb-6">
              Chasseur de Têtes Banque Privée à Genève
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Executive Partners est un cabinet de recrutement exécutif basé à Genève, spécialisé
              exclusivement en banque privée et gestion de patrimoine. Nous n&apos;intervenons pas
              dans d&apos;autres secteurs financiers. Notre seul marché est le front-office de la
              banque privée — Relationship Managers, Conseillers en investissement, Chefs de desk,
              Directeurs de marché.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[["200+", "Placements réalisés"], ["98 %", "Rétention 12 mois"], ["14+", "Hubs mondiaux"]].map(([val, lbl]) => (
              <div key={lbl} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                <p className="text-2xl font-bold text-[#C9A14A]">{val}</p>
                <p className="text-xs text-white/50 mt-1">{lbl}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/en/apply" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-[#C9A14A] text-black hover:opacity-90 transition">
              Candidature confidentielle
            </Link>
            <Link href="/en/hiring-managers/brief" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold border border-white/20 text-white hover:bg-white/10 transition">
              Soumettre un mandat
            </Link>
          </div>

          <hr className="border-white/10" />

          <section>
            <h2 className="text-2xl font-semibold mb-4">Notre approche du recrutement en banque privée</h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                Un chasseur de têtes en banque privée n&apos;est pas un généraliste qui connaît
                vaguement les marchés financiers. À Genève, où la place est petite et les réputations
                se construisent sur des décennies, les professionnels qui nous contactent attendent
                un interlocuteur qui connaît les acteurs, comprend la spécificité de chaque mandat
                et peut qualifier un candidat au-delà du volume d&apos;AUM déclaré.
              </p>
              <p>
                Chaque dossier candidat présenté à un établissement a fait l&apos;objet d&apos;une
                analyse de portabilité, d&apos;une revue du business plan et d&apos;un profilage
                compliance. Nous ne transmettons pas de CV. Nous présentons des candidats qualifiés
                avec un contexte marché, une estimation réaliste de portabilité et un business case
                structuré.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Marchés et postes couverts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Senior Relationship Manager (onshore Suisse)",
                "Senior Relationship Manager (marché international)",
                "Conseiller en investissement / Investment Advisor",
                "Chef de desk / Team Head",
                "Directeur de marché",
                "Responsable EAM / Gestionnaire de fortune indépendant",
              ].map((role) => (
                <div key={role} className="flex items-start gap-2 text-white/70 text-sm">
                  <span className="text-[#C9A14A] mt-0.5">→</span>
                  <span>{role}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Marchés géographiques actifs</h2>
            <p className="text-white/70 leading-relaxed">
              Nos mandats couvrent les principales places mondiales de banque privée : Genève,
              Zurich, Lugano, Londres, Dubaï DIFC, Riyad, Singapour, Hong Kong, New York, Miami,
              Paris, Milan, Madrid, Lisbonne et Tel Aviv. Pour chaque marché, nous disposons
              d&apos;une cartographie des acteurs, des benchmarks de rémunération et d&apos;une
              compréhension des dynamiques réglementaires locales.
            </p>
          </section>

          <hr className="border-white/10" />
          <div className="flex flex-wrap gap-4">
            <Link href="/fr/marches/geneve" className="text-sm text-white/60 hover:text-white underline underline-offset-4">Marché de Genève</Link>
            <Link href="/fr/candidats" className="text-sm text-white/60 hover:text-white underline underline-offset-4">Pour les candidats</Link>
            <Link href="/en/jobs" className="text-sm text-white/60 hover:text-white underline underline-offset-4">Mandats actifs</Link>
            <Link href="/fr" className="text-sm text-white/60 hover:text-white underline underline-offset-4">Accueil</Link>
          </div>
        </div>
      </main>
    </>
  );
}
