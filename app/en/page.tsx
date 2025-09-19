'use client';

import HydratedSplash from "@/components/HydratedSplash";
import LandingClient from "@/components/LandingClient";

export default function EnHome() {
  return (
    <>
      {/* Splash shows once; component guards itself with localStorage */}
      <HydratedSplash />
      <LandingClient />
    </>
  );
}
