/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // old entry points → new canonical page
      { source: '/bp-simulator',  destination: '/portability', permanent: true },
      { source: '/bp-simulator/', destination: '/portability', permanent: true },

      // catch ALL subpaths (e.g., /bp-simulator/foo, /bp-simulator/bar/baz)
      { source: '/bp-simulator/:path*', destination: '/portability', permanent: true },
    ];
  },
};

module.exports = nextConfig;