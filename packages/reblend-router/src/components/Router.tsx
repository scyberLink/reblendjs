import Reblend, { useEffect } from 'reblendjs';
import { useContext } from 'reblendjs';
import { History } from '../contexts/history';
import { Routes } from '../contexts/routes';

function Router({ children }: { children?: any }) {
  const [history, setHistory] = useContext(History);

  const handleHistoryChange = () => {
    if (history !== window.location.href) {
      setHistory(window.location.href);
    }
  };

  addEventListener('popstate', handleHistoryChange);

  useEffect(() => {
    Routes.handle(history);
    return () => {
      removeEventListener('popstate', handleHistoryChange);
    };
  }, [history]);

  return <>{children}</>;
}

export { Router };
