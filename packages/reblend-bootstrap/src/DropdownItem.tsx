import clsx from 'clsx';
import * as Reblend from 'reblendjs';
import { useDropdownItem } from '@restart/ui/DropdownItem';
import Anchor from '@restart/ui/Anchor';
import type {
  DynamicRefForwardingComponent,
  EventKey,
} from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface DropdownItemProps extends Reblend.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'dropdown-item'
   */
  bsPrefix?: string | undefined;

  /**
   * Highlight the menu item as active.
   */
  active?: boolean | undefined;

  /**
   * Disable the menu item, making it unselectable.
   */
  disabled?: boolean | undefined;

  /**
   * Value passed to the `onSelect` handler, useful for identifying the selected menu item.
   */
  eventKey?: EventKey | undefined;

  /**
   * HTML `href` attribute corresponding to `a.href`.
   */
  href?: string | undefined;
}

const DropdownItem: DynamicRefForwardingComponent<'a', DropdownItemProps> =
  (
    (
      {
        bsPrefix,
        className,
        eventKey,
        disabled = false,
        onClick,
        active,
        as: Component = Anchor,
        ...props
      },
      ref,
    ) => {
      const prefix = useBootstrapPrefix(bsPrefix, 'dropdown-item');
      const [dropdownItemProps, meta] = useDropdownItem({
        key: eventKey,
        href: props.href,
        disabled,
        onClick,
        active,
      });

      return (
        <Component
          {...props}
          {...dropdownItemProps}
          ref={ref}
          className={clsx(
            className,
            prefix,
            meta.isActive && 'active',
            disabled && 'disabled',
          )}
        />
      );
    },
  );

DropdownItem.displayName = 'DropdownItem';

export default DropdownItem;
