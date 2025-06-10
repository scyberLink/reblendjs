import * as Reblend from 'reblendjs';

interface CardHeaderContextValue {
  cardHeaderBsPrefix: string;
}

const context = Reblend.createContext<CardHeaderContextValue | null>(null);
context.displayName = 'CardHeaderContext';

export default context;
