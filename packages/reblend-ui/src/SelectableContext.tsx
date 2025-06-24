import * as Reblend from 'reblendjs';
import { EventKey, SelectCallback } from './types';

const SelectableContext = Reblend.createContext<SelectCallback | null>(null);

export const makeEventKey = (
  eventKey?: EventKey | null,
  href: string | null = null,
): string | null => {
  if (eventKey != null) return String(eventKey);
  return href || null;
};

export default SelectableContext;
