import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from 'reblend-testing-library';
import DropdownToggle from '../src/DropdownToggle';

describe('<DropdownToggle>', () => {
  it('renders toggle button', async () => {
    await render(<DropdownToggle id="test-id">herpa derpa</DropdownToggle>);

    const toggle = screen.getByText('herpa derpa');
    expect(toggle.getAttribute('aria-expanded')).toEqual('false');
    expect(toggle.classList).toContain('dropdown-toggle');
    expect(toggle.classList).toContain('btn');
    expect(toggle.classList).toContain('btn-primary');
  });

  it('renders children', async () => {
    await render(
      <DropdownToggle id="test-id">
        <h3>herpa derpa</h3>
      </DropdownToggle>,
    );

    expect(screen.getByText('herpa derpa')).toBeDefined();
  });

  it('forwards onClick handler', async () => {
    const onClickSpy = jest.fn();

    const { container } = render(
      <DropdownToggle
        id="test-id"
        title="click forwards"
        onClick={onClickSpy}
      />,
    );

    fireEvent.click(container.firstElementChild!);
    expect(onClickSpy).toHaveBeenCalled();
  });

  it('forwards id', async () => {
    const { container } = render(<DropdownToggle id="testid" />);
    expect(container.firstElementChild!.id).toEqual('testid');
  });

  it('does not forward bsPrefix', async () => {
    const { container } = render(
      <DropdownToggle
        bsPrefix="my-custom-bsPrefix"
        title="bsClass"
        id="test-id"
      />,
    );
    expect(container.firstElementChild!.classList).toContain(
      'my-custom-bsPrefix',
    );
    expect(container.firstElementChild!.classList).toContain('btn');
  });
});
