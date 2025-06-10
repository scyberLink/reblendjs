import * as Reblend from 'reblendjs';
import clsx from 'clsx';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface CardTextProps extends Reblend.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'card-text'
   */
  bsPrefix?: string | undefined;
}

const CardText: DynamicRefForwardingComponent<'p', CardTextProps> =
  (
    ({ className, bsPrefix, as: Component = 'p', ...props }) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'card-text');
      return (
        <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
      );
    },
  );

CardText.displayName = 'CardText';

export default CardText;
