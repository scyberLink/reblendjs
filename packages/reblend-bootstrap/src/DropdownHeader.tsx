import * as Reblend from 'reblendjs';
import clsx from 'clsx';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface DropdownHeaderProps extends Reblend.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'dropdown-header'
   */
  bsPrefix?: string | undefined;

  /**
   * An ARIA accessible role.
   */
  role?: string | undefined;
}

const DropdownHeader: DynamicRefForwardingComponent<
  'div',
  DropdownHeaderProps
> = (
  (
    { className, bsPrefix, as: Component = 'div', role = 'heading', ...props }
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'dropdown-header');
    return (
      <Component
        ref={ref}
        className={clsx(className, bsPrefix)}
        role={role}
        {...props}
      />
    );
  },
);

DropdownHeader.displayName = 'DropdownHeader';

export default DropdownHeader;
