import Reblend, { useEffect, useState } from 'reblendjs';
import { useContext } from 'reblendjs';
import { History } from '../contexts/history';
import ReblendRouting from 'reblend-routing';
import { Query } from '../contexts/query';
import { Params } from '../contexts/params';
import { Hash } from '../contexts/hash';
import { Location } from '../contexts/location';
import { Routes } from '../contexts/routes';
import { PageNotfound } from '../contexts/notfound';

export type RouteProps = {
  query?: Reblend.IAny;
  params?: Reblend.IAny;
  location?: URL & { path?: string };
  hash: string;
  path: string;
};

export interface RouterProps<T> {
  Component?: Reblend.JSXElementConstructor<T>;
  element?:
    | ((routeData: RouteProps) => Reblend.JSX.Element | HTMLElement)
    | Reblend.JSX.Element
    | HTMLElement;
  path: string;
}

const routing = new ReblendRouting();

function Router<T>({ routes }: { routes: { [key: string]: RouterProps<T> } }) {
  const [history, setHistory] = useContext(History);
  const [routesContext, setRoutesContext] = useContext(Routes);
  const [matched, setMatched] = useState<{
    matchedComponent: Omit<RouterProps<T>, 'path'>;
    matchedData: RouteProps;
  } | null>(null);

  useEffect(() => {
    if (!routes) {
      console.warn('List of routes is empty');
    } else {
      setRoutesContext((() => {
        const map = new Map();
        Object.values(routes).forEach(route => {
          map.set(route.path, {
            Component: route.Component,
            path: route.path,
          });
        });
        return map;
      })());
    }
  }, [routes]);

  const notFound = () => {
    setMatched(null);
    PageNotfound.update(true);
  };

  useEffect(() => {
    if (!routesContext) return;

    routesContext.forEach(({ path, Component, element }, key) => {
      routing.get(path, res => {
        if (!routesContext.get(key)) {
          return notFound();
        }
        const data = {
          query: res.query,
          params: res.params,
          location: (() => {
            res.urlObject['path'] = path;
            return res.urlObject;
          })(),
          hash: res.urlObject.hash,
          path,
        };
        Query.update(data.query);
        Params.update(data.params);
        Location.update(data.location as any);
        Hash.update(data.hash);
        setMatched({
          matchedData: data,
          matchedComponent: {
            Component,
            element,
          },
        });
        PageNotfound.update(false);
      });
    });
  }, [routesContext]);

  const handleHistoryChange = () => {
    if (history !== window.location.href) {
      setHistory(window.location.href);
    }
  };

  useEffect(() => {
    addEventListener('popstate', handleHistoryChange);
    return () => {
      removeEventListener('popstate', handleHistoryChange);
    };
  }, []);

  useEffect(() => {
    routing.handle(history, () => notFound());
  }, [history, routesContext]);

  useEffect(async () => {
    const { matchedData } = matched || {};

    if (!matchedData?.hash) {
      return;
    }

    setTimeout(() => {
      const idElement = document.querySelector(matchedData.hash);
      if (!idElement) {
        return;
      }
      window.scrollTo({
        top: idElement.getBoundingClientRect().top,
        behavior: 'smooth',
      });
    }, 200);
  }, [matched]);

  return (() => {
    if (!matched) {
      return null;
    }

    const { matchedComponent, matchedData } = matched;
    const { Component, element } = matchedComponent;

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
  })();
}

export { Router };
