import Link from "next/link";
import OutboundLink from "@/components/ui/OutboundLink";

export const metadata = {
  title: "LinkedIn — Executive Partners",
  description:
    "Quick access to Gil M. Chalem’s LinkedIn articles and newsletter.",
  robots: { index: false, follow: false },
};

export default function GoLinkedInPage() {
  return (
    <main className="min-h-screen bg-[#0B0E13] text-white">
      <div className="mx-auto max-w-2xl px-4 py-14">
        <p className="text-xs uppercase tracking-widest text-white/60">
          External link
        </p>

        <h1 className="mt-2 text-3xl font-semibold">Open LinkedIn content</h1>

        <p className="mt-3 text-white/70">
          LinkedIn sometimes blocks content for visitors who are not logged in.
          If a page doesn’t load, use the alternatives below.
        </p>

        <div className="mt-8 grid gap-3">
          <OutboundLink
            href="https://www.linkedin.com/in/gil-m-chalem-35281916b/recent-activity/articles/"
            eventName="LinkedIn Activity Page Click"
            className="rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3 text-white/90 hover:border-white/25"
          >
            See Gil’s LinkedIn articles activity ↗
          </OutboundLink>

          <OutboundLink
            href="https://www.linkedin.com/newsletters/private-wealth-pulse-7319810409748746241"
            eventName="LinkedIn Newsletter Click"
            className="rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3 text-white/90 hover:border-white/25"
          >
            Subscribe to “Private Wealth Pulse” newsletter ↗
          </OutboundLink>

          {/* Replaces the LinkedIn directory (often blocked for non-logged users) */}
          <OutboundLink
            href="https://www.linkedin.com/in/gil-m-chalem-35281916b/"
            eventName="LinkedIn Profile Click"
            className="rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3 text-white/90 hover:border-white/25"
          >
            Open Gil’s LinkedIn profile ↗
          </OutboundLink>
        </div>

        <div className="mt-10">
          <Link
            href="/insights"
            className="text-sm text-white/70 hover:text-white underline underline-offset-4"
          >
            ← Back to Insights
          </Link>
        </div>
      </div>
    </main>
  );
}