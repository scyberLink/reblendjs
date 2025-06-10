import clsx from 'clsx';
import * as Reblend from 'reblendjs';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';
import type { Color, Variant } from './types';

export interface BadgeProps extends Reblend.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'badge'
   */
  bsPrefix?: string | undefined;

  /**
   * The visual style of the badge
   *
   * @type {'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | undefined}
   */
  bg?: Variant | undefined;

  /**
   * Make badges more rounded with some additional horizontal padding
   */
  pill?: boolean | undefined;

  /**
   * Sets badge text color
   *
   * @type {'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'white' | 'muted' | undefined}
   */
  text?: Color | undefined;
}

const Badge: DynamicRefForwardingComponent<'span', BadgeProps> =
  (
    (
      {
        bsPrefix,
        bg = 'primary',
        pill = false,
        text,
        className,
        as: Component = 'span',
        ...props
      },
      ref,
    ) => {
      const prefix = useBootstrapPrefix(bsPrefix, 'badge');
      return (
        <Component
          ref={ref}
          {...props}
          className={clsx(
            className,
            prefix,
            pill && `rounded-pill`,
            text && `text-${text}`,
            bg && `bg-${bg}`,
          )}
        />
      );
    },
  );

Badge.displayName = 'Badge';

export default Badge;
