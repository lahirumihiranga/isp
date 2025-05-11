import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "ik.imagekit.io",
      },
      {
        hostname: "ucarecdn.com",
      },
    ],
  },
};

export default nextConfig;
