// app/portability/page.tsx
import type { Metadata } from "next";
import { requirePrivateSession } from "@/app/private/lib/require-session";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import AccessRequestGate from "@/app/private/components/AccessRequestGate";
import PortabilityClient from "@/app/en/portability/PortabilityClient";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "AUM Portability & Market Access | Executive Partners",
  description:
    "Assess AUM portability across booking centres and markets. Tools and advisory for Private Bankers planning a move.",
};

type Status = "pending" | "approved" | "rejected";

function normalizeStatus(input: unknown): Status {
  const s = String(input || "").toLowerCase();
  if (s === "approved") return "approved";
  if (s === "rejected") return "rejected";
  return "pending";
}

export default async function Page() {
  // 🔐 1) HARD AUTH — no cookie = redirect to /private/auth
  const session = await requirePrivateSession();

  // 🔐 2) CHECK PORTABILITY APPROVAL
  const supabaseAdmin = await getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("private_profile_access_requests")
    .select("id,status,created_at")
    .eq("requester_email", session.email)
    .eq("request_type", "portability")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const status: Status = error ? "pending" : normalizeStatus(data?.status);

  // 🚫 NOT APPROVED → GATE
  if (status !== "approved") {
    return (
      <main className="relative min-h-screen bg-[#0B0E13] text-white body-grain">
        <div className="relative mx-auto max-w-6xl px-4 py-10">
          <AccessRequestGate
            requestType="portability"
            title="Portability Readiness Score™ — Access required"
            description="Request access to unlock the full diagnostic."
            status={status}
            requestId={data?.id ?? null}
          />
        </div>
      </main>
    );
  }

  // ✅ APPROVED → TOOL
  return <PortabilityClient />;
}