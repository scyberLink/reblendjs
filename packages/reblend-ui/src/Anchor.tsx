import Reblend, { ComponentRef, HTMLAttributes } from 'reblendjs';

import { useEventCallback } from 'reblend-hooks';
import { useButtonProps } from './Button';

export function isTrivialHref(href?: string) {
  return !href || href.trim() === '#';
}

export interface AnchorProps extends HTMLAttributes<HTMLElement> {
  href?: string;
  disabled?: boolean;
  role?: string;
  tabIndex?: number;
  ref?: ComponentRef<HTMLAnchorElement>;
}

/**
 * An generic `<a>` component that covers a few A11y cases, ensuring that
 * cases where the `href` is missing or trivial like "#" are treated like buttons.
 */
const Anchor: Reblend.FC<AnchorProps> = ({ onKeyDown, ref, ...props }) => {
  const [buttonProps] = useButtonProps({ tagName: 'a', ...props });

  const handleKeyDown = useEventCallback(
    (e: Reblend.KeyboardEvent<HTMLElement>) => {
      buttonProps.onKeyDown!(e);
      onKeyDown?.(e);
    },
  );

  return (() => {
    if (isTrivialHref(props.href) || props.role === 'button') {
      return (
        <a ref={ref} {...props} {...buttonProps} onKeyDown={handleKeyDown} />
      );
    }

    return <a ref={ref} {...props} onKeyDown={onKeyDown} />;
  })();
};

export default Anchor;
