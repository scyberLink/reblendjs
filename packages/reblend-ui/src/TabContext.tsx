import * as Reblend from 'reblendjs';
import { EventKey, SelectCallback, TransitionComponent } from './types';

export interface TabContextType {
  onSelect: SelectCallback;
  activeKey?: EventKey;
  transition?: TransitionComponent;
  mountOnEnter: boolean;
  unmountOnExit: boolean;
  getControlledId: (key: EventKey) => any;
  getControllerId: (key: EventKey) => any;
}

const TabContext = Reblend.createContext<TabContextType | null>(null);

export default TabContext;
