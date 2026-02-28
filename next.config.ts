import type { NextConfig } from "next";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

if (process.env.NODE_ENV === "development") {
  await setupDevPlatform();
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    formats: ["image/webp", "image/avif"],
    unoptimized: true,
  },
};

export default nextConfig;
