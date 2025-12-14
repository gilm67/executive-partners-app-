export const dynamic = "force-dynamic";
export const revalidate = 0;

import AuthClient from "./AuthClient";

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function PrivateAuthPage({ searchParams }: PageProps) {
  const raw = searchParams?.token;
  const token = typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : null;

  return <AuthClient token={token} />;
}