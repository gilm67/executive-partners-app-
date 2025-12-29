/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // 1) Legacy form links -> canonical contact
      {
        source: "/form-view/:path*",
        destination: "/en/contact",
        permanent: true,
      },

      // 2) Legacy jobs links -> keep slug (you have /en/jobs/[slug])
      {
        source: "/jobs/:slug+",
        destination: "/en/jobs/:slug*",
        permanent: true,
      },
      // Optional: jobs index
      {
        source: "/jobs",
        destination: "/en/jobs",
        permanent: true,
      },

      // 3) Apex -> www (host-based)
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