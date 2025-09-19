import dynamic from "next/dynamic";
export const revalidate = 0;

// Render your real landing client-side to avoid any SSR pitfalls.
const LandingClient = dynamic(() => import("@/components/LandingClient"), { ssr: false });

export default function EnHome() {
  return <LandingClient />;
}
