import { useRemoteNavigate } from 'remote-components/host/react';
import { useEffect, useMemo, useState } from 'react';
import { ClosedShadowNavigation } from './examples/closed-shadow-navigation';
import { OpenShadowNavigation } from './examples/open-shadow-navigation';
import { ReactContextExample } from './examples/react-context-example';

const routes = ['/', '/dashboard', '/reports', '/settings'];
const contextProfiles = [
  { account: 'acme-team', theme: 'green' },
  { account: 'platform-team', theme: 'blue' },
];

function getCurrentPath() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

function useBrowserPath() {
  const [path, setPath] = useState(() => getCurrentPath());

  useEffect(() => {
    const onPopState = () => setPath(getCurrentPath());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useRemoteNavigate((event) => {
    setPath(`${event.pathname}${event.search}${event.hash}`);
  });

  const navigate = (nextPath: string) => {
    window.history.pushState({}, '', nextPath);
    setPath(getCurrentPath());
  };

  return [path, navigate] as const;
}

export default function App() {
  const [path, navigate] = useBrowserPath();
  const [contextProfileIndex, setContextProfileIndex] = useState(0);
  const contextProfile = contextProfiles[contextProfileIndex];

  const currentRoute = useMemo(() => {
    const pathname = path.split('?')[0].split('#')[0] || '/';
    return pathname === '' ? '/' : pathname;
  }, [path]);

  const contextValue = useMemo(
    () => ({
      account: contextProfile.account,
      theme: contextProfile.theme,
    }),
    [contextProfile.account, contextProfile.theme],
  );
  const navigationSrc = `/app-fragments/navigation?active=${encodeURIComponent(currentRoute)}`;
  const switchContext = () => {
    setContextProfileIndex((current) => (current + 1) % contextProfiles.length);
  };

  return (
    <main>
      <header className="topbar">
        <div>
          <p className="eyebrow">vc-runtime-lab</p>
          <h1>Remote Components demo</h1>
        </div>
        <nav aria-label="Host navigation">
          {routes.map((route) => (
            <button
              className={currentRoute === route ? 'active' : ''}
              key={route}
              onClick={() => navigate(route)}
              type="button"
            >
              {route === '/' ? 'home' : route.slice(1)}
            </button>
          ))}
        </nav>
      </header>

      <section className="host-context">
        <h2>Host context</h2>
        <div>
          <span>account</span>
          <strong>{contextValue.account}</strong>
        </div>
        <div>
          <span>theme</span>
          <strong>{contextValue.theme}</strong>
        </div>
        <button onClick={switchContext} type="button">
          switch context
        </button>
      </section>

      <div className="grid">
        <OpenShadowNavigation src={navigationSrc} />
        <ClosedShadowNavigation src={navigationSrc} />
        <ReactContextExample value={contextValue} />
      </div>
    </main>
  );
}
