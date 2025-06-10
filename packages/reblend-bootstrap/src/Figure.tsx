import * as Reblend from 'reblendjs';
import clsx from 'clsx';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import FigureImage from './FigureImage';
import FigureCaption from './FigureCaption';
import { useBootstrapPrefix } from './ThemeProvider';

export interface FigureProps extends Reblend.AnchorHTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'figure'
   */
  bsPrefix?: string | undefined;
}

const Figure: DynamicRefForwardingComponent<'figure', FigureProps> =
  (
    ({ className, bsPrefix, as: Component = 'figure', ...props }) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'figure');
      return (
        <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
      );
    },
  );

Figure.displayName = 'Figure';

export default Object.assign(Figure, {
  Image: FigureImage,
  Caption: FigureCaption,
});
