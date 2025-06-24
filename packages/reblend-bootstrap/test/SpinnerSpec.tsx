import { describe, expect, it } from '@jest/globals';
import { render, screen } from 'reblend-testing-library';
import Spinner from '../src/Spinner';

describe('<Spinner>', () => {
  it('Should render a basic spinner correctly', async () => {
    await render(<Spinner data-testid="test" animation="border" />);
    expect(screen.getByTestId('test').classList).toContain('spinner-border');
  });

  it('Should render a spinner with a custom element, variant and size ', async () => {
    await render(
      <Spinner
        data-testid="test"
        as="span"
        animation="grow"
        variant="primary"
        size="sm"
      />,
    );
    const spinnerElem = screen.getByTestId('test');

    expect(spinnerElem.tagName).toEqual('SPAN');
    expect(spinnerElem.classList).toContain('spinner-grow');
    expect(spinnerElem.classList).toContain('spinner-grow-sm');
    expect(spinnerElem.classList).toContain('text-primary');
  });

  it('Should render a spinner with other properties', async () => {
    await render(<Spinner data-testid="test" animation="grow" role="status" />);
    const spinnerElem = screen.getByTestId('test');

    expect(spinnerElem.classList).toContain('spinner-grow');
    expect(spinnerElem.getAttribute('role')!).toEqual('status');
  });

  it('Should render child elements', async () => {
    await render(
      <Spinner data-testid="test" animation="grow">
        <span id="testChild" />
      </Spinner>,
    );
    const spinnerElem = screen.getByTestId('test');
    expect(spinnerElem.children.length).toEqual(1);
  });

  it('Should have div as default component', async () => {
    await render(<Spinner data-testid="test" animation="border" />);
    const spinnerElem = screen.getByTestId('test');
    expect(spinnerElem.tagName).toEqual('DIV');
  });
});
