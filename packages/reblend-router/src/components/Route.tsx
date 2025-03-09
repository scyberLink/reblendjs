import Reblend, { useContext, useReducer } from 'reblendjs';
import { Routes } from '../contexts/routes';
import { Request } from 'reblend-routing';

export function Route<T>({
  Component,
  element,
  path,
}: {
  Component?: ReblendTyping.JSXElementConstructor<T>;
  element?: Reblend.JSX.Element | HTMLElement;
  path: string;
}) {
  if (!(element || Component)) {
    throw new Error('Route should have element or Component prop');
  }

  const [matched, setMatched] = useReducer<boolean, Request | null>(
    (_prev, current) => {
      return !!(current || false);
    },
    false
  );

  Routes.register({ [path]: setMatched as any });

  return (
    <>
      {matched
        ? //@ts-ignore
          element || (Component && <Component {...({} as any)} />)
        : null}
    </>
  );
}
