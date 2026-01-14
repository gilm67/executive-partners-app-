// app/private/auth/request/sent/page.tsx
import Link from "next/link";

export const dynamic = "force-dynamic";

function safeNext(raw: string | null) {
  if (!raw) return "";
  let next = raw.trim();
  if (!next) return "";
  if (!next.startsWith("/")) return "";
  if (next.startsWith("//")) return "";
  if (next.includes("://")) return "";

  // strip query/hash (defensive)
  next = next.split("#")[0].split("?")[0];

  // allow-list (tight)
  const ALLOWED = ["/en/portability", "/en/portability/tool", "/en/bp-simulator", "/private"];
  const ok = ALLOWED.includes(next) || next.startsWith("/private/");
  if (!ok) return "";

  return next;
}

export default async function MagicLinkSentPage({
  searchParams,
}: {
  searchParams?: { next?: string };
}) {
  const next = safeNext(searchParams?.next ?? null);

  const resendHref = next
    ? `/private/auth/request?next=${encodeURIComponent(next)}`
    : "/private/auth/request";

  // nice UX: if next is the tool, "Back" should go to overview
  const backHref =
    next === "/en/portability/tool" ? "/en/portability" : next || "/en/portability";

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

      <div className="relative mx-auto max-w-3xl px-6 py-14">
        <p className="inline-flex items-center gap-2 rounded-full bg-brandGold/10 px-4 py-1 text-xs font-semibold text-brandGoldPale ring-1 ring-brandGold/40">
          Executive Partners · Secure Access
        </p>

        <h1 className="mt-4 text-3xl font-bold md:text-4xl">Check your inbox</h1>

        <p className="mt-4 text-sm text-white/75 md:text-base">
          If an account matches the email you entered, you’ll receive a secure one-time access link
          within a minute.
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-6 md:p-8">
          <h2 className="text-lg font-semibold">If you don’t see it</h2>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>• Check Spam / Promotions</li>
            <li>• Wait 60–90 seconds and refresh</li>
            <li>• Try again using your professional email</li>
          </ul>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={resendHref}
              className="inline-flex justify-center rounded-xl bg-brandGold px-6 py-3 text-sm font-semibold text-black hover:bg-brandGold/90"
            >
              Send another link
            </Link>

            <Link
              href={backHref}
              className="inline-flex justify-center rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 hover:bg-white/5"
            >
              Back
            </Link>
          </div>

          <p className="mt-5 text-xs text-white/55">
            For security, we don’t confirm whether an email exists in our system.
          </p>
        </div>
      </div>
    </main>
  );
}