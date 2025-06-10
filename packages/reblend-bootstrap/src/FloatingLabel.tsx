import clsx from 'clsx';
import * as Reblend from 'reblendjs';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import FormGroup, { type FormGroupProps } from './FormGroup';
import { useBootstrapPrefix } from './ThemeProvider';

export interface FloatingLabelProps extends FormGroupProps {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'form-floating'
   */
  bsPrefix?: string | undefined;

  /**
   * Sets `id` on `<FormControl>` and `htmlFor` on `<label>`.
   */
  controlId?: string | undefined;

  /**
   * Form control label.
   */
  label: Reblend.ReactNode;
}

const FloatingLabel: DynamicRefForwardingComponent<'div', FloatingLabelProps> =
  (
    ({ bsPrefix, className, children, controlId, label, ...props }) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'form-floating');

      return (
        <FormGroup
          ref={ref}
          className={clsx(className, bsPrefix)}
          controlId={controlId}
          {...props}
        >
          {children}
          <label htmlFor={controlId}>{label}</label>
        </FormGroup>
      );
    },
  );

FloatingLabel.displayName = 'FloatingLabel';

export default FloatingLabel;
