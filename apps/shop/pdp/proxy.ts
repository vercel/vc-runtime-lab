import { withConsumeRemoteComponentsProxy } from 'remote-components/host/proxy'

export default withConsumeRemoteComponentsProxy(undefined, {
  allowedProxyUrls: [
    'https://shop-[a-z]+(-[A-Za-z0-9-]+)*\\.vercel\\.app',
  ],
})

export const config = {
  matcher: ['/rc-fetch-protected-remote'],
}
