export const metadata = {
  title: "Business Plan Simulator – Deutsche Version | Executive Partners",
  description:
    "Tool zur Bewertung von Portabilität, NNM und Profitabilität für Private Banker.",
};

export default function BpSimulatorDePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
          Business Plan Simulator (deutsche Version)
        </h1>
        <p className="text-sm md:text-base text-slate-300 mb-4">
          Mit unserem Business Plan Simulator lassen sich{" "}
          <span className="font-medium">Portabilität des Buches</span>,{" "}
          <span className="font-medium">NNM über 3 Jahre</span> und{" "}
          <span className="font-medium">Netto-Marge</span> unter
          verschiedenen Plattform-Szenarien modellieren.
        </p>
        <p className="text-sm text-slate-300 mb-4">
          Die ausführliche deutsche Version des Tools befindet sich in
          Vorbereitung. Der vollständige Funktionsumfang ist aktuell auf Englisch
          über{" "}
          <a href="/en/bp-simulator" className="text-amber-300 underline">
            Business Plan Simulator (EN)
          </a>{" "}
          verfügbar.
        </p>
        <p className="text-sm text-slate-300">
          Gerne erstellen wir für Sie einen{" "}
          <span className="font-medium">massgeschneiderten Business Plan</span>{" "}
          (AUM, NNM, ROA, Netto-Marge) inklusive Zusammenfassung auf Deutsch für
          die Zielbank.
        </p>
      </section>
    </main>
  );
}