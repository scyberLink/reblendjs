import clsx from 'clsx';
import * as Reblend from 'reblendjs';
import { useContext } from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { Transition } from 'react-transition-group';
import { useBootstrapPrefix } from './ThemeProvider';
import Collapse, { type CollapseProps } from './Collapse';
import AccordionContext, { isAccordionItemSelected } from './AccordionContext';

export interface AccordionCollapseProps extends CollapseProps {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * A key that corresponds to the toggler that triggers this collapse's expand or collapse.
   */
  eventKey: string;

  /**
   * @default 'accordion-collapse'
   */
  bsPrefix?: string | undefined;
}

/**
 * This component accepts all of [`Collapse`'s props](/docs/utilities/transitions#collapse-1).
 */
const AccordionCollapse: DynamicRefForwardingComponent<
  'div',
  AccordionCollapseProps
> = (
  (
    {
      as: Component = 'div',
      bsPrefix,
      className,
      children,
      eventKey,
      ...props
    }
  ) => {
    const { activeEventKey } = useContext(AccordionContext);
    bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion-collapse');

    return (
      <Collapse
        ref={ref}
        in={isAccordionItemSelected(activeEventKey, eventKey)}
        {...props}
        className={clsx(className, bsPrefix)}
      >
        <Component>{Reblend.Children.only(children)}</Component>
      </Collapse>
    );
  },
);

AccordionCollapse.displayName = 'AccordionCollapse';

export default AccordionCollapse;
