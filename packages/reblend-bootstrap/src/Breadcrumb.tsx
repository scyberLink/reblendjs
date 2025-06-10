import clsx from 'clsx';
import * as Reblend from 'reblendjs';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';
import BreadcrumbItem from './BreadcrumbItem';

export interface BreadcrumbProps extends Reblend.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'breadcrumb'
   */
  bsPrefix?: string | undefined;

  /**
   * ARIA label for the nav element
   * https://www.w3.org/TR/wai-aria-practices/#breadcrumb
   */
  label?: string | undefined;

  /**
   * Additional props passed as-is to the underlying `<ol>` element
   */
  listProps?: Reblend.OlHTMLAttributes<HTMLOListElement> | undefined;
}

const Breadcrumb: DynamicRefForwardingComponent<'nav', BreadcrumbProps> =
  (
    (
      {
        bsPrefix,
        className,
        listProps = {},
        children,
        label = 'breadcrumb',
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as: Component = 'nav',
        ...props
      },
      ref,
    ) => {
      const prefix = useBootstrapPrefix(bsPrefix, 'breadcrumb');

      return (
        <Component
          aria-label={label}
          className={className}
          ref={ref}
          {...props}
        >
          <ol {...listProps} className={clsx(prefix, listProps?.className)}>
            {children}
          </ol>
        </Component>
      );
    },
  );

Breadcrumb.displayName = 'Breadcrumb';

export default Object.assign(Breadcrumb, {
  Item: BreadcrumbItem,
});
