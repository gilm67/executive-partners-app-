export const metadata = {
  title: "À propos – Executive Partners",
  description:
    "Cabinet de recrutement spécialisé en Banque Privée et Wealth Management, basé à Genève avec une portée internationale.",
};

export default function AboutFrPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
          À propos d&apos;Executive Partners
        </h1>
        <p className="text-sm md:text-base text-slate-300 mb-4">
          Executive Partners est un cabinet de recrutement spécialisé en{" "}
          <span className="font-medium">Banque Privée &amp; Wealth Management</span>,
          basé à Genève et actif dans les principaux hubs financiers.
        </p>
        <p className="text-sm text-slate-300 mb-4">
          Nous travaillons avec des banques privées suisses et internationales,
          des gérants de fortune et des groupes financiers qui recherchent des{" "}
          <span className="font-medium">
            banquiers privés expérimentés, leaders de marché et profils clés
          </span>{" "}
          capables d&apos;apporter une valeur immédiate en termes de portefeuille,
          de gouvernance et de développement commercial.
        </p>
        <p className="text-sm text-slate-300">
          Notre approche combine{" "}
          <span className="font-medium">analyse de données</span>,{" "}
          <span className="font-medium">connaissance fine des marchés</span> et{" "}
          <span className="font-medium">accompagnement sur mesure</span> des
          candidats comme des employeurs.
        </p>
      </section>
    </main>
  );
}