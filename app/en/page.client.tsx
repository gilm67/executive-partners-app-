'use client';

import HydratedSplash from "@/components/HydratedSplash";
import LandingClient from "@/components/LandingClient";

export default function EnClientLanding() {
  return (
    <>
      {/* splash shows once thanks to localStorage guard inside HydratedSplash */}
      <HydratedSplash />
      <LandingClient />
    </>
  );
}
