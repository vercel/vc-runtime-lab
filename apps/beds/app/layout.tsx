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

export const metadata: Metadata = { title: 'Beds MFE — Shop' }

const HEADER_URL = process.env.HEADER_URL ?? 'http://localhost:3001'
const FOOTER_URL = process.env.FOOTER_URL ?? 'http://localhost:3002'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body className="min-h-screen flex flex-col antialiased">
        <PrefetchCrossZoneLinksProvider>
          <Providers>
            <Suspense fallback={<HeaderSkeleton />}>
              <ConsumeRemoteComponent isolate={false} src={`${HEADER_URL}/components/header`} />
            </Suspense>
            <main className="flex-1">{children}</main>
            <Suspense fallback={<FooterSkeleton />}>
              <ConsumeRemoteComponent isolate={false} src={`${FOOTER_URL}/components/footer`} />
            </Suspense>
          </Providers>
        </PrefetchCrossZoneLinksProvider>
        <PrefetchCrossZoneLinks />
      </body>
    </html>
  )
}
