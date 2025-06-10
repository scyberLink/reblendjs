import * as Reblend from 'reblendjs';

// TODO: check
export interface NavbarContextType {
  onToggle: () => void;
  bsPrefix?: string;
  expanded: boolean;
  expand?: boolean | string | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}

const context = Reblend.createContext<NavbarContextType | null>(null);
context.displayName = 'NavbarContext';

export default context;
