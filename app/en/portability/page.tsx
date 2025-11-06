// app/en/portability/page.tsx
import type { Metadata } from "next";
import PortabilityClient from "./PortabilityClient";

export const metadata: Metadata = {
  title: "Portability – Executive Partners",
  description:
    "Interactive Portability Readiness Score™ for Private Banking & Wealth Management across Switzerland, UK, UAE, Asia, US and key EU hubs.",
};

export default function Page() {
  return (
    <main className="portability-page min-h-screen body-grain bg-[#0B0F1A]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <PortabilityClient />
      </div>
    </main>
  );
}