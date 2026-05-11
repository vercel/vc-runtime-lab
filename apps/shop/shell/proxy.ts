import { withConsumeRemoteComponentsProxy } from 'remote-components/host/proxy'

// Lets `routeThroughHostProxy` rewrite cross-origin remote-component asset
// fetches to go through this host's `/rc-fetch-protected-remote` endpoint
// (carrying the host's auth cookies / bypass secret), so preview deployments
// with protection enabled can still load remotes client-side.
//
// The host's outbound fetch will attach `x-vercel-protection-bypass` from
// the `VERCEL_AUTOMATION_BYPASS_SECRET` env var when present — set the same
// secret on every shop project so cross-zone fetches succeed.
export default withConsumeRemoteComponentsProxy(undefined, {
  allowedProxyUrls: [
    // Any preview / production deploy of any shop zone on *.vercel.app.
    'https://shop-[a-z]+(-[A-Za-z0-9-]+)*\\.vercel\\.app',
  ],
})

export const config = {
  matcher: ['/rc-fetch-protected-remote'],
}
