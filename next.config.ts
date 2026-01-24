import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/devfolio',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
