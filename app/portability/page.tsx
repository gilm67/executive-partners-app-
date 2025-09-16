// app/portability/page.tsx
import type { Metadata } from "next";
import PortabilityClient from "./portability-client";

export const metadata: Metadata = {
  title: "Portability Readiness Score™ | Executive Partners",
  description:
    "Answer 6 quick questions to estimate your client portability readiness (AUM mix, booking centers, cross-border licenses, product scope, and client concentration).",
  alternates: { canonical: "/portability" },
  openGraph: {
    title: "Portability Readiness Score™",
    description:
      "6-question widget for RMs. Instant score + confidential CTA. No data stored without consent.",
    url: "/portability",
    siteName: "Executive Partners",
    type: "website",
  },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Portability Readiness Score™</h1>
      <p className="mt-2 text-sm text-neutral-500">
        6 quick questions. Instant score. Confidential — no data stored without your consent.
      </p>
      <div className="mt-8">
        <PortabilityClient />
      </div>
    </div>
  );
}
