import { createContext } from 'reblendjs';
import ReblendRouting, { type Request } from 'reblend-routing';
import { Query } from './query';
import { Params } from './params';
import { Location } from './location';
import { Hash } from './hash';

interface RoutePath {
  [path: string]: (res?: Request | null) => void;
}

export const PageNotfound = createContext(true);

type R = [ReblendRouting, (res?: Request | null) => void];

interface IRoutes {
  routes: R[];
  handle(url: string): void;
  register(route: RoutePath): void;
}

export const Routes: IRoutes = {
  routes: [],
  handle: function (url: string) {
    let notFounds = 0;
    for (const [routing, handler] of this.routes) {
      routing.handle(url, () => (notFounds++, handler(null)));
    }
    if (this.routes.length <= notFounds) {
      PageNotfound.update(true);
    } else {
      PageNotfound.update(false);
    }
  },
  register: function (route: RoutePath) {
    const [key, value] = Object.entries(route)[0];
    const routing = new ReblendRouting();
    routing.get(key, res => {
      Query.update(res.query);
      Params.update(res.params);
      Location.update(res.urlObject);
      Hash.update(res.urlObject.hash);
      value && value(res);
    });
    this.routes.push([routing, value]);
  },
};
