/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Explicit duplicate → canonical slugs
      {
        source: "/jobs/senior-relationship-manager-brazil-2",
        destination: "/jobs/senior-relationship-manager-brazil-ch",
        permanent: true,
      },
      {
        source: "/jobs/senior-relationship-manager-ch-onshore-4",
        destination: "/jobs/senior-relationship-manager-ch-onshore-zurich",
        permanent: true,
      },
      {
        source: "/jobs/private-banker-mea-2",
        destination: "/jobs/senior-relationship-manager-mea-dubai",
        permanent: true,
      },
      {
        source: "/jobs/senior-relationship-manager-portugal",
        destination: "/jobs/senior-relationship-manager-portugal-geneva",
        permanent: true,
      },

      // 🔒 Catch-all rule: /jobs/<slug>-2, -3, ... → /jobs/<slug>
      {
        source: "/jobs/:slug-:dup(\\d+)",
        destination: "/jobs/:slug",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
