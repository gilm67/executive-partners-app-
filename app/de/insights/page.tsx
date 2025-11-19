export const metadata = {
  title: "Insights & Marktanalysen – Private Banking | Executive Partners",
  description:
    "Marktanalysen, Vergütungstrends und Mobilität im Private Banking und Wealth Management.",
};

export default function InsightsDePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
          Insights &amp; Marktanalysen
        </h1>
        <p className="text-sm md:text-base text-slate-300 mb-4">
          In unseren Inhalten fokussieren wir auf Themen, die für Führungskräfte
          und Private Banker entscheidend sind:
        </p>
        <ul className="list-disc list-inside text-sm text-slate-300 space-y-1 mb-4">
          <li>Vergütungs- und Bonustrends im Private Banking</li>
          <li>Mobilität von Bankern und Team-Moves</li>
          <li>Entwicklung von Plattformen und Service-Modellen</li>
          <li>Regulatorik, Booking und deren Einfluss auf Portabilität</li>
        </ul>
        <p className="text-sm text-slate-300">
          Eine Auswahl unserer Inhalte wird schrittweise in deutscher Sprache
          verfügbar sein. Bis dahin empfehlen wir unsere englischen Beiträge
          auf{" "}
          <a href="/en/insights" className="text-amber-300 underline">
            Insights (EN)
          </a>
          .
        </p>
      </section>
    </main>
  );
}