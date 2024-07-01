import { registerElement } from "../common/utils";
import BaseComponent from "./BaseComponent";

declare global {
  namespace JSX {
    namespace JSX {
      type ElementType = ReblendTyping.JSX.ElementType;
      interface Element extends ReblendTyping.JSX.Element {}
      interface ElementClass extends ReblendTyping.JSX.ElementClass {}
      interface ElementAttributesProperty
        extends ReblendTyping.JSX.ElementAttributesProperty {}
      interface ElementChildrenAttribute
        extends ReblendTyping.JSX.ElementChildrenAttribute {}
      type LibraryManagedAttributes<C, P> =
        ReblendTyping.JSX.LibraryManagedAttributes<C, P>;
      interface IntrinsicAttributes
        extends ReblendTyping.JSX.IntrinsicAttributes {}
      interface IntrinsicClassAttributes<T>
        extends ReblendTyping.JSX.IntrinsicClassAttributes<T> {}
      interface IntrinsicElements extends ReblendTyping.JSX.IntrinsicElements {}
    }
  }
}

class Reblend extends BaseComponent {
  static ELEMENT_NAME = "Fragment";

  constructor() {
    super();
  }

  protected html() {
    return this.props.children;
  }
}

registerElement(`ReblendFragment`, Reblend);

export default Reblend;
