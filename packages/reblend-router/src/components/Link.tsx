import Reblend from 'reblendjs';
import { History } from '../contexts/history';

function Link({
  to,
  href,
  children,
  memory = true,
  className,
}: {
  to?: string;
  href?: string;
  children: JSX.Element | JSX.Element[];
  memory?: boolean;
  className?: string;
}) {
  function onclick(e: any) {
    e.preventDefault();
    const url = new URL(to || href || '#', location.origin);
    History.update(url.href);
    try {
      !memory && window.history.pushState({ ...window.history.state }, '', url);
    } catch (error) {
      console.error('Error changing browser Location bar');
    }
  }

  return (
    <a href={to || href || '#'} onClick={onclick} className={className}>
      {children}
    </a>
  );
}

export { Link };
