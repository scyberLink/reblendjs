import Reblend, { TryCatchError, useEffect, useState } from 'reblendjs';
import Router, { Route } from 'reblend-router';
import Counter from './Counter';
import { Container } from 'react-bootstrap';
import StaticExample from './modal/StaticExample';
import BasicExample from './Dropdown/BasicExample';
import DismissibleExample from './toast/DismissibleExample';

export default function Routing({ s }) {
  const span = document.createElement('span');

  useEffect(() => {
    span.textContent = (s * 2) as any;
  }, [s]);

  return (
    <Container class="text-center py-5">
      <h3>Testing Reblend Router</h3>
      <TryCatchError>
        {error => {
          return error && <b>{error.message}</b>;
        }}
        <Router />
        <Route path={'/user/detail/:id([0-9]{10})?'} Component={Counter} />
        <Route path={'*'} Component={span} />
      </TryCatchError>
      <StaticExample />
      <BasicExample />
      <DismissibleExample />
    </Container>
  );
}
