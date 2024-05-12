import Reactex from "../internal/Reactex";
import Alert from "./Alert";

class App extends Reactex {
  protected static ELEMENT_NAME = "App";
  i = 0;

  constructor() {
    super();
    this.clicker = this.clicker.bind(this);
  }

  clicker() {
    this.i++;
    //thiz.appendChild(<b>Hello {i++}</b>);
    this.refresh();
  }

  html() {
    return (
      <>
        <Alert
          variant={"success"}
          style="color: green; width: 20px; border: 1px solid red; border-radius: 5px"
        >
          {this.i} - {this.i + 1} clicked
        </Alert>

        <button onclick={this.clicker} style="margin: 0 10px; padding: 10px">
          Click here
        </button>
      </>
    );
  }
}

export default App;
