import Reblend, { useEffect } from 'reblendjs';
import { useContext } from 'reblendjs';
import { History } from '../contexts/history';
import { Requester } from 'reblend-routing';

function Router({ children }: { children?: JSX.Element[] }) {
  const history = useContext(History);
  const handleHistoryChange = () => {
    History.update(window.location.href);
  };

  addEventListener('popstate', handleHistoryChange);

  useEffect(() => {
    Requester.for(history, 'post');

    return removeEventListener('popstate', handleHistoryChange);
  }, [history]);

  return <>{children}</>;
}

export { Router };
