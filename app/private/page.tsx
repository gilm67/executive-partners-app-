export const dynamic = "force-dynamic";
export const revalidate = 0;

import { requirePrivateSession } from "./lib/require-session";
import { getPrivateProfiles } from "./lib/getPrivateProfiles";
import RequestAccessButton from "./components/RequestAccessButton";

export default async function PrivatePage() {
  // 🔐 HARD GATE — validates cookie + DB session + expiry
  await requirePrivateSession();

  const profiles = await getPrivateProfiles();

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-semibold">Private Candidate Profiles</h1>

      {profiles.length === 0 ? (
        <p className="text-white/60">No live profiles available.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {profiles.map((p: any) => (
            <div key={p.id} className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h2 className="mb-2 text-lg font-medium">{p.headline}</h2>

              <div className="mb-3 text-sm text-white/70">
                {String(p.market).toUpperCase()} · {p.seniority}
              </div>

              <ul className="mb-4 space-y-1 text-sm text-white/80">
                <li>
                  <strong>AUM:</strong> {p.aum_band}
                </li>
                <li>
                  <strong>Book:</strong> {p.book_type}
                </li>
                <li>
                  <strong>Languages:</strong> {(p.languages ?? []).join(", ")}
                </li>
                <li>
                  <strong>Portability:</strong> {p.portability}
                </li>
                <li>
                  <strong>Availability:</strong> {p.availability}
                </li>
              </ul>

              <p className="text-sm text-white/70">{p.notes_public}</p>

              {/* ✅ Step 8: Access request */}
              <RequestAccessButton profileId={p.id} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}