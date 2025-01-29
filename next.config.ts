import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  trailingSlash: true,
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
};

export default nextConfig;
