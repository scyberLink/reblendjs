import Reblend, { useState } from 'reblendjs';
import Router, { Route } from 'reblend-router';
import Counter from './Counter';

export default function Routing() {
  const [i, setI] = useState(0);

  setInterval(() => setI(i + 1), 100);

  return (
    <>
      <Router />
      <h3>Testing Reblend Router</h3>
      <Route path={'/user/detail/:id([0-9]{10})?'} Component={Counter}></Route>
    </>
  );
}
