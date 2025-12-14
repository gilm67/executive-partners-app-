export const dynamic = "force-dynamic";
export const revalidate = 0;

import { requireAdmin } from "@/app/private/lib/require-admin";
import { supabaseAdmin } from "@/lib/supabase-server";

type ReqRow = {
  id: string;
  created_at: string;
  status: string;
  requester_email: string;
  requester_org: string | null;
  message: string | null;
  profile_id: string;
  profile?: {
    headline?: string | null;
    market?: string | null;
    seniority?: string | null;
    aum_band?: string | null;
    book_type?: string | null;
  } | null;
};

async function fetchRequests(): Promise<ReqRow[]> {
  const { data, error } = await supabaseAdmin
    .from("private_profile_access_requests")
    .select(`
      id,
      created_at,
      status,
      requester_email,
      requester_org,
      message,
      profile_id,
      profile:private_profiles (
        headline,
        market,
        seniority,
        aum_band,
        book_type
      )
    `)
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data as ReqRow[];
}

export default async function AdminRequestsPage() {
  // 🔐 HARD ADMIN GATE (cookie + DB + role)
  await requireAdmin();

  const rows = await fetchRequests();

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Access Requests</h1>
          <p className="mt-1 text-sm text-white/60">
            Review and approve/deny discreet profile access requests.
          </p>
        </div>

        <a
          href="/private"
          className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
        >
          Back to Private
        </a>
      </div>

      {rows.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/70">
          No requests yet.
        </div>
      ) : (
        <div className="space-y-4">
          {rows.map((r) => (
            <div key={r.id} className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm text-white/70">
                  <span className="font-medium text-white">{r.requester_email}</span>
                  {r.requester_org ? <span> · {r.requester_org}</span> : null}
                  <span className="mx-2 text-white/30">•</span>
                  <span>{new Date(r.created_at).toLocaleString()}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/80">
                    {r.status}
                  </span>

                  <form
                    action={`/api/private/admin/requests/${r.id}/status`}
                    method="POST"
                  >
                    <input type="hidden" name="status" value="approved" />
                    <button className="rounded-lg bg-white px-3 py-2 text-xs font-medium text-black hover:opacity-90">
                      Approve
                    </button>
                  </form>

                  <form
                    action={`/api/private/admin/requests/${r.id}/status`}
                    method="POST"
                  >
                    <input type="hidden" name="status" value="denied" />
                    <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
                      Deny
                    </button>
                  </form>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-4">
                <div className="text-sm font-medium">
                  {r.profile?.headline || "Profile"}
                </div>
                <div className="mt-1 text-xs text-white/70">
                  {(r.profile?.market || "—").toUpperCase()} ·{" "}
                  {r.profile?.seniority || "—"} · AUM:{" "}
                  {r.profile?.aum_band || "—"} · Book:{" "}
                  {r.profile?.book_type || "—"}
                </div>

                {r.message ? (
                  <p className="mt-3 text-sm text-white/75">{r.message}</p>
                ) : (
                  <p className="mt-3 text-sm text-white/40">No message.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}