import Reblend from 'reblendjs';
import App from './App';
import ImageGrid from './ImageGrid';
import BrowserRouter, { Route } from 'reblend-router';
import Error from '../lib';

export default function Routing() {
  return (
    <Error>
      {error =>
        (error && error.message) || (
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
        )
      }
    </Error>
  );
}
