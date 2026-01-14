// app/en/portability/page.tsx
import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Timer,
  Sparkles,
  Lock,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

import { BreadcrumbSchema, ServiceSchema } from "@/components/StructuredData";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://www.execpartners.ch");

export const metadata: Metadata = {
  title: "AUM Portability Calculator | Private Banking | Executive Partners",
  description:
    "Estimate realistic AUM portability before moving banks. Confidential diagnostic for private banking relationship managers.",
  openGraph: {
    title: "Portability Score Calculator | Executive Partners",
    description:
      "A confidential portability diagnostic to assess portability readiness across clients, domicile, products and constraints.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AUM Portability Calculator | Executive Partners",
    description: "Estimate realistic book portability for private banking moves.",
  },
};

function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0B0E13] text-white body-grain">
      {/* Ambient gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 520px at 12% -12%, rgba(201,161,74,.26) 0%, rgba(201,161,74,0) 58%), radial-gradient(1000px 520px at 108% 0%, rgba(245,231,192,.18) 0%, rgba(245,231,192,0) 60%), radial-gradient(900px 520px at 45% 120%, rgba(201,161,74,.14) 0%, rgba(201,161,74,0) 55%)",
        }}
      />
      {/* Subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,.28) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.28) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 py-10 md:py-14">
        {children}
      </div>
    </main>
  );
}

function GoldCTA({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  // Uses your Tailwind brand tokens: bg-brandGold + rings
  return (
    <Link
      href={href}
      className={[
        "group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold",
        "bg-brandGold text-black hover:brightness-95",
        "ring-1 ring-brandGold/60 shadow-[0_0_0_1px_rgba(201,161,74,.15),0_14px_40px_-18px_rgba(201,161,74,.55)]",
        "transition-all",
        className,
      ].join(" ")}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

function GhostLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-white/70 hover:text-white transition-colors"
    >
      {children}
      <ChevronRight className="h-3.5 w-3.5 opacity-80" />
    </Link>
  );
}

function StatCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-black/30 p-5 shadow-sm transition hover:border-white/15 hover:bg-black/35">
      <div className="flex items-start gap-3">
        <div className="rounded-xl border border-white/10 bg-black/40 p-2">
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="mt-1 text-sm text-white/70">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-brandGold/10 px-4 py-1 text-xs font-semibold text-brandGoldPale ring-1 ring-brandGold/40">
      <Sparkles className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}

function PortabilityPublicValue() {
  return (
    <div className="space-y-10">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/35 p-6 shadow-[0_30px_80px_-60px_rgba(0,0,0,.8)] md:p-10">
        {/* Inner glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(800px 380px at 18% 18%, rgba(201,161,74,.16) 0%, rgba(201,161,74,0) 55%), radial-gradient(600px 320px at 100% 0%, rgba(245,231,192,.10) 0%, rgba(245,231,192,0) 60%)",
          }}
        />

        <div className="relative">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-3xl">
              <Pill>Executive Partners · Confidential Diagnostic</Pill>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
                AUM Portability Score
              </h1>

              <p className="mt-4 text-sm leading-relaxed text-white/75 md:text-base">
                A structured diagnostic to estimate how much of your UHNW book is
                realistically portable before a move — factoring clients, domicile mix,
                product dependencies, and onboarding constraints.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <GoldCTA href="/en/portability/request-access">
                  Estimate your real portability (2–3 min)
                </GoldCTA>

                <div className="flex items-center gap-2 text-xs text-white/65">
                  <ShieldCheck className="h-4 w-4 text-brandGoldPale" />
                  Reserved for senior private banking professionals. No data is sold or shared.
                </div>
              </div>

              <div className="mt-3">
                <GhostLink href="/private/auth?next=%2Fen%2Fportability%2Ftool">
                  I already have a code
                </GhostLink>
              </div>
            </div>

            {/* Right mini-panel */}
            <div className="relative mt-2 w-full max-w-md rounded-2xl border border-white/10 bg-black/30 p-5 md:mt-0">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Lock className="h-4 w-4 text-brandGoldPale" />
                What you get
              </div>

              <ul className="mt-4 space-y-3 text-sm text-white/75">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-brandGoldPale" />
                  Portability range + confidence band
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-brandGoldPale" />
                  Risk flags (concentration, jurisdictions, KYT)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-brandGoldPale" />
                  Negotiation angles (bridge, guarantees, support)
                </li>
              </ul>

              <div className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-black/35 px-4 py-3">
                <div className="flex items-center gap-2 text-xs text-white/70">
                  <Timer className="h-4 w-4 text-brandGoldPale" />
                  2–3 minutes
                </div>
                <div className="text-xs text-white/60">
                  Confidential advisory-grade
                </div>
              </div>
            </div>
          </div>

          {/* Stats cards */}
          <div className="relative mt-8 grid gap-4 md:grid-cols-3">
            <StatCard
              icon={<Timer className="h-5 w-5 text-brandGoldPale" />}
              title="Fast"
              desc="Designed for busy senior RMs — quick completion, clear output."
            />
            <StatCard
              icon={<ShieldCheck className="h-5 w-5 text-brandGoldPale" />}
              title="Actionable"
              desc="Portability range + friction flags + negotiation guidance."
            />
            <StatCard
              icon={<Lock className="h-5 w-5 text-brandGoldPale" />}
              title="Confidential"
              desc="Access-controlled. Used in discreet advisory discussions."
            />
          </div>
        </div>
      </section>

      {/* SECONDARY GRID */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-black/30 p-6 md:p-7">
          <h2 className="text-lg font-semibold">Sample output (illustrative)</h2>

          <div className="mt-4 grid gap-3">
            <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/75">Portability range</span>
                <span className="font-semibold text-white">65–75%</span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/75">Concentration risk</span>
                <span className="font-semibold text-white">Medium</span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/75">Friction flags</span>
                <span className="font-semibold text-white">Onboarding / KYT</span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/75">Negotiation insight</span>
                <span className="font-semibold text-white">Bridge recommended</span>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/35 p-4">
            <p className="text-xs text-white/65">
              Illustrative only. Real outputs vary based on client domicile mix, product
              constraints, and platform onboarding rules.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/30 p-6 md:p-7">
          <h2 className="text-lg font-semibold">Who it’s for</h2>

          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li>• Senior RMs considering a move (CH / Dubai / UK / SG / HK)</li>
            <li>• Team heads assessing portability and platform fit</li>
            <li>• Profiles preparing a business case for hiring committees</li>
          </ul>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/35 p-5">
            <div className="flex items-start gap-3">
              <div className="rounded-xl border border-white/10 bg-black/40 p-2">
                <ShieldCheck className="h-5 w-5 text-brandGoldPale" />
              </div>
              <div>
                <p className="text-sm font-semibold">Discreet by design</p>
                <p className="mt-1 text-xs text-white/65">
                  Built to support informed career decisions and confidential advisory
                  exchanges. Individual outcomes vary by client mix, jurisdictions,
                  products, and platform constraints.
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <GoldCTA href="/en/portability/request-access" className="w-full sm:w-auto">
                Request confidential access
              </GoldCTA>

              <GhostLink href="/private/auth?next=%2Fen%2Fportability%2Ftool">
                I already have a code
              </GhostLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE },
          { name: "Portability Calculator", url: `${SITE}/en/portability` },
        ]}
      />

      <ServiceSchema
        name="Portability Score Calculator"
        description="Estimate realistic AUM transfer potential before moving banks. Confidential portability diagnostic for private banking relationship managers."
      />

      <PublicShell>
        <PortabilityPublicValue />
      </PublicShell>
    </>
  );
}