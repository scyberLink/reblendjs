import IAny from 'reblend-routing/lib/IAny';
import { createContext } from 'reblendjs';

const Query = createContext<IAny | undefined | null>(null as any);

export { Query };
