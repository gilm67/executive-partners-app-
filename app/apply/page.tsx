// app/apply/page.tsx
import ApplyClient from "./ApplyClient";

export const dynamic = "force-dynamic";

// Type that matches Next 15's expectation (searchParams is a Promise)
type SP = Record<string, string | string[] | undefined>;

export default async function ApplyPage(
  props: { searchParams?: Promise<SP> }
) {
  // Always await the promise; handle missing / failing gracefully
  let raw: SP = {};
  try {
    raw = (await props.searchParams) ?? {};
  } catch {
    raw = {};
  }

  const pick = (k: string) => {
    const v = raw[k];
    return Array.isArray(v) ? v[0] ?? "" : (v ?? "");
  };

  const role   = pick("role");
  const market = pick("market");
  const jobId  = pick("jobId");

  // Pure client form handles everything else
  return <ApplyClient role={role} market={market} jobId={jobId} />;
}

