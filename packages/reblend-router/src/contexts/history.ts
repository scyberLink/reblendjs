import { CacheType, createContext } from 'reblendjs';
const REBLEND_ROUTER_HISTORY_CACHE_KEY = 'REBLEND_ROUTER_HISTORY_CACHE_KEY';
const href = window.location.href;

export const History = createContext(href);

export const setHistory = async (urlOrPath: string, memory?: boolean) => {
  const url = new URL(urlOrPath, location.origin);
  if (await History.update(url.href)) {
    try {
      if (!memory) {
        window.history.pushState({ ...window.history.state }, '', url);
      }
    } catch (error) {
      location.href = urlOrPath;
    }
  }
};
