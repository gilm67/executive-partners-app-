export const metadata = {
  title: "Marchés – Hubs Private Banking | Executive Partners",
  description:
    "Couverture des principaux marchés Private Banking : Suisse, UK, Europe, Moyen-Orient, Asie, Amériques.",
};

export default function MarketsFrPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
          Marchés &amp; hubs couverts
        </h1>
        <p className="text-sm md:text-base text-slate-300 mb-4">
          Nous intervenons pour des banques privées et acteurs de la gestion de
          fortune présents dans les principaux hubs financiers :
        </p>
        <ul className="list-disc list-inside text-sm text-slate-300 space-y-1 mb-4">
          <li>Suisse : Genève, Zurich, Lugano</li>
          <li>Europe : Londres, Luxembourg, Monaco</li>
          <li>Moyen-Orient : Dubaï, Abu Dhabi</li>
          <li>Asie : Singapour, Hong Kong</li>
          <li>Amériques : New York, Miami, LATAM offshore</li>
        </ul>
        <p className="text-sm text-slate-300">
          Selon la domiciliation de votre clientèle, votre licence actuelle
          et la structure de booking, nous identifions les plateformes les plus
          pertinentes et les zones ayant le plus fort potentiel de{" "}
          <span className="font-medium">portabilité réelle</span>.
        </p>
      </section>
    </main>
  );
}
