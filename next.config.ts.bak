// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 🟦 Business Plan Simulator
      { source: "/bp-simulator", destination: "/business-plan-simulator", permanent: true },
      { source: "/en/bp-simulator", destination: "/business-plan-simulator", permanent: true },
      { source: "/en/business-plan-simulator", destination: "/business-plan-simulator", permanent: true },

      // 🟩 Portability Score
      { source: "/portability-score", destination: "/portability", permanent: true },
      { source: "/en/portability", destination: "/portability", permanent: true },
    ];
  },
  // You can add other Next.js config options here (images, i18n, etc.)
};

export default nextConfig;