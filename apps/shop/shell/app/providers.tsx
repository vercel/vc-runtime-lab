'use client'

import { RemoteComponentsClientProvider } from 'remote-components/host/nextjs/app/client-only'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RemoteComponentsClientProvider
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
