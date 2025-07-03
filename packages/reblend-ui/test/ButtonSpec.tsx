import Reblend from 'reblendjs';
import { render, fireEvent } from 'reblend-testing-library';

import { expect, describe, it } from '@jest/globals';
import Button from '../cjs/Button';

describe('<Button>', () => {
  it('Should output a button', async () => {
    const { container } = await render(<Button>Title</Button>);

    expect(container.firstElementChild!.firstElementChild!.tagName).toEqual(
      'BUTTON',
    );
  });

  it('Should have type=button by default', async () => {
    const { container } = await render(<Button>Title</Button>);

    expect(
      container.firstElementChild!.firstElementChild!.getAttribute('type')!,
    ).toEqual('button');
  });

  it('Should show the type if passed one', async () => {
    const { container } = await render(<Button type="submit">Title</Button>);

    expect(
      container.firstElementChild!.firstElementChild!.getAttribute('type')!,
    ).toEqual('submit');
  });

  it('Should show the type if explicitly passed in when "as" is used', async () => {
    const { container } = await render(
      <Button as="div" type="submit">
        Title
      </Button>,
    );

    expect(
      container.firstElementChild!.firstElementChild!.getAttribute('type')!,
    ).toEqual('submit');
  });

  it('Should not have default type=button when "as" is used', async () => {
    const { container } = await render(<Button as="div">Title</Button>);

    expect(
      container.firstElementChild!.firstElementChild!.getAttribute('type'),
    ).toBeFalsy();
  });

  it('should forward refs to the button', async () => {
    const ref = Reblend.createRef<any>();
    const { rerender } = await render(
      <div>
        <Button ref={ref}>Yo</Button>
      </div>,
    );

    expect(ref.current!.tagName).toEqual('BUTTON');

    await render(
      <div>
        <Button ref={ref} href="a">
          Yo
        </Button>
      </div>,
    );

    expect(ref.current.tagName).toEqual('A');
  });

  it('Should output an anchor if called with a href', async () => {
    const href = '/url';

    const { container } = await render(<Button href={href}>Title</Button>);
    // .assertSingle(`a[href="${href}"]`);

    expect(container.querySelector(`a[href="${href}"]`)).toBeTruthy();
  });

  it('Should call onClick callback', async () => {
    const spy = jest.fn();
    const { container } = await render(<Button onClick={spy}>Title</Button>);

    fireEvent.click(container.firstElementChild!.firstElementChild!);

    expect(spy).toHaveBeenCalled();
  });

  it('Should be disabled button', async () => {
    const { container } = await render(<Button disabled>Title</Button>);

    expect(container.querySelector(`button[disabled]`)).toBeTruthy();
  });

  it('Should be inferred disabled link', async () => {
    const clickSpy = jest.fn();

    const { container } = await render(
      <Button disabled href="#foo" onClick={clickSpy}>
        Title
      </Button>,
    );

    expect(container.querySelector(`a[disabled]`)).toBeNull();
    const anchor = container.querySelector(`a[role="button"][aria-disabled]`)!;

    expect(anchor).toBeTruthy();

    fireEvent.click(anchor);

    expect(clickSpy).not.toHaveBeenCalled();
  });

  ['#', ''].forEach((href) => {
    it(`should prevent default on trivial href="${href}" clicks`, async () => {
      const clickSpy = jest.fn();

      const { getByText } = await render(
        <div onClick={clickSpy}>
          <Button href={href}>Title</Button>
        </div>,
      );

      const button: HTMLButtonElement = getByText('Title') as HTMLButtonElement;

      expect(button).toBeTruthy();

      fireEvent.click(button);

      expect(clickSpy).toHaveBeenCalledTimes(1);
      const event = clickSpy.mock.calls[0][0];

      expect(event.defaultPrevented).toEqual(true);
    });
  });

  it(`should not prevent default on button clicks`, async () => {
    const clickSpy = jest.fn();

    const { getByText } = await render(
      <div onClick={clickSpy}>
        <Button>Title</Button>
      </div>,
    );

    const button: HTMLButtonElement = getByText('Title') as HTMLButtonElement;

    expect(button).toBeTruthy();

    fireEvent.click(button);

    expect(clickSpy).toHaveBeenCalledTimes(1);
    const event = clickSpy.mock.calls[0][0];

    expect(event.defaultPrevented).toEqual(false);
  });

  it('Should be disabled link', async () => {
    const clickSpy = jest.fn();

    const { container } = await render(
      <Button disabled as="a" onClick={clickSpy}>
        Title
      </Button>,
    );

    const anchor = container.querySelector(`a[role="button"][aria-disabled]`)!;

    expect(anchor).toBeTruthy();

    fireEvent.click(anchor);

    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('should render an anchor with # if href not provided', async () => {
    const { container } = await render(<Button as="a">Title</Button>);

    expect(
      container.firstElementChild!.firstElementChild!.getAttribute('href')!,
    ).toEqual('#');
  });
});
