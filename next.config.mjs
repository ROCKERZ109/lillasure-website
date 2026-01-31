/** @type {import('next').NextConfig} */

import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      // Old About Page -> New About Page
      {
        source: '/om.html',
        destination: '/om-oss', // Or whatever your new route is (e.g. /about)
        permanent: true, // This tells Google: "Change your index forever"
      },
      // Old Location/Contact Page -> New Contact Page
      {
        source: '/var.html',
        destination: '/kontakt', // Or /hitta-oss
        permanent: true,
      },
      // Catch-all for other common old pages (Add more if needed)
    
    ];
  },
};
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');
export default withNextIntl(nextConfig);