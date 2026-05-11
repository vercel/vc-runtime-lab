'use client'

import { RemoteComponentsClientProvider } from 'remote-components/host/nextjs/app/client-only'
import { routeThroughHostProxy } from 'remote-components/host/proxy/client'

const resolveClientUrl =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview' ? routeThroughHostProxy : undefined

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RemoteComponentsClientProvider
      resolveClientUrl={resolveClientUrl}
      shared={{
        '@shop/ui': () => import('@shop/ui'),
        '@vercel/microfrontends/next/client': () => import('@vercel/microfrontends/next/client'),
      }}
    >
      {children}
    </RemoteComponentsClientProvider>
  )
}
