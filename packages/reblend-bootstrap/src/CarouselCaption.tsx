import * as Reblend from 'reblendjs';
import clsx from 'clsx';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface CarouselCaptionProps
  extends Reblend.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'carousel-caption'
   */
  bsPrefix?: string | undefined;
}

const CarouselCaption: DynamicRefForwardingComponent<
  'div',
  CarouselCaptionProps
> = (
  ({ className, bsPrefix, as: Component = 'div', ...props }) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'carousel-caption');
    return (
      <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
    );
  },
);

CarouselCaption.displayName = 'CarouselCaption';

export default CarouselCaption;
