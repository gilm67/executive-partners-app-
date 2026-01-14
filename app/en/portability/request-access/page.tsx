"use client";

// app/en/portability/request-access/page.tsx
import Link from "next/link";
import { useMemo, useState } from "react";

export const dynamic = "force-dynamic";

const ADMIN_EMAIL =
  process.env.NEXT_PUBLIC_ACCESS_REQUEST_EMAIL || "recruiter@execpartners.ch";

export default function RequestAccessPage() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [market, setMarket] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [err, setErr] = useState<string | null>(null);

  const mailto = useMemo(() => {
    const subject = encodeURIComponent("Confidential access request — AUM Portability Score");
    const body = encodeURIComponent(
      `Hello Executive Partners,\n\n` +
        `I would like to request confidential access to the AUM Portability Score diagnostic.\n\n` +
        `Name: ${name || ""}\n` +
        `Current role / Bank: ${role || ""}\n` +
        `Market focus (CH / Dubai / London / SG / HK): ${market || ""}\n` +
        `LinkedIn profile: ${linkedin || ""}\n` +
        `Professional email: ${email || ""}\n\n` +
        `Message: ${message || ""}\n\n` +
        `Thank you,\n`
    );
    return `mailto:${ADMIN_EMAIL}?subject=${subject}&body=${body}`;
  }, [name, role, market, linkedin, email, message]);

  async function submit() {
    setStatus("sending");
    setErr(null);

    try {
      const res = await fetch("/api/access-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, market, linkedin, email, message }),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || `Request failed (${res.status})`);
      }

      setStatus("sent");
    } catch (e: any) {
      setStatus("error");
      setErr(e?.message || "Something went wrong.");
    }
  }

  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white body-grain">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 360px at 15% -10%, rgba(201,161,74,.20) 0%, rgba(201,161,74,0) 55%), radial-gradient(900px 360px at 110% 0%, rgba(245,231,192,.18) 0%, rgba(245,231,192,0) 60%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 py-14">
        <div className="rounded-2xl border border-white/10 bg-black/40 p-6 md:p-10">
          <p className="inline-flex items-center gap-2 rounded-full bg-brandGold/10 px-4 py-1 text-xs font-semibold text-brandGoldPale ring-1 ring-brandGold/40">
            Executive Partners · Controlled Access
          </p>

          <h1 className="mt-4 text-3xl font-bold md:text-4xl">
            Request confidential access
          </h1>

          <p className="mt-4 max-w-3xl text-sm text-white/75 md:text-base">
            The AUM Portability Score is reserved for senior private banking professionals.
            Submit your request below. You’ll receive a response typically within 24h (business days).
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-5">
          {/* Form */}
          <div className="md:col-span-3 rounded-2xl border border-white/10 bg-black/30 p-6 md:p-8">
            <h2 className="text-lg font-semibold">Access request</h2>
            <p className="mt-2 text-sm text-white/70">
              Primary method: web request (no Outlook redirect).
            </p>

            <div className="mt-6 grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Name" value={name} onChange={setName} placeholder="Full name" />
                <Field label="Professional email *" value={email} onChange={setEmail} placeholder="name@bank.com" required />
              </div>

              <Field label="Current role / Bank" value={role} onChange={setRole} placeholder="Senior RM — Bank" />
              <Field label="Market focus (CH / Dubai / London / SG / HK)" value={market} onChange={setMarket} placeholder="e.g., CH + Dubai" />
              <Field label="LinkedIn profile" value={linkedin} onChange={setLinkedin} placeholder="https://linkedin.com/in/…" />

              <div>
                <label className="block text-xs font-semibold text-white/70">Message (optional)</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/35 focus:border-brandGold/50 focus:ring-2 focus:ring-brandGold/20"
                  placeholder="A short note (team size, market, timeline, etc.)"
                />
              </div>

              <button
                onClick={submit}
                disabled={status === "sending" || !email}
                className="inline-flex w-full justify-center rounded-xl bg-brandGold px-6 py-3 text-sm font-semibold text-black transition hover:bg-brandGold/90 disabled:opacity-60"
              >
                {status === "sending" ? "Submitting…" : "Submit request"}
              </button>

              {status === "sent" && (
                <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-white/80">
                  ✅ Request sent. Check your inbox for confirmation, and we’ll reply shortly.
                </div>
              )}

              {status === "error" && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                  ❌ {err || "Request failed."}{" "}
                  <span className="block mt-2 text-xs text-red-200/80">
                    Use the email fallback below if needed.
                  </span>
                </div>
              )}

              <p className="text-xs text-white/55">
                For security, we don’t confirm whether an email exists in our system.
              </p>
            </div>
          </div>

          {/* Right column */}
          <div className="md:col-span-2 rounded-2xl border border-white/10 bg-black/30 p-6 md:p-8">
            <h2 className="text-lg font-semibold">Prefer email?</h2>
            <p className="mt-2 text-sm text-white/70">
              Use this only if the web form fails (some browsers redirect via Outlook/Office 365).
            </p>

            <a
              href={mailto}
              className="mt-5 inline-flex w-full justify-center rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/5"
            >
              Open pre-filled email
            </a>

            <div className="mt-8 space-y-3">
              <Link
                href="/en/portability"
                className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/5"
              >
                ← Back to overview
              </Link>

              <Link
                href="/private/auth?next=%2Fen%2Fportability%2Ftool"
                className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/5"
              >
                I already have an access code
              </Link>
            </div>

            <div className="mt-8 rounded-xl border border-white/10 bg-black/40 p-4">
              <p className="text-xs text-white/65">
                Access is reviewed discreetly. No data is sold or shared.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-white/70">
        {label}{required ? " *" : ""}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/35 focus:border-brandGold/50 focus:ring-2 focus:ring-brandGold/20"
        placeholder={placeholder}
      />
    </div>
  );
}