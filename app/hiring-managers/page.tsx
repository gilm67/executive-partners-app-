// app/hiring-managers/page.tsx
import HiringManagersForm from "./HiringManagersForm";

export const metadata = {
  title: "Hiring Managers | Executive Partners",
  description:
    "Create a new private banking or wealth management role. Secure, instant publishing to the site.",
};

export default function HiringManagersPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-white">Hiring Managers</h1>
        <p className="mt-2 text-sm text-neutral-400">
          Create a confidential role. Entries publish instantly to your jobs board.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
        <section className="md:col-span-3">
          <HiringManagersForm />
        </section>

        <aside className="md:col-span-2">
          <div className="sticky top-6 space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5">
            <h2 className="text-sm font-semibold text-neutral-200">Posting Guidelines</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-400">
              <li>Be precise on market (CH Onshore, MEA, UK, APAC).</li>
              <li>Indicate expected AUM profile and booking centres.</li>
              <li>Mention product scope (public &amp; private markets).</li>
              <li>State regulatory must-haves (FINMA, DFSA, SFC, etc.).</li>
            </ul>
            <p className="text-xs text-neutral-500">
              Need help? Contact us and we’ll draft the brief in minutes.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}