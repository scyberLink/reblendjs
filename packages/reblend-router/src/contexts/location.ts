import { createContext } from 'reblendjs';

const Location = createContext<URL | undefined | null>(null as any);

export { Location };
