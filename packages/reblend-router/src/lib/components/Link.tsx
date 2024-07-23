import Reblend, { useContextDispatch } from 'reblendjs';
import History from '../contexts/history';

function Link({ to, href, children }: any) {
  //@ts-ignore
  this.setCursor('pointer');

  const historyDispatcher = useContextDispatch(History);

  function onclick(e: any) {
    e.preventDefault();
    const url = new URL(to || href || '#', location.origin);
    historyDispatcher(url.href);
  }

  return (
    <a href={to || href || '#'} onClick={onclick}>
      {children}
    </a>
  );
}

export default Link;
