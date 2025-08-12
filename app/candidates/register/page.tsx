"use client";

export default function RegisterPage() {
  const MARKETS = [
    "CH Onshore",
    "UK",
    "US",
    "MEA",
    "LATAM",
    "Brazil",
    "Argentina",
    "Conosur",
    "CIS",
    "CEE",
    "Germany",
    "Benelux",
    "Nordics",
    "Asia",
    "Singapore",
    "China",
    "Hong Kong",
    "Israel",
    "Turkey",
    "GCC / Dubai",
    "France",
    "Spain",
    "Portugal",
    "Italy",
    "India",
  ];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const res = await fetch("/api/register", { method: "POST", body: data });
    const json = await res.json().catch(() => ({} as any));

    if (!res.ok || !json?.ok) {
      alert(`❌ Error: ${json?.error || "Submission failed"}`);
      return;
    }
    alert("✅ Submitted. Thank you!");
    form.reset();
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Candidate Registration</h1>

      <form onSubmit={onSubmit} className="space-y-4" encType="multipart/form-data">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm text-neutral-600">Full Name</label>
            <input
              name="fullName"
              required
              className="w-full rounded-lg border px-3 py-2"
              placeholder="Jane Doe"
            />
          </div>

          <div>
            <label className="text-sm text-neutral-600">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-lg border px-3 py-2"
              placeholder="jane@example.com"
            />
          </div>

          <div>
            <label className="text-sm text-neutral-600">Target Role</label>
            <input
              name="role"
              className="w-full rounded-lg border px-3 py-2"
              placeholder="Private Banker / RM, SRM, CIO…"
            />
          </div>

          <div>
            <label className="text-sm text-neutral-600">Market</label>
            <select name="market" className="w-full rounded-lg border px-3 py-2" defaultValue="">
              <option value="" disabled>
                Select a market…
              </option>
              {MARKETS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-neutral-600">Self-reported AUM (M)</label>
            <input
              name="aum"
              className="w-full rounded-lg border px-3 py-2"
              placeholder="e.g., 250"
            />
          </div>

          <div>
            <label className="text-sm text-neutral-600">Mobility / Notice</label>
            <input
              name="mobility"
              className="w-full rounded-lg border px-3 py-2"
              placeholder="e.g., 3 months / immediately"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm text-neutral-600">Notes</label>
            <textarea
              name="notes"
              className="w-full rounded-lg border px-3 py-2"
              rows={4}
              placeholder="Anything we should know…"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm text-neutral-600">Attach CV (PDF/DOCX)</label>
            <input
              name="cv"
              type="file"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>
        </div>

        <button
          type="submit"
          className="rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
        >
          Submit
        </button>
      </form>
    </section>
  );
}