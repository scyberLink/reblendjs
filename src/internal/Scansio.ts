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

    interface ElementClass extends Scansio {}
    interface ElementAttributesProperty { props: {}; }
  }
}

class Scansio extends BaseComponent {
  static ELEMENT_NAME = "Fragment";

  constructor() {
    super();
  }

  protected html() {
    return BaseComponent.createChildren(this.props.children);
  }
}

registerElement(`ScansioFragment`, Scansio);

export default Scansio;
