import Reblend, { useContext } from 'reblendjs';
import { ThemeContext } from './context';
import Cde from './C';

function Header({ i = 0, msg = '', logo = '' }) {
  const theme = useContext(ThemeContext);

  return (
    <header className="App-header">
      <img
        class={'App'}
        src={logo}
        className="App-logo"
        alt="logo"
        style={{ width: 'inherit' }}
      />
      <p style={{ background: theme }}>
        Edit <Cde code={i} /> and save to reload. {`{${msg}}`}
      </p>
      <a
        className="App-link"
        href="https://reblendjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn Reblend
      </a>
    </header>
  );
}

export default Header;
