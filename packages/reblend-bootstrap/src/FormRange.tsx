import clsx from 'clsx';
import * as Reblend from 'reblendjs';
import { useContext } from 'reblendjs';
import { useBootstrapPrefix } from './ThemeProvider';
import FormContext from './FormContext';

export interface FormRangeProps
  extends Omit<Reblend.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'form-range'
   */
  bsPrefix?: string | undefined;

  /**
   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
   */
  id?: string | undefined;
}

const FormRange = (
  ({ bsPrefix, className, id, ...props }) => {
    const { controlId } = useContext(FormContext);
    bsPrefix = useBootstrapPrefix(bsPrefix, 'form-range');

    return (
      <input
        {...props}
        type="range"
        ref={ref}
        className={clsx(className, bsPrefix)}
        id={id || controlId}
      />
    );
  },
);

FormRange.displayName = 'FormRange';

export default FormRange;
