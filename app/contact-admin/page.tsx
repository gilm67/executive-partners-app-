// app/contact-admin/page.tsx
import { NextResponse } from "next/server";
import { getSheetsClient } from "@/lib/sheets";
import { DateTime } from "luxon";

// Server-only (runs on Node, not Edge)
export const runtime = "nodejs";
export const revalidate = 30; // revalidate list every 30s

type Row = {
  Timestamp: string;
  Name: string;
  Email: string;
  Message: string;
  JobID: string;
  Role: string;
  Location: string;
  Market: string;
  Source: string;
  UserAgent: string;
  Notes: string;
};

type Search = { token?: string };

export default async function ContactAdminPage(props: {
  // Next.js 15: searchParams is a Promise
  searchParams: Promise<Search>;
}) {
  const { token } = await props.searchParams;

  // Simple token gate (reuse APP_ADMIN_TOKEN)
  const required = process.env.APP_ADMIN_TOKEN || "";
  if (!required) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10 text-neutral-200">
        <h1 className="text-xl font-semibold mb-2">Contact Admin</h1>
        <p className="text-sm text-red-400">
          Server missing APP_ADMIN_TOKEN. Set it in .env.local / Vercel env.
        </p>
      </main>
    );
  }
  if (token !== required) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10 text-neutral-200">
        <h1 className="text-xl font-semibold mb-2">Unauthorized</h1>
        <p className="text-sm text-neutral-400">
          Add <code>?token=YOUR_APP_ADMIN_TOKEN</code> to the URL.
        </p>
      </main>
    );
  }

  // Fetch recent Applications
  const sheets = await getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID!,
    range: "Applications!A:K", // Timestamp .. Notes (11 columns)
    majorDimension: "ROWS",
  });

  const rows = res.data.values || [];
  const [header, ...data] = rows;

  const items: Row[] = (data || []).map((r) => ({
    Timestamp: r[0] || "",
    Name: r[1] || "",
    Email: r[2] || "",
    Message: r[3] || "",
    JobID: r[4] || "",
    Role: r[5] || "",
    Location: r[6] || "",
    Market: r[7] || "",
    Source: r[8] || "",
    UserAgent: r[9] || "",
    Notes: r[10] || "",
  }));

  // Sort newest first by Timestamp (fallback to raw order)
  items.sort((a, b) => {
    const da = Date.parse(a.Timestamp) || 0;
    const db = Date.parse(b.Timestamp) || 0;
    return db - da;
  });

  const last = items.slice(0, 50);

  const fmt = (iso: string) => {
    if (!iso) return "—";
    try {
      return DateTime.fromISO(iso, { zone: "utc" })
        .setZone("Europe/Zurich")
        .toFormat("yyyy-LL-dd HH:mm:ss");
    } catch {
      // If it was already a formatted string like "yyyy-MM-dd HH:mm:ss"
      // try parse as local and display as-is
      return iso;
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 text-neutral-200">
      <div className="mb-6 flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Contact Inquiries</h1>
          <p className="text-sm text-neutral-400">
            Showing the latest {last.length} rows from <code>Applications</code>.
          </p>
        </div>
        <a
          href="/api/contact"
          className="text-sm text-neutral-400 underline hover:text-neutral-200"
        >
          View JSON
        </a>
      </div>

      <div className="overflow-x-auto rounded-xl border border-neutral-800">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-900/60 text-neutral-300">
            <tr>
              <Th>Timestamp (Zurich)</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>JobID</Th>
              <Th>Market</Th>
              <Th>Message</Th>
              <Th>Source</Th>
              <Th>UserAgent</Th>
              <Th>Notes</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {last.map((r, i) => (
              <tr key={i} className="hover:bg-neutral-900/40">
                <Td mono>{fmt(r.Timestamp)}</Td>
                <Td>{r.Name || "—"}</Td>
                <Td mono>{r.Email || "—"}</Td>
                <Td>{r.Role || "—"}</Td>
                <Td mono>{r.JobID || "—"}</Td>
                <Td>{r.Market || r.Location || "—"}</Td>
                <Td className="max-w-[28rem]">
                  <span className="line-clamp-3 whitespace-pre-wrap">{r.Message || "—"}</span>
                </Td>
                <Td>{r.Source || "—"}</Td>
                <Td className="max-w-[28rem]">
                  <span className="line-clamp-2 break-all">{r.UserAgent || "—"}</span>
                </Td>
                <Td>{r.Notes || "—"}</Td>
              </tr>
            ))}
            {last.length === 0 && (
              <tr>
                <td className="p-4 text-neutral-400" colSpan={10}>
                  No applications yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-3 py-2 text-left font-medium">{children}</th>;
}
function Td({
  children,
  mono = false,
  className = "",
}: {
  children: React.ReactNode;
  mono?: boolean;
  className?: string;
}) {
  return (
    <td
      className={
        "px-3 py-2 align-top text-neutral-200 " +
        (mono ? "font-mono text-xs " : "") +
        className
      }
    >
      {children}
    </td>
  );
}
