// app/bp-simulator/page.tsx
"use client";

import { useEffect } from "react";

const STREAMLIT_URL = "https://ep-bp-simulator.streamlit.app";

export default function BpSimulatorRedirect() {
  useEffect(() => {
    window.location.replace(STREAMLIT_URL); // hard redirect
  }, []);

  return (
    <main style={{ padding: "64px 24px", textAlign: "center" }}>
      <h1 style={{ fontWeight: 800, marginBottom: 8 }}>
        Business Plan Simulator
      </h1>
      <p>Redirecting you to our secure simulator…</p>
      <p>
        If nothing happens,{" "}
        <a href={STREAMLIT_URL} target="_blank" rel="noopener">
          click here to open it
        </a>.
      </p>
    </main>
  );
}