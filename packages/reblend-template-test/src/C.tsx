import Reblend from 'reblendjs';

class Cde extends Reblend<{ code: number }> {
  constructor() {
    super();
  }
  async html() {
    return (
      <>
        <code>src/App.tsx({this.props.code})</code>
      </>
    );
  }
}

export default Cde;
