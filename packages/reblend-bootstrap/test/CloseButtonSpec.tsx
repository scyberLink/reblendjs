import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from 'reblend-testing-library';
import CloseButton from '../src/CloseButton';

describe('<CloseButton>', () => {
  it('Should output a button', async () => {
    await render(<CloseButton />);

    expect(screen.getAllByRole('button')).toHaveLength(1);
  });

  it('Should have type=button by default', async () => {
    await render(<CloseButton />);

    expect(screen.getByRole('button').getAttribute('type')).toEqual('button');
  });

  it('Should have class .btn-close', async () => {
    await render(<CloseButton />);

    expect(screen.getByRole('button').classList).toContain('btn-close');
  });

  it('Should call onClick callback', async () => {
    const onClickSpy = jest.fn();

    await render(<CloseButton onClick={onClickSpy} />);

    fireEvent.click(screen.getByRole('button'));

    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });

  it('Should have a aria-label defaulted to "Close"', async () => {
    await render(<CloseButton />);

    expect(
      screen.getByLabelText('Close', { selector: '[aria-label]' }),
    ).toBeTruthy();
  });

  it('Should allow override of aria-label', async () => {
    await render(<CloseButton aria-label="My Close" />);

    expect(
      screen.getByLabelText('My Close', { selector: '[aria-label]' }),
    ).toBeTruthy();
  });
});
