import Reblend, { useEffect } from 'reblendjs';
import { useContext } from 'reblendjs';
import History from '../contexts/history';
import { Requester } from 'reblend-routing';

function BrowserRouter({
  memory,
  children,
}: {
  memory?: boolean;
  children?: JSX.Element[];
}) {
  const history = useContext(History);
  useEffect(() => {
    Requester.for(history, 'post');
    try {
      !memory &&
        window.history.pushState({ ...window.history.state }, '', history);
    } catch (error) {
      console.error('Error changing browser Location bar');
    }
  }, [history]);

  return <>{children}</>;
}

export default BrowserRouter;
