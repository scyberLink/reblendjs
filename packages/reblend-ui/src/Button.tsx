import Reblend, { AriaRole, ButtonHTMLAttributes, FC, ReblendNode, RefAttributes } from 'reblendjs';

export type ButtonType = 'button' | 'reset' | 'submit';

export interface AnchorOptions {
  href?: string;
  rel?: string;
  target?: string;
}

export interface UseButtonPropsOptions extends AnchorOptions {
  type?: ButtonType;
  disabled?: boolean;
  onClick?: Reblend.EventHandler<Reblend.MouseEvent | Reblend.KeyboardEvent>;
  tabIndex?: number | string;
  tagName?: keyof JSX.IntrinsicElements;
  role?: AriaRole | undefined;
}

export function isTrivialHref(href?: string) {
  return !href || href.trim() === '#';
}

export interface AriaButtonProps {
  type?: ButtonType | undefined;
  disabled: boolean | undefined;
  role?: Reblend.AriaRole;
  tabIndex?: number | string | undefined;
  href?: string | undefined;
  target?: string | undefined;
  rel?: string | undefined;
  'aria-disabled'?: true | undefined;
  onClick?: (event: Reblend.MouseEvent | Reblend.KeyboardEvent) => void;
  onKeyDown?: (event: Reblend.KeyboardEvent) => void;
}

export interface UseButtonPropsMetadata {
  tagName: Reblend.ElementType;
}

export function useButtonProps({
  tagName,
  disabled,
  href,
  target,
  rel,
  role,
  onClick,
  tabIndex = 0,
  type,
}: UseButtonPropsOptions): [AriaButtonProps, UseButtonPropsMetadata] {
  if (!tagName) {
    if (href != null || target != null || rel != null) {
      tagName = 'a';
    } else {
      tagName = 'button';
    }
  }

  const meta: UseButtonPropsMetadata = { tagName };
  if (tagName === 'button') {
    return [{ type: (type as any) || 'button', disabled }, meta];
  }

  const handleClick = (event: Reblend.MouseEvent | Reblend.KeyboardEvent) => {
    if (disabled || (tagName === 'a' && isTrivialHref(href))) {
      event.preventDefault();
    }

    if (disabled) {
      event.stopPropagation();
      return;
    }

    onClick?.(event);
  };

  const handleKeyDown = (event: Reblend.KeyboardEvent) => {
    if (event.key === ' ') {
      event.preventDefault();
      handleClick(event);
    }
  };

  if (tagName === 'a') {
    // Ensure there's a href so Enter can trigger anchor button.
    href ||= '#';
    if (disabled) {
      href = undefined;
    }
  }

  return [
    {
      role: role ?? 'button',
      // explicitly undefined so that it overrides the props disabled in a spread
      // e.g. <Tag {...props} {...hookProps} />
      disabled: undefined,
      tabIndex: disabled ? undefined : tabIndex,
      href,
      target: tagName === 'a' ? target : undefined,
      'aria-disabled': !disabled ? undefined : disabled,
      rel: tagName === 'a' ? rel : undefined,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
    },
    meta,
  ];
}

export interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Control the underlying rendered element directly by passing in a valid
   * component type
   */
  as?: keyof Reblend.JSX.IntrinsicElements | undefined;

  /** The disabled state of the button */
  disabled?: boolean | undefined;

  /** Optionally specify an href to render a `<a>` tag styled as a button */
  href?: string | undefined;

  /** Anchor target, when rendering an anchor as a button */
  target?: string | undefined;

  rel?: string | undefined;
  ref?: RefAttributes<HTMLButtonElement>['ref'];
  children: ReblendNode;
}

export interface ButtonProps extends BaseButtonProps {}

const Button: FC<ButtonProps> = ({ as: asProp, disabled, ref, ...props }) => {
  const [buttonProps, { tagName: Component }] = useButtonProps({
    tagName: asProp,
    disabled,
    ...props,
  });

  return <Component {...props} {...buttonProps} ref={ref} />;
};

Button.displayName = 'Button';

export default Button;
