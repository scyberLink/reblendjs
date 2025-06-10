import * as Reblend from 'reblendjs';

export type AccordionEventKey = string | string[] | null;

export declare type AccordionSelectCallback = (
  eventKey: AccordionEventKey,
  e: Reblend.SyntheticEvent<unknown>,
) => void;

export interface AccordionContextValue {
  activeEventKey?: AccordionEventKey;
  onSelect?: AccordionSelectCallback;
  alwaysOpen?: boolean;
}

export function isAccordionItemSelected(
  activeEventKey: AccordionEventKey | undefined,
  eventKey: string,
): boolean {
  return Array.isArray(activeEventKey)
    ? activeEventKey.includes(eventKey)
    : activeEventKey === eventKey;
}

const context = Reblend.createContext<AccordionContextValue>({});
context.displayName = 'AccordionContext';

export default context;
