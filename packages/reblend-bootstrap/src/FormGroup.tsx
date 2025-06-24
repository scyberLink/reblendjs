import * as Reblend from 'reblendjs';
import { useMemo } from 'reblendjs';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import FormContext from './FormContext';

export interface FormGroupProps extends Reblend.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * Sets `id` on `<FormControl>` and `htmlFor` on `<FormGroup.Label>`.
   */
  controlId?: string | undefined;
}

const FormGroup: DynamicRefForwardingComponent<'div', FormGroupProps> =
  (
    (
      {
        controlId,
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as: Component = 'div',
        ...props
      },
      ref,
    ) => {
      const context = useMemo(() => ({ controlId }), [controlId]);

      return (
        <FormContext.Provider value={context}>
          <Component {...props} ref={ref} />
        </FormContext.Provider>
      );
    },
  );

FormGroup.displayName = 'FormGroup';

export default FormGroup;
