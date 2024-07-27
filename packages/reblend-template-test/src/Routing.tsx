import Reblend from 'reblendjs';
//@ts-ignore
import { ReblendComponent } from './logo.svg';
import BrowserRouter, { Route } from 'reblend-router';

export default function Routing() {
  return (
    <>
      <BrowserRouter />
      <h3>Testing Reblend Router</h3>
      <Route
        path={'/user/detail/:id([0-9]{10})?'}
        element={<ReblendComponent />}
      ></Route>
    </>
  );
}
