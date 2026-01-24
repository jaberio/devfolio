import type { NextConfig } from "next";

/**
 * Devfolio Universal Deployment Config
 * 
 * This config automatically handles:
 * 1. GitHub Pages (Subfolder hosting)
 * 2. Vercel/Netlify/Cloudflare (Root domain hosting)
 * 3. Local Development
 */

const isGitHubPages = process.env.IS_GITHUB_PAGES === 'true';
const basePath = isGitHubPages ? '/devfolio' : '';

const nextConfig: NextConfig = {
  // Use 'export' for static hosts like GitHub Pages
  // Standard hosts like Vercel usually handle builds without this
  output: isGitHubPages ? 'export' : undefined,

  // Apply basePath only for GitHub Pages project sites
  basePath: basePath,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
