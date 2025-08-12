export default function TopTalentPage() {
  const profiles = [
    { title: "Swiss Onshore Private Banker", exp: "15 years", aum: "CHF 500M", portability: "CHF 120M in 12 months", markets: "CH Onshore, LatAm", languages: "FR, EN, ES", availability: "3 months" },
    { title: "CIO — Wealth Management", exp: "18 years", aum: "Oversight CHF 6B DPM", portability: "N/A (leadership impact)", markets: "CH, EU", languages: "EN, DE", availability: "Immediate" },
  ];
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Top Talent (Anonymous)</h1>
      <p className="text-neutral-700">Profiles are anonymized for confidentiality. Request details to proceed.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {profiles.map((p) => (
          <div key={p.title} className="rounded-2xl border border-neutral-200 p-6">
            <h2 className="text-lg font-semibold">{p.title}</h2>
            <ul className="mt-2 text-sm text-neutral-700 space-y-1">
              <li><strong>Experience:</strong> {p.exp}</li>
              <li><strong>AUM:</strong> {p.aum}</li>
              <li><strong>Portability:</strong> {p.portability}</li>
              <li><strong>Markets:</strong> {p.markets}</li>
              <li><strong>Languages:</strong> {p.languages}</li>
              <li><strong>Availability:</strong> {p.availability}</li>
            </ul>
            <a href="/contact" className="mt-4 inline-block rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-blue-800">
              Request full profile
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
