/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'assets.coingecko.com'
    ]
  }
};

console.log('Next Config:', nextConfig);
module.exports = nextConfig;