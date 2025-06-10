import { describe, expect, it } from 'vitest';
import { render, screen } from 'reblend-testing-library';
import NavbarToggle from '../src/NavbarToggle';

describe('<NavbarToggle>', () => {
  it('Should have button as default component', () => {
    render(<NavbarToggle data-testid="test" />);
    expect(screen.getByTestId('test').tagName).toEqual('BUTTON');
  });
});
