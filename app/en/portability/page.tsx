// app/en/portability/page.tsx
import React from "react";
import { requirePrivateSession } from "@/app/private/lib/require-session";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import PortabilityClient from "./PortabilityClient";
import AccessRequestGate from "@/app/private/components/AccessRequestGate";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Status = "pending" | "approved" | "rejected";

function normalizeStatus(input: unknown): Status {
  const s = String(input || "").toLowerCase();
  if (s === "approved") return "approved";
  if (s === "rejected") return "rejected";
  return "pending";
}

function GateShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white body-grain portability-page">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 420px at 18% -10%, rgba(201,161,74,.22) 0%, rgba(201,161,74,0) 55%), radial-gradient(1000px 380px at 110% 0%, rgba(245,231,192,.20) 0%, rgba(245,231,192,0) 60%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 py-8 md:py-12">
        {children}
      </div>
    </main>
  );
}

export default async function PortabilityPage() {
  // ✅ preserves "return to /en/portability" if user must authenticate
  const session = await requirePrivateSession(undefined, "/en/portability");

  const supabaseAdmin = await getSupabaseAdmin();

  const { data, error } = await supabaseAdmin
    .from("private_profile_access_requests")
    .select("id,status,created_at")
    .eq("requester_email", session.email)
    .eq("request_type", "portability")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  // ✅ if query fails OR no row yet => pending
  const status: Status = error ? "pending" : normalizeStatus(data?.status);

  if (status !== "approved") {
    return (
      <GateShell>
        <AccessRequestGate
          requestType="portability"
          title="Portability Readiness Score™ — Access required"
          description="Request access to unlock the full diagnostic."
          status={status}
          requestId={data?.id ?? null}
          refreshHref="/en/portability"
        />
      </GateShell>
    );
  }

  return <PortabilityClient />;
}