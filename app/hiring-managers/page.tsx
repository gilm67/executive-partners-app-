// app/hiring-managers/page.tsx
import Link from "next/link";

export default function HiringManagersPage() {
  return (
    <main className="p-8 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Hiring Managers</h1>
      <p className="mb-6">
        Welcome to the Hiring Managers dashboard. Here you can view, manage, and
        post jobs for top private banking and wealth management talent.
      </p>

      <div className="space-y-4">
        <Link
          href="/hiring-managers/post-job"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white inline-block"
        >
          ➕ Post a New Job
        </Link>

        <Link
          href="/jobs"
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white inline-block ml-4"
        >
          📋 View All Jobs
        </Link>

        <Link
          href="/candidates"
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white inline-block ml-4"
        >
          👤 View Candidates
        </Link>
      </div>

      <footer className="mt-12 text-gray-400 text-sm">
        © {new Date().getFullYear()} Executive Partners — Geneva
      </footer>
    </main>
  );
}

