import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import type { NextConfig } from 'next';
import { withContentlayer } from 'next-contentlayer2';

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {};

export default withContentlayer(withVanillaExtract(nextConfig));
