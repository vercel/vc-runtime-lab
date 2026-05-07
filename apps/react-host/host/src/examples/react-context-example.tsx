import { ConsumeRemoteComponent } from 'remote-components/host/react';
import { ErrorBoundary } from '../components/error-boundary';
import { LoadingCard } from '../components/loading-card';
import { RemotePanel } from '../components/remote-panel';
import * as DemoContextModule from '../shared/demo-context';
import {
  DemoContextProvider,
  type DemoContextValue,
} from '../shared/demo-context';
import { codeLinks } from './code-links';

const codeUrls = codeLinks(
  'apps/react-host/host/src/examples/react-context-example.tsx',
  'apps/react-host/remote/app/app-fragments/context/context-panel.tsx',
);

const sharedModules = {
  'vc-runtime-lab-shared-context': async () => DemoContextModule,
};

export function ReactContextExample({ value }: { value: DemoContextValue }) {
  return (
    <RemotePanel codeUrls={codeUrls} label="React context">
      <DemoContextProvider value={value}>
        <ErrorBoundary label="React context failed">
          <ConsumeRemoteComponent
            shared={sharedModules}
            src="/app-fragments/context"
          >
            <LoadingCard title="react context" />
          </ConsumeRemoteComponent>
        </ErrorBoundary>
      </DemoContextProvider>
    </RemotePanel>
  );
}
