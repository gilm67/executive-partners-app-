// app/private/layout.tsx
import type { ReactNode } from "react";
import PrivateAuthBanner from "@/app/private/components/PrivateAuthBanner";

export const dynamic = "force-dynamic";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PrivateAuthBanner />
      {children}
    </>
  );
}