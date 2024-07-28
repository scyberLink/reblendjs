import IAny from 'reblend-routing/lib/IAny';
import { createContext } from 'reblendjs';

const Params = createContext<IAny | undefined | null>(null as any);

export { Params };
