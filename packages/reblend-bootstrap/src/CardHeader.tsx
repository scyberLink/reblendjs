import clsx from 'clsx';
import * as Reblend from 'reblendjs';
import { useMemo } from 'reblendjs';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';
import CardHeaderContext from './CardHeaderContext';

export interface CardHeaderProps extends Reblend.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'card-header'
   */
  bsPrefix?: string | undefined;
}

const CardHeader: DynamicRefForwardingComponent<'div', CardHeaderProps> =
  (
    (
      {
        bsPrefix,
        className,
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as: Component = 'div',
        ...props
      },
      ref,
    ) => {
      const prefix = useBootstrapPrefix(bsPrefix, 'card-header');
      const contextValue = useMemo(
        () => ({
          cardHeaderBsPrefix: prefix,
        }),
        [prefix],
      );

      return (
        <CardHeaderContext.Provider value={contextValue}>
          <Component ref={ref} {...props} className={clsx(className, prefix)} />
        </CardHeaderContext.Provider>
      );
    },
  );

CardHeader.displayName = 'CardHeader';

export default CardHeader;
