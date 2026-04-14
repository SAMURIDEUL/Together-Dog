import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@together-dog/ui'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'together-dog.up.railway.app',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      ...(process.env.NODE_ENV === 'development'
        ? [
            {
              protocol: 'http' as const,
              hostname: 'localhost',
              port: '3000',
            },
          ]
        : []),
    ],
  },
  async rewrites() {
    const backendUrl = process.env.API_URL || 'http://localhost:8080';
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${backendUrl}/uploads/:path*`,
      },
    ];
  },
};

const analyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default analyzer(nextConfig);
