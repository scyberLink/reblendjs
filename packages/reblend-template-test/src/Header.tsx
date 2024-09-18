import Reblend, { TryCatchError, useContext } from 'reblendjs';
import { ThemeContext } from './context';
import Cde from './C';
import { Link } from 'reblend-router';
import { Button, Container } from 'react-bootstrap';

function Header({ i = 0, msg = '', logo = '' }) {
  const [theme] = useContext(ThemeContext);

  return (
    <Container>
      <header className="App-header">
        <TryCatchError>
          {error =>
            (error && <>{error.message}</>) || (
              <>
                {i % 3 === 0
                  ? `No Error because ${i} is divisible by 3`
                  : //@ts-ignore Should throw error and should be caught
                    inc.message + 1}
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
        <Link class="mx-1 p-3 my-5 App-link" href="user/detail">
          Link
        </Link>
        <Button onClick={() => alert("I'm clicked")}>Learn Reblend</Button>
      </header>
    </Container>
  );
}

export default Header;
