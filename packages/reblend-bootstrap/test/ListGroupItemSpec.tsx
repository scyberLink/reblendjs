import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from 'reblend-testing-library';
import ListGroupItem from '../src/ListGroupItem';

describe('<ListGroupItem>', () => {
  it('should output a div', async () => {
    await render(<ListGroupItem data-testid="test" />);

    const item = screen.getByTestId('test');
    expect(item.tagName).toEqual('DIV');
    expect(item.classList).toContain('list-group-item');
  });

  it('accepts variants', async () => {
    await render(<ListGroupItem variant="success" data-testid="test" />);

    const item = screen.getByTestId('test');
    expect(item.classList).toContain('list-group-item');
    expect(item.classList).toContain('list-group-item-success');
  });

  it('accepts active', async () => {
    await render(<ListGroupItem active data-testid="test" />);

    const item = screen.getByTestId('test');
    expect(item.classList).toContain('list-group-item');
    expect(item.classList).toContain('active');
  });

  it('accepts disabled', async () => {
    await render(<ListGroupItem disabled data-testid="test" />);

    const item = screen.getByTestId('test');
    expect(item.classList).toContain('list-group-item');
    expect(item.classList).toContain('disabled');
  });

  it('accepts as prop', async () => {
    await render(<ListGroupItem as="span" data-testid="test" />);

    const item = screen.getByTestId('test');
    expect(item.tagName).toEqual('SPAN');
    expect(item.classList).toContain('list-group-item');
  });

  it('should not be focusable when disabled', async () => {
    await render(<ListGroupItem disabled data-testid="test" />);

    expect(screen.getByTestId('test').getAttribute('tabindex')).toEqual('-1');
  });

  it('should respect user-specified tabIndex', async () => {
    await render(<ListGroupItem disabled tabIndex={4} data-testid="test" />);

    expect(screen.getByTestId('test').getAttribute('tabindex')).toEqual('4');
  });

  describe('actions', () => {
    it('renders a button', async () => {
      await render(<ListGroupItem action data-testid="test" />);

      const item = screen.getByTestId('test');
      expect(item.tagName).toEqual('BUTTON');
      expect(item.classList).toContain('list-group-item-action');
    });

    it('renders an anchor', async () => {
      await render(<ListGroupItem action href="/foo" data-testid="test" />);

      const item = screen.getByTestId('test');
      expect(item.tagName).toEqual('A');
      expect(item.classList).toContain('list-group-item-action');
      expect(item.getAttribute('href')).to.be.equal('/foo');
    });

    it('renders a div and show warning', async () => {
      await render(<ListGroupItem action={false} href="/foo" data-testid="test" />);

      const item = screen.getByTestId('test');
      expect(item.tagName).toEqual('DIV');
      expect(item.classList).not.toContain('list-group-item-action');
      expect(item.getAttribute('href')).toEqual('/foo');
    });

    it('passes href to custom as components', async () => {
      await render(
        <ListGroupItem
          as="div"
          action={false}
          data-testid="test"
          href="/foo"
        />,
      );
      const item = screen.getByTestId('test');
      expect(item.tagName).toEqual('DIV');
      expect(item.classList).not.toContain('list-group-item-action');
      expect(item.getAttribute('href')).toEqual('/foo');
    });
  });

  describe('onClick', () => {
    it('Should call on click', async () => {
      const onClickSpy = jest.fn();

      await render(<ListGroupItem onClick={onClickSpy} data-testid="test" />);

      fireEvent.click(screen.getByTestId('test'));
      expect(onClickSpy).toHaveBeenCalledTimes(1);
    });

    it('Should not call if disabled', async () => {
      const onClickSpy = jest.fn();

      await render(
        <ListGroupItem onClick={onClickSpy} disabled data-testid="test" />,
      );

      fireEvent.click(screen.getByTestId('test'));
      expect(onClickSpy).not.toHaveBeenCalled();
    });
  });
});
