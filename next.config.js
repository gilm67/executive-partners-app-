/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // 🔧 Normalize trailing slash for jobs hub
      {
        source: "/en/jobs/",
        destination: "/en/jobs",
        permanent: true,
      },

      // 1) Legacy form links -> canonical contact
      {
        source: "/form-view/:path*",
        destination: "/en/contact",
        permanent: true,
      },

      // 2) Legacy jobs links -> preserve slug
      {
        source: "/jobs/:path*",
        destination: "/en/jobs/:path*",
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