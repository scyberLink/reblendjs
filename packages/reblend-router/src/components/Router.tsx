import Reblend, { useEffect } from 'reblendjs';
import { useContext } from 'reblendjs';
import { History } from '../contexts/history';
import { Requester } from 'reblend-routing';
import { MatchedRoute, PageNotfound } from '../contexts/routes';
import { REQUEST_NOTFOUND } from 'reblend-routing/lib/utils';

function Router({ children }: { children?: any }) {
  const [history, setHistory] = useContext(History);

  const handleHistoryChange = () => {
    if (history !== window.location.href) {
      setHistory(window.location.href);
    }
  };

  const handleNotfound = () => {
    PageNotfound.update(true);
    MatchedRoute.update(null as any);
  };

  addEventListener('popstate', handleHistoryChange);
  addEventListener(REQUEST_NOTFOUND, handleNotfound);

  useEffect(() => {
    Requester.for(history, 'post');

    return () => {
      removeEventListener('popstate', handleHistoryChange);
      removeEventListener(REQUEST_NOTFOUND, handleNotfound);
    };
  }, [history]);

  return <>{children}</>;
}

export { Router };
