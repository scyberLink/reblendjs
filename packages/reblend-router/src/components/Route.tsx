import Reblend, { useEffect } from 'reblendjs';
import { RouteProps } from './Router';
import { Routes } from '../contexts/routes';

/**
 * @deprecated Pass routes to Router components
 * @param props
 * @returns Reblend.JSX.Element
 */
export function Route<T>(props: {
  Component?: Reblend.JSXElementConstructor<T>;
  element?:
    | ((routeData: RouteProps) => Reblend.JSX.Element | HTMLElement)
    | Reblend.JSX.Element
    | HTMLElement;
  path: string;
}) {
  useEffect(() => {
    Routes.getValue().set(props.path, {
      Component: props.Component,
      element: props.element,
      path: props.path,
    });
    Routes.update(Routes.getValue(), true);
  }, [props.path]);

  return <>{null}</>;
}
