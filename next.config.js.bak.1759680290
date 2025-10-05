/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: "/bp-simulator",
        destination: "/business-plan-simulator",
        permanent: true, // 308
      },
      {
        // deep links safety
        source: "/bp-simulator/:path*",
        destination: "/business-plan-simulator/:path*",
        permanent: true,
      },
    ];
  },

  async rewrites() {
    const raw = process.env.NEXT_PUBLIC_BP_SIM_URL;

    if (!raw) {
      console.warn(
        "[next.config.js] ⚠️  NEXT_PUBLIC_BP_SIM_URL is not set — BP Simulator proxy disabled."
      );
      return [];
    }

    if (!/^https?:\/\//i.test(raw)) {
      console.warn(
        `[next.config.js] ⚠️  NEXT_PUBLIC_BP_SIM_URL "${raw}" is missing a protocol (http/https). Proxy disabled.`
      );
      return [];
    }

    // normalize: no trailing slash
    const target = raw.replace(/\/+$/, "");
    console.log("[next.config.js] ✅ BP Simulator proxy target:", target);

    return [
      // (optional) internal proxy path for diagnostics
      {
        source: "/bp-sim-proxy/:path*",
        destination: `${target}/:path*`,
      },

      // ✅ FULL PROXY for the public route
      {
        source: "/business-plan-simulator",
        destination: `${target}/`,
      },
      {
        source: "/business-plan-simulator/:path*",
        destination: `${target}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;