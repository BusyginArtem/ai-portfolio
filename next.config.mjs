/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["pdf-parse", "mammoth"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "", // Leave empty for default ports (80 for http, 443 for https)
        pathname: "/dtrl8p5mc/image/upload/**",
      },
    ],
  },
};

export default nextConfig;
