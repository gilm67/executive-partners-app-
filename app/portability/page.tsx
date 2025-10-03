// app/portability/page.tsx
import type { Metadata } from "next";
import PortabilityClient from "./portability-client";

export const metadata: Metadata = {
  title: "Portability Score™ – Executive Partners",
  description:
    "Estimate realistic portability for your client book (AUM, booking centers, cross-border, product scope). Confidential, on-domain.",
  openGraph: {
    title: "Portability Score™ – Executive Partners",
    description:
      "Estimate realistic portability for your client book (AUM, booking centers, cross-border, product scope). Confidential, on-domain.",
    images: [{ url: "/og-portability.png", width: 1200, height: 630, alt: "Portability Score" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portability Score™ – Executive Partners",
    description:
      "Estimate realistic portability for your client book (AUM, booking centers, cross-border, product scope).",
    images: ["/og-portability.png"],
  },
};

export default function PortabilityPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs text-white/60">Tools</p>
        <h1 className="text-3xl font-bold">Portability Score™</h1>
        <p className="max-w-2xl text-white/80">
          Confidential assessment designed for Private Banking moves. We consider booking centers,
          cross-border realities, segmentation, compliance and product scope to estimate
          realistic portability.
        </p>
      </header>

      {/* Client-side app */}
      <PortabilityClient />
    </section>
  );
}