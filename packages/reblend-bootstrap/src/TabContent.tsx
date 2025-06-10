import * as Reblend from 'reblendjs';
import clsx from 'clsx';
import { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface TabContentProps extends Reblend.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'tab-content'
   */
  bsPrefix?: string | undefined;
}

const TabContent: DynamicRefForwardingComponent<'div', TabContentProps> =
  (
    ({ className, bsPrefix, as: Component = 'div', ...props }) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'tab-content');
      return (
        <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
      );
    },
  );

TabContent.displayName = 'TabContent';

export default TabContent;
