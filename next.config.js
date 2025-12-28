/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // 1) Fix legacy URLs first (before host redirect)
      {
        source: "/jobs/:slug*",
        destination: "/jobs",
        permanent: true,
      },
      {
        source: "/form-view/:id*",
        destination: "/apply",
        permanent: true,
      },

      // 2) Redirect apex -> www (host-based)
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "execpartners.ch",
          },
        ],
        destination: "https://www.execpartners.ch/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;