/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // 1) Legacy URL fixes (DO NOT create loops)
      {
        source: "/form-view/:id*",
        destination: "/apply",
        permanent: true,
      },

      // ✅ Legacy jobs slugs -> your real jobs route
      // If your jobs live under /en/jobs, keep this:
      {
        source: "/jobs/:slug+",
        destination: "/en/jobs/:slug*",
        permanent: true,
      },
      // Optional: send /jobs index to /en/jobs (remove if you want /jobs to be the real page)
      {
        source: "/jobs",
        destination: "/en/jobs",
        permanent: true,
      },

      // 2) Redirect apex -> www (host-based)
      {
        source: "/:path*",
        has: [{ type: "host", value: "execpartners.ch" }],
        destination: "https://www.execpartners.ch/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;