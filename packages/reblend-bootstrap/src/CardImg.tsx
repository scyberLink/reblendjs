import clsx from 'clsx';
import * as Reblend from 'reblendjs';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface CardImgProps
  extends Reblend.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType | undefined;

  /**
   * @default 'card-img'
   */
  bsPrefix?: string | undefined;

  /**
   * Defines image position inside the card.
   */
  variant?: 'top' | 'bottom' | string;
}

const CardImg: DynamicRefForwardingComponent<'img', CardImgProps> =
  (
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    (
      {
        bsPrefix,
        className,
        variant,
        as: Component = 'img',
        ...props
      }: CardImgProps,
      ref,
    ) => {
      const prefix = useBootstrapPrefix(bsPrefix, 'card-img');

      return (
        <Component
          ref={ref}
          className={clsx(variant ? `${prefix}-${variant}` : prefix, className)}
          {...props}
        />
      );
    },
  );

CardImg.displayName = 'CardImg';

export default CardImg;
