import * as Reblend from 'reblendjs';
import clsx from 'clsx';
import { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface NavItemProps extends Reblend.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'nav-item'
   */
  bsPrefix?: string | undefined;
}

const NavItem: DynamicRefForwardingComponent<'div', NavItemProps> =
  (
    ({ className, bsPrefix, as: Component = 'div', ...props }) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'nav-item');
      return (
        <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
      );
    },
  );

NavItem.displayName = 'NavItem';

export default NavItem;
