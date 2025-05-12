import Reblend, { useEffect, useReducer } from 'reblendjs';
import { RouteProps, Routes } from '../contexts/routes';
import { ReblendTyping } from 'reblend-typing';

export function Route<T>({
  Component,
  element,
  path,
}: {
  Component?: ReblendTyping.JSXElementConstructor<T>;
  element?:
    | ((routeData: RouteProps) => Reblend.JSX.Element | HTMLElement)
    | Reblend.JSX.Element
    | HTMLElement;
  path: string;
}) {
  const [matchedData, setMatchedData] = useReducer<
    RouteProps | null | undefined,
    RouteProps | null | undefined
  >((_prev, current) => {
    return current || null;
  }, null);

  Routes.register({ [path]: setMatchedData });

  useEffect(() => {
    return () => Routes.unregister(path);
  }, []);

  useEffect(() => {
    if (!matchedData) {
      return;
    }

    const { hash } = matchedData;
    if (!hash) {
      return;
    }

    setTimeout(() => {
      const idElement = document.querySelector(hash);
      if (!idElement) {
        return;
      }
      idElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }, 100);
  }, [matchedData]);

  return () => {
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
  };
}
