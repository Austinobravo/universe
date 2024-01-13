/** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: [
//             'assets.coingecko.com'
//         ]
//     }
// }

// module.exports = nextConfig
const nextConfig = {
    images: {
      domains: ['assets.coingecko.com'],
    },
    experimental: {
      reactRoot: true, // This enables React Strict Mode
      optimizeCss: true,
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=60, s-maxage=60, stale-while-revalidate=60',
            },
          ],
        },
      ];
    },
    // Add any other configurations you need...
  };
  
  module.exports = nextConfig;
  
