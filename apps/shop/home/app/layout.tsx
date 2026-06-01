import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Suspense } from 'react'
import { ConsumeRemoteComponent } from 'remote-components/host/nextjs/app'
import {
  PrefetchCrossZoneLinks,
  PrefetchCrossZoneLinksProvider,
} from '@vercel/microfrontends/next/client'
import './globals.css'
import { Providers } from './providers'
import { FooterSkeleton } from '@/components/Skeletons'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = { title: 'Home MFE — Shop' }

// ISR: the route (and the composed remote header/footer) is statically
// generated and cached indefinitely, refreshing only on a new deploy or
// on-demand revalidation.
export const revalidate = false

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body className="min-h-screen flex flex-col antialiased">
        <PrefetchCrossZoneLinksProvider>
          <Providers>
            <ConsumeRemoteComponent isolate={false} src="/components/header" />
            <main className="flex-1">{children}</main>
            <Suspense fallback={<FooterSkeleton />}>
              <ConsumeRemoteComponent isolate={false} src="/components/footer" />
            </Suspense>
          </Providers>
        </PrefetchCrossZoneLinksProvider>
        <PrefetchCrossZoneLinks />
      </body>
    </html>
  )
}
