import * as Reblend from 'reblendjs';
import clsx from 'clsx';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface InputGroupTextProps extends Reblend.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'input-group-text'
   */
  bsPrefix?: string | undefined;
}

const InputGroupText: DynamicRefForwardingComponent<
  'span',
  InputGroupTextProps
> = (
  ({ className, bsPrefix, as: Component = 'span', ...props }) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'input-group-text');
    return (
      <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
    );
  },
);

InputGroupText.displayName = 'InputGroupText';

export default InputGroupText;
