import { useEffect, useState } from 'react';
import TakeoverApp from './features/evp-takeover/TakeoverApp';
import ConfiguratorApp from './features/campaign-configurator/ConfiguratorApp';

type Route = 'takeover' | 'configurator';

function routeFromHash(hash: string): Route {
  return hash.replace(/^#\/?/, '').split('?')[0] === 'configurator'
    ? 'configurator'
    : 'takeover';
}

export default function App() {
  const [route, setRoute] = useState<Route>(() =>
    routeFromHash(typeof window === 'undefined' ? '' : window.location.hash)
  );

  useEffect(() => {
    const onHashChange = () => setRoute(routeFromHash(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return route === 'configurator' ? <ConfiguratorApp /> : <TakeoverApp />;
}
