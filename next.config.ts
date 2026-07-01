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
      // Clean + legacy share-link aliases → canonical viewer routes.
      { source: "/p/:id", destination: "/post/:id", permanent: false },
      { source: "/r/:id", destination: "/reel/:id", permanent: false },
      { source: "/posts/:id", destination: "/post/:id", permanent: false },
      { source: "/reels/:id", destination: "/reel/:id", permanent: false },
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