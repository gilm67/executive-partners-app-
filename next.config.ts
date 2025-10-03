// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/bp-simulator",
        destination: "/business-plan-simulator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;