/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
 
  async redirects() {
    return [
      { source: '/markets', destination: '/en/markets', permanent: true },
      { source: '/jobs', destination: '/en/jobs', permanent: true },
      { source: '/candidates', destination: '/en/candidates', permanent: true },
      { source: '/hiring-managers', destination: '/en/hiring-managers', permanent: true },
      { source: '/about', destination: '/en/about', permanent: true },
      { source: '/contact', destination: '/en/contact', permanent: true },
      { source: '/insights', destination: '/en/insights', permanent: true },
      { source: '/insights/:slug*', destination: '/en/insights/:slug*', permanent: true },
      { source: '/portability', destination: '/en/portability', permanent: true },
      { source: '/bp-simulator', destination: '/en/bp-simulator', permanent: true },
      { source: '/apply', destination: '/en/apply', permanent: true },
      { source: '/privacy', destination: '/en/privacy', permanent: true },
      {
        source: "/:path*",
        has: [{ type: "host", value: "execpartners.ch" }],
        destination: "https://www.execpartners.ch/:path*",
        permanent: true,
      },
      { source: "/portability", destination: "/en/portability", permanent: true },
      { source: "/insights", destination: "/en/insights", permanent: true },
      { source: "/insights/:path*", destination: "/en/insights/:path*", permanent: true },
      { source: "/apply", destination: "/en/apply", permanent: true },
      { source: "/privacy", destination: "/en/privacy", permanent: true },
      { source: "/hiring-managers/brief", destination: "/en/hiring-managers/brief", permanent: true },
      { source: "/jobs", destination: "/en/jobs", permanent: true },
      { source: "/markets", destination: "/en/markets", permanent: true },
      { source: "/markets/:path((?!.*\\..*).*)", destination: "/en/markets/:path", permanent: true },
      { source: "/jobs/:path*", destination: "/en/jobs/:path*", permanent: true },
      { source: "/en/jobs/", destination: "/en/jobs", permanent: true },
      { source: "/form-view/:path*", destination: "/en/contact", permanent: true },
      { source: "/recent-job-opening", destination: "/en/jobs", permanent: true },
      { source: "/recent-job-opening/", destination: "/en/jobs", permanent: true },
      { source: "/top-talent", destination: "/en/candidates", permanent: true },
      { source: "/executive-recruiters", destination: "/en/hiring-managers", permanent: true },
      { source: "/executive-recruiters/", destination: "/en/hiring-managers", permanent: true },
      { source: "/new-business-sim", destination: "/en/bp-simulator", permanent: true },
      { source: "/new-business-sim/", destination: "/en/bp-simulator", permanent: true },
      { source: "/business-plan-simulator", destination: "/en/bp-simulator", permanent: true },
      { source: "/bp-simulator", destination: "/en/bp-simulator", permanent: true },
      { source: "/about us", destination: "/en/about", permanent: true },
      { source: "/about", destination: "/en/about", permanent: true },
      { source: "/candidates", destination: "/en/candidates", permanent: true },
      { source: "/candidates/", destination: "/en/candidates", permanent: true },
      { source: "/hiring-managers", destination: "/en/hiring-managers", permanent: true },
      { source: "/contact", destination: "/en/contact", permanent: true },
    ];
  },
};
 
module.exports = nextConfig;