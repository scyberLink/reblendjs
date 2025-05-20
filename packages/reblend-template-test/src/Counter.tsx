import Reblend, { useEffect, useState } from 'reblendjs';
import UncontrolledExample from './carosel/UncontrolledExample';

export default function Counter() {
  const [i, setI] = useState(0);

  const iElement = new Image(50, 50);
  iElement.textContent = i as any;
  iElement.src = "/favicon.ico"

  useEffect(() => {
    const intervalId = setInterval(() => setI(i + 1), 1);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <b style={'padding: 20px; color: red'}>
        {i} {iElement}
      </b>
      <UncontrolledExample />
    </>
  );
}
