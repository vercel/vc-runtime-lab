import { ExposeRemoteComponent } from 'remote-components/remote/nextjs/app';
import { NavigationPanel } from './navigation-panel';

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const active = typeof params.active === 'string' ? params.active : '/';

  return (
    <ExposeRemoteComponent>
      <NavigationPanel active={active} />
    </ExposeRemoteComponent>
  );
}
