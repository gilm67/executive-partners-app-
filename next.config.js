/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // 1) Legacy form links -> canonical contact (avoid dead /form-view/* URLs)
      {
        source: "/form-view/:path*",
        destination: "/en/contact",
        permanent: true,
      },

      // 2) Legacy jobs links -> canonical jobs hub
      // (keeps it simple and prevents slug mismatches)
      {
        source: "/jobs/:path*",
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