import { createContext } from 'reblendjs';
import ReblendRouting from 'reblend-routing';
import { Query } from './query';
import { Params } from './params';
import { Location } from './location';
import { Hash } from './hash';
import { ReblendTyping } from 'reblend-typing';

export type HistoryRequest = {
  query?: ReblendTyping.IAny;
  params?: ReblendTyping.IAny;
  location?: URL & { path: string };
  hash: string;
  path: string;
};

interface RoutePath {
  [path: string]: (res?: HistoryRequest | null) => void;
}

export const PageNotfound = createContext(false);

type R = [ReblendRouting, (res?: HistoryRequest | null) => void];

interface IRoutes {
  routes: Map<string, R>;
  handle(url: string): void;
  register(route: RoutePath): void;
  unregister(path: string): void;
}

export const Routes: IRoutes = {
  routes: new Map(),
  handle: function (url: string) {
    let notFounds = 0;
    for (const [_path, [routing, handler]] of this.routes) {
      routing.handle(url, () => (notFounds++, handler(null)));
    }
    if (this.routes.size <= notFounds) {
      PageNotfound.update(true);
    } else {
      PageNotfound.update(false);
    }
  },
  register: function (route: RoutePath) {
    const [key, value] = Object.entries(route)[0];
    const routing = new ReblendRouting();
    routing.get(key, res => {
      const data = {
        query: res.query,
        params: res.params,
        location: { ...res.urlObject, path: key },
        hash: res.urlObject.hash,
        path: key,
      };
      Query.update(data.query);
      Params.update(data.params);
      Location.update(data.location);
      Hash.update(data.hash);
      value && value(data);
    });
    this.routes.set(key, [routing, value]);
  },
  unregister: function (path: string) {
    const routing = this.routes.get(path);
    if (routing) {
      this.routes.delete(path);
    }
  },
};
