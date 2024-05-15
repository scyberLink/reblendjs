import { registerElement } from "../common/utils";
import BaseComponent from "./BaseComponent";

declare global {
  namespace JSX {
    interface Element extends HTMLElement {}

    interface IntrinsicElements extends IntrinsicElementMap {}

    type IntrinsicElementMap = {
      [K in keyof HTMLElementTagNameMap]: HTMLElement;
    };

    /* interface Component {
      (properties?: { [key: string]: any }, children?: Node[]): HTMLElement;
    } */

    interface ElementClass extends Reblend {}
    interface ElementAttributesProperty { props: {}; }
  }
}

class Reblend extends BaseComponent {
  static ELEMENT_NAME = "Fragment";

  constructor() {
    super();
  }

  protected html() {
    return BaseComponent.createChildren(this.props.children);
  }
}

registerElement(`ReblendFragment`, Reblend);

export default Reblend;
