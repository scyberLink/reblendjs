import clsx from 'clsx';
import * as Reblend from 'reblendjs';
import { useBootstrapPrefix } from './ThemeProvider';

export interface ButtonToolbarProps extends Reblend.HTMLAttributes<HTMLElement> {
  /**
   * @default 'btn-toolbar'
   */
  bsPrefix?: string | undefined;

  /**
   * The ARIA role describing the button toolbar. Generally the default
   * "toolbar" role is correct. An `aria-label` or `aria-labelledby`
   * prop is also recommended.
   */
  role?: string | undefined;
}

const ButtonToolbar = (
  ({ bsPrefix, className, role = 'toolbar', ...props }) => {
    const prefix = useBootstrapPrefix(bsPrefix, 'btn-toolbar');

    return (
      <div
        {...props}
        ref={ref}
        className={clsx(className, prefix)}
        role={role}
      />
    );
  },
);

ButtonToolbar.displayName = 'ButtonToolbar';

export default ButtonToolbar;
