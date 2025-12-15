export const dynamic = "force-dynamic";
export const revalidate = 0;

import { cookies } from "next/headers";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();

  const session = cookieStore.get("private_session");

  // ❌ DO NOT REDIRECT HERE
  // ❌ DO NOT CHECK ROLE HERE
  // ❌ DO NOT TOUCH AUTH HERE

  return <>{children}</>;
}