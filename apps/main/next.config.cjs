const { DOCS_URL, POST_URL } = process.env

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      /**
       * Rewrites for Multi-Zones
       */
      {
        source: '/docs',
        destination: `${DOCS_URL}/docs`,
      },
      {
        source: '/docs/:path*',
        destination: `${DOCS_URL}/docs/:path*`,
      },
      {
        source: '/_next/static/:path*',
        destination: `${DOCS_URL}/_next/static/:path*`,
      },
      {
        source: '/docs-static/:path*',
        destination: `${DOCS_URL}/docs-static/:path*`,
      },
      /**
       * Rewrites for ShareSphere
       */
      {
        source: '/post',
        destination: `${POST_URL}/post`,
      },
      {
        source: '/post/:path*',
        destination: `${POST_URL}/post/:path*`,
      },
      {
        source: '/sharesphere-static/:path*',
        destination: `${POST_URL}/sharesphere-static/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
