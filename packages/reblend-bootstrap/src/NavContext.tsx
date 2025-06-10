import * as Reblend from 'reblendjs';
import type { EventKey } from '@restart/ui/types';

interface NavContextType {
  role?: string; // used by NavLink to determine it's role
  activeKey: EventKey | null;
  getControlledId: (key: EventKey | null) => string;
  getControllerId: (key: EventKey | null) => string;
}

const NavContext = Reblend.createContext<NavContextType | null>(null);
NavContext.displayName = 'NavContext';

export default NavContext;
