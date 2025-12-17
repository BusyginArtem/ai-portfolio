/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["pdf-parse", "mammoth"],
  experimental: {
    inlineCss: true,
  },
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
  async redirects() {
    const urls = [];

    if (process.env.NODE_ENV === "production") {
      urls.push({
        source: "/upload",
        destination: "/",
        permanent: false,
      });
    }

    return urls;
  },
};

export default nextConfig;
