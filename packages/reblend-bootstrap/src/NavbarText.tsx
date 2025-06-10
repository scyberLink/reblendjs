import * as Reblend from 'reblendjs';
import clsx from 'clsx';
import { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface NavbarTextProps extends Reblend.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'navbar-text'
   */
  bsPrefix?: string | undefined;
}

const NavbarText: DynamicRefForwardingComponent<'span', NavbarTextProps> =
  (
    ({ className, bsPrefix, as: Component = 'span', ...props }) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'navbar-text');
      return (
        <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
      );
    },
  );

NavbarText.displayName = 'NavbarText';

export default NavbarText;
