import type { NextConfig } from 'next';
import { withContentlayer } from 'next-contentlayer2';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'img.stile.im',
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/post/:slug*',
        has: [
          {
            type: 'host',
            value: 'blog.stile.im',
          },
        ],
        destination: 'https://stile.im/post/:slug*',
        permanent: true,
      },

      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'blog.stile.im',
          },
        ],
        destination: 'https://stile.im/:path*',
        permanent: true,
      },
    ];
  },
};

export default withContentlayer(nextConfig);
