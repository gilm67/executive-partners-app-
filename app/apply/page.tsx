// app/apply/page.tsx
import { Suspense } from "react";
import ApplyClient from "./ApplyClient";

export const dynamic = "force-dynamic";

type SP = { role?: string; market?: string };

async function Content(
  props: { searchParams?: SP | Promise<SP> }
) {
  const sp = await Promise.resolve(props.searchParams ?? {});
  const initialRole = (sp?.role ?? "").toString();
  const initialMarket = (sp?.market ?? "").toString();

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Apply confidentially</h1>
      <p className="text-neutral-400">
        Your profile will be reviewed discreetly. We’ll contact you if there’s a strong fit.
      </p>
      <ApplyClient initialRole={initialRole} initialMarket={initialMarket} />
    </section>
  );
}

export default function Page(props: any) {
  return (
    <Suspense fallback={<div className="text-neutral-400">Loading…</div>}>
      <Content {...props} />
    </Suspense>
  );
}


