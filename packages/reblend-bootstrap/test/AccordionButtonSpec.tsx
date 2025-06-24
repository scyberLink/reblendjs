import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from 'reblend-testing-library';
import AccordionButton from '../src/AccordionButton';
import Accordion from '../src/Accordion';

describe('<AccordionButton>', () => {
  it('Should have button as default component', async () => {
    await render(<AccordionButton data-testid="test-accordion-button" />);
    expect(screen.getByTestId('test-accordion-button').tagName).toEqual(
      'BUTTON',
    );
    expect(
      screen.getByTestId('test-accordion-button').getAttribute('type'),
    ).toEqual('button');
  });

  it('Should allow rendering as different component', async () => {
    await render(<AccordionButton data-testid="test-accordion-button" as="div" />);
    expect(screen.getByTestId('test-accordion-button').tagName).toEqual('DIV');
  });

  it('Should call onClick', async () => {
    const onClickSpy = jest.fn();
    await render(<AccordionButton data-testid="btn" onClick={onClickSpy} />);
    fireEvent.click(screen.getByTestId('btn'));

    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });

  it('Should have toggled aria-expanded attribute in alwaysOpen accordion', async () => {
    const onClickSpy = jest.fn();
    await render(
      <Accordion alwaysOpen>
        <AccordionButton data-testid="btn" onClick={onClickSpy} />
      </Accordion>,
    );
    fireEvent.click(screen.getByTestId('btn'));
    expect(screen.getByTestId('btn').getAttribute('aria-expanded')).toEqual(
      'true',
    );
  });
});
