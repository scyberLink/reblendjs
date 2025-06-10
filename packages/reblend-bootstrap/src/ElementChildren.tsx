import * as Reblend from 'reblendjs';

/**
 * Iterates through children that are typically specified as `props.children`,
 * but only maps over children that are "valid elements".
 *
 * The mapFunction provided index will be normalised to the components mapped,
 * so an invalid component would not increase the index.
 *
 */
function map<P = any>(
  children,
  func: (el: Reblend.ReactElement<P>, index: number) => any,
) {
  let index = 0;

  return Reblend.Children.map(children, (child) =>
    Reblend.isValidElement<P>(child) ? func(child, index++) : child,
  );
}

/**
 * Iterates through children that are "valid elements".
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child with the index reflecting the position relative to "valid components".
 */
function forEach<P = any>(
  children,
  func: (el: Reblend.ReactElement<P>, index: number) => void,
) {
  let index = 0;
  Reblend.Children.forEach(children, (child) => {
    if (Reblend.isValidElement<P>(child)) func(child, index++);
  });
}

/**
 * Finds whether a component's `children` prop includes a React element of the
 * specified type.
 */
function hasChildOfType<P = any>(
  children: Reblend.ReactNode,
  type: string | Reblend.JSXElementConstructor<P>,
): boolean {
  return Reblend.Children.toArray(children).some(
    (child) => Reblend.isValidElement(child) && child.type === type,
  );
}

export { map, forEach, hasChildOfType };
