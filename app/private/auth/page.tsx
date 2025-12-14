export const dynamic = "force-dynamic";
export const revalidate = 0;

import AuthClient from "./AuthClient";

export default function PrivateAuthPage({
  searchParams,
}: {
  searchParams?: { token?: string };
}) {
  const token = typeof searchParams?.token === "string" ? searchParams.token : null;
  return <AuthClient token={token} />;
}