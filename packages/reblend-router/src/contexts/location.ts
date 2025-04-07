import { createContext } from 'reblendjs';

const Location = createContext<(URL & { path: string }) | undefined | null>(
  null as any
);

export { Location };
