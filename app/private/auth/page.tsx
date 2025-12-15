export const dynamic = "force-dynamic";
export const revalidate = 0;

import AuthClient from "./AuthClient";

type PageProps = {
  searchParams: Promise<{ token?: string | string[] }>;
};

export default async function PrivateAuthPage({ searchParams }: PageProps) {
  const sp = await searchParams;

  const raw = sp?.token;
  const token =
    typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : null;

  return <AuthClient token={token} />;
}