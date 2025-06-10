import * as Reblend from 'reblendjs';
import clsx from 'clsx';
import Anchor from '@restart/ui/Anchor';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface AlertLinkProps
  extends Reblend.AnchorHTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'alert-link'
   */
  bsPrefix?: string | undefined;
}

const AlertLink: DynamicRefForwardingComponent<'a', AlertLinkProps> =
  (
    ({ className, bsPrefix, as: Component = Anchor, ...props }) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'alert-link');
      return (
        <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
      );
    },
  );

AlertLink.displayName = 'AlertLink';

export default AlertLink;
