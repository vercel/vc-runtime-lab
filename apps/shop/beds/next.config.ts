import type { NextConfig } from 'next'
import { withMicrofrontends } from '@vercel/microfrontends/next/config'
import { withRemoteComponentsConfig } from 'remote-components/config/nextjs'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: '**.public.blob.vercel-storage.com' },
    ],
  },
}

export default withRemoteComponentsConfig(
  withMicrofrontends(nextConfig),
  { shared: ["@shop/ui", "@vercel/microfrontends/next/client"] }
)
