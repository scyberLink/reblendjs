import * as Reblend from 'reblendjs';
import clsx from 'clsx';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface DropdownItemTextProps
  extends Reblend.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'dropdown-item-text'
   */
  bsPrefix?: string | undefined;
}

const DropdownItemText: DynamicRefForwardingComponent<
  'span',
  DropdownItemTextProps
> = (
  ({ className, bsPrefix, as: Component = 'span', ...props }) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'dropdown-item-text');
    return (
      <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
    );
  },
);

DropdownItemText.displayName = 'DropdownItemText';

export default DropdownItemText;
