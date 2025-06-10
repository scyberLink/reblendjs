import * as Reblend from 'reblendjs';
import clsx from 'clsx';

export default (className: string) =>
  // eslint-disable-next-line react/display-name
  ((p) => (
    <div {...p} ref={ref} className={clsx((p as any).className, className)} />
  ));
