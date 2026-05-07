import type { NextConfig } from 'next'
import { withMicrofrontends } from '@vercel/microfrontends/next/config'
import { withRemoteComponentsConfig } from 'remote-components/config/nextjs'

console.log('[rc-debug] TURBOPACK=' + JSON.stringify(process.env.TURBOPACK) + ' NEXT_RUNTIME=' + JSON.stringify(process.env.NEXT_RUNTIME))

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'placehold.co' }],
  },
}

export default withRemoteComponentsConfig(
  withMicrofrontends(nextConfig),
  { shared: ["@shop/ui", "@vercel/microfrontends/next/client"] }
)
