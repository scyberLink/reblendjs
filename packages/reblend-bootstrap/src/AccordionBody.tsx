import clsx from 'clsx';
import * as Reblend from 'reblendjs';
import { useContext } from 'reblendjs';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';
import AccordionCollapse from './AccordionCollapse';
import AccordionItemContext from './AccordionItemContext';
import type { TransitionCallbacks } from './types';

export interface AccordionBodyProps
  extends TransitionCallbacks,
    Reblend.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'accordion-body'
   */
  bsPrefix?: string | undefined;
}

const AccordionBody: DynamicRefForwardingComponent<'div', AccordionBodyProps> =
  (
    (
      {
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as: Component = 'div',
        bsPrefix,
        className,
        onEnter,
        onEntering,
        onEntered,
        onExit,
        onExiting,
        onExited,
        ...props
      },
      ref,
    ) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion-body');
      const { eventKey } = useContext(AccordionItemContext);

      return (
        <AccordionCollapse
          eventKey={eventKey}
          onEnter={onEnter}
          onEntering={onEntering}
          onEntered={onEntered}
          onExit={onExit}
          onExiting={onExiting}
          onExited={onExited}
        >
          <Component
            ref={ref}
            {...props}
            className={clsx(className, bsPrefix)}
          />
        </AccordionCollapse>
      );
    },
  );

AccordionBody.displayName = 'AccordionBody';

export default AccordionBody;
