import * as Reblend from 'reblendjs';
import clsx from 'clsx';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface DropdownDividerProps
  extends Reblend.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'dropdown-divider'
   */
  bsPrefix?: string | undefined;

  /**
   * An ARIA accessible role.
   */
  role?: string | undefined;
}

const DropdownDivider: DynamicRefForwardingComponent<
  'hr',
  DropdownDividerProps
> = (
  (
    { className, bsPrefix, as: Component = 'hr', role = 'separator', ...props }
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'dropdown-divider');
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

DropdownDivider.displayName = 'DropdownDivider';

export default DropdownDivider;
