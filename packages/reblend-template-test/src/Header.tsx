import Reblend, { TryCatchError, useContext } from 'reblendjs';
import { ThemeContext } from './context';
import Cde from './C';
import { Link } from 'reblend-router';

function Header({ i = 0, msg = '', logo = '' }) {
  const theme = useContext(ThemeContext);

  return (
    <header className="App-header">
      <TryCatchError>
        {error =>
          (error && <>{error.message}</>) || (
            <>
              {
                //@ts-ignore Should throw error and should be caught
                inc.message + 1
              }
            </>
          )
        }
      </TryCatchError>

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
      <Link
        className="App-link"
        href="user/detail"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn Reblend
      </Link>
    </header>
  );
}

export default Header;
