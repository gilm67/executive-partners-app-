export const dynamic = 'force-static';

export default function Home() {
  return (
    <main className="min-h-[60vh] p-6">
      <h1 className="text-3xl font-semibold">Executive Partners</h1>
      <p className="mt-4 opacity-80">
        Welcome. We’re temporarily showing a simplified homepage while we finalize an update.
      </p>
      <ul className="mt-6 space-y-2 underline">
        <li><a href="/jobs">Browse Jobs</a></li>
        <li><a href="/candidates">Candidates</a></li>
        <li><a href="/hiring-managers">Hiring Managers</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </main>
  );
}
