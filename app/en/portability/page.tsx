// app/en/portability/page.tsx
import type { Metadata } from "next";
import PortabilityClient from "./PortabilityClient";

export const metadata: Metadata = {
  title: "Portability Readiness Score™ | Executive Partners",
  description:
    "Interactive Portability Readiness Score™ for Private Banking & Wealth Management across Switzerland, UK, UAE, Asia, US and key EU hubs.",
};

export default function PortabilityPage() {
  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white body-grain portability-page">
      {/* Gold ambient background, aligned with other EP pages */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 420px at 18% -10%, rgba(201,161,74,.22) 0%, rgba(201,161,74,0) 55%), radial-gradient(1000px 380px at 110% 0%, rgba(245,231,192,.20) 0%, rgba(245,231,192,0) 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-8 md:py-12">
        <PortabilityClient />
      </div>
    </main>
  );
}