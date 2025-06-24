import clsx from 'clsx';
import * as Reblend from 'reblendjs';
import { useMemo } from 'reblendjs';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';
import AccordionItemContext, {
  type AccordionItemContextValue,
} from './AccordionItemContext';

export interface AccordionItemProps extends Reblend.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'accordion-item'
   */
  bsPrefix?: string | undefined;

  /**
   * A unique key used to control this item's collapse/expand.
   */
  eventKey: string;
}

const AccordionItem: DynamicRefForwardingComponent<'div', AccordionItemProps> =
  (
    (
      {
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as: Component = 'div',
        bsPrefix,
        className,
        eventKey,
        ...props
      },
      ref,
    ) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion-item');
      const contextValue = useMemo<AccordionItemContextValue>(
        () => ({
          eventKey,
        }),
        [eventKey],
      );

      return (
        <AccordionItemContext.Provider value={contextValue}>
          <Component
            ref={ref}
            {...props}
            className={clsx(className, bsPrefix)}
          />
        </AccordionItemContext.Provider>
      );
    },
  );

AccordionItem.displayName = 'AccordionItem';

export default AccordionItem;
