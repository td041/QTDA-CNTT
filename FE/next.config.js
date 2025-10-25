/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "localhost", port: "8080" },
      { protocol: "https", hostname: "fitfoodish.com" },
    ],
  },
};
module.exports = nextConfig;
