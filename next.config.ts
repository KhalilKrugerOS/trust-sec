import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone", // Required for Docker
  images: {
    domains: [
      "images.unsplash.com",
      "cdn.sanity.io",
      "khalil-dev.t3.storage.dev",
    ],
  },
};

export default nextConfig;
