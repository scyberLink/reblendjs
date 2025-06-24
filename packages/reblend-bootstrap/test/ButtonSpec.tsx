import * as Reblend from 'reblendjs';
import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from 'reblend-testing-library';

import Button from '../src/Button';

describe('<Button>', () => {
  it('Should output a button', async () => {
    await render(<Button>Title</Button>);

    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('Should have type=button by default', async () => {
    await render(<Button>Title</Button>);

    expect(screen.getByRole('button').getAttribute('type')).toEqual('button');
  });

  it('Should show the type if passed one', async () => {
    await render(<Button type="submit">Title</Button>);

    expect(screen.getByRole('button').getAttribute('type')).toEqual('submit');
  });

  it('Should show the type if explicitly passed in when "as" is used', async () => {
    const { getByTestId } = render(
      <Button as="div" type="submit" data-testid="test">
        Title
      </Button>,
    );

    expect(getByTestId('test').getAttribute('type')).toEqual('submit');
  });

  it('Should not have default type=button when "as" is used', async () => {
    const { getByTestId } = render(
      <Button as="div" data-testid="test">
        Title
      </Button>,
    );

    expect(getByTestId('test').getAttribute('type')).to.be.null;
  });

  it('should forward refs to the button', async () => {
    const ref = Reblend.createRef<HTMLButtonElement>();
    await render(
      <div>
        <Button ref={ref}>Yo</Button>
      </div>,
    );

    expect(ref.current?.tagName).toEqual('BUTTON');

    await render(
      <div>
        <Button ref={ref} href="a">
          Yo
        </Button>
      </div>,
    );

    expect(ref.current?.tagName).toEqual('A');
  });

  it('Should output an anchor if called with a href', async () => {
    const href = '/url';

    await render(<Button href={href}>Title</Button>);

    expect(screen.getByRole('button').getAttribute('href')).toEqual(href);
  });

  it('Should call onClick callback', async () => {
    const onClick = jest.fn();

    await render(<Button onClick={onClick}>Title</Button>);

    fireEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Should be disabled', async () => {
    await render(<Button disabled>Title</Button>);

    expect(screen.getByRole('button').matches('[disabled]')).toEqual(true);
  });

  it('Should be disabled link', async () => {
    await render(
      <Button disabled href="#">
        Title
      </Button>,
    );

    expect(screen.getByRole('button').classList).toContain('disabled');
  });

  it('Should apply variant class', async () => {
    await render(<Button variant="danger">Title</Button>);

    expect(screen.getByRole('button').classList).toContain('btn-danger');
  });

  it('Should have size class', async () => {
    await render(<Button size="lg">Title</Button>);

    expect(screen.getByRole('button').classList).toContain('btn-lg');
  });

  it('Should honour additional classes passed in, adding not overriding', async () => {
    await render(
      <Button className="bob" variant="danger">
        Title
      </Button>,
    );

    const button = screen.getByRole('button');
    expect(button.classList).toContain('bob');
    expect(button.classList).toContain('btn-danger');
  });

  it('Should default to variant="primary"', async () => {
    await render(<Button>Title</Button>);

    expect(screen.getByRole('button').classList).toContain('btn-primary');
  });

  it('Should remove default variant', async () => {
    await render(<Button variant={null as any}>Title</Button>);

    expect(screen.getByRole('button').classList).not.toContain('btn-primary');
  });

  it('Should not output null variant', async () => {
    await render(<Button variant="">Title</Button>);

    expect(screen.getByRole('button').classList).not.toContain('btn-null');
  });

  it('Should not output empty variant', async () => {
    await render(<Button variant="">Title</Button>);

    expect(screen.getByRole('button').classList).not.toContain('btn-');
  });

  it('Should be active', async () => {
    await render(<Button active>Title</Button>);

    expect(screen.getByRole('button').classList).toContain('active');
  });

  it('Should allow a custom prefix', async () => {
    await render(
      <Button bsPrefix="my-btn" variant="danger">
        Title
      </Button>,
    );

    const button = screen.getByRole('button');
    expect(button.classList).toContain('my-btn');
    expect(button.classList).toContain('my-btn-danger');
  });
});
