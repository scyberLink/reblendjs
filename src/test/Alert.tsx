import { SingleState } from "../internal/BaseComponent";
import Reactex from "../internal/Reactex";

class Alert extends Reactex {
  protected static ELEMENT_NAME: string = "Alert";
  alertState!: SingleState<number>;

  init() {
    this.alertState = this.useState(0);
    this.setCursor("pointer");
    this.onclick = () => this.alertState.set((previous) => previous + 1);
  }

  html() {
    return (
      <>
        {this.alertState.value} - {this.alertState.value + 1} clicked
      </>
    );
  }
}

export default Alert;
