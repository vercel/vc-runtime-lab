import { cacheLife } from 'next/cache';
import { ConsumeRemoteComponent } from 'remote-components/host/nextjs/app'

export async function Header() {
  "use cache";
  cacheLife("days");
  return <ConsumeRemoteComponent isolate={false} src="/components/header" />
}
