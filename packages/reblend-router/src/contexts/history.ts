import { createContext } from 'reblendjs';

const History = createContext(window.location.href);

export { History };
