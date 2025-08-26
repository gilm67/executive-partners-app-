import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold text-white">Role not found</h1>
      <p className="mt-2 text-neutral-300">
        The job you’re looking for may have been removed.
      </p>
      <Link
        href="/jobs"
        className="mt-6 inline-block px-4 py-2 rounded-lg border border-neutral-800 hover:border-neutral-700"
      >
        View all roles
      </Link>
    </div>
  );
}
