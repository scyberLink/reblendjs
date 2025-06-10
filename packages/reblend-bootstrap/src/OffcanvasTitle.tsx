import * as Reblend from 'reblendjs';
import clsx from 'clsx';
import { DynamicRefForwardingComponent } from '@restart/ui/types';
import divWithClassName from './divWithClassName';
import { useBootstrapPrefix } from './ThemeProvider';

const DivStyledAsH5 = divWithClassName('h5');

export interface OffcanvasTitleProps extends Reblend.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'offcanvas-title'
   */
  bsPrefix?: string | undefined;
}

const OffcanvasTitle: DynamicRefForwardingComponent<
  'div',
  OffcanvasTitleProps
> = (
  ({ className, bsPrefix, as: Component = DivStyledAsH5, ...props }) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'offcanvas-title');
    return (
      <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
    );
  },
);

OffcanvasTitle.displayName = 'OffcanvasTitle';

export default OffcanvasTitle;
