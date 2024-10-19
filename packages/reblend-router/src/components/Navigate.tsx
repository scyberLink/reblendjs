import Reblend, { useEffect } from 'reblendjs';
import { setHistory } from '../contexts/history';

export const redirectTo = (url: string) => {
  if (url && typeof url === 'string') {
    setHistory(url);
  } else {
    console.warn('Cannot redirect to invalid');
  }
};

export function Navigate({ to }: { to?: string }) {
  useEffect(() => {
    to && redirectTo(to);
  }, [to]);
  return <></>;
}

export { Navigate as Redirect };
