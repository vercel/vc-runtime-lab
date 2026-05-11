import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import {
  PrefetchCrossZoneLinks,
  PrefetchCrossZoneLinksProvider,
} from '@vercel/microfrontends/next/client'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = { title: 'Header MFE — Shop' }

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body>
        <PrefetchCrossZoneLinksProvider>{children}</PrefetchCrossZoneLinksProvider>
        <PrefetchCrossZoneLinks />
      </body>
    </html>
  )
}
