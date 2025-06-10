import * as Reblend from 'reblendjs';
import clsx from 'clsx';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';
import divWithClassName from './divWithClassName';

const DivStyledAsH4 = divWithClassName('h4');
DivStyledAsH4.displayName = 'DivStyledAsH4';

export interface AlertHeadingProps extends Reblend.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'alert-heading'
   */
  bsPrefix?: string | undefined;
}

const AlertHeading: DynamicRefForwardingComponent<'div', AlertHeadingProps> =
  (
    ({ className, bsPrefix, as: Component = DivStyledAsH4, ...props }) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'alert-heading');
      return (
        <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
      );
    },
  );

AlertHeading.displayName = 'AlertHeading';

export default AlertHeading;
