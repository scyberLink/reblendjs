import { createContext, useContextDispatch } from 'reblendjs';
import ReblendRouting from 'reblend-routing';
export const Routes = createContext(new ReblendRouting());
export const MatchedRoute = createContext(null);
const matchedRouteDispatcher = useContextDispatch(MatchedRoute);
const routeDispatcher = useContextDispatch(Routes);
const createRoute = route => {
  routeDispatcher(previousState => {
    const [key, value] = Object.entries(route)[0];
    previousState.post(key, () => matchedRouteDispatcher(value));
    return previousState;
  });
};
export default createRoute;
