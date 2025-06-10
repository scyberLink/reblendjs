import clsx from 'clsx';
import * as Reblend from 'reblendjs';
import { ReactNode } from 'react';
import Anchor from '@restart/ui/Anchor';
import { DynamicRefForwardingComponent } from '@restart/ui/types';

export interface PageItemProps extends Reblend.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * Disables the PageItem
   */
  disabled?: boolean | undefined;

  /**
   * Styles PageItem as active, and renders a `<span>` instead of an `<a>`.
   */
  active?: boolean | undefined;

  /**
   * An accessible label indicating the active state.
   */
  activeLabel?: string | undefined;

  /**
   * The HTML href attribute for the `PageItem`.
   */
  href?: string | undefined;

  /**
   * Custom style for the inner component of the PageItem
   */
  linkStyle?: Reblend.CSSProperties | undefined;

  /**
   * Custom className for the inner component of the PageItem
   */
  linkClassName?: string | undefined;
}

const PageItem: DynamicRefForwardingComponent<'li', PageItemProps> =
  (
    (
      {
        active = false,
        disabled = false,
        className,
        style,
        activeLabel = '(current)',
        children,
        linkStyle,
        linkClassName,
        as = Anchor,
        ...props
      }: PageItemProps,
      ref,
    ) => {
      const Component = active || disabled ? 'span' : as;
      return (
        <li
          ref={ref}
          style={style}
          className={clsx(className, 'page-item', { active, disabled })}
        >
          <Component
            className={clsx('page-link', linkClassName)}
            style={linkStyle}
            {...props}
          >
            {children}
            {active && activeLabel && (
              <span className="visually-hidden">{activeLabel}</span>
            )}
          </Component>
        </li>
      );
    },
  );

PageItem.displayName = 'PageItem';

export default PageItem;

function createButton(name: string, defaultValue: ReactNode, label = name) {
  const Button = (
    ({ children, ...props }: PageItemProps) => (
      <PageItem {...props} ref={ref}>
        <span aria-hidden="true">{children || defaultValue}</span>
        <span className="visually-hidden">{label}</span>
      </PageItem>
    ),
  );

  Button.displayName = name;

  return Button;
}

export const First = createButton('First', '«');
export const Prev = createButton('Prev', '‹', 'Previous');
export const Ellipsis = createButton('Ellipsis', '…', 'More');
export const Next = createButton('Next', '›');
export const Last = createButton('Last', '»');
