import * as Reblend from "./index";
export { Fragment } from "./index";

export namespace JSX {
    type ElementType = Reblend.JSX.ElementType;
    interface Element extends Reblend.JSX.Element {}
    interface ElementClass extends Reblend.JSX.ElementClass {}
    interface ElementAttributesProperty extends Reblend.JSX.ElementAttributesProperty {}
    interface ElementChildrenAttribute extends Reblend.JSX.ElementChildrenAttribute {}
    type LibraryManagedAttributes<C, P> = Reblend.JSX.LibraryManagedAttributes<C, P>;
    interface IntrinsicAttributes extends Reblend.JSX.IntrinsicAttributes {}
    interface IntrinsicClassAttributes<T> extends Reblend.JSX.IntrinsicClassAttributes<T> {}
    interface IntrinsicElements extends Reblend.JSX.IntrinsicElements {}
}
