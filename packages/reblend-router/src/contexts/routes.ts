import type Reblend from 'reblendjs';
import { createContext } from 'reblendjs';
import ReblendRouting from 'reblend-routing';

type RoutePath = { [path: string]: Reblend };

export const Routes = createContext(new ReblendRouting());
export const MatchedRoute = createContext(null as any as Reblend);

const createRoute = (route: RoutePath) => {
  Routes.update(previousState => {
    const [key, value] = Object.entries(route)[0];
    previousState.post(key, () => MatchedRoute.update(value));
    return previousState;
  });
};

export default createRoute;
