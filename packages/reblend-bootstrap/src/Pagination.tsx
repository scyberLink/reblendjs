import clsx from 'clsx';
import * as Reblend from 'reblendjs';
import { useBootstrapPrefix } from './ThemeProvider';
import PageItem, { Ellipsis, First, Last, Next, Prev } from './PageItem';

export interface PaginationProps
  extends Reblend.HTMLAttributes<HTMLUListElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'pagination'
   */
  bsPrefix?: string | undefined;

  /**
   * Sets the size of all PageItems.
   */
  size?: 'sm' | 'lg' | undefined;
}

const Pagination = (
  ({ bsPrefix, className, size, ...props }) => {
    const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'pagination');
    return (
      <ul
        ref={ref}
        {...props}
        className={clsx(
          className,
          decoratedBsPrefix,
          size && `${decoratedBsPrefix}-${size}`,
        )}
      />
    );
  },
);

Pagination.displayName = 'Pagination';

export default Object.assign(Pagination, {
  First,
  Prev,
  Ellipsis,
  Item: PageItem,
  Next,
  Last,
});
