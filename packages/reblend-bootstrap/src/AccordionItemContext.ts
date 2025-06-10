import * as Reblend from 'reblendjs';

export interface AccordionItemContextValue {
  eventKey: string;
}

const context = Reblend.createContext<AccordionItemContextValue>({
  eventKey: '',
});
context.displayName = 'AccordionItemContext';

export default context;
