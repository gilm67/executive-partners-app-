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
        // just in case you had deep links before
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

    // Must include protocol so Next can build a proper absolute URL
    if (!/^https?:\/\//i.test(raw)) {
      console.warn(
        `[next.config.js] ⚠️  NEXT_PUBLIC_BP_SIM_URL "${raw}" is missing a protocol (http/https). Proxy disabled.`
      );
      return [];
    }

    // Remove trailing slash to avoid '//' when appending '/:path*'
    const target = raw.replace(/\/+$/, "");
    console.log("[next.config.js] ✅ BP Simulator proxy target:", target);

    return [
      // Keep your internal proxy path (useful for diagnostics)
      {
        source: "/bp-sim-proxy/:path*",
        destination: `${target}/:path*`,
      },

      // ✅ Full proxy for the public route
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