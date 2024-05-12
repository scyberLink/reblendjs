import { registerElement } from "../common/utils";
import BaseComponent from "./BaseComponent";

class Reactex extends BaseComponent {
  constructor() {
    super();
  }
}

registerElement(`ReactexComponent`, Reactex);

export default Reactex;
