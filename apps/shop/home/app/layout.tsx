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

export const dynamic = 'force-dynamic'

export const metadata: Metadata = { title: 'Home MFE — Shop' }

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body className="min-h-screen flex flex-col antialiased">
        <PrefetchCrossZoneLinksProvider>
          <Providers>
            {/* DEBUG: header/footer commented out to bisect useContext error */}
            {/* <Suspense fallback={<HeaderSkeleton />}>
              <ConsumeRemoteComponent isolate={false} src="/components/header" />
            </Suspense> */}
            <main className="flex-1">{children}</main>
            {/* <Suspense fallback={<FooterSkeleton />}>
              <ConsumeRemoteComponent isolate={false} src="/components/footer" />
            </Suspense> */}
          </Providers>
        </PrefetchCrossZoneLinksProvider>
        <PrefetchCrossZoneLinks />
      </body>
    </html>
  )
}
