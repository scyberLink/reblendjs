import Reactex from "../internal/Reactex";
import Alert from "./Alert";

class App extends Reactex {
  html() {
    return (
      <Alert variant={"success"}>
        Yes
        <button onclick={() => alert(`props: ${this.props};`)}>Omo</button>
      </Alert>
    );
  }
}

customElements.define("app-t", App);
export default App;
