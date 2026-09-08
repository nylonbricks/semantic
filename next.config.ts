import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remarkGfm"],
  },
});

const nextConfig: NextConfig = {
  experimental: {
    mdxRs: {
      mdxType: "gfm",
    },
  },
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        hostname: "localhost",
        protocol: "http",
      },
    ],
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

export default withMDX(nextConfig);
