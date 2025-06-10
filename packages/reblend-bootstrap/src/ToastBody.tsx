import * as Reblend from 'reblendjs';
import clsx from 'clsx';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface ToastBodyProps extends Reblend.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'toast-body'
   */
  bsPrefix?: string | undefined;
}

const ToastBody: DynamicRefForwardingComponent<'div', ToastBodyProps> =
  (
    ({ className, bsPrefix, as: Component = 'div', ...props }) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'toast-body');
      return (
        <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
      );
    },
  );

ToastBody.displayName = 'ToastBody';

export default ToastBody;
