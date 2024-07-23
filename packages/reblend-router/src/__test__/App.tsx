import Reblend, { useEffect, useState } from 'reblendjs';
import './App.css';
import Link from '../lib/components/Link';

function App() {
  const [i, setState] = useState(0);
  setInterval(() => {
    setState(i + 1);
  }, 1000);
  const [reading, setReading] = useState('');

  useEffect(() => {
    setReading(`${1 + i}`);
  }, [i]);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload. {reading}
        </p>
        <Link className="App-link" href="https://reblendjs.org">
          Learn Reblend
        </Link>
      </header>
    </div>
  );
}

export default App;