// app/private/layout.tsx
import type { ReactNode } from "react";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PrivateLayout({ children }: { children: ReactNode }) {
  // ✅ Next 15: cookies() must be awaited
  const cookieStore = await cookies();

  // ✅ Must match /api/magic-link/verify
  const sessionHash = cookieStore.get("ep_private")?.value;

  // ✅ IMPORTANT: do NOT redirect here (it can cause loops + breaks next param flows)
  // This layout can be used for styling / shared UI only.
  // Auth enforcement should stay inside:
  // - app/private/(secure)/layout.tsx (server redirect OK)
  // - require-session / require-admin helpers

  return (
    <div className="min-h-screen bg-[#0B0E13] text-white">
      {/* Optional: remove this block if you don’t want a hint */}
      {!sessionHash ? (
        <div className="border-b border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
          Not authenticated.
        </div>
      ) : null}

      {children}
    </div>
  );
}