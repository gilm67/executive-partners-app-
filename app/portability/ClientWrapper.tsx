// app/portability/ClientWrapper.tsx
"use client";

import dynamic from "next/dynamic";

const PortabilityClient = dynamic(
  () => import("@/components/portability/PortabilityClient"),
  {
    ssr: false,
    loading: () => (
      <div style={{ padding: 40 }}>
        Loading Portability Score…
      </div>
    ),
  }
);

export default function ClientWrapper() {
  return <PortabilityClient />;
}