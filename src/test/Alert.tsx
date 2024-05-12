import Reactex from "../internal/Reactex";

class Alert extends Reactex {
  protected static ELEMENT_NAME: string = "Alert";
  html() {
    return <b>{this.props.children}</b>;
  }
}

export default Alert;
