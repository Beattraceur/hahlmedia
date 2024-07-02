import { withPayload } from "@payloadcms/next/withPayload";
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [640, 768, 1080, 1200, 1920, 2048, 2560],
    formats: ["image/avif", "image/webp"],
  },
};

export default withPayload(nextConfig);
