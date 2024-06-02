/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "tuan-minh-istore.onrender.com",
      },
    ],
  },
};

module.exports = nextConfig;
