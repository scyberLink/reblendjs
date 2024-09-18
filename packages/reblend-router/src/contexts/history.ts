import { CacheType, createContext } from 'reblendjs';
const REBLEND_ROUTER_HISTORY_CACHE_KEY = 'REBLEND_ROUTER_HISTORY_CACHE_KEY';
const href = window.location.href;

const History = createContext(href);

export { History };
