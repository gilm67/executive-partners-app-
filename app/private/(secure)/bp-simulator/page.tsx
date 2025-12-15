// app/private/(secure)/bp-simulator/page.tsx
import { redirect } from "next/navigation";
import { requirePrivateSession } from "@/app/private/lib/require-session";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PrivateBPSimulatorGate() {
  await requirePrivateSession(); // 🔐 must be logged in
  redirect("/en/bp-simulator");
}