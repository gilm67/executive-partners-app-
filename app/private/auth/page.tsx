export const dynamic = "force-dynamic";
export const revalidate = 0;

import AuthClient from "./AuthClient";

type PageProps = {
  searchParams?: { token?: string | string[]; next?: string | string[] };
};

export default async function PrivateAuthPage({ searchParams }: PageProps) {
  const sp = await Promise.resolve(searchParams);

  const rawToken = sp?.token;
  const token =
    typeof rawToken === "string"
      ? rawToken
      : Array.isArray(rawToken)
      ? rawToken[0]
      : null;

  const rawNext = sp?.next;
  const next =
    typeof rawNext === "string"
      ? rawNext
      : Array.isArray(rawNext)
      ? rawNext[0]
      : null;

  return <AuthClient token={token} next={next} />;
}