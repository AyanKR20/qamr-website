import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 768, 1080, 1280, 1920],
    imageSizes: [64, 128, 256, 384, 600],
    minimumCacheTTL: 31536000,
  },

  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/privacypolicy",
        destination: "/privacy.html",
      },
    ];
  },
};

export default nextConfig;