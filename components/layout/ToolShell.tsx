"use client";

import type { ReactNode } from "react";

export default function ToolShell({
  badge = "Executive Partners · Professional Diagnostic",
  title,
  subtitle,
  children,
  footer = "Confidential diagnostic • Data not stored without explicit consent",
}: {
  badge?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: string;
}) {
  return (
    <main className="min-h-screen bg-[#0B0E13] text-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 rounded-2xl border border-white/10 bg-black/30 p-6">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-white/70 ring-1 ring-white/10">
            {badge}
          </div>

          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h1>

          {subtitle ? (
            <p className="mt-2 text-sm text-white/70">{subtitle}</p>
          ) : null}
        </div>

        <div className="space-y-6">{children}</div>

        <div className="mt-8 text-center text-xs text-white/50">{footer}</div>
      </div>
    </main>
  );
}