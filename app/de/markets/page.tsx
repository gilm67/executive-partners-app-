export const metadata = {
  title: "Märkte – Private-Banking-Hubs | Executive Partners",
  description:
    "Abdeckung der wichtigsten Private-Banking-Märkte: Schweiz, UK, Europa, Nahost, Asien, Amerika.",
};

export default function MarketsDePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
          Abgedeckte Märkte &amp; Hubs
        </h1>
        <p className="text-sm md:text-base text-slate-300 mb-4">
          Wir arbeiten mit Private-Banking-Instituten und Wealth-Management-Plattformen
          in den wichtigsten Finanzzentren:
        </p>
        <ul className="list-disc list-inside text-sm text-slate-300 space-y-1 mb-4">
          <li>Schweiz: Genf, Zürich, Lugano</li>
          <li>Europa: London, Luxemburg, Monaco</li>
          <li>Nahost: Dubai, Abu Dhabi</li>
          <li>Asien: Singapur, Hongkong</li>
          <li>Amerika: New York, Miami, LATAM Offshore</li>
        </ul>
        <p className="text-sm text-slate-300">
          Abhängig von der Domizilierung Ihrer Kundschaft, Ihrem Lizenz-Setup
          und der Booking-Struktur identifizieren wir die Plattformen mit dem
          höchsten Potenzial für{" "}
          <span className="font-medium">reale Portabilität</span>.
        </p>
      </section>
    </main>
  );
}