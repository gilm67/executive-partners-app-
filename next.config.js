/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // ✅ Fix wrong layout: /markets -> /en/markets
      {
        source: "/markets",
        destination: "/en/markets",
        permanent: true,
      },

      // ✅ Redirect only "page-like" paths under /markets (no file extension)
      // This prevents breaking /public/markets/*.jpg
      {
        source: "/markets/:path((?!.*\\..*).*)",
        destination: "/en/markets/:path",
        permanent: true,
      },

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