import * as Reblend from 'reblendjs';
import clsx from 'clsx';
import { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface OffcanvasBodyProps extends Reblend.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'offcanvas-body'
   */
  bsPrefix?: string | undefined;
}

const OffcanvasBody: DynamicRefForwardingComponent<'div', OffcanvasBodyProps> =
  (
    ({ className, bsPrefix, as: Component = 'div', ...props }) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'offcanvas-body');
      return (
        <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
      );
    },
  );

OffcanvasBody.displayName = 'OffcanvasBody';

export default OffcanvasBody;
