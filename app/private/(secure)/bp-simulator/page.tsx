import { requirePrivateSession } from "@/app/private/lib/require-session";
import BpSimulatorClient from "@/app/en/bp-simulator/BpSimulatorClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PrivateBPSimulatorPage() {
  // 🔐 Enforce private session
  await requirePrivateSession(undefined, "/private/bp-simulator");

  // ✅ Render the simulator directly
  return <BpSimulatorClient />;
}