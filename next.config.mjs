const API_URL = process.env.API_URL ?? "https://api.tucon.ca";

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_CF_PAGES_URL: process.env.CF_PAGES_URL,
  },
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
