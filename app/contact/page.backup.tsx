import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Executive Partners",
  description: "Get in touch with Executive Partners.",
};

export const dynamic = "force-dynamic";

type SP = Record<string, string | string[] | undefined>;

/**
 * Next.js 15 may pass `searchParams` as a Promise. Handle both sync/async.
 */
export default async function ContactPage({
  searchParams,
}: {
  searchParams: SP | Promise<SP>;
}) {
  const spMaybe = searchParams as any;
  const sp: SP =
    spMaybe && typeof spMaybe.then === "function" ? await spMaybe : spMaybe;

  const refParam = sp?.ref;
  const ref =
    Array.isArray(refParam) ? refParam[0] : (refParam as string | undefined);

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-4">Contact</h1>
      <p className="mb-2">Use this page to contact Executive Partners.</p>
      {ref && <p className="text-sm opacity-80">Referral: {ref}</p>}
    </main>
  );
}
