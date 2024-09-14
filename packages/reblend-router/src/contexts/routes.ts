import type Reblend from 'reblendjs';
import { createContext } from 'reblendjs';
import ReblendRouting from 'reblend-routing';
import { Query } from './query';
import { Params } from './params';
import { Location } from './location';
import { Hash } from './hash';

type RoutePath = { [path: string]: Reblend };

export const Routes = createContext(new ReblendRouting());
export const MatchedRoute = createContext(null as any as Reblend);
export const PageNotfound = createContext(true);

const createRoute = (route: RoutePath) => {
  Routes.update(previousState => {
    const [key, value] = Object.entries(route)[0];
    previousState.post(key, res => {
      Query.update(res.query);
      Params.update(res.params);
      Location.update(res.urlObject);
      Hash.update(res.urlObject.hash);
      MatchedRoute.update(value);
      PageNotfound.update(false);
    });
    return previousState;
  });
};

export { createRoute };
