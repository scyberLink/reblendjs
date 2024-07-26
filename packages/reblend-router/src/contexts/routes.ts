import type Reblend from 'reblendjs';
import { createContext, useContextDispatch } from 'reblendjs';
import ReblendRouting from 'reblend-routing';

type RoutePath = { [path: string]: Reblend };

export const Routes = createContext(new ReblendRouting());
export const MatchedRoute = createContext(null as any as Reblend);
const matchedRouteDispatcher = useContextDispatch(MatchedRoute);

const routeDispatcher = useContextDispatch(Routes);

const createRoute = (route: RoutePath) => {
  routeDispatcher(previousState => {
    const [key, value] = Object.entries(route)[0];
    previousState.post(key, () => matchedRouteDispatcher(value));
    return previousState;
  });
};

export default createRoute;
