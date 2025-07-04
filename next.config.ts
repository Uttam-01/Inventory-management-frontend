import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  productionBrowserSourceMaps: false,
  compress: true,
  reactStrictMode: true,              // Optional but recommended
  swcMinify: true,
  /* config options here */
};

export default nextConfig;
