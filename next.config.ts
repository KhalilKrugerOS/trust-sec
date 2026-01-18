import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone", // Required for Docker
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "khalil-dev.t3.storage.dev",
      },
      {
        protocol: "https",
        hostname: "*.s3.*.amazonaws.com", // Allow all S3 buckets
      },
    ],
  },
};

export default nextConfig;
