export const metadata = {
  title: "Analyses & Insights – Private Banking | Executive Partners",
  description:
    "Analyses de marché, tendances de rémunération et mobilité dans la banque privée et le wealth management.",
};

export default function InsightsFrPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
          Analyses &amp; insights marché
        </h1>
        <p className="text-sm md:text-base text-slate-300 mb-4">
          Dans nos contenus, nous couvrons les principaux thèmes pour les
          dirigeants et banquiers privés :
        </p>
        <ul className="list-disc list-inside text-sm text-slate-300 space-y-1 mb-4">
          <li>tendances de rémunération et bonus dans la banque privée</li>
          <li>mobilité des banquiers et mouvements d&apos;équipes</li>
          <li>évolution des plateformes et des modèles de service</li>
          <li>réglementation, booking et impacts sur la portabilité</li>
        </ul>
        <p className="text-sm text-slate-300">
          La version française détaillée d&apos;une sélection d&apos;articles
          sera progressivement mise en ligne. En attendant, vous pouvez
          consulter nos contenus en anglais sur la page{" "}
          <a href="/en/insights" className="text-amber-300 underline">
            Insights (EN)
          </a>
          .
        </p>
      </section>
    </main>
  );
}