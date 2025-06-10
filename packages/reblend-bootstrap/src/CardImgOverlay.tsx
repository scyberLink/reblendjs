import * as Reblend from 'reblendjs';
import clsx from 'clsx';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface CardImgOverlayProps extends Reblend.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'card-img-overlay'
   */
  bsPrefix?: string | undefined;
}

const CardImgOverlay: DynamicRefForwardingComponent<
  'div',
  CardImgOverlayProps
> = (
  ({ className, bsPrefix, as: Component = 'div', ...props }) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'card-img-overlay');
    return (
      <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
    );
  },
);

CardImgOverlay.displayName = 'CardImgOverlay';

export default CardImgOverlay;
