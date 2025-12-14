"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0B0F1A] text-white">
        <div className="mx-auto max-w-xl px-6 py-16">
          <h1 className="text-2xl font-semibold text-red-400">App error</h1>
          <p className="mt-4 text-white/70 break-words">
            {error?.message || "Unexpected error."}
          </p>

          <button
            onClick={() => reset()}
            className="mt-8 rounded bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90"
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}