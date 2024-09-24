import './App.css';
import Reblend, { useMemo, useState } from 'reblendjs';
//@ts-ignore
import logo, { ReblendComponent } from './logo.svg';
import { ThemeContext } from './context';
import Header from './Header';
import useI from './hook';
import { rand } from 'reblendjs/lib/common/utils';
import Routing from './Routing';
import { Button } from 'react-bootstrap';
import { MyVerticallyCenteredModal } from './modal/MyVerticallyCenteredModal';
import CardExample from './card/CardExample';
import AutoLayoutSizingExample from './grid/AutoLayoutSizingExample';

function App() {
  const [msg, s] = useI();

  const Header1 = useMemo(() => {
    return (
      <>
        <Header {...{ logo, msg, i: s }}>
          <i></i>
        </Header>
        {s % 3 === 0 ? <ReblendComponent width={150} height={150} /> : null}
      </>
    );
  }, [msg, s]);

  const colors = ['azure', 'yellow', 'pink', 'purple', 'green', 'red'];
  setInterval(() => {
    ThemeContext.update(colors[rand(-1, colors.length + 1)]);
  }, 2000);
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <>
        <CardExample class="p-2" />

        <Button variant="primary" onClick={() => setModalShow(!modalShow)}>
          Toggle vertically centered modal
        </Button>

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
      {/* @ts-ignore */}
      <Header1 />
      <div {...{ className: 'App' }}>
        <Header {...{ logo, msg, i: s }} />
      </div>

      <Routing {...{ s }} />
      <AutoLayoutSizingExample />
    </>
  );
}

export default App;
