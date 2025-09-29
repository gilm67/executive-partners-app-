"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body className="flex h-screen w-full items-center justify-center bg-gray-100 text-center">
        <div>
          <h2 className="mb-4 text-xl font-semibold text-red-600">
            Something went wrong!
          </h2>
          <p className="mb-6 text-gray-700">{error.message}</p>
          <button
            onClick={() => reset()}
            className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}