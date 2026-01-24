import type { NextConfig } from "next";

const isVercel = process.env.VERCEL === '1';

const nextConfig: NextConfig = {
  // Only export for GitHub Pages, Vercel handles builds automatically
  output: isVercel ? undefined : 'export',
  // Only use basePath for GitHub Pages subfolder (if not on Vercel)
  basePath: isVercel ? '' : '/devfolio',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
