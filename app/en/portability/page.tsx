// app/en/portability/page.tsx
import { requirePrivateSession } from "@/app/private/lib/require-session";
import PortabilityClient from "./PortabilityClient";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function PortabilityPage() {
  // ✅ Self-serve after login: if not authenticated, magic-link flow returns here
  await requirePrivateSession(undefined, "/en/portability");

  // ✅ No approval gate for Portability
  return <PortabilityClient />;
}