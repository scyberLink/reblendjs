import { describe, expect, it } from '@jest/globals';
import { render, screen } from 'reblend-testing-library';
import NavbarBrand from '../src/NavbarBrand';

describe('<Navbar.Brand>', () => {
  it('Should create NavbarBrand SPAN element', async () => {
    await render(<NavbarBrand data-testid="test">Brand</NavbarBrand>);
    const navbarBrandElem = screen.getByTestId('test');
    expect(navbarBrandElem.tagName).toEqual('SPAN');
    expect(navbarBrandElem.classList).toContain('navbar-brand');
  });

  it('Should create NavbarBrand A (link) element', async () => {
    await render(
      <NavbarBrand href="/foo" data-testid="test">
        BrandLink
      </NavbarBrand>,
    );
    const navbarBrandElem = screen.getByTestId('test');
    expect(navbarBrandElem.tagName).toEqual('A');
    expect(navbarBrandElem.classList).toContain('navbar-brand');
  });
});
