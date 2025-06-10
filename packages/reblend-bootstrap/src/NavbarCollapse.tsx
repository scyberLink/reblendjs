import * as Reblend from 'reblendjs';
import { useContext } from 'react';
import Collapse, { type CollapseProps } from './Collapse';
import { useBootstrapPrefix } from './ThemeProvider';
import NavbarContext from './NavbarContext';

export interface NavbarCollapseProps
  extends Omit<CollapseProps, 'children'>,
    Reblend.HTMLAttributes<HTMLDivElement> {
  /**
   * @default 'navbar-collapse'
   */
  bsPrefix?: string | undefined;
}

const NavbarCollapse = (
  ({ children, bsPrefix, ...props }) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'navbar-collapse');
    const context = useContext(NavbarContext);

    return (
      <Collapse in={!!(context && context.expanded)} {...props}>
        <div ref={ref} className={bsPrefix}>
          {children}
        </div>
      </Collapse>
    );
  },
);

NavbarCollapse.displayName = 'NavbarCollapse';

export default NavbarCollapse;
