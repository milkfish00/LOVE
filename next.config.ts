import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        hostname: "swiperjs.com",
      },
      {
        hostname: "cdn.sanity.io",
      },
      {
        hostname: "images.pexels.com",
      },
      
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "@heroicons/react"],
  },
  // Enable features for better performance
  serverExternalPackages: ['@sanity/client'],
  // Configure headers for better caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://www.loveandlearning.net https://loveandlearning.net",
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ];
  },
  // Configure redirects if needed
  async redirects() {
    return [];
  },
};

export default nextConfig;
