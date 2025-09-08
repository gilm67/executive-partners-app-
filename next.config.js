/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Keep only explicit canonicalization you want
      {
        source: "/jobs/senior-relationship-manager-portugal",
        destination: "/jobs/senior-relationship-manager-portugal-geneva",
        permanent: true,
      }
    ];
  },
};

module.exports = nextConfig;
