import { ExposeRemoteComponent } from 'remote-components/remote/nextjs/app';
import { ContextPanel } from './context-panel';

export default function Page() {
  return (
    <ExposeRemoteComponent>
      <ContextPanel />
    </ExposeRemoteComponent>
  );
}
