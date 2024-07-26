import Reblend from 'reblendjs';
import BrowserRouter from './BrowserRouter';

function MemoryRouter({ children }: { children?: JSX.Element[] }) {
  return <BrowserRouter memory>{children}</BrowserRouter>;
}

export default MemoryRouter;
