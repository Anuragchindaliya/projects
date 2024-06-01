/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // scrollRestoration: true,
  },
  images:{
    domains:["aceternity.com","images.unsplash.com"]
  }
};

module.exports = nextConfig;
