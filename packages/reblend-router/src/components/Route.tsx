import Reblend, { useContext } from 'reblendjs';
import { createRoute, MatchedRoute } from '../contexts/routes';
import { ReblendTyping } from '../../../reblend-typing/lib';

export function Route<T>({
  Component,
  element,
  path,
}: {
  Component?: ReblendTyping.JSXElementConstructor<T>;
  element?: Reblend.JSX.Element;
  path: string;
}) {
  //@ts-ignore
  const thisRoute = element || <Component {...({} as any)} />;

  if (!thisRoute) {
    throw new Error('Route should have element or Component prop');
  }

  createRoute({ [path]: thisRoute });

  const [matchedRoute] = useContext(MatchedRoute);

  return <>{matchedRoute == thisRoute ? matchedRoute : null}</>;
}
