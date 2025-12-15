// app/private/(secure)/bp-simulator/page.tsx
import { redirect } from "next/navigation";
import { requireSession } from "@/app/private/lib/require-session";

export const dynamic = "force-dynamic";

export default async function PrivateBPSimulatorGate() {
  // 🔐 Ensure user has a valid private session
  await requireSession();

  // ✅ User is authenticated → allow access
  redirect("/en/bp-simulator");
}