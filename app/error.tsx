"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-2xl font-semibold text-red-400">Something went wrong</h1>
      <p className="mt-4 text-white/70 break-words">
        {error?.message || "Unexpected error."}
      </p>

      <button
        onClick={() => reset()}
        className="mt-8 rounded bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90"
      >
        Try again
      </button>
    </div>
  );
}