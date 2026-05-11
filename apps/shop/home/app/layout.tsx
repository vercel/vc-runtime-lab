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
import { HeaderSkeleton, FooterSkeleton } from '@/components/Skeletons'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = { title: 'Home MFE — Shop' }

// Layouts that mount `<ConsumeRemoteComponent>` must opt out of static
// rendering so the remote bundle is fetched & composed at request time
// (otherwise it'd be snapshot at build time and never refresh).
export const dynamic = 'force-dynamic'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body className="min-h-screen flex flex-col antialiased">
        <PrefetchCrossZoneLinksProvider>
          <Providers>
            <Suspense fallback={<HeaderSkeleton />}>
              <ConsumeRemoteComponent isolate={false} src="/components/header" />
            </Suspense>
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
