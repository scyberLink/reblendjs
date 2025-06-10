import clsx from 'clsx';
import * as Reblend from 'reblendjs';
import { useBootstrapPrefix } from './ThemeProvider';
import AbstractModalHeader, {
  type AbstractModalHeaderProps,
} from './AbstractModalHeader';

export interface ModalHeaderProps extends AbstractModalHeaderProps {
  /**
   * @default 'modal-header'
   */
  bsPrefix?: string | undefined;
}

const ModalHeader = (
  (
    {
      bsPrefix,
      className,
      closeLabel = 'Close',
      closeButton = false,
      ...props
    }
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'modal-header');
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

ModalHeader.displayName = 'ModalHeader';

export default ModalHeader;
