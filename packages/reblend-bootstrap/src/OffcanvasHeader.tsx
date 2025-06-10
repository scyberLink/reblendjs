import clsx from 'clsx';
import * as Reblend from 'reblendjs';
import { useBootstrapPrefix } from './ThemeProvider';
import AbstractModalHeader, {
  type AbstractModalHeaderProps,
} from './AbstractModalHeader';

export interface OffcanvasHeaderProps extends AbstractModalHeaderProps {
  /**
   * @default 'offcanvas-header'
   */
  bsPrefix?: string | undefined;
}

const OffcanvasHeader = (
  (
    {
      bsPrefix,
      className,
      closeLabel = 'Close',
      closeButton = false,
      ...props
    }
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'offcanvas-header');
    return (
      <AbstractModalHeader
        ref={ref}
        {...props}
        className={clsx(className, bsPrefix)}
        closeLabel={closeLabel}
        closeButton={closeButton}
      />
    );
  },
);

OffcanvasHeader.displayName = 'OffcanvasHeader';

export default OffcanvasHeader;
