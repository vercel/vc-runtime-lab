import { withMicrofrontends } from '@vercel/microfrontends/next/config';
import { withRemoteComponentsConfig } from 'remote-components/config/nextjs';

const nextConfig = {
  reactStrictMode: true,
};

export default withRemoteComponentsConfig(withMicrofrontends(nextConfig), {
  shared: ['vc-runtime-lab-shared-context'],
});
