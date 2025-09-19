import LandingClient from "@/components/LandingClient";

// Render on-demand (no prerender). Either of these is fine;
// using dynamic='force-dynamic' to be explicit.
export const dynamic = 'force-dynamic';

export default function EnHome() {
  return <LandingClient />;
}
