import './App.css';
import Reblend, { useContextDispatch, useMemo, useState } from 'reblendjs';
//@ts-ignore
import logo from './logo.svg';
import { ThemeContext } from './context';
import { rand } from 'reblendjs/dist/common/utils';
import Header from './Header';

function App() {
  const [s, setS] = useState(1);

  setInterval(() => {
    setS(pre => pre + 2);
  }, 1000);

  const msg = useMemo(() => `State = "${s}"`, [s]);

  const themeDispatcher = useContextDispatch(ThemeContext);

  const colors = ['azure', 'yellow', 'pink', 'purple', 'green', 'red'];
  setInterval(() => {
    themeDispatcher(colors[rand(0, colors.length)]);
  }, 2000);

  return (
    <div {...{ className: 'App' }}>
      <Header {...{ logo, msg, i: s }} />
    </div>
  );
}

export default App;
