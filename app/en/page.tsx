import LandingClient from "@/components/LandingClient";

// Ensure no static prerender; render on-demand
export const dynamic = 'force-dynamic';
// Or: export const revalidate = 0;  (either is fine; dynamic='force-dynamic' is clearest)

export default function EnHome() {
  return <LandingClient />;
}
