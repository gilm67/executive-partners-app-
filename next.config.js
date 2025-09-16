/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/bp-simulator',
        destination: '/portability',
        permanent: true, // 308 redirect
      },
    ];
  },
};

module.exports = nextConfig;