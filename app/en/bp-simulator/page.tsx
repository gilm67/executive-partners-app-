// app/en/bp-simulator/page.tsx
import type { Metadata } from "next";
import React from "react";
import { cookies } from "next/headers";

import BpSimulatorClient from "./BpSimulatorClient";
import { requirePrivateSession } from "@/app/private/lib/require-session";
import AccessRequestGate from "@/app/private/components/AccessRequestGate";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Business Plan Simulator — Executive Partners",
  description:
    "Model AuM portability, revenue projections and net margin scenarios with our AI-driven simulator for Private Bankers.",
};

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

/**
 * ✅ Server-only approval check
 * Uses the SAME source-of-truth as /api/private/me:
 * private_sessions + private_profile_access_requests (requester_email + request_type)
 */
async function isBpApproved(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionHash = cookieStore.get("ep_private")?.value || null;
    if (!sessionHash) return false;

    const supabase = await getSupabaseAdmin();
    const nowIso = new Date().toISOString();

    // 1) Validate active session
    const { data: session, error: sessErr } = await supabase
      .from("private_sessions")
      .select("email, expires_at, revoked_at")
      .eq("session_hash", sessionHash)
      .is("revoked_at", null)
      .gt("expires_at", nowIso)
      .maybeSingle();

    if (sessErr || !session?.email) return false;

    const email = String(session.email).trim().toLowerCase();
    if (!email) return false;

    // 2) Latest BP access request (same table as /api/private/me)
    const { data: req, error: reqErr } = await supabase
      .from("private_profile_access_requests")
      .select("status")
      .eq("requester_email", email)
      .eq("request_type", "bp")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (reqErr) return false;

    return String(req?.status || "").toLowerCase() === "approved";
  } catch {
    return false;
  }
}

export default async function Page() {
  // 🔐 Must be logged in
  await requirePrivateSession(undefined, "/en/bp-simulator");

  // ✅ Decide server-side (no flicker)
  const approved = await isBpApproved();

  return (
    <GateShell>
      <BpTeaser />

      <div className="mt-8">
        {approved ? (
          <BpSimulatorClient />
        ) : (
          <AccessRequestGate
            requestType="bp"
            title="Business Plan Simulator — Access required"
            description="Request access to unlock the full simulator."
            refreshHref="/en/bp-simulator"
          />
        )}
      </div>
    </GateShell>
  );
}