import { describe, expect, it } from '@jest/globals';
import { render, screen } from 'reblend-testing-library';
import NavbarToggle from '../src/NavbarToggle';

describe('<NavbarToggle>', () => {
  it('Should have button as default component', async () => {
    await render(<NavbarToggle data-testid="test" />);
    expect(screen.getByTestId('test').tagName).toEqual('BUTTON');
  });
});
