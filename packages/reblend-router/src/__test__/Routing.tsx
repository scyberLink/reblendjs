import Reblend from 'reblendjs';
import BrowserRouter from '../lib/components/BrowserRouter';
import Route from '../lib/components/Route';
import App from './App';
import ImageGrid from './ImageGrid';

export default function Routing() {
  return (
    <>
      <BrowserRouter />
      <h3>Testing Reblend Router</h3>
      <Route
        path={'/user/detail/:id([0-9]{10})?'}
        element={<ImageGrid />}
      ></Route>
      <Route path={'/app'} Component={App}></Route>
      <Route path={'*'} Component={App}></Route>
    </>
  );
}
