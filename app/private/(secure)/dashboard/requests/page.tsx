// app/private/(secure)/dashboard/requests/page.tsx
import Link from "next/link";
import { cookies, headers } from "next/headers";
import { requireAdmin } from "@/app/private/lib/require-admin";

export const dynamic = "force-dynamic";

type ReqRow = {
  id: string;
  created_at?: string | null;
  requester_email?: string | null;
  requester_org?: string | null;
  request_type?: "profile" | "bp" | "portability" | string;
  profile_id?: string | null;
  status?: "pending" | "approved" | "denied" | string;
  message?: string | null;
};

function fmt(iso?: string | null) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return d.toLocaleString("en-CH", { dateStyle: "medium", timeStyle: "short" });
}

function getOriginFromHeaders() {
  // Works reliably on Vercel (prod + preview) and behind proxies
  const h = headers();
  const proto = h.get("x-forwarded-proto") ?? "https";
  const host = h.get("x-forwarded-host") ?? h.get("host");
  return host ? `${proto}://${host}` : "";
}

async function fetchRequests(): Promise<ReqRow[]> {
  const cookieStore = cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const origin = getOriginFromHeaders();

  const res = await fetch(`${origin}/api/private/admin/requests`, {
    method: "GET",
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });

  const json = await res.json().catch(() => null);
  return json?.ok && Array.isArray(json.data) ? (json.data as ReqRow[]) : [];
}

export default async function AdminRequestsPage() {
  // ✅ Hard protection: only admins can view this page
  await requireAdmin();

  const rows = await fetchRequests();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 text-white">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/60">Admin</p>
          <h1 className="mt-2 text-2xl md:text-3xl font-semibold">
            Access Requests
          </h1>
          <p className="mt-2 text-white/70">
            Approve or deny BP Simulator / Portability / Profile access.
          </p>
        </div>

        <Link
          href="/private"
          className="inline-flex rounded-2xl border border-white/15 px-4 py-2 text-sm text-white/80 hover:text-white hover:border-white/25"
        >
          Back to Private →
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full min-w-[1000px] text-sm">
          <thead className="text-white/70">
            <tr className="border-b border-white/10">
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-left">Requester</th>
              <th className="p-3 text-left">Org</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Profile</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Message</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="p-4 text-white/70" colSpan={7}>
                  No requests yet (or you are not authenticated as admin).
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} className="border-b border-white/10 align-top">
                  <td className="p-3 whitespace-nowrap">{fmt(r.created_at)}</td>
                  <td className="p-3">{r.requester_email ?? "—"}</td>
                  <td className="p-3">{r.requester_org ?? "—"}</td>
                  <td className="p-3 whitespace-nowrap">{r.request_type ?? "—"}</td>
                  <td className="p-3 whitespace-nowrap">
                    {r.profile_id ? (
                      <code className="text-xs text-white/70">{r.profile_id}</code>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="p-3 whitespace-nowrap">{r.status ?? "—"}</td>
                  <td className="p-3 max-w-[420px] text-white/70">
                    {r.message ?? "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-5 text-xs text-white/50">
        API: <code>/api/private/admin/requests</code>
      </p>
    </main>
  );
}