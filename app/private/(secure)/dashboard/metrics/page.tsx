import { requireAdmin } from "@/app/private/lib/require-admin";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Row = {
  status: string | null;
  created_at: string;
  requester_email: string | null;
  requester_org: string | null;
};

function dayKey(iso: string) {
  // YYYY-MM-DD in UTC (stable for grouping)
  return new Date(iso).toISOString().slice(0, 10);
}

function lastNDaysKeys(n: number) {
  const out: string[] = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setUTCDate(d.getUTCDate() - i);
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}

function requesterKey(r: Row) {
  const org = (r.requester_org ?? "").trim();
  if (org) return org;
  return String(r.requester_email ?? "unknown").trim().toLowerCase();
}

export default async function AdminMetricsPage() {
  await requireAdmin();
  const supabaseAdmin = await getSupabaseAdmin();

  const { data, error } = await supabaseAdmin
    .from("private_profile_access_requests")
    .select("status, created_at, requester_email, requester_org");

  if (error) {
    return (
      <div className="container-max py-10">
        <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 ring-1 ring-white/10">
          <h1 className="text-xl font-semibold">Metrics</h1>
          <p className="mt-3 text-sm text-red-200">
            Query failed. Check server logs.
          </p>
        </div>
      </div>
    );
  }

  const rows: Row[] = (data as any) ?? [];

  const normStatus = (s: string | null) => String(s ?? "").toLowerCase();

  const total = rows.length;
  const pending = rows.filter((r) => normStatus(r.status) === "pending").length;
  const approved = rows.filter((r) => normStatus(r.status) === "approved").length;
  const rejected = rows.filter((r) => normStatus(r.status) === "rejected").length;

  // last 7 days approvals (simple)
  const now = Date.now();
  const last7 = rows.filter((r) => {
    if (normStatus(r.status) !== "approved") return false;
    const t = new Date(r.created_at).getTime();
    return now - t <= 7 * 24 * 60 * 60 * 1000;
  }).length;

  // Top requesters
  const countsByRequester = new Map<string, number>();
  for (const r of rows) {
    const k = requesterKey(r);
    countsByRequester.set(k, (countsByRequester.get(k) ?? 0) + 1);
  }
  const topRequesters = Array.from(countsByRequester.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  // Requests per day (last 14 days)
  const days = lastNDaysKeys(14);
  const perDay = new Map<string, number>();
  for (const d of days) perDay.set(d, 0);

  for (const r of rows) {
    const d = dayKey(r.created_at);
    if (perDay.has(d)) perDay.set(d, (perDay.get(d) ?? 0) + 1);
  }

  return (
    <div className="container-max py-10">
      <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 ring-1 ring-white/10">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-xl font-semibold">Metrics</h1>
          <div className="text-xs text-white/50">Private access requests</div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Total requests" value={total} />
          <Stat label="Pending" value={pending} />
          <Stat label="Approved" value={approved} />
          <Stat label="Rejected" value={rejected} />
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Stat label="Approvals (last 7 days)" value={last7} />
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm font-semibold">Top requesters</div>
            <div className="mt-3 space-y-2 text-sm">
              {topRequesters.length === 0 ? (
                <div className="text-white/60">No data</div>
              ) : (
                topRequesters.map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-3">
                    <div className="text-white/80 truncate">{k}</div>
                    <div className="text-white/60">{v}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm font-semibold">
              Requests per day (last 14 days)
            </div>
            <div className="mt-3 space-y-2 text-sm">
              {days.map((d) => (
                <div key={d} className="flex items-center justify-between gap-3">
                  <div className="text-white/70">{d}</div>
                  <div className="text-white/60">{perDay.get(d) ?? 0}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-6 text-xs text-white/40">
          Tip: this page is server-rendered and always fresh (
          <code className="text-white/60">force-dynamic</code>).
        </p>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs text-white/50">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-white/90">{value}</div>
    </div>
  );
}