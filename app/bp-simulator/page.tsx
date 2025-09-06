// app/bp-simulator/page.tsx
"use client";

import { useEffect } from "react";

const STREAMLIT_URL = "https://ep-bp-simulator.streamlit.app";

export default function BpSimulatorRedirect() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = STREAMLIT_URL; // redirect after delay
    }, 1200); // 1.2s delay feels smooth

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-2 text-2xl font-semibold tracking-tight text-white">
        Business Plan Simulator
      </h1>
      <p className="mb-6 text-sm text-neutral-400">
        Redirecting you to our secure simulator…
      </p>

      {/* Spinner */}
      <div className="mb-6 h-6 w-6 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />

      {/* Fallback link */}
      <p className="text-sm text-neutral-500">
        If nothing happens,&nbsp;
        <a
          href={STREAMLIT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-400 underline underline-offset-4 hover:text-emerald-300"
        >
          click here to open it
        </a>.
      </p>
    </main>
  );
}