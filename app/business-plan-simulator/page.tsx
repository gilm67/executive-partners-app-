// app/business-plan-simulator/page.tsx
import type { Metadata } from "next";

// ✅ Always provide a full canonical URL (relative paths can cause issues in prod)
export const metadata: Metadata = {
  title: "BP Simulator – Executive Partners | Executive Partners",
  description:
    "Executive Partners is Geneva’s leading recruiter for private banking and wealth management.",
  alternates: {
    canonical: "https://www.execpartners.ch/business-plan-simulator",
  },
};

// ✅ Add a safe static component so the page never fails in prod
export const dynamic = "force-static";

export default function BpSimulatorPage() {
  return (
    <main className="min-h-[60vh] p-8">
      BP Simulator is live.
    </main>
  );
}