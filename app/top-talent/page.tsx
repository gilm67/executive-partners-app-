import Link from "next/link";
import { cookies } from "next/headers";
import ClientFilter from "./components/ClientFilter";
import { getCandidates } from "@/lib/sheets"; // aliased import

export const revalidate = 30;

export default async function TopTalentPage() {
  // cookies() is async in your Next version
  const cookieStore = await cookies();
  const hasAccess = cookieStore.get("tt_access")?.value === "1";

  // ---------- PASSCODE SCREEN ----------
  if (!hasAccess) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm">
          <h1 className="text-xl font-semibold text-neutral-900">Top Talent (protected)</h1>
        <p className="mt-1 text-sm text-neutral-600">
            Enter your passcode to access the anonymous Top Talent dashboard.
          </p>

          <form action="/api/top-talent/auth" method="POST" className="mt-6 space-y-4">
            <div>
              <label htmlFor="passcode" className="block text-sm text-neutral-700">
                Passcode
              </label>
              <input
                id="passcode"
                name="passcode"
                type="password"
                required
                placeholder="Enter passcode"
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
            >
              Unlock
            </button>
          </form>

          <p className="mt-4 text-xs text-neutral-600">
            Don’t have access?{" "}
            <Link href="/contact" className="underline">
              Contact us
            </Link>{" "}
            for a passcode.
          </p>
        </div>
      </section>
    );
  }

  // ---------- DASHBOARD ----------
  const rows = await getCandidates();

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Top Talent (anonymous)</h1>
          <p className="text-neutral-700">
            Search and filter candidates parsed by AI. Click LinkedIn Search to investigate publicly.
          </p>
        </div>
        <a
          href="/api/top-talent/logout"
          className="text-sm text-neutral-600 underline hover:text-neutral-800"
          title="Lock / Sign out"
        >
          Lock / Sign out
        </a>
      </div>

      <ClientFilter rows={rows} />
    </section>
  );
}

