import * as Reblend from 'reblendjs';
import clsx from 'clsx';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface CardLinkProps extends Reblend.AnchorHTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'card-link'
   */
  bsPrefix?: string | undefined;
}

const CardLink: DynamicRefForwardingComponent<'a', CardLinkProps> =
  (
    ({ className, bsPrefix, as: Component = 'a', ...props }) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'card-link');
      return (
        <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
      );
    },
  );

CardLink.displayName = 'CardLink';

export default CardLink;
