import { ConsumeRemoteComponent } from 'remote-components/host/react';
import { ErrorBoundary } from '../components/error-boundary';
import { LoadingCard } from '../components/loading-card';
import { RemotePanel } from '../components/remote-panel';
import { codeLinks } from './code-links';

const codeUrls = codeLinks(
  'apps/react-host/host/src/examples/closed-shadow-navigation.tsx',
  'apps/react-host/remote/app/app-fragments/navigation/navigation-panel.tsx',
);

export function ClosedShadowNavigation({ src }: { src: string }) {
  return (
    <RemotePanel codeUrls={codeUrls} label="Closed shadow">
      <ErrorBoundary label="Closed shadow failed">
        <ConsumeRemoteComponent mode="closed" src={src}>
          <LoadingCard title="closed shadow" />
        </ConsumeRemoteComponent>
      </ErrorBoundary>
    </RemotePanel>
  );
}
