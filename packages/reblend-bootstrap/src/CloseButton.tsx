import * as Reblend from 'reblendjs';
import clsx from 'clsx';

export type CloseButtonVariant = 'white' | string;

export interface CloseButtonProps
  extends Reblend.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * An accessible label indicating the relevant information about the Close Button.
   */
  'aria-label'?: string | undefined;

  /**
   * Render different color variant for the button.
   *
   * Omitting this will render the default dark color.
   */
  variant?: CloseButtonVariant | undefined;
}

const CloseButton = (
  (
    { className, variant, 'aria-label': ariaLabel = 'Close', ...props }
  ) => (
    <button
      ref={ref}
      type="button"
      className={clsx(
        'btn-close',
        variant && `btn-close-${variant}`,
        className,
      )}
      aria-label={ariaLabel}
      {...props}
    />
  ),
);

CloseButton.displayName = 'CloseButton';

export default CloseButton;
