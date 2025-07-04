import * as Reblend from 'reblendjs';
import { useContext } from 'reblendjs';
import clsx from 'clsx';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import AccordionContext, { isAccordionItemSelected } from './AccordionContext';
import AccordionItemContext from './AccordionItemContext';
import { useBootstrapPrefix } from './ThemeProvider';
import useAccordionButton from './useAccordionButton';

export interface AccordionButtonProps
  extends Reblend.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'accordion-button'
   */
  bsPrefix?: string | undefined;
}

const AccordionButton: DynamicRefForwardingComponent<
  'div',
  AccordionButtonProps
> = (
  (
    {
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'button',
      bsPrefix,
      className,
      onClick,
      ...props
    }
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion-button');
    const { eventKey } = useContext(AccordionItemContext);
    const accordionOnClick = useAccordionButton(eventKey, onClick);
    const { activeEventKey } = useContext(AccordionContext);

    if (Component === 'button') {
      props.type = 'button';
    }

    return (
      <Component
        ref={ref}
        onClick={accordionOnClick}
        {...props}
        aria-expanded={
          Array.isArray(activeEventKey)
            ? activeEventKey.includes(eventKey)
            : eventKey === activeEventKey
        }
        className={clsx(
          className,
          bsPrefix,
          !isAccordionItemSelected(activeEventKey, eventKey) && 'collapsed',
        )}
      />
    );
  },
);

AccordionButton.displayName = 'AccordionButton';

export default AccordionButton;
