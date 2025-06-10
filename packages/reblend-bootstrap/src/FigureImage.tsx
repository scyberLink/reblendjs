import clsx from 'clsx';
import * as Reblend from 'reblendjs';

import Image, { type ImageProps } from './Image';

const FigureImage = (
  ({ className, fluid = true, ...props }) => (
    <Image
      ref={ref}
      {...props}
      fluid={fluid}
      className={clsx(className, 'figure-img')}
    />
  ),
);

FigureImage.displayName = 'FigureImage';

export default FigureImage;
