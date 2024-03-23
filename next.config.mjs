/** @type {import('next').NextConfig} */
const API_URL = process.env.API_URL ?? "https://api.tucon.ca";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
