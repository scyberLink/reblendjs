import Reblend, { useEffect, useReducer } from 'reblendjs';
import { HistoryRequest, Routes } from '../contexts/routes';
import { ReblendTyping } from 'reblend-typing';

export function Route<T>({
  Component,
  element,
  path,
}: {
  Component?: ReblendTyping.JSXElementConstructor<T>;
  element?:
    | ((routeData: HistoryRequest) => Reblend.JSX.Element | HTMLElement)
    | Reblend.JSX.Element
    | HTMLElement;
  path: string;
}) {
  if (!(element || Component)) {
    throw new Error('Route should have element or Component prop');
  }

  const [matchedData, setMatchedData] = useReducer<
    HistoryRequest | null | undefined,
    HistoryRequest | null | undefined
  >((_prev, current) => {
    return current || null;
  }, null);

  useEffect(() => {
    Routes.register({ [path]: setMatchedData });
    return () => Routes.unregister(path);
  }, []);

  return (() => {
    if (!matchedData) {
      return null;
    }

    if (element) {
      if (typeof element === 'function') {
        return element(matchedData);
      }
      if (typeof element === 'object' && 'props' in element && element.props) {
        element.props = { ...matchedData, ...element.props };
        return element;
      } else {
        return element;
      }
    }

    if (Component) {
      //@ts-ignore
      return <Component {...matchedData} />;
    }

    return null;
  })();
}
