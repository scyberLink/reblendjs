import * as Reblend from 'reblendjs';
import clsx from 'clsx';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';
import divWithClassName from './divWithClassName';

const DivStyledAsH6 = divWithClassName('h6');

export interface CardSubtitleProps extends Reblend.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'card-subtitle'
   */
  bsPrefix?: string | undefined;
}

const CardSubtitle: DynamicRefForwardingComponent<'div', CardSubtitleProps> =
  (
    ({ className, bsPrefix, as: Component = DivStyledAsH6, ...props }) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'card-subtitle');
      return (
        <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
      );
    },
  );

CardSubtitle.displayName = 'CardSubtitle';

export default CardSubtitle;
