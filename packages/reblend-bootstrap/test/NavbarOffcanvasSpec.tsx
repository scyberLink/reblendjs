import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from 'reblend-testing-library';
import Navbar from '../src/Navbar';
import Offcanvas from '../src/Offcanvas';

describe('<NavbarOffcanvas>', () => {
  it('should should open the offcanvas', async () => {
    await render(
      <Navbar>
        <Navbar.Toggle data-testid="toggle" />
        <Navbar.Offcanvas data-testid="offcanvas">hello</Navbar.Offcanvas>
      </Navbar>,
    );

    fireEvent.click(screen.getByTestId('toggle'));
    expect(screen.getByTestId('offcanvas').classList).toContain('show');
  });

  it('should close the offcanvas on header close button click', async () => {
    const onToggleSpy = jest.fn();
    await render(
      <Navbar onToggle={onToggleSpy} expanded>
        <Navbar.Toggle data-testid="toggle" />
        <Navbar.Offcanvas data-testid="offcanvas">
          <Offcanvas.Header closeButton>header</Offcanvas.Header>
        </Navbar.Offcanvas>
      </Navbar>,
    );

    fireEvent.click(screen.getByLabelText('Close'));
    expect(onToggleSpy).toHaveBeenCalledWith(false);
  });

  it('should render nav items with expand prop', async () => {
    await render(
      <Navbar expand="sm">
        <Navbar.Toggle data-testid="toggle" />
        <Navbar.Offcanvas data-testid="offcanvas">hello</Navbar.Offcanvas>
      </Navbar>,
    );

    expect(screen.getByText('hello')).toBeDefined();
  });
});
