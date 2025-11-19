export const metadata = {
  title: "Business Plan Simulator – Version française | Executive Partners",
  description:
    "Outil d’évaluation de la portabilité, du NNM et de la rentabilité pour banquiers privés.",
};

export default function BpSimulatorFrPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
          Business Plan Simulator (version française)
        </h1>
        <p className="text-sm md:text-base text-slate-300 mb-4">
          Notre Business Plan Simulator permet de modéliser la{" "}
          <span className="font-medium">portabilité de votre portefeuille</span>,
          le <span className="font-medium">NNM sur 3 ans</span> et la{" "}
          <span className="font-medium">rentabilité nette</span> dans différentes
          configurations de plateforme.
        </p>
        <p className="text-sm text-slate-300 mb-4">
          La version détaillée en français est en cours de finalisation.
          Actuellement, l&apos;outil complet est disponible en anglais via la
          page{" "}
          <a href="/en/bp-simulator" className="text-amber-300 underline">
            Business Plan Simulator (EN)
          </a>
          .
        </p>
        <p className="text-sm text-slate-300">
          Si vous souhaitez une simulation personnalisée (AUM, NNM, ROA, marge
          nette), nous pouvons préparer un{" "}
          <span className="font-medium">business plan sur mesure</span> et un
          résumé en français à destination de la banque cible.
        </p>
      </section>
    </main>
  );
}