/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

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

    // Remove a trailing slash to avoid '//' when we append '/:path*'
    const target = raw.replace(/\/+$/, "");
    console.log("[next.config.js] ✅ BP Simulator proxy target:", target);

    return [
      {
        // Proxy path for BP Simulator
        source: "/bp-sim-proxy/:path*",
        destination: `${target}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;