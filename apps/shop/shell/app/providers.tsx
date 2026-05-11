'use client'

import { RemoteComponentsClientProvider } from 'remote-components/host/nextjs/app/client-only'
import { routeThroughHostProxy } from 'remote-components/host/proxy/client'

// Only route remote-component asset fetches through the host's
// `/rc-fetch-protected-remote` endpoint on Vercel preview deployments,
// where deployment protection blocks direct cross-origin requests.
// In production we let each zone's CDN edge serve its assets directly
// (cacheable, no extra function hop). In local dev requests are same-origin
// through the microfrontends proxy, so no rewrite is needed either.
const resolveClientUrl =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview' ? routeThroughHostProxy : undefined

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RemoteComponentsClientProvider
      resolveClientUrl={resolveClientUrl}
      shared={{
        react: () => import('react'),
        'react/jsx-runtime': () => import('react/jsx-runtime'),
        'react/jsx-dev-runtime': () => import('react/jsx-dev-runtime'),
        'react-dom': () => import('react-dom'),
        'react-dom/client': () => import('react-dom/client'),
        'next/navigation': () => import('next/navigation'),
        'next/link': () => import('next/link'),
        'next/script': () => import('next/script'),
        'next/form': () => import('next/form'),
        '@shop/ui': () => import('@shop/ui'),
        '@vercel/microfrontends/next/client': () => import('@vercel/microfrontends/next/client'),
      }}
    >
      {children}
    </RemoteComponentsClientProvider>
  )
}
