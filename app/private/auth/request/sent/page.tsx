// app/private/auth/request/sent/page.tsx
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function MagicLinkSentPage() {
  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white body-grain">
      {/* background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1000px 420px at 14% -10%, rgba(201,161,74,.22) 0%, rgba(201,161,74,0) 58%), radial-gradient(900px 360px at 110% 0%, rgba(245,231,192,.18) 0%, rgba(245,231,192,0) 60%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 py-14">
        {/* top pill */}
        <p className="inline-flex items-center gap-2 rounded-full bg-brandGold/10 px-4 py-1 text-xs font-semibold text-brandGoldPale ring-1 ring-brandGold/40">
          Executive Partners · Secure Access
        </p>

        {/* headline block */}
        <div className="mt-5 rounded-2xl border border-white/10 bg-black/40 p-6 md:p-8">
          <h1 className="text-3xl font-bold md:text-4xl">Check your inbox</h1>
          <p className="mt-3 max-w-2xl text-sm text-white/75 md:text-base">
            If an account matches the email you entered, you’ll receive a secure one-time
            access link within a minute.
          </p>

          {/* micro-stats */}
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs font-semibold text-white/80">Delivery</p>
              <p className="mt-1 text-sm text-white/70">Usually &lt; 60 seconds</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs font-semibold text-white/80">Validity</p>
              <p className="mt-1 text-sm text-white/70">20 minutes · single use</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs font-semibold text-white/80">Privacy</p>
              <p className="mt-1 text-sm text-white/70">No confirmation signals</p>
            </div>
          </div>

          {/* actions */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/private/auth/request"
              className="inline-flex justify-center rounded-xl bg-brandGold px-6 py-3 text-sm font-semibold text-black hover:bg-brandGold/90"
            >
              Send another link
            </Link>

            <Link
              href="/en/portability"
              className="inline-flex justify-center rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 hover:bg-white/5"
            >
              Back to Portability
            </Link>
          </div>

          {/* help */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-6">
            <h2 className="text-base font-semibold">If you don’t see it</h2>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>• Check Spam / Promotions</li>
              <li>• Wait 60–90 seconds and refresh</li>
              <li>• Try again using your professional email</li>
              <li>• If your firm blocks external emails, try a personal inbox temporarily</li>
            </ul>

            <p className="mt-5 text-xs text-white/55">
              For security, we don’t confirm whether an email exists in our system.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}