// app/en/portability/request-access/page.tsx
import Link from "next/link";

export const dynamic = "force-dynamic";

const ADMIN_EMAIL =
  process.env.NEXT_PUBLIC_ACCESS_REQUEST_EMAIL || "info@execpartners.ch";

export default function RequestAccessPage() {
  const subject = encodeURIComponent(
    "Confidential access request — AUM Portability Score"
  );

  const body = encodeURIComponent(
    `Hello Executive Partners,\n\n` +
      `I would like to request confidential access to the AUM Portability Score diagnostic.\n\n` +
      `Name:\n` +
      `Current role / Bank:\n` +
      `Market focus (CH / Dubai / London / SG / HK):\n` +
      `Approx. AUM managed (optional):\n` +
      `LinkedIn profile:\n` +
      `Professional email:\n\n` +
      `Thank you,\n`
  );

  const mailto = `mailto:${ADMIN_EMAIL}?subject=${subject}&body=${body}`;

  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white body-grain">
      {/* background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 360px at 15% -10%, rgba(201,161,74,.20) 0%, rgba(201,161,74,0) 55%), radial-gradient(900px 360px at 110% 0%, rgba(245,231,192,.18) 0%, rgba(245,231,192,0) 60%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 py-14">
        {/* Badge */}
        <p className="inline-flex items-center gap-2 rounded-full bg-brandGold/10 px-4 py-1 text-xs font-semibold text-brandGoldPale ring-1 ring-brandGold/40">
          Executive Partners · Controlled Access
        </p>

        {/* Title */}
        <h1 className="mt-4 text-3xl font-bold md:text-4xl">
          Request confidential access
        </h1>

        {/* Intro */}
        <p className="mt-4 max-w-2xl text-sm text-white/75 md:text-base">
          The AUM Portability Score is a confidential diagnostic reserved for senior
          private banking professionals. It is used in discreet advisory and career
          strategy discussions.
        </p>

        {/* Main card */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-6 md:p-8">
          <h2 className="text-lg font-semibold">
            Fastest way to access (≈ 30 seconds)
          </h2>

          <p className="mt-2 text-sm text-white/70">
            Click below to send a pre-filled access request. Once approved, you’ll
            receive a secure one-time access link by email.
          </p>

          {/* CTA */}
          <a
            href={mailto}
            className="mt-6 inline-flex w-full justify-center rounded-xl bg-brandGold px-6 py-3 text-sm font-semibold text-black transition hover:bg-brandGold/90 md:w-auto"
          >
            Request confidential access
          </a>

          {/* reassurance */}
          <ul className="mt-6 space-y-2 text-xs text-white/65">
            <li>• Access is reviewed manually by Executive Partners</li>
            <li>• No data is sold, shared, or stored for commercial use</li>
            <li>• Typical response time: within 24h (business days)</li>
          </ul>
        </div>

        {/* Secondary actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/en/portability"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white/80 hover:bg-white/5"
          >
            ← Back to overview
          </Link>

          <Link
            href="/private/auth?next=%2Fen%2Fportability%2Ftool"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white/80 hover:bg-white/5"
          >
            I already have an access code
          </Link>
        </div>
      </div>
    </main>
  );
}