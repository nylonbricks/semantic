import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import type { NextConfig } from 'next';
import { withContentlayer } from 'next-contentlayer2';
import path from 'path';

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    unoptimized: true,
  },
  webpack: (config) => {
    config.plugins.push(
      new CleanWebpackPlugin({
        dry: false,
        dangerouslyAllowCleanPatternsOutsideProject: true,
        cleanOnceBeforeBuildPatterns: [path.join(process.cwd(), 'public', 'content')],
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(process.cwd(), 'content'),
            to: path.join(process.cwd(), 'public', 'content'),
            globOptions: { ignore: ['**/*.md', '**/*.mdx'] },
          },
        ],
      }),
    );
    return config;
  },
};

export default withContentlayer(withVanillaExtract(nextConfig));
