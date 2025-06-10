import * as Reblend from 'reblendjs';
import clsx from 'clsx';
import { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface PopoverHeaderProps extends Reblend.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'popover-header'
   */
  bsPrefix?: string | undefined;
}

const PopoverHeader: DynamicRefForwardingComponent<'div', PopoverHeaderProps> =
  (
    ({ className, bsPrefix, as: Component = 'div', ...props }) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'popover-header');
      return (
        <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
      );
    },
  );

PopoverHeader.displayName = 'PopoverHeader';

export default PopoverHeader;
