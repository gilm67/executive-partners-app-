export const metadata = {
  title: "Über uns – Executive Partners",
  description:
    "Spezialisierte Executive-Search-Beratung für Private Banking und Wealth Management mit Sitz in Genf.",
};

export default function AboutDePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
          Über Executive Partners
        </h1>
        <p className="text-sm md:text-base text-slate-300 mb-4">
          Executive Partners ist eine auf{" "}
          <span className="font-medium">
            Private Banking &amp; Wealth Management
          </span>{" "}
          fokussierte Executive-Search-Boutique mit Sitz in Genf und Mandaten in
          den wichtigsten Finanzzentren.
        </p>
        <p className="text-sm text-slate-300 mb-4">
          Wir arbeiten mit Schweizer und internationalen Privatbanken,
          Vermögensverwaltern und Finanzinstituten, die{" "}
          <span className="font-medium">
            erfahrene Private Banker, Marktführer und Schlüsselpersonen
          </span>{" "}
          suchen, die sofortige Wirkung in Bezug auf Buch, Governance und
          Geschäftsentwicklung entfalten.
        </p>
        <p className="text-sm text-slate-300">
          Unser Ansatz verbindet{" "}
          <span className="font-medium">Datenanalyse</span>,{" "}
          <span className="font-medium">tiefes Marktverständnis</span> und{" "}
          <span className="font-medium">individuelle Betreuung</span> von
          Auftraggebern und Kandidaten.
        </p>
      </section>
    </main>
  );
}