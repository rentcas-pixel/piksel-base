/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  images: {
    unoptimized: true,
    domains: ['localhost', 'supabase.co'],
    formats: ['image/webp', 'image/avif'],
  },
}

module.exports = nextConfig
