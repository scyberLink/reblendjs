import { describe, expect, it } from '@jest/globals';
import { render, screen } from 'reblend-testing-library';
import DropdownItem from '../src/DropdownItem';
import Nav from '../src/Nav';
import Navbar from '../src/Navbar';
import NavDropdown from '../src/NavDropdown';

describe('<NavDropdown>', () => {
  it('Should render li when in nav', async () => {
    await render(
      <NavDropdown
        defaultShow
        title="Title"
        className="test-class"
        id="nav-test"
        data-testid="test"
      >
        <DropdownItem eventKey="1">DropdownItem 1 content</DropdownItem>
        <DropdownItem eventKey="2">DropdownItem 2 content</DropdownItem>
      </NavDropdown>,
    );
    const navDropdownElem = screen.getByTestId('test');
    expect(navDropdownElem.classList).toContain('dropdown');
    expect(navDropdownElem.classList).toContain('test-class');

    expect(navDropdownElem.firstElementChild!.classList).toContain('nav-link');
    expect(navDropdownElem.firstElementChild!.textContent).toEqual('Title');
  });

  it('renders active toggle', async () => {
    await render(
      <NavDropdown
        defaultShow
        active
        title="Title"
        id="nav-test"
        data-testid="test"
      >
        <DropdownItem eventKey="1">DropdownItem 1 content</DropdownItem>
        <DropdownItem eventKey="2">DropdownItem 2 content</DropdownItem>
      </NavDropdown>,
    );
    const navDropdownElem = screen.getByTestId('test');
    expect(navDropdownElem.firstElementChild!.classList).toContain('active');
  });

  it('should handle child active state', async () => {
    await render(
      <Nav defaultActiveKey="2">
        <NavDropdown defaultShow id="test-id" title="title">
          <DropdownItem eventKey="1">DropdownItem 1 content</DropdownItem>
          <DropdownItem eventKey="2" data-testid="test">
            DropdownItem 2 content
          </DropdownItem>
          <DropdownItem eventKey="3">DropdownItem 3 content</DropdownItem>
        </NavDropdown>
      </Nav>,
    );

    expect(screen.getByTestId('test').textContent).toEqual(
      'DropdownItem 2 content',
    );
  });

  it('should pass the id to the NavLink element', async () => {
    await render(
      <NavDropdown id="test-id" title="title" data-testid="test">
        <DropdownItem eventKey="1">DropdownItem 1 content</DropdownItem>
      </NavDropdown>,
    );
    expect(screen.getByTestId('test').firstElementChild!.id).toEqual('test-id');
  });

  it('should support as as prop', async () => {
    await render(
      <NavDropdown as="li" id="test-id" title="title" data-testid="test">
        <DropdownItem eventKey="1">Item 1</DropdownItem>
      </NavDropdown>,
    );
    expect(screen.getByTestId('test').tagName).toEqual('LI');
  });

  it('passes menuVariant to dropdown menu', async () => {
    await render(
      <NavDropdown renderMenuOnMount title="blah" menuVariant="dark" id="test">
        <DropdownItem>Item 1</DropdownItem>
      </NavDropdown>,
    );
    expect(document.querySelector('.dropdown-menu-dark')).toBeDefined();
  });

  it('sets data-bs-popper attribute on dropdown menu', async () => {
    await render(
      <Navbar>
        <NavDropdown renderMenuOnMount id="test-id" title="title">
          <DropdownItem>Item 1</DropdownItem>
        </NavDropdown>
      </Navbar>,
    );
    expect(
      document.querySelectorAll('.dropdown-menu[data-bs-popper="static"]'),
    ).toHaveLength(1);
  });
});
