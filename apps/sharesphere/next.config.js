/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: '/sharesphere-static',
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/sharesphere-static/_next/:path*',
          destination: '/_next/:path*',
        },
      ],
    }
  },
}

module.exports = nextConfig 