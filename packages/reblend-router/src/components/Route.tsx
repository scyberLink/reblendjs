import Reblend, { useContext } from 'reblendjs';
import { createRoute, MatchedRoute } from '../contexts/routes';

export function Route({ Component, element, path }: any) {
  const thisRoute = element || <Component />;

  if (!thisRoute) {
    throw new Error('Route should have element or Component prop');
  }

  createRoute({ [path]: thisRoute });

  const matchedRoute = useContext(MatchedRoute);

  return <>{matchedRoute == thisRoute ? matchedRoute : null}</>;
}
