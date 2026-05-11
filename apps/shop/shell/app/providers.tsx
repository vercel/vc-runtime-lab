'use client'

import { RemoteComponentsClientProvider } from 'remote-components/host/nextjs/app/client-only'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RemoteComponentsClientProvider
      shared={{
        '@shop/ui': () => import('@shop/ui'),
        '@vercel/microfrontends/next/client': () => import('@vercel/microfrontends/next/client'),
      }}
    >
      {children}
    </RemoteComponentsClientProvider>
  )
}
