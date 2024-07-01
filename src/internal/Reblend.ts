import { registerElement } from "../common/utils";
import BaseComponent from "./BaseComponent";

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
