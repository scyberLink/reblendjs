import { rand } from "../common/md5";
import Reactex from "../internal/Reactex";
import Alert from "./Alert";

class App extends Reactex {
  protected static ELEMENT_NAME = "App";
  singleState = this.useState(0)

  html() {
    return (
      <>
        <Alert
          variant={"success"}
          style="color: green; width: 20px; border: 1px solid red; border-radius: 5px"
          onclick={() => (this.state = (pre) => ({ i: pre.i + 1 }))}
        />
        <button style="margin: 0 10px; padding: 10px" onclick={() => this.singleState.set(rand(0, 9))}>
          Clicking here should update App
        </button>
        <Alert
          variant={"success"}
          style="color: green; width: 20px; border: 1px solid red; border-radius: 5px"
          onclick={() => (this.state = (pre) => ({ i: pre.i + 1 }))}
        />
      </>
    );
  }
}

export default App;
