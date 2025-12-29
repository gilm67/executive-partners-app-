// app/private/(secure)/bp-simulator/page.tsx
import { requirePrivateSession } from "@/app/private/lib/require-session";
import BpSimulatorClient from "@/app/en/bp-simulator/BpSimulatorClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PrivateBPSimulatorPage() {
  // 🔐 Enforce private session
  // IMPORTANT: when unauthenticated, redirect users to /en/bp-simulator (stable landing)
  await requirePrivateSession(undefined, "/en/bp-simulator");

  // ✅ Render the simulator directly
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <BpSimulatorClient />
    </div>
  );
}