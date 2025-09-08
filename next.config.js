/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Optional: keep Portugal canonicalization
      {
        source: "/jobs/senior-relationship-manager-portugal",
        destination: "/jobs/senior-relationship-manager-portugal-geneva",
        permanent: true,
      },

      // Catch-all: /jobs/<slug>-<number> → /jobs/<slug>
      // (Middleware will still 410 specific bad slugs; this is for any other numbered duplicates you DO want to consolidate)
      {
        source: "/jobs/:slug-:dup(\\d+)",
        destination: "/jobs/:slug",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
