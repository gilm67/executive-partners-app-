import { requireAdmin } from "@/app/private/lib/require-admin";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import RequestsTable, { type ReqRow } from "./requests-table.client";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function RequestsPage() {
  await requireAdmin();

  const supabaseAdmin = await getSupabaseAdmin();

  const { data, error } = await supabaseAdmin
    .from("private_profile_access_requests")
    .select(
      "id, created_at, profile_id, requester_email, requester_org, message, status, reviewed_at, reviewed_by"
    )
    .order("created_at", { ascending: false });

  const rows: ReqRow[] = Array.isArray(data)
    ? data.map((r: any) => ({
        id: String(r.id),
        created_at: String(r.created_at),
        profile_id: String(r.profile_id),
        requester_email: String(r.requester_email),
        requester_org: typeof r.requester_org === "string" ? r.requester_org : null,
        message: typeof r.message === "string" ? r.message : null,
        status: normalizeStatus(r.status),
        reviewed_at: r.reviewed_at ? String(r.reviewed_at) : null,
        reviewed_by: r.reviewed_by ? String(r.reviewed_by) : null,
      }))
    : [];

  return (
    <div className="container-max py-10">
      <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 ring-1 ring-white/10">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-xl font-semibold">Access Requests</h1>
          <div className="text-xs text-white/50">
            Total: <span className="text-white/80">{rows.length}</span>
          </div>
        </div>

        {error ? (
          <div className="mt-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
            <p className="text-sm text-red-200">
              Failed to load requests. (Check server logs)
            </p>
            <p className="mt-2 text-xs text-red-200/70">
              {typeof error?.message === "string" ? error.message : JSON.stringify(error)}
            </p>
          </div>
        ) : rows.length === 0 ? (
          <p className="mt-3 text-sm text-white/70">No requests yet.</p>
        ) : (
          <RequestsTable initialRows={rows} />
        )}
      </div>
    </div>
  );
}

function normalizeStatus(input: unknown): ReqRow["status"] {
  const s = String(input || "").toLowerCase();
  if (s === "approved") return "approved";
  if (s === "rejected") return "rejected";
  return "pending";
}