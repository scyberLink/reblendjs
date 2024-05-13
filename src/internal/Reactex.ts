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

    interface ElementClass extends Reactex {}
    interface ElementAttributesProperty { props: {}; }
  }
}

class Reactex extends BaseComponent {
  static ELEMENT_NAME = "Fragment";

  constructor() {
    super();
  }

  protected html() {
    return BaseComponent.createChildren(this.props.children);
  }
}

registerElement(`ReactexFragment`, Reactex);

export default Reactex;
