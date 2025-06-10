import clsx from 'clsx';
import * as Reblend from 'reblendjs';
import { useBootstrapPrefix } from './ThemeProvider';

export interface ImageProps extends Reblend.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * @default 'img'
   */
  bsPrefix?: string | undefined;

  /**
   * Sets image as fluid image.
   */
  fluid?: boolean | undefined;

  /**
   * Sets image shape as rounded.
   */
  rounded?: boolean | undefined;

  /**
   * Sets image shape as circle.
   */
  roundedCircle?: boolean | undefined;

  /**
   * Sets image shape as thumbnail.
   */
  thumbnail?: boolean | undefined;
}

const Image = (
  (
    {
      bsPrefix,
      className,
      fluid = false,
      rounded = false,
      roundedCircle = false,
      thumbnail = false,
      ...props
    }
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'img');
    return (
      <img
        ref={ref}
        {...props}
        className={clsx(
          className,
          fluid && `${bsPrefix}-fluid`,
          rounded && `rounded`,
          roundedCircle && `rounded-circle`,
          thumbnail && `${bsPrefix}-thumbnail`,
        )}
      />
    );
  },
);

Image.displayName = 'Image';

export default Image;
