import { describe, expect, it } from '@jest/globals';
import { render, screen } from 'reblend-testing-library';
import Breadcrumb from '../src/Breadcrumb';

describe('<Breadcrumb>', () => {
  it('Should apply id to the wrapper ol element', async () => {
    const { container } = render(<Breadcrumb id="custom-id" />);

    expect(container.querySelectorAll('#custom-id').length).toEqual(1);
  });

  it('Should have breadcrumb class inside ol', async () => {
    await render(<Breadcrumb />);

    expect(screen.getByRole('list').classList).toContain('breadcrumb');
  });

  it('Should have custom classes', async () => {
    await render(<Breadcrumb className="custom-one custom-two" data-testid="test" />);

    const breadcrumb = screen.getByTestId('test');
    expect(breadcrumb.classList).toContain('custom-one');
    expect(breadcrumb.classList).toContain('custom-two');
  });

  it('Should not have a navigation role', async () => {
    const { container } = render(
      <Breadcrumb className="custom-one custom-two" />,
    );

    expect(container.querySelectorAll('ol[role="navigation"]').length).toEqual(
      0,
    );
  });

  it('Should have an aria-label in ol', async () => {
    await render(<Breadcrumb className="custom-one custom-two" />);
    expect(screen.getByLabelText('breadcrumb')).toBeTruthy();
  });

  it('Should have nav as default component', async () => {
    await render(<Breadcrumb data-testid="test" />);

    expect(screen.getByTestId('test').tagName).toEqual('NAV');
  });
});
