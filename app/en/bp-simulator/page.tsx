// app/en/bp-simulator/page.tsx
import type { Metadata } from "next";
import React from "react";
import BpSimulatorClient from "./BpSimulatorClient";

import { requirePrivateSession } from "@/app/private/lib/require-session";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import AccessRequestGate from "@/app/private/components/AccessRequestGate";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Business Plan Simulator — Executive Partners",
  description:
    "Model AuM portability, revenue projections and net margin scenarios with our AI-driven simulator for Private Bankers.",
};

type Status = "pending" | "approved" | "rejected";

function normalizeStatus(input: unknown): Status {
  const s = String(input || "").toLowerCase();
  if (s === "approved") return "approved";
  if (s === "rejected") return "rejected";
  return "pending";
}

/* ✅ SAME SHELL AS PORTABILITY */
function GateShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white body-grain">
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

function BpTeaser() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
        <p className="inline-flex items-center gap-2 rounded-full bg-brandGold/10 px-4 py-1 text-xs font-semibold text-brandGoldPale ring-1 ring-brandGold/40">
          Executive Partners · Private Tool Preview
        </p>

        <h1 className="mt-3 text-3xl font-bold text-white md:text-4xl">
          Business Plan Simulator — Preview
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-white/75 md:text-base">
          A bank-style business case builder to stress-test portability assumptions
          (NNM, ROA, revenues, margins) before you engage with a platform.
        </p>
      </div>
    </div>
  );
}

export default async function Page() {
  // ✅ preserve return path after auth
  const session = await requirePrivateSession(undefined, "/en/bp-simulator");

  const supabaseAdmin = await getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("private_profile_access_requests")
    .select("id,status,created_at")
    .eq("requester_email", session.email)
    .eq("request_type", "bp")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const status: Status = error ? "pending" : normalizeStatus(data?.status);

  /* ✅ APPROVED → REAL TOOL */
  if (status === "approved") {
    return <BpSimulatorClient />;
  }

  /* ❌ NOT APPROVED → SAME LOOK AS PORTABILITY */
  return (
    <GateShell>
      <BpTeaser />
      <AccessRequestGate
        requestType="bp"
        title="Business Plan Simulator — Access required"
        description="Request access to unlock the full simulator."
        status={status}
        requestId={data?.id ?? null}
        refreshHref="/en/bp-simulator"
      />
    </GateShell>
  );
}