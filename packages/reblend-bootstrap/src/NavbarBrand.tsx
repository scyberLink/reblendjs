import clsx from 'clsx';
import * as Reblend from 'reblendjs';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface NavbarBrandProps extends Reblend.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'navbar-brand'
   */
  bsPrefix?: string | undefined;

  /**
   * An href, when provided the Brand will render as an `<a>` element (unless `as` is provided).
   */
  href?: string | undefined;
}

const NavbarBrand: DynamicRefForwardingComponent<'a', NavbarBrandProps> =
  (
    ({ bsPrefix, className, as, ...props }) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'navbar-brand');

      const Component = as || (props.href ? 'a' : 'span');

      return (
        <Component {...props} ref={ref} className={clsx(className, bsPrefix)} />
      );
    },
  );

NavbarBrand.displayName = 'NavbarBrand';

export default NavbarBrand;
