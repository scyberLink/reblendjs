import clsx from 'clsx';
import * as Reblend from 'reblendjs';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';
import AccordionButton from './AccordionButton';

export interface AccordionHeaderProps
  extends Reblend.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'accordion-header'
   */
  bsPrefix?: string | undefined;
}

const AccordionHeader: DynamicRefForwardingComponent<
  'h2',
  AccordionHeaderProps
> = (
  (
    {
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'h2',
      'aria-controls': ariaControls,
      bsPrefix,
      className,
      children,
      onClick,
      ...props
    }
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion-header');

    return (
      <Component ref={ref} {...props} className={clsx(className, bsPrefix)}>
        <AccordionButton onClick={onClick} aria-controls={ariaControls}>
          {children}
        </AccordionButton>
      </Component>
    );
  },
);

AccordionHeader.displayName = 'AccordionHeader';

export default AccordionHeader;
