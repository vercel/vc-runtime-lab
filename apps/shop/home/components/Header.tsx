import { ConsumeRemoteComponent } from 'remote-components/host/nextjs/app'

export async function Header() {
  'use cache'
  return <ConsumeRemoteComponent isolate={false} src="/components/header" />
}
