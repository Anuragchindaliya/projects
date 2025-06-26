/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // scrollRestoration: true,
  },
  images:{
    domains:["aceternity.com","images.unsplash.com","unsplash.com","api.microlink.io","assets.aceternity.com"]
  }
};

module.exports = nextConfig;
