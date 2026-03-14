import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export with Next.js Images
  },
  // If your GitHub repository is named 'bayareakids', 
  // you might need to add: basePath: '/bayareakids' 
  // during production build.
};

export default nextConfig;
