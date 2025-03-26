import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 315336000, // 1 year
  },
}

export default nextConfig
