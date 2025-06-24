import clsx from 'clsx';
import * as Reblend from 'reblendjs';
import { useContext } from 'reblendjs';
import FormContext from './FormContext';
import { useBootstrapPrefix } from './ThemeProvider';

export interface FormCheckLabelProps
  extends Reblend.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * @default 'form-check-label'
   */
  bsPrefix?: string | undefined;

  /**
   * The HTML for attribute for associating the label with an input
   */
  htmlFor?: string | undefined;
}

const FormCheckLabel = (
  ({ bsPrefix, className, htmlFor, ...props }) => {
    const { controlId } = useContext(FormContext);

    bsPrefix = useBootstrapPrefix(bsPrefix, 'form-check-label');

    return (
      <label
        {...props}
        ref={ref}
        htmlFor={htmlFor || controlId}
        className={clsx(className, bsPrefix)}
      />
    );
  },
);

FormCheckLabel.displayName = 'FormCheckLabel';

export default FormCheckLabel;
