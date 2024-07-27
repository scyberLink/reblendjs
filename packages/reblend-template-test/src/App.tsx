import './App.css';
import Reblend, { useMemo } from 'reblendjs';
//@ts-ignore
import logo, { ReblendComponent } from './logo.svg';
import { ThemeContext } from './context';
import Header from './Header';
import useI from './hook';
import { rand } from 'reblendjs/lib/common/utils';
import Routing from './Routing';

function App() {
  const [msg, s] = useI();

  const Header1 = useMemo(() => {
    return (
      <>
        <Header {...{ logo, msg, i: s }} />
        {s % 3 === 0 ? <ReblendComponent /> : null}
      </>
    );
  }, [msg, s]);

  const colors = ['azure', 'yellow', 'pink', 'purple', 'green', 'red'];
  setInterval(() => {
    ThemeContext.update(colors[rand(0, colors.length)]);
  }, 2000);

  return (
    <>
      {/* @ts-ignore */}
      <Header1 />
      <div {...{ className: 'App' }}>
        <Header {...{ logo, msg, i: s }} />
      </div>

      <Routing />
    </>
  );
}

export default App;
