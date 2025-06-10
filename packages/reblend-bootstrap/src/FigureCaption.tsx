import * as Reblend from 'reblendjs';
import clsx from 'clsx';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface FigureCaptionProps extends Reblend.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'figure-caption'
   */
  bsPrefix?: string | undefined;
}

const FigureCaption: DynamicRefForwardingComponent<
  'figcaption',
  FigureCaptionProps
> = (
  ({ className, bsPrefix, as: Component = 'figcaption', ...props }) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'figure-caption');
    return (
      <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
    );
  },
);

FigureCaption.displayName = 'FigureCaption';

export default FigureCaption;
