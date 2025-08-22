// @ts-nocheck
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Executive Partners",
  description: "Get in touch with Executive Partners.",
};

export const dynamic = "force-dynamic";

type SP = Record<string, string | string[] | undefined>;

export default async function ContactPage({ searchParams }: any) {
  const spMaybe = searchParams as SP | Promise<SP>;
  const sp: SP =
    spMaybe && typeof (spMaybe as any).then === "function" ? await (spMaybe as any) : (spMaybe as SP);

  const refParam = sp?.ref;
  const ref = Array.isArray(refParam) ? refParam[0] : (refParam as string | undefined);

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-4">Contact</h1>
      <p className="mb-2">Use this page to contact Executive Partners.</p>
      {ref && <p className="text-sm opacity-80">Referral: {ref}</p>}
    </main>
  );
}
