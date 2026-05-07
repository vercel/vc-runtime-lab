import { ConsumeRemoteComponent } from 'remote-components/host/react';
import { ErrorBoundary } from '../components/error-boundary';
import { LoadingCard } from '../components/loading-card';
import { RemotePanel } from '../components/remote-panel';
import { codeLinks } from './code-links';

const codeUrls = codeLinks(
  'apps/react-host/host/src/examples/open-shadow-navigation.tsx',
  'apps/react-host/remote/app/app-fragments/navigation/navigation-panel.tsx',
);

export function OpenShadowNavigation({ src }: { src: string }) {
  return (
    <RemotePanel codeUrls={codeUrls} label="Open shadow">
      <ErrorBoundary label="Open shadow failed">
        <ConsumeRemoteComponent mode="open" src={src}>
          <LoadingCard title="open shadow" />
        </ConsumeRemoteComponent>
      </ErrorBoundary>
    </RemotePanel>
  );
}
