// app/apply/page.tsx
import { Suspense } from "react";
import ApplyClient from "./ApplyClient";

export const dynamic = "force-dynamic";

type SP = Record<string, string | string[] | undefined>;

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<SP> | SP;
}) {
  const sp = (typeof (searchParams as any)?.then === "function")
    ? await (searchParams as Promise<SP>)
    : (searchParams as SP);

  const role = Array.isArray(sp.role) ? sp.role[0] ?? "" : (sp.role ?? "");
  const market = Array.isArray(sp.market) ? sp.market[0] ?? "" : (sp.market ?? "");
  const jobId = Array.isArray(sp.jobId) ? sp.jobId[0] ?? "" : (sp.jobId ?? "");

  return (
    <Suspense
      fallback={
        <section className="space-y-6">
          <div className="h-6 w-56 rounded bg-neutral-800" />
          <div className="h-4 w-96 rounded bg-neutral-900" />
          <div className="mx-auto mt-4 w-full max-w-xl rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
            <div className="h-32 w-full rounded bg-neutral-800" />
          </div>
        </section>
      }
    >
      <ApplyClient role={role} market={market} jobId={jobId} />
    </Suspense>
  );
}
