import * as Reblend from 'reblendjs';
import { EventKey } from './types';

interface NavContextType {
  role?: string; // used by NavItem to determine it's role
  activeKey: EventKey | null;
  getControlledId: (key: EventKey | null) => string;
  getControllerId: (key: EventKey | null) => string;
}

const NavContext = Reblend.createContext<NavContextType | null>(null);
NavContext.displayName = 'NavContext';

export default NavContext;
