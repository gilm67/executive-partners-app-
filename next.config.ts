// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // …your other config…
  async redirects() {
    return [
      // 301 from old path to the internal Next.js page
      {
        source: "/bp-simulator",
        destination: "/business-plan-simulator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;