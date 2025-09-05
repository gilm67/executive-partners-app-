// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/bp-simulator",
        destination: "https://ep-bp-simulator.streamlit.app",
        permanent: false, // use true later if you want a permanent 308 redirect
      },
    ];
  },
};

export default nextConfig;