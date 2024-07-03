import './App.css';
import Reblend from 'reblendjs';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img
          class={'App'}
          src={logo}
          className="App-logo"
          alt="logo"
          style={{ width: '50px' }}
        />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
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
    </div>
  );
}

export default App;
