/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
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