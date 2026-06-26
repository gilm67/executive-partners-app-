import type { Metadata } from "next";
import PortabilityTokenClient from "./PortabilityTokenClient";

export const runtime = "nodejs";

export const metadata: Metadata = {
  title: { absolute: "AUM Portability Score™ | Executive Partners — Confidential" },
  description: "Your personalised AUM Portability Score™ prepared by Executive Partners.",
  robots: "noindex, nofollow",
};

export default function PortabilityTokenPage({ params }: { params: { token: string } }) {
  return <PortabilityTokenClient token={params.token} />;
}
